/*
 * GRCALL offline worker.
 *
 * Everything the system serves already comes from this origin, but until now a reload with the
 * network down failed anyway: the documents were local, the browser had no copy. This worker
 * makes the claim testable — after one visit the shell and every training opened are served
 * from cache, and a navigation with no network lands on the last shell document instead of the
 * browser's error page.
 *
 * The rules are deliberately conservative:
 *   - only GET, only same-origin, never `/sw.js` itself;
 *   - navigations are network-first (a redeploy is picked up immediately) with the cached shell
 *     as the fallback;
 *   - `/assets/` and `/t/` are content-addressed by the build, so cache-first is safe and fast;
 *   - everything else is stale-while-revalidate, which keeps the UI instant and still updates.
 *
 * Bump VERSION on a release that changes caching behaviour; activate deletes every cache whose
 * name does not start with it.
 */

// Bumped to v2 to drop caches written by the first worker, which could hold an HTML SPA
// fallback under a `/assets/*.js` key.
const VERSION = 'grcall-v2';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

/**
 * The path the site is mounted under, read from where this worker itself lives.
 *
 * Registration points at `<base>sw.js`, so the directory this worker lives in *is* the
 * mount point. Deriving it here means the worker needs no build step and no injected constant:
 * a copy deployed under `/` computes an empty prefix and behaves exactly as it did before, and
 * one deployed under `/GRCALL-demo/` caches the same names relative to that prefix instead of
 * to the origin root, where none of them exist.
 */
const BASE = self.location.pathname.slice(0, -'sw.js'.length).replace(/\/$/, '');

/** Map a request path onto its path relative to `BASE`, leaving foreign paths untouched. */
function relative(pathname) {
  if (BASE === '') return pathname;
  if (pathname === BASE) return '/';
  return pathname.startsWith(`${BASE}/`) ? pathname.slice(BASE.length) : pathname;
}

/** `BASE` plus an application path, which is what a cache key or a precache URL needs. */
const at = (pathname) => BASE + pathname;

const SHELL_URLS = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg', '/fonts/fonts.css'].map(
  at
);

const OFFLINE_PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline — GRCALL</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fdfbf7;color:#000;font-family:system-ui,sans-serif}
  .box{max-width:32rem;padding:2rem;border:4px solid #000;border-radius:1rem;background:#fff;box-shadow:8px 8px 0 0 #000}
  h1{margin:0 0 .75rem;font-size:1.4rem;text-transform:uppercase}
  p{margin:.5rem 0;line-height:1.5}
  a{display:inline-block;margin-top:1.25rem;padding:.7rem 1.1rem;border:2px solid #000;border-radius:.7rem;background:#ffdc58;color:#000;font-weight:700;text-decoration:none}
</style></head>
<body><div class="box"><h1>Offline</h1>
<p>This page was not saved on this device, and there is no network to fetch it.</p>
<p>The trainings and the hub you have already opened work offline.</p>
<a href="${BASE}/">Back to the home page</a></div></body></html>`;

const offlineResponse = () =>
  new Response(OFFLINE_PAGE, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

/** Cache a response only when it is a real, complete, cacheable success. */
function cacheable(response) {
  if (!response || !response.ok) return false;
  if (response.type !== 'basic' && response.type !== 'default') return false;
  const control = response.headers.get('Cache-Control') || '';
  return !/no-store/i.test(control);
}

/**
 * A response that may be stored under an asset key.
 *
 * A missing hashed chunk used to be answered by the server's SPA fallback with `200 text/html`,
 * and caching that under `/assets/x.js` made the broken chunk permanent. HTML is never a valid
 * answer for a script, stylesheet, font or image request, so it is never stored here.
 */
function cacheableAsset(response) {
  if (!cacheable(response)) return false;
  const type = (response.headers.get('Content-Type') || '').toLowerCase();
  return !type.includes('text/html');
}

async function put(cacheName, request, response, allowed = cacheable) {
  if (!allowed(response)) return response;
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  } catch {
    /* Quota or an opaque response: caching is an optimisation, never a requirement. */
  }
  return response;
}

/**
 * A navigation that belongs to the shell, as opposed to a training document.
 *
 * Training iframes also arrive as navigation requests. Caching one of those under the shell's
 * `/index.html` key would make an offline reload open a random simulation instead of the
 * landing page, so only these paths are allowed to refresh the shell document.
 */
function isShellRoute(pathname) {
  return (
    pathname === '/' ||
    pathname === '/index.html' ||
    pathname === '/trainings' ||
    pathname.startsWith('/trainings/')
  );
}

async function networkFirstNavigation(request) {
  const { pathname } = new URL(request.url);
  // Training iframes arrive here too, so the route test is always made against the path
  // relative to the mount point — `/GRCALL-demo/trainings/x` is the `/trainings/x` route.
  const shell = isShellRoute(relative(pathname));
  try {
    const response = await fetch(request);
    if (response.ok) {
      if (shell) await put(SHELL_CACHE, at('/index.html'), response.clone());
      else await put(RUNTIME_CACHE, request, response.clone());
    }
    return response;
  } catch {
    const runtime = await caches.open(RUNTIME_CACHE);
    const hit = await runtime.match(request);
    if (hit) return hit;
    // A training document must never be replaced by the shell document: doing so would mount
    // the whole hub inside the frame. Only shell routes fall back to the cached shell.
    if (!shell) return offlineResponse();
    const shellCache = await caches.open(SHELL_CACHE);
    return (
      (await shellCache.match(request)) ||
      (await shellCache.match(at('/index.html'))) ||
      (await shellCache.match(at('/'))) ||
      offlineResponse()
    );
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  try {
    return await put(RUNTIME_CACHE, request, await fetch(request), cacheableAsset);
  } catch {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((response) => put(RUNTIME_CACHE, request, response))
    .catch(() => null);

  if (hit) return hit;
  const response = await network;
  return response || new Response('', { status: 504, statusText: 'Offline' });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // addAll is all-or-nothing; one missing optional file must not fail the install.
      await Promise.all(
        SHELL_URLS.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: 'reload' }));
          } catch {
            /* The worker still works; that URL simply needs a visit before it is offline. */
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((name) => !name.startsWith(VERSION)).map((name) => caches.delete(name)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const path = relative(url.pathname);
  if (path === '/sw.js') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (path.startsWith('/assets/') || path.startsWith('/t/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
