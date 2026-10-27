/**
 * Game State Architecture for Aura: The ATT&CK Navigator
 */

const MITRE_DB = {
  tactics: [
    { id: 'TA0043', name: 'Reconnaissance', description: 'The adversary is trying to gather information they can use to plan future operations.' },
    { id: 'TA0042', name: 'Resource Development', description: 'The adversary is trying to establish resources they can use to support operations.' },
    { id: 'TA0001', name: 'Initial Access', description: 'The adversary is trying to get into your network.' },
    { id: 'TA0002', name: 'Execution', description: 'The adversary is trying to run malicious code.' },
    { id: 'TA0003', name: 'Persistence', description: 'The adversary is trying to maintain their foothold.' },
    { id: 'TA0004', name: 'Privilege Escalation', description: 'The adversary is trying to gain higher-level permissions.' },
    { id: 'TA0005', name: 'Defense Evasion', description: 'The adversary is trying to avoid being detected.' },
    { id: 'TA0006', name: 'Credential Access', description: 'The adversary is trying to steal account names and passwords.' },
    { id: 'TA0007', name: 'Discovery', description: 'The adversary is trying to figure out your environment.' },
    { id: 'TA0008', name: 'Lateral Movement', description: 'The adversary is trying to move through your environment.' },
    { id: 'TA0009', name: 'Collection', description: 'The adversary is trying to gather data of interest to their goal.' },
    { id: 'TA0011', name: 'Command and Control', description: 'The adversary is trying to communicate with compromised systems to control them.' },
    { id: 'TA0010', name: 'Exfiltration', description: 'The adversary is trying to steal data.' },
    { id: 'TA0040', name: 'Impact', description: 'The adversary is trying to manipulate, interrupt, or destroy your systems and data.' }
  ],
  techniques: [
    { id: 'T1595', name: 'Active Scanning', tactics: ['TA0043'], description: 'Adversaries may execute active reconnaissance scans to gather information.' },
    { id: 'T1592', name: 'Gather Victim Host Information', tactics: ['TA0043'], description: 'Adversaries may gather information about the victim\'s hosts that can be used during targeting.' },
    { id: 'T1583', name: 'Acquire Infrastructure', tactics: ['TA0042'], description: 'Adversaries may buy, lease, or rent infrastructure that can be used during targeting.' },
    { id: 'T1584', name: 'Compromise Infrastructure', tactics: ['TA0042'], description: 'Adversaries may compromise third-party infrastructure that can be used during targeting.' },
    { id: 'T1566', name: 'Phishing', tactics: ['TA0001'], description: 'Adversaries may send phishing messages to gain access to victim systems.' },
    { id: 'T1078', name: 'Valid Accounts', tactics: ['TA0001', 'TA0003', 'TA0004', 'TA0005'], description: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion.' },
    { id: 'T1133', name: 'External Remote Services', tactics: ['TA0001', 'TA0003'], description: 'Adversaries may leverage external-facing remote services to initially access and/or persist within a network.' },
    { id: 'T1059', name: 'Command and Scripting Interpreter', tactics: ['TA0002'], description: 'Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.' },
    { id: 'T1203', name: 'Exploitation for Client Execution', tactics: ['TA0002'], description: 'Adversaries may exploit software vulnerabilities in client applications to execute code.' },
    { id: 'T1053', name: 'Scheduled Task/Job', tactics: ['TA0002', 'TA0003', 'TA0004'], description: 'Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code.' },
    { id: 'T1543', name: 'Create or Modify System Process', tactics: ['TA0003', 'TA0004'], description: 'Adversaries may create or modify system-level processes to repeatedly execute malicious payloads.' },
    { id: 'T1098', name: 'Account Manipulation', tactics: ['TA0003', 'TA0004'], description: 'Adversaries may manipulate accounts to maintain access to victim systems.' },
    { id: 'T1548', name: 'Abuse Elevation Control Mechanism', tactics: ['TA0004', 'TA0005'], description: 'Adversaries may circumvent mechanisms designed to control elevate privileges to gain higher-level permissions.' },
    { id: 'T1055', name: 'Process Injection', tactics: ['TA0005', 'TA0004'], description: 'Adversaries may inject code into processes in order to evade process-based defenses as well as possibly elevate privileges.' },
    { id: 'T1070', name: 'Indicator Removal on Host', tactics: ['TA0005'], description: 'Adversaries may delete or modify artifacts generated within systems to remove evidence of their presence or hinder defenses.' },
    { id: 'T1027', name: 'Obfuscated Files or Information', tactics: ['TA0005'], description: 'Adversaries may attempt to make an executable or file difficult to discover or analyze by encrypting, encoding, or otherwise obfuscating its contents.' },
    { id: 'T1003', name: 'OS Credential Dumping', tactics: ['TA0006'], description: 'Adversaries may attempt to dump credentials to obtain account login and credential material, normally in the form of a hash or a clear text password.' },
    { id: 'T1555', name: 'Credentials from Password Stores', tactics: ['TA0006'], description: 'Adversaries may search for common password storage locations to obtain user credentials.' },
    { id: 'T1110', name: 'Brute Force', tactics: ['TA0006'], description: 'Adversaries may use brute force techniques to attempt access to accounts when passwords are unknown or when password hashes are obtained.' },
    { id: 'T1046', name: 'Network Service Discovery', tactics: ['TA0007'], description: 'Adversaries may attempt to get a listing of services listening on remote hosts and local network infrastructure devices, then attempt to exploit them.' },
    { id: 'T1082', name: 'System Information Discovery', tactics: ['TA0007'], description: 'An adversary may attempt to get detailed information about the operating system and hardware.' },
    { id: 'T1057', name: 'Process Discovery', tactics: ['TA0007'], description: 'Adversaries may attempt to get information about running processes on a system.' },
    { id: 'T1021', name: 'Remote Services', tactics: ['TA0008'], description: 'Adversaries may use Valid Accounts to log into a service specifically designed to accept remote connections.' },
    { id: 'T1570', name: 'Lateral Tool Transfer', tactics: ['TA0008'], description: 'Adversaries may transfer tools or other files from one system to another to further their objectives.' },
    { id: 'T1560', name: 'Archive Collected Data', tactics: ['TA0009'], description: 'An adversary may compress and/or encrypt data that is collected prior to exfiltration.' },
    { id: 'T1119', name: 'Automated Collection', tactics: ['TA0009'], description: 'Once established within a system or network, an adversary may use automated techniques for collecting internal data.' },
    { id: 'T1071', name: 'Application Layer Protocol', tactics: ['TA0011'], description: 'Adversaries may communicate using OSI application layer protocols to avoid detection/network filtering by blending in with existing traffic.' },
    { id: 'T1090', name: 'Proxy', tactics: ['TA0011'], description: 'Adversaries may use a connection proxy to direct network traffic between systems or act as an intermediary for network communications to a command and control server to avoid direct connections to their infrastructure.' },
    { id: 'T1041', name: 'Exfiltration Over C2 Channel', tactics: ['TA0010'], description: 'Adversaries may steal data by exfiltrating it over an existing command and control channel.' },
    { id: 'T1048', name: 'Exfiltration Over Alternative Protocol', tactics: ['TA0010'], description: 'Adversaries may steal data by exfiltrating it over a different protocol than that of the existing command and control channel.' },
    { id: 'T1485', name: 'Data Destruction', tactics: ['TA0040'], description: 'Adversaries may destroy data and files on specific systems or in large numbers on a network to interrupt availability to systems, services, and network resources.' },
    { id: 'T1486', name: 'Data Encrypted for Impact', tactics: ['TA0040'], description: 'Adversaries may encrypt data on target systems or on large numbers of systems in a network to interrupt availability to system and network resources.' }
  ],
  mitigations: [
    { id: 'M1032', name: 'Multi-factor Authentication', description: 'Use multi-factor authentication for user and privileged accounts.' },
    { id: 'M1042', name: 'Disable or Remove Feature or Program', description: 'Disable or remove unnecessary or vulnerable software or features.' },
    { id: 'M1027', name: 'Password Policies', description: 'Set and enforce secure password policies for accounts.' },
    { id: 'M1026', name: 'Privileged Account Management', description: 'Manage the creation, modification, use, and permissions associated to privileged accounts, including SYSTEM and root.' },
    { id: 'M1050', name: 'Exploit Protection', description: 'Use capabilities to detect and block conditions that may lead to or be indicative of a software exploit occurring.' },
    { id: 'M1036', name: 'Account Use Policies', description: 'Configure features related to account use like login attempt lockouts.' },
    { id: 'M1017', name: 'User Training', description: 'Train users to be aware of security threats such as phishing.' },
    { id: 'M1030', name: 'Network Segmentation', description: 'Architect sections of the network to isolate critical systems.' },
    { id: 'M1041', name: 'Encrypt Sensitive Information', description: 'Protect sensitive information with encryption.' },
    { id: 'M1019', name: 'Execution Prevention', description: 'Block execution of malicious code on a system.' },
    { id: 'M1040', name: 'Behavior Prevention on Endpoint', description: 'Use tools to prevent malicious behavior on endpoints.' },
    { id: 'M1028', name: 'Filter Network Traffic', description: 'Use network appliances to filter ingress or egress traffic.' }
  ],
  aptProfiles: [
    {
      id: 'APT29',
      name: 'APT29',
      description: 'APT29 is a threat group that has been attributed to Russia\'s Foreign Intelligence Service (SVR).',
      preferredTechniques: ['T1566', 'T1078', 'T1059', 'T1053', 'T1543', 'T1098', 'T1548', 'T1055', 'T1070', 'T1003', 'T1046', 'T1082', 'T1021', 'T1560', 'T1071', 'T1041']
    },
    {
      id: 'Lazarus Group',
      name: 'Lazarus Group',
      description: 'Lazarus Group is a state-sponsored cyber threat group attributed to the North Korean government.',
      preferredTechniques: ['T1566', 'T1078', 'T1059', 'T1203', 'T1053', 'T1055', 'T1070', 'T1027', 'T1003', 'T1110', 'T1082', 'T1057', 'T1021', 'T1570', 'T1560', 'T1119', 'T1071', 'T1090', 'T1041', 'T1485', 'T1486']
    }
  ],
  helpers: {
    getTechniquesByTactic: (tacticId) => MITRE_DB.techniques.filter(t => t.tactics.includes(tacticId)),
    getTacticById: (tacticId) => MITRE_DB.tactics.find(t => t.id === tacticId),
    getTechniqueById: (techniqueId) => MITRE_DB.techniques.find(t => t.id === techniqueId),
    getAptProfileById: (aptId) => MITRE_DB.aptProfiles.find(a => a.id === aptId)
  }
};

// Comic Card Framework Helpers
function getComicCardData(id) {
  let item = MITRE_DB.tactics.find(t => t.id === id);
  let type = 'tactic';
  if (!item) {
    item = MITRE_DB.techniques.find(t => t.id === id);
    type = 'technique';
  }
  if (!item) return null;

  let rarity = 'common';
  const legendaryIds = ['TA0001', 'T1566', 'TA0006', 'T1003', 'TA0010', 'T1486'];
  const epicIds = ['TA0002', 'T1059', 'TA0003', 'T1053', 'TA0004', 'TA0005', 'TA0011', 'T1071'];
  const rareIds = ['TA0043', 'TA0042', 'T1595', 'T1078', 'T1055', 'T1027', 'TA0008', 'T1021', 'TA0009', 'TA0040'];

  if (legendaryIds.includes(id)) rarity = 'legendary';
  else if (epicIds.includes(id)) rarity = 'epic';
  else if (rareIds.includes(id)) rarity = 'rare';

  let baseAtk = 72;
  let baseDef = 68;
  if (rarity === 'legendary') { baseAtk = 96; baseDef = 88; }
  else if (rarity === 'epic') { baseAtk = 88; baseDef = 80; }
  else if (rarity === 'rare') { baseAtk = 80; baseDef = 74; }

  const actionBurstMap = {
    'TA0043': 'SCAN!', 'T1595': 'PULSE!', 'T1592': 'SNOOP!',
    'TA0042': 'BUILD!', 'T1583': 'BUY!', 'T1584': 'HIJACK!',
    'TA0001': 'INTRUDE!', 'T1566': 'PHISH!', 'T1078': 'LOGIN!', 'T1133': 'PORTAL!',
    'TA0002': 'RUN!', 'T1059': 'HACK!', 'T1203': 'EXPLOIT!', 'T1053': 'CRON!',
    'TA0003': 'HOOK!', 'T1543': 'DAEMON!', 'T1098': 'CLONE!',
    'TA0004': 'ROOT!', 'T1548': 'BYPASS!',
    'TA0005': 'VANISH!', 'T1055': 'INJECT!', 'T1070': 'ERASE!', 'T1027': 'CLOAK!',
    'TA0006': 'SNIPE!', 'T1003': 'CRACK!', 'T1555': 'VAULT!', 'T1110': 'BRUTE!',
    'TA0007': 'MAP!', 'T1046': 'PROBE!', 'T1082': 'INFO!', 'T1057': 'PEEK!',
    'TA0008': 'LEAP!', 'T1021': 'PIVOT!', 'T1570': 'FETCH!',
    'TA0009': 'STASH!', 'T1560': 'ZIP!', 'T1119': 'SIPHON!',
    'TA0011': 'BEAM!', 'T1071': 'SIGNAL!', 'T1090': 'PROXY!',
    'TA0010': 'LAUNCH!', 'T1041': 'DRAIN!', 'T1048': 'TUNNEL!',
    'TA0040': 'BOOM!', 'T1485': 'WIPE!', 'T1486': 'LOCK!'
  };

  const burstWord = actionBurstMap[id] || (type === 'tactic' ? 'ATTACK!' : 'TACTIC!');

  const loreMap = {
    'TA0043': 'Scouting target vectors from the shadows before launching dark cyber operations.',
    'TA0042': 'Assembling malicious botnets and rogue domain infrastructure for the threat group.',
    'TA0001': 'Breaching the outer perimeter firewall with weaponized phishing payloads!',
    'T1566': 'A deceptive email containing a high-velocity malicious attachment!',
    'TA0002': 'Executing raw binary shellcode straight into victim process memory!',
    'T1059': 'Unleashing weaponized PowerShell commands to override security controls.',
    'TA0003': 'Planting persistent rootkit backdoors that survive system reboots!',
    'T1053': 'Scheduling stealth automated cron jobs to trigger payloads at midnight.',
    'TA0004': 'Escalating system privileges to full ROOT / SYSTEM administrator rights!',
    'TA0005': 'Cloaking malware binaries in encrypted obfuscation to bypass AV scanners.',
    'T1027': 'XOR-encrypting payload binaries to render them invisible to security analysts.',
    'TA0006': 'Dumping cleartext SAM hashes directly from system memory!',
    'T1003': 'Executing Mimikatz to siphon high-value kerberos credentials in real time.',
    'TA0007': 'Scanning internal subnet topology and active listening ports.',
    'TA0008': 'Pivoting laterally across domain controllers via valid administrator tokens.',
    'TA0009': 'Gathering high-value intellectual property into encrypted staging archives.',
    'TA0011': 'Establishing encrypted C2 beacon channels back to adversary command centers.',
    'TA0010': 'Exfiltrating classified corporate databases over covert DNS tunnels!',
    'TA0040': 'Deploying double-extortion ransomware to lock down critical cloud servers!'
  };

  const lore = loreMap[id] || `${item.name}: A vital ${type} employed in cyber warfare operations.`;

  return {
    id: item.id,
    type: type,
    name: item.name,
    code: item.id,
    rarity: rarity,
    atk: baseAtk,
    def: baseDef,
    burstWord: burstWord,
    lore: lore,
    desc: item.description,
    tactics: item.tactics || [item.id]
  };
}

function generateComicSVG(card) {
  const bgColors = {
    'common': '#00F0FF',
    'rare': '#7C4DFF',
    'epic': '#FF6D00',
    'legendary': '#FF0055'
  };

  const mainColor = bgColors[card.rarity] || '#00F0FF';

  let iconGraphic = '';
  if (card.id.startsWith('TA0043') || card.id === 'T1595' || card.id === 'T1082' || card.id === 'T1046') {
    iconGraphic = `
      <circle cx="50" cy="50" r="32" fill="none" stroke="#000" stroke-width="4"/>
      <circle cx="50" cy="50" r="20" fill="none" stroke="#FFEA00" stroke-width="3"/>
      <circle cx="50" cy="50" r="8" fill="#FF0055"/>
      <line x1="50" y1="10" x2="50" y2="90" stroke="#000" stroke-width="3"/>
      <line x1="10" y1="50" x2="90" y2="50" stroke="#000" stroke-width="3"/>
      <polygon points="50,50 75,30 80,50" fill="#FFEA00" opacity="0.6"/>
    `;
  } else if (card.id === 'T1566' || card.id === 'TA0001') {
    iconGraphic = `
      <rect x="20" y="30" width="60" height="40" rx="4" fill="#FFF" stroke="#000" stroke-width="4"/>
      <path d="M20,30 L50,52 L80,30" fill="none" stroke="#000" stroke-width="4"/>
      <polygon points="55,10 40,48 52,48 38,85 68,40 52,40" fill="#FFEA00" stroke="#000" stroke-width="3"/>
    `;
  } else if (card.id === 'TA0002' || card.id === 'T1059') {
    iconGraphic = `
      <rect x="15" y="20" width="70" height="55" rx="6" fill="#000" stroke="#000" stroke-width="4"/>
      <rect x="20" y="25" width="60" height="45" rx="3" fill="#111"/>
      <path d="M26,38 L36,45 L26,52" fill="none" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
      <line x1="42" y1="52" x2="56" y2="52" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
      <polygon points="65,28 72,20 85,25 78,35" fill="#FF0055" stroke="#000" stroke-width="2"/>
    `;
  } else if (card.id === 'TA0006' || card.id === 'T1003' || card.id === 'T1110') {
    iconGraphic = `
      <circle cx="50" cy="40" r="18" fill="#FFEA00" stroke="#000" stroke-width="4"/>
      <polygon points="42,50 58,50 64,80 36,80" fill="#FFEA00" stroke="#000" stroke-width="4"/>
      <circle cx="50" cy="40" r="7" fill="#000"/>
      <polygon points="20,15 35,45 28,48 10,25" fill="#FF0055" stroke="#000" stroke-width="2"/>
    `;
  } else if (card.id === 'TA0040' || card.id === 'T1486' || card.id === 'T1485') {
    iconGraphic = `
      <rect x="25" y="42" width="50" height="42" rx="6" fill="#FF0055" stroke="#000" stroke-width="4"/>
      <path d="M35,42 V28 A15,15 0 0,1 65,28 V42" fill="none" stroke="#000" stroke-width="5"/>
      <circle cx="50" cy="58" r="6" fill="#FFEA00"/>
      <polygon points="47,62 53,62 55,74 45,74" fill="#FFEA00"/>
    `;
  } else if (card.id === 'TA0010' || card.id === 'T1041') {
    iconGraphic = `
      <path d="M50,15 C65,30 65,60 65,75 L35,75 C35,60 35,30 50,15 Z" fill="#2979FF" stroke="#000" stroke-width="4"/>
      <circle cx="50" cy="42" r="8" fill="#FFEA00" stroke="#000" stroke-width="3"/>
      <polygon points="35,60 20,78 35,75" fill="#FF0055" stroke="#000" stroke-width="3"/>
      <polygon points="65,60 80,78 65,75" fill="#FF0055" stroke="#000" stroke-width="3"/>
      <polygon points="42,75 50,92 58,75" fill="#FFEA00" stroke="#000" stroke-width="2"/>
    `;
  } else if (card.id === 'TA0011' || card.id === 'T1071') {
    iconGraphic = `
      <path d="M30,70 A30,30 0 0,1 70,70" fill="none" stroke="#000" stroke-width="5"/>
      <path d="M40,55 A18,18 0 0,1 60,55" fill="none" stroke="#FF0055" stroke-width="4"/>
      <circle cx="50" cy="75" r="8" fill="#FFEA00" stroke="#000" stroke-width="3"/>
      <line x1="50" y1="75" x2="50" y2="25" stroke="#000" stroke-width="4"/>
      <polygon points="50,20 62,35 38,35" fill="#00F0FF" stroke="#000" stroke-width="3"/>
    `;
  } else {
    iconGraphic = `
      <polygon points="50,15 80,30 80,65 50,85 20,65 20,30" fill="${mainColor}" stroke="#000" stroke-width="4"/>
      <polygon points="50,25 58,40 75,42 62,55 66,72 50,62 34,72 38,55 25,42 42,40" fill="#FFEA00" stroke="#000" stroke-width="2"/>
    `;
  }

  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern-${card.id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.12)"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="${mainColor}"/>
      <rect width="100" height="100" fill="url(#dotPattern-${card.id})"/>
      <polygon points="50,50 10,-10 30,-10" fill="#FFEA00" opacity="0.4"/>
      <polygon points="50,50 110,20 110,40" fill="#FFEA00" opacity="0.4"/>
      <polygon points="50,50 -10,80 -10,100" fill="#FFEA00" opacity="0.4"/>
      <polygon points="50,50 80,110 100,110" fill="#FFEA00" opacity="0.4"/>
      ${iconGraphic}
    </svg>
  `;
}

// Delight Systems
window.fireConfetti = function() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#FF9F43', '#A55EEA', '#20BF6B', '#FF6B6B', '#48DBFB'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 100,
      r: Math.random() * 6 + 2,
      dx: Math.random() * 12 - 6,
      dy: Math.random() * -15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngle: 0,
      tiltAngleInc: (Math.random() * 0.07) + 0.05
    });
  }

  let animationId;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach(p => {
      p.tiltAngle += p.tiltAngleInc;
      p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
      p.x += Math.sin(p.tiltAngle) * 2;
      p.dy += 0.05; // gravity
      p.x += p.dx;
      p.y += p.dy;
      
      if (p.y <= canvas.height + 20) active = true;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      ctx.stroke();
    });

    if (active) {
      animationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  render();
};

window.showToast = function(title, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
  `;

  container.appendChild(toast);

  // Trigger reflow for animation
  void toast.offsetWidth;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
}

function getMasteryRank(xp = 0) {
  if (xp >= 1000) return { level: 5, title: 'Grandmaster', badgeClass: 'mastery-tag-grandmaster', borderStyle: 'mastery-border-grandmaster', icon: '👑', maxXP: 1000, prevXP: 500 };
  if (xp >= 500) return { level: 4, title: 'Master', badgeClass: 'mastery-tag-master', borderStyle: 'mastery-border-master', icon: '⭐', maxXP: 1000, prevXP: 250 };
  if (xp >= 250) return { level: 3, title: 'Expert', badgeClass: 'mastery-tag-expert', borderStyle: 'mastery-border-expert', icon: '🔮', maxXP: 500, prevXP: 100 };
  if (xp >= 100) return { level: 2, title: 'Adept', badgeClass: 'mastery-tag-adept', borderStyle: 'mastery-border-adept', icon: '⚡', maxXP: 250, prevXP: 0 };
  return { level: 1, title: 'Novice', badgeClass: 'mastery-tag-novice', borderStyle: 'mastery-border-novice', icon: '🌱', maxXP: 100, prevXP: 0 };
}

const DAILY_MISSION_POOL = [
  {
    techId: 'T1566',
    title: 'Phishing Vectors Research',
    description: 'Research Spearphishing Attachment T1566 in your ATT&CK Comic Binder.',
    rewardPacks: 2,
    rewardType: '2x Comic Booster Packs'
  },
  {
    techId: 'T1059',
    title: 'Command Execution Analysis',
    description: 'Examine Command & Scripting Interpreter T1059 to understand shellcode threats.',
    rewardPacks: 1,
    rewardType: '1x Rare Booster Pack'
  },
  {
    techId: 'T1003',
    title: 'Credential Dumping Safeguards',
    description: 'Investigate OS Credential Dumping T1003 mechanics to harden system SAM & LSASS.',
    rewardPacks: 2,
    rewardType: '2x Rare Booster Packs'
  },
  {
    techId: 'TA0043',
    title: 'Reconnaissance Operations Probe',
    description: 'Study Reconnaissance Tactic TA0043 to detect early adversary active scanning.',
    rewardPacks: 1,
    rewardType: '1x Booster Pack'
  },
  {
    techId: 'T1027',
    title: 'Obfuscation & Evasion Tactics',
    description: 'Analyze Obfuscated Files/Information T1027 used by APT groups for stealth.',
    rewardPacks: 2,
    rewardType: '2x Comic Booster Packs'
  },
  {
    techId: 'T1486',
    title: 'Ransomware Impact Mitigation',
    description: 'Research Data Encrypted for Impact T1486 and evaluate recovery protocols.',
    rewardPacks: 3,
    rewardType: '3x Mega Booster Packs'
  },
  {
    techId: 'TA0001',
    title: 'Initial Access Vector Audit',
    description: 'Audit Initial Access Tactic TA0001 to strengthen perimeter defenses.',
    rewardPacks: 1,
    rewardType: '1x Booster Pack'
  },
  {
    techId: 'T1078',
    title: 'Valid Accounts Hijack Analysis',
    description: 'Research Valid Accounts T1078 to understand compromised credential risks.',
    rewardPacks: 2,
    rewardType: '2x Booster Packs'
  }
];

class GameState {
  constructor() {
    this.state = {
      currentPhase: 1, // 1 to 6
      score: 0,
      clarity: 100, // 0 to 100
      startTime: Date.now(),
      difficultyNotified: false,
      unlockedCards: ['TA0043', 'TA0001', 'T1566', 'T1059', 'TA0006', 'T1003'],
      activeView: 'scenario', // 'scenario' | 'cards'
      lastMissionDate: '',
      dailyMissions: [],
      cardMastery: {} // cardId -> XP (number)
    };
    
    // Observers to notify UI of changes
    this.listeners = [];
    this.checkDailyMissions();
  }

  checkDailyMissions() {
    const today = getTodayString();
    if (this.state.lastMissionDate !== today || !this.state.dailyMissions || this.state.dailyMissions.length === 0) {
      const shuffled = [...DAILY_MISSION_POOL].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3).map((item, idx) => ({
        id: `daily_${today}_${idx}`,
        techId: item.techId,
        title: item.title,
        description: item.description,
        rewardPacks: item.rewardPacks,
        rewardType: item.rewardType,
        completed: false,
        claimed: false
      }));
      this.state.dailyMissions = selected;
      this.state.lastMissionDate = today;
      this.saveGame();
    }
  }

  addCardMasteryXP(id, amount) {
    if (!this.state.cardMastery) this.state.cardMastery = {};
    const currentXP = this.state.cardMastery[id] || 0;
    const oldRank = getMasteryRank(currentXP);
    const newXP = currentXP + amount;
    this.state.cardMastery[id] = newXP;
    const newRank = getMasteryRank(newXP);

    this.saveGame();
    this.notify();

    if (newRank.level > oldRank.level) {
      window.showToast('🏆 CARD MASTERY RANK UP!', `${id} Card reached ${newRank.title} Rank! (${newRank.icon} Level ${newRank.level})`);
      window.fireConfetti();
    }
  }

  completeMission(missionId) {
    const mission = this.state.dailyMissions?.find(m => m.id === missionId);
    if (mission && !mission.completed) {
      mission.completed = true;
      this.addCardMasteryXP(mission.techId, 150);
      this.saveGame();
      this.notify();
      return true;
    }
    return false;
  }

  claimMissionReward(missionId) {
    const mission = this.state.dailyMissions?.find(m => m.id === missionId);
    if (mission && mission.completed && !mission.claimed) {
      mission.claimed = true;
      this.state.score += 300;
      this.unlockCard(mission.techId);
      this.addCardMasteryXP(mission.techId, 250);
      this.saveGame();
      this.notify();
      return mission.rewardPacks;
    }
    return 0;
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // Notify all observers
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  saveGame() {
    localStorage.setItem('aura_save', JSON.stringify(this.state));
  }
  
  loadGame() {
    const saved = localStorage.getItem('aura_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.state = { ...this.state, ...parsed };
      if (!this.state.startTime) this.state.startTime = Date.now();
      if (!this.state.unlockedCards) this.state.unlockedCards = ['TA0043', 'TA0001', 'T1566', 'T1059', 'TA0006', 'T1003'];
      if (!this.state.activeView) this.state.activeView = 'scenario';
      if (!this.state.cardMastery) this.state.cardMastery = {};
      this.checkDailyMissions();
      this.notify();
      return true;
    }
    this.checkDailyMissions();
    return false;
  }
  
  clearSave() {
    localStorage.removeItem('aura_save');
    this.state = { 
      currentPhase: 1, 
      score: 0, 
      clarity: 100, 
      startTime: Date.now(), 
      difficultyNotified: false,
      unlockedCards: ['TA0043', 'TA0001', 'T1566', 'T1059', 'TA0006', 'T1003'],
      activeView: 'scenario',
      lastMissionDate: '',
      dailyMissions: [],
      cardMastery: {}
    };
    this.checkDailyMissions();
    this.notify();
  }

  unlockCard(id) {
    if (!this.state.unlockedCards.includes(id)) {
      this.state.unlockedCards.push(id);
      this.state.score += 200;
      this.addCardMasteryXP(id, 100);
      this.saveGame();
      this.notify();
      return true;
    } else {
      // Duplicate card drawn -> convert to Mastery XP
      this.addCardMasteryXP(id, 100);
    }
    return false;
  }

  toggleView(view) {
    this.state.activeView = view;
    this.notify();
  }

  saveToLeaderboard(grade) {
    const timeTakenSeconds = Math.floor((Date.now() - this.state.startTime) / 1000);
    const mm = Math.floor(timeTakenSeconds / 60).toString().padStart(2, '0');
    const ss = (timeTakenSeconds % 60).toString().padStart(2, '0');
    const timeFormatted = `${mm}:${ss}`;

    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      score: this.state.score,
      clarity: this.state.clarity,
      grade: grade,
      time: timeFormatted,
      timeSeconds: timeTakenSeconds
    };

    let leaderboard = JSON.parse(localStorage.getItem('aura_leaderboard') || '[]');
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score || a.timeSeconds - b.timeSeconds);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10
    localStorage.setItem('aura_leaderboard', JSON.stringify(leaderboard));
  }

  nextPhase() {
    if (this.state.currentPhase < 6) {
      window.fireConfetti();
      window.showToast('Phase Complete!', 'Great job Navigator. Advancing to the next phase.');
      
      this.state.currentPhase += 1;
      this.state.clarity = Math.max(0, this.state.clarity - 15); // Advancing costs some clarity initially
      this.saveGame();
      setTimeout(() => this.notify(), 1500); // Give player time to see confetti
    }
  }

  // State Modifiers
  advancePhase() {
    this.nextPhase();
  }

  addScore(points) {
    this.state.score += points;
    this.saveGame();
    this.notify();
  }

  modifyClarity(amount) {
    let finalAmount = amount;
    
    // Difficulty scaling: if the player is doing well in early phases, make mistakes more punishing
    if (amount < 0) {
      let multiplier = 1;
      
      // Check performance based on current phase and score
      if (this.state.currentPhase >= 2 && this.state.score > 500) {
        multiplier += 0.5;
      }
      if (this.state.currentPhase >= 3 && this.state.score > 1500) {
        multiplier += 0.5;
      }
      if (this.state.currentPhase >= 4 && this.state.score > 3000) {
        multiplier += 0.5;
      }
      
      finalAmount = Math.floor(amount * multiplier);
      
      if (multiplier > 1 && !this.state.difficultyNotified) {
        window.showToast('Difficulty Increased', 'Your exceptional performance has triggered harder scenarios. Clarity penalties are increased!');
        this.state.difficultyNotified = true;
      }
    }

    this.state.clarity = Math.max(0, Math.min(100, this.state.clarity + finalAmount));
    this.saveGame();
    this.notify();
  }
}

// Initialize Global Game State
const game = new GameState();

// UI Controllers
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const elPhase = document.getElementById('phase-display');
  const elScore = document.getElementById('score-display');
  const elClarityVal = document.getElementById('clarity-display');
  const elClarityFill = document.getElementById('clarity-fill');
  const elPhaseTitle = document.getElementById('phase-title');
  
  const btnAdvance = document.getElementById('btn-advance');
  const btnScore = document.getElementById('btn-score');

  // Phase Titles Map
  const phaseNames = {
    1: 'Phase 1: The ATT&CK Lifecycle',
    2: 'Phase 2: Intelligence Extraction',
    3: 'Phase 3: The Threat Canvas',
    4: 'Phase 4: Defensive Architecture',
    5: 'Phase 5: The Final Scenario',
    6: 'Certification'
  };

  const phaseDescriptions = {
    1: 'Reconstruct the MITRE ATT&CK enterprise matrix in chronological order.',
    2: 'Analyze the intelligence report and map attacker actions to MITRE techniques.',
    3: 'Connect the techniques in the correct chronological order of the attack lifecycle.',
    4: 'Deploy proper mitigations against the identified threats.',
    5: 'Navigate an interactive tabletop exercise against a simulated APT group.',
    6: 'Claim your MITRE ATT&CK Certified Navigator Certificate.'
  };

  // Update UI when state changes
  game.subscribe((state) => {
    // Update top nav stats
    elPhase.textContent = state.currentPhase;
    elScore.textContent = state.score.toLocaleString();
    
    // Update clarity progress bar
    elClarityVal.textContent = `${state.clarity}%`;
    elClarityFill.style.width = `${state.clarity}%`;
    
    // Change bar color based on clarity level
    if (state.clarity > 60) {
      elClarityFill.style.background = 'var(--color-accent)';
    } else if (state.clarity > 30) {
      elClarityFill.style.background = 'var(--color-primary)';
    } else {
      elClarityFill.style.background = '#FF4757'; // Alert red
    }

    // Update Phase Title and Description
    elPhaseTitle.textContent = phaseNames[state.currentPhase];
    const descEl = elPhaseTitle.nextElementSibling;
    if (descEl) {
      descEl.textContent = phaseDescriptions[state.currentPhase];
    }
    
    // Update Daily Mission Badge
    const activeUnclaimed = (state.dailyMissions || []).filter(m => !m.claimed).length;
    const missionBadge = document.getElementById('mission-badge-count');
    if (missionBadge) {
      missionBadge.textContent = activeUnclaimed;
      if (activeUnclaimed === 0) {
        missionBadge.style.display = 'none';
      } else {
        missionBadge.style.display = 'inline-block';
      }
    }

    renderCanvas(state);
  });

  const TACTIC_ORDER = [
    'TA0043', 'TA0042', 'TA0001', 'TA0002', 'TA0003', 'TA0004', 'TA0005',
    'TA0006', 'TA0007', 'TA0008', 'TA0009', 'TA0011', 'TA0010', 'TA0040'
  ];

  let draggedCard = null;
  let phase1Mistakes = 0;

  function handleDragStart(e) {
    draggedCard = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.tacticId);
    setTimeout(() => this.classList.add('dragging'), 0);
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedCard = null;
  }

  function handleDrop(e) {
    e.preventDefault();
    const slot = this;
    const tacticId = e.dataTransfer.getData('text/plain');
    
    if (slot.dataset.tacticId === tacticId) {
      // Correct drop
      const placeholder = slot.querySelector('.slot-placeholder');
      if (placeholder) {
        placeholder.remove();
      }
      slot.appendChild(draggedCard);
      draggedCard.draggable = false;
      draggedCard.classList.remove('dragging');
      draggedCard.classList.add('locked');
      slot.classList.add('pop-animation');
      
      // Update state
      game.addScore(500);
      
      // Check for completion
      const remaining = document.querySelectorAll('#cards-pool .tactic-card').length;
      if (remaining === 0) {
        if (phase1Mistakes === 0) {
          setTimeout(() => window.showToast('Perfect Organizer 🏆', 'All tactics placed without a single mistake!'), 500);
        }
        setTimeout(() => game.advancePhase(), 2000);
      }
    } else {
      // Wrong drop
      phase1Mistakes++;
      if (draggedCard) {
        draggedCard.classList.add('bounce-back');
        setTimeout(() => draggedCard.classList.remove('bounce-back'), 500);
      }
      game.modifyClarity(-5);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function renderPhase1(container) {
    container.innerHTML = `
      <div class="phase1-container">
        <div class="slots-container" id="slots-container"></div>
        <div class="cards-pool" id="cards-pool"></div>
      </div>
    `;
    
    const slotsContainer = document.getElementById('slots-container');
    const cardsPool = document.getElementById('cards-pool');
    
    // Check if we need to show full initial layout or if it's partly solved
    // Since we're doing a simple version, we reset if it renders (unless we store slots in state)
    // For now we'll just render empty slots and all cards. In a real app we'd persist what's locked.
    TACTIC_ORDER.forEach((id, index) => {
      const slot = document.createElement('div');
      slot.className = 'tactic-slot glass-panel';
      slot.dataset.tacticId = id;
      slot.innerHTML = `<span class="slot-number">${index + 1}</span><span class="slot-placeholder">Drop here</span>`;
      
      slot.addEventListener('dragover', handleDragOver);
      slot.addEventListener('drop', handleDrop);
      
      slotsContainer.appendChild(slot);
    });
    
    // Create random cards
    let tactics = [...MITRE_DB.tactics];
    tactics.sort(() => Math.random() - 0.5);
    
    tactics.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tactic-card';
      card.draggable = true;
      card.dataset.tacticId = t.id;
      card.textContent = t.name;
      
      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragend', handleDragEnd);
      
      cardsPool.appendChild(card);
    });
  }

  function renderPhase2(container) {
    container.innerHTML = `
      <div class="phase2-container relative">
        <div class="report-card glass-panel" id="report-card">
          <h3 class="report-title">Intelligence Report #402</h3>
          <p>The incident began on a Tuesday morning. <span class="secret-text" data-tactic="T1566">The attacker sent a well-crafted email containing a malicious PDF attachment to the HR department.</span> Several employees opened the document, triggering the initial compromise.</p>
          <p>Once inside, the malware began moving laterally. <span class="secret-text" data-tactic="T1003">Upon execution, the payload used Mimikatz to extract passwords directly from system memory.</span> With these elevated privileges, they secured their foothold. <span class="secret-text" data-tactic="T1053">To maintain access, the adversary configured a hidden cron job to run their backdoor script every midnight.</span></p>
          <p>The final stage of the attack was devastating. <span class="secret-text" data-tactic="T1560">Sensitive documents were packed into an encrypted zip archive</span> and exfiltrated over the network. <span class="secret-text" data-tactic="T1486">Finally, the malware encrypted all files on the targeted servers, leaving a ransom note behind.</span></p>
        </div>
        
        <div id="extraction-tooltip" class="glass-panel tooltip hidden">
          <h4>Identify Technique</h4>
          <select id="technique-select" class="tech-select">
            <option value="">Select Technique...</option>
          </select>
          <div class="tooltip-actions">
            <button id="btn-verify-tech" class="action-button">Verify</button>
            <button id="btn-cancel-tech" class="action-button outline">Cancel</button>
          </div>
        </div>
      </div>
    `;

    const reportCard = document.getElementById('report-card');
    const tooltip = document.getElementById('extraction-tooltip');
    const select = document.getElementById('technique-select');
    const btnVerify = document.getElementById('btn-verify-tech');
    const btnCancel = document.getElementById('btn-cancel-tech');
    
    let currentTargetSpan = null;
    let solvedCount = 0;
    let phase2Mistakes = 0;

    // Populate select
    MITRE_DB.techniques.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = `${t.id} - ${t.name}`;
      select.appendChild(opt);
    });

    reportCard.addEventListener('mouseup', (e) => {
      if (!tooltip.classList.contains('hidden')) return; // already showing
      
      setTimeout(() => { // slight delay to allow selection to complete
        const sel = window.getSelection();
        const text = sel.toString().trim();
        if (text.length > 10) {
          const spans = reportCard.querySelectorAll('.secret-text:not(.solved)');
          let matchedSpan = null;
          for (const s of spans) {
            const spanText = s.textContent.replace(/\s+/g, ' ').trim();
            const selText = text.replace(/\s+/g, ' ').trim();
            if (
              (sel.anchorNode && s.contains(sel.anchorNode)) || 
              (sel.focusNode && s.contains(sel.focusNode)) || 
              (sel.containsNode && sel.containsNode(s, true)) ||
              spanText.includes(selText) || 
              selText.includes(spanText.substring(0, 10))
            ) {
              matchedSpan = s;
              break;
            }
          }

          if (matchedSpan) {
            currentTargetSpan = matchedSpan;
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // position tooltip relative to container
            const containerRect = container.getBoundingClientRect();
            let topPos = rect.bottom - containerRect.top + 10;
            let leftPos = rect.left - containerRect.left;
            
            // basic boundary checks
            if (leftPos + 320 > containerRect.width) {
               leftPos = containerRect.width - 330;
            }
            
            tooltip.style.top = `${Math.max(0, topPos)}px`;
            tooltip.style.left = `${Math.max(0, leftPos)}px`;
            tooltip.classList.remove('hidden');
            matchedSpan.classList.add('selecting');
          }
        }
      }, 10);
    });

    btnCancel.addEventListener('click', () => {
      tooltip.classList.add('hidden');
      if (currentTargetSpan) currentTargetSpan.classList.remove('selecting');
      currentTargetSpan = null;
      window.getSelection().removeAllRanges();
    });

    btnVerify.addEventListener('click', () => {
      if (!currentTargetSpan) return;
      
      const selectedId = select.value;
      if (selectedId === currentTargetSpan.dataset.tactic) {
        // Correct!
        currentTargetSpan.classList.remove('selecting');
        currentTargetSpan.classList.add('solved');
        tooltip.classList.add('hidden');
        window.getSelection().removeAllRanges();
        select.value = ''; // Reset selection
        
        game.addScore(1000);
        solvedCount++;
        
        if (solvedCount === 5) {
          if (phase2Mistakes === 0) {
            setTimeout(() => window.showToast('Speed Reader ⚡', 'Extracted all intel without a single error!'), 500);
          }
          setTimeout(() => game.advancePhase(), 2000);
        }
      } else {
        // Wrong
        phase2Mistakes++;
        game.modifyClarity(-10);
        tooltip.classList.add('bounce-back');
        setTimeout(() => tooltip.classList.remove('bounce-back'), 500);
      }
    });
  }

  function drawLine(el1, el2, svg) {
    const updateLine = () => {
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      
      const x1 = rect1.left + rect1.width / 2 - svgRect.left;
      const y1 = rect1.top + rect1.height / 2 - svgRect.top;
      const x2 = rect2.left + rect2.width / 2 - svgRect.left;
      const y2 = rect2.top + rect2.height / 2 - svgRect.top;
      
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
    };

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', 'var(--color-accent)');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    
    // Animation
    line.style.strokeDasharray = '1000';
    line.style.strokeDashoffset = '1000';
    line.style.animation = 'drawLineAnim 2s ease-out forwards';
    
    svg.appendChild(line);
    updateLine();
    
    window.addEventListener('resize', updateLine);
  }

  function renderPhase3(container) {
    container.innerHTML = `
      <div class="phase3-container relative">
        <div class="canvas-header w-full text-left mb-4">
          <h3 class="text-xl font-bold text-slate-800">Map the APT29 Campaign</h3>
          <p class="text-slate-500 text-sm">Connect the techniques in the correct chronological order of the attack lifecycle.</p>
        </div>
        <div class="node-canvas relative w-full flex-1" id="node-canvas">
          <svg id="connection-lines" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;"></svg>
        </div>
      </div>
    `;

    const canvas = document.getElementById('node-canvas');
    const svg = document.getElementById('connection-lines');
    
    // APT29 specific sequence
    const sequenceIds = ['T1566', 'T1059', 'T1053', 'T1003', 'T1082', 'T1041'];
    const nodesData = sequenceIds.map(id => MITRE_DB.helpers.getTechniqueById(id));
    
    // Randomize display order
    let displayNodes = [...nodesData];
    displayNodes.sort(() => Math.random() - 0.5);

    const positions = [
      { top: '25%', left: '20%' },
      { top: '20%', left: '50%' },
      { top: '25%', left: '80%' },
      { top: '75%', left: '20%' },
      { top: '80%', left: '50%' },
      { top: '75%', left: '80%' },
    ];
    
    positions.sort(() => Math.random() - 0.5);

    let currentIndex = 0;
    let lastNodeEl = null;
    let phase3Mistakes = 0;

    displayNodes.forEach((tech, idx) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'canvas-node glass-panel';
      nodeEl.dataset.techId = tech.id;
      nodeEl.style.top = positions[idx].top;
      nodeEl.style.left = positions[idx].left;
      
      const icon = tech.id === 'T1566' ? '📧' : 
                   tech.id === 'T1059' ? '💻' : 
                   tech.id === 'T1053' ? '⏰' : 
                   tech.id === 'T1003' ? '🔑' : 
                   tech.id === 'T1082' ? '🔍' : '📤';

      nodeEl.innerHTML = `
        <div class="node-icon">${icon}</div>
        <div class="text-xs font-bold text-slate-700 mt-2 leading-tight">${tech.name}</div>
        <div class="text-[9px] text-slate-400 mt-1">${tech.id}</div>
        <div class="canvas-node-tooltip">${tech.description}</div>
      `;
      
      nodeEl.addEventListener('click', () => {
        if (tech.id === sequenceIds[currentIndex]) {
          nodeEl.classList.add('active');
          game.addScore(300);
          
          if (lastNodeEl) {
            drawLine(lastNodeEl, nodeEl, svg);
          }
          
          lastNodeEl = nodeEl;
          currentIndex++;
          
          if (currentIndex === sequenceIds.length) {
            if (phase3Mistakes === 0) {
              setTimeout(() => window.showToast('Master Tracker 🕵️‍♂️', 'Mapped the campaign perfectly!'), 500);
            }
            setTimeout(() => game.advancePhase(), 2500);
          }
        } else if (!nodeEl.classList.contains('active')) {
          phase3Mistakes++;
          game.modifyClarity(-10);
          nodeEl.classList.add('bounce-back');
          setTimeout(() => nodeEl.classList.remove('bounce-back'), 500);
        }
      });
      
      canvas.appendChild(nodeEl);
    });
  }

  function renderPhase4(container) {
    container.innerHTML = `
      <div class="phase4-container">
        <div class="threats-column" id="threats-column">
          <h4 class="text-slate-700 font-bold mb-4 text-center">Threat Landscape (Techniques)</h4>
        </div>
        <div class="mitigations-column" id="mitigations-column">
          <h4 class="text-slate-700 font-bold mb-4 text-center">Defensive Arsenal (Mitigations)</h4>
        </div>
      </div>
    `;

    const threatsCol = document.getElementById('threats-column');
    const mitigationsCol = document.getElementById('mitigations-column');
    
    const mappings = {
      'T1566': 'M1017',
      'T1078': 'M1032',
      'T1110': 'M1036',
      'T1003': 'M1026',
      'T1203': 'M1050',
      'T1021': 'M1030',
      'T1048': 'M1028',
      'T1027': 'M1040'
    };
    
    let solvedCount = 0;
    let phase4Mistakes = 0;
    const threatIds = Object.keys(mappings);

    // Render Threats
    threatIds.forEach(id => {
      const tech = MITRE_DB.helpers.getTechniqueById(id);
      const card = document.createElement('div');
      card.className = 'threat-card glass-panel';
      card.dataset.techId = id;
      card.dataset.requiredMitigation = mappings[id];
      card.innerHTML = `
        <div class="threat-icon">⚠️</div>
        <div class="threat-info">
          <div class="threat-name">${tech.name}</div>
          <div class="threat-id">${tech.id}</div>
        </div>
      `;
      
      card.addEventListener('dragover', (e) => e.preventDefault());
      card.addEventListener('drop', function(e) {
        e.preventDefault();
        const draggedMitId = e.dataTransfer.getData('text/plain');
        if (this.dataset.requiredMitigation === draggedMitId) {
          // Correct
          this.classList.add('neutralized');
          this.innerHTML = `
            <div class="threat-icon">🛡️</div>
            <div class="threat-info">
              <div class="threat-name">${tech.name} Secured</div>
              <div class="threat-id">${draggedMitId} Applied</div>
            </div>
          `;
          
          const draggedEl = document.querySelector(`.mitigation-card[data-mit-id="${draggedMitId}"]`);
          if (draggedEl) draggedEl.remove();
          
          game.addScore(400);
          solvedCount++;
          if (solvedCount === threatIds.length) {
            if (phase4Mistakes === 0) {
              setTimeout(() => window.showToast('Defensive Architect 🛡️', 'Perfect Mitigation deployment!'), 500);
            }
            setTimeout(() => game.advancePhase(), 2000);
          }
        } else {
          // Wrong
          phase4Mistakes++;
          game.modifyClarity(-10);
          this.classList.add('bounce-back');
          setTimeout(() => this.classList.remove('bounce-back'), 500);
        }
      });
      
      threatsCol.appendChild(card);
    });

    // Render Mitigations
    let shuffledMitigations = [...MITRE_DB.mitigations];
    shuffledMitigations.sort(() => Math.random() - 0.5);

    const mitigationsPool = document.createElement('div');
    mitigationsPool.className = 'mitigations-pool';

    shuffledMitigations.forEach(mit => {
      const card = document.createElement('div');
      card.className = 'mitigation-card';
      card.dataset.mitId = mit.id;
      card.draggable = true;
      card.innerHTML = `
        <div class="mit-name">${mit.name}</div>
        <div class="mit-id">${mit.id}</div>
      `;
      
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', mit.id);
        setTimeout(() => card.classList.add('dragging'), 0);
      });
      
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });
      
      mitigationsPool.appendChild(card);
    });
    
    mitigationsCol.appendChild(mitigationsPool);
  }

  function renderPhase5(container) {
    const SCENARIO_TREE = {
      start: {
        text: "An alert fires at 03:00 AM for suspicious PowerShell activity on the public-facing web server. The command string appears heavily obfuscated. The simulated APT group 'Cosmic Fox' is suspected.",
        options: [
          { text: "Ignore it, likely a false positive from an admin.", next: "fail_ignore", clarity: -20, score: 0 },
          { text: "Isolate the server immediately from the network.", next: "fail_isolate", clarity: -10, score: 0 },
          { text: "Analyze and decode the obfuscated payload.", next: "step_2", clarity: 10, score: 200 }
        ]
      },
      fail_ignore: {
        text: "You ignored the alert. The attacker successfully escalated privileges and deployed ransomware. Mission Failed.",
        options: [ { text: "Restart Scenario", next: "start", clarity: 0, score: 0 } ]
      },
      fail_isolate: {
        text: "You isolated the server without investigation, causing an unacceptable business outage. The C-suite is furious. Mission Failed.",
        options: [ { text: "Restart Scenario", next: "start", clarity: 0, score: 0 } ]
      },
      step_2: {
        text: "You decode the payload. It attempts to bypass the Execution Policy and run a script from memory. Which MITRE technique does this represent?",
        options: [
          { text: "T1059 - Command and Scripting Interpreter", next: "step_3", clarity: 10, score: 300 },
          { text: "T1053 - Scheduled Task/Job", next: "fail_wrong", clarity: -10, score: 0 },
          { text: "T1203 - Exploitation for Client Execution", next: "fail_wrong", clarity: -10, score: 0 }
        ]
      },
      fail_wrong: {
        text: "Incorrect technique identification led the response team down the wrong path. The attacker slipped away and completed their mission. Mission Failed.",
        options: [ { text: "Restart Scenario", next: "start", clarity: 0, score: 0 } ]
      },
      step_3: {
        text: "Correct (T1059). The script downloads a secondary payload that targets 'lsass.exe'. What is the primary objective of targeting this process?",
        options: [
          { text: "Defense Evasion via Process Injection", next: "fail_wrong", clarity: -10, score: 0 },
          { text: "Credential Access via OS Credential Dumping (T1003)", next: "step_4", clarity: 10, score: 300 },
          { text: "Execution via API calls", next: "fail_wrong", clarity: -10, score: 0 }
        ]
      },
      step_4: {
        text: "They want credentials! You monitor the network. Suddenly, you observe SMB traffic to the Database Server using the service account credentials obtained from the web server.",
        options: [
          { text: "Brute Force (T1110) against the DB", next: "fail_wrong", clarity: -10, score: 0 },
          { text: "Lateral Movement using Remote Services (T1021) and Valid Accounts (T1078)", next: "step_5", clarity: 10, score: 400 }
        ]
      },
      step_5: {
        text: "Yes, they moved laterally. On the DB server, they execute queries to extract the 'customers' table and compress the output into a password-protected zip file.",
        options: [
          { text: "Archive Collected Data (T1560) for Collection", next: "step_6", clarity: 10, score: 400 },
          { text: "Data Destruction (T1485)", next: "fail_wrong", clarity: -10, score: 0 }
        ]
      },
      step_6: {
        text: "The data is staged. The attacker then initiates a connection to a seemingly benign external domain (e.g., a CDN or social media site) over HTTPS to communicate.",
        options: [
          { text: "Exfiltration Over Web Service (T1567)", next: "fail_wrong", clarity: -10, score: 0 },
          { text: "Command and Control via Application Layer Protocol (T1071)", next: "step_7", clarity: 10, score: 500 }
        ]
      },
      step_7: {
        text: "It's C2 (T1071). They intend to pull the staged zip file over this established C2 channel to bypass DLP network appliances.",
        options: [
          { text: "Exfiltration Over Alternative Protocol (T1048)", next: "fail_wrong", clarity: -10, score: 0 },
          { text: "Exfiltration Over C2 Channel (T1041)", next: "step_8", clarity: 10, score: 500 }
        ]
      },
      step_8: {
        text: "Correct! You successfully block the C2 domain, isolate the DB server, and change the compromised credentials. The attack is thwarted. Based on this modus operandi, which APT profile does 'Cosmic Fox' resemble most?",
        options: [
          { text: "Lazarus Group", next: "fail_wrong", clarity: -10, score: 0 },
          { text: "APT29", next: "step_win", clarity: 20, score: 1000 }
        ]
      },
      step_win: {
        text: "Excellent! You successfully mapped the campaign and neutralized the threat. You are a true ATT&CK Navigator! Simulation Complete.",
        options: []
      }
    };

    let currentNode = 'start';

    container.innerHTML = `
      <div class="phase5-container">
        <div class="scenario-layout">
          <div class="scenario-card">
            <h3 class="text-2xl font-bold text-slate-800 border-b pb-4 mb-4 border-slate-200">Tabletop Exercise: Cosmic Fox</h3>
            <div id="scenario-text" class="scenario-text mb-6"></div>
            <div id="scenario-options" class="scenario-options mt-auto"></div>
          </div>
          <div class="scenario-history-sidebar glass-panel">
            <h4 class="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Decision History</h4>
            <div id="scenario-history" class="scenario-history-list">
            </div>
          </div>
        </div>
      </div>
    `;

    const textEl = document.getElementById('scenario-text');
    const optionsEl = document.getElementById('scenario-options');
    const historyEl = document.getElementById('scenario-history');

    function renderNode(nodeId) {
      const node = SCENARIO_TREE[nodeId];
      textEl.innerHTML = `<p>${node.text}</p>`;
      
      if (nodeId === 'step_win') {
        window.fireConfetti();
        window.showToast('Incident Responder 🌟', 'Simulation successfully neutralized!');
      }

      optionsEl.innerHTML = '';
      if (node.options && node.options.length > 0) {
        node.options.forEach(opt => {
          const btn = document.createElement('button');
          btn.className = 'scenario-option-btn';
          btn.textContent = opt.text;
          btn.addEventListener('click', () => {
            if (opt.clarity) game.modifyClarity(opt.clarity);
            if (opt.score) game.addScore(opt.score);
            
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item bg-white/60 border border-slate-200 p-3 rounded-lg text-sm shadow-sm';
            historyItem.innerHTML = `
              <div class="text-slate-500 text-xs mb-1 font-bold uppercase tracking-wide">Decision Made</div>
              <div class="text-slate-800 font-medium">${opt.text}</div>
            `;
            historyEl.appendChild(historyItem);
            historyEl.scrollTop = historyEl.scrollHeight;

            textEl.classList.add('pop-animation');
            setTimeout(() => textEl.classList.remove('pop-animation'), 400);
            
            renderNode(opt.next);
          });
          optionsEl.appendChild(btn);
        });

        // Add Request Hint button if not a failure state
        if (!nodeId.startsWith('fail')) {
          const hintContainer = document.createElement('div');
          hintContainer.className = 'mt-4 flex justify-end';
          
          const hintBtn = document.createElement('button');
          hintBtn.className = 'action-button outline text-sm px-4 py-2 flex items-center gap-2';
          hintBtn.innerHTML = '<span>💡 Request Hint</span><span class="text-xs font-bold opacity-80">(-5 Clarity)</span>';
          
          hintBtn.addEventListener('click', () => {
            if (game.state.clarity < 5) {
              window.showToast('Low Clarity', 'Not enough clarity to use a hint!');
              return;
            }
            
            game.modifyClarity(-5);
            
            // Find correct option
            const correctOpt = node.options.find(o => !o.next.startsWith('fail'));
            if (correctOpt) {
              const btns = Array.from(optionsEl.querySelectorAll('.scenario-option-btn'));
              const correctBtn = btns.find(b => b.textContent === correctOpt.text);
              if (correctBtn) {
                correctBtn.style.backgroundColor = '#dbeafe'; // blue-100
                correctBtn.style.borderColor = '#3b82f6'; // blue-500
                correctBtn.style.color = '#1e3a8a'; // blue-900
                
                // Add a small tag
                const hintTag = document.createElement('span');
                hintTag.className = 'ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full uppercase tracking-wide';
                hintTag.textContent = 'Suggested';
                correctBtn.appendChild(hintTag);
                
                hintBtn.disabled = true;
                hintBtn.style.opacity = '0.5';
                hintBtn.style.cursor = 'not-allowed';
                hintBtn.innerHTML = '<span>💡 Hint Applied</span>';
              }
            }
          });
          hintContainer.appendChild(hintBtn);
          optionsEl.appendChild(hintContainer);
        }
      } else {
        const btn = document.createElement('button');
        btn.className = 'action-button mt-4 self-start';
        btn.textContent = 'View Certificate';
        btn.addEventListener('click', () => {
          game.advancePhase();
        });
        optionsEl.appendChild(btn);
      }
    }

    renderNode(currentNode);
  }

  function renderPhase6(container) {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Calculate final grade
    let grade = 'A+';
    if (game.state.clarity < 80 || game.state.score < 5000) grade = 'A';
    if (game.state.clarity < 50 || game.state.score < 3000) grade = 'B';
    if (game.state.clarity < 20 || game.state.score < 1000) grade = 'C';

    if (!game.state.leaderboardSaved) {
      game.saveToLeaderboard(grade);
      game.state.leaderboardSaved = true;
      game.saveGame();
    }

    container.innerHTML = `
      <div class="certificate-container">
        <div class="certificate-card" id="printable-cert">
          <div class="cert-header">
            <div class="cert-seal">🎖️</div>
            <h2>MITRE ATT&CK Certified Navigator</h2>
          </div>
          <div class="cert-body">
            <p>This certifies that the player has successfully completed the <strong>Aura</strong> cyber simulation, demonstrating advanced capability in threat hunting and incident response.</p>
            <div class="cert-stats">
              <div class="stat-box">
                <div class="stat-label">Final Score</div>
                <div class="stat-value">${game.state.score.toLocaleString()}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Clarity Level</div>
                <div class="stat-value">${game.state.clarity}%</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Final Grade</div>
                <div class="stat-value">${grade}</div>
              </div>
            </div>
            <div class="cert-details">
              <p>✔️ Successfully neutralized threats across the full ATT&CK Lifecycle</p>
              <p>✔️ Techniques Mitigated: 8/8</p>
              <p>✔️ Campaigns Analyzed: APT29, Cosmic Fox</p>
            </div>
          </div>
          <div class="cert-footer">
            <div class="date-issued">Date: ${today}</div>
            <div class="watermark">Verified by GRCHub.eu</div>
          </div>
        </div>
        <div class="cert-actions no-print">
          <button id="btn-print" class="action-button">Print Certificate</button>
          <button id="btn-restart" class="action-button outline">Restart Game</button>
        </div>
      </div>
    `;

    document.getElementById('btn-print').addEventListener('click', () => {
      window.print();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      game.clearSave();
      window.location.reload();
    });
  }

  function openBoosterPackModal(count = 3) {
    const modal = document.getElementById('booster-modal');
    const stage = document.getElementById('booster-stage');
    if (!modal || !stage) return;

    const allIds = [
      ...MITRE_DB.tactics.map(t => t.id),
      ...MITRE_DB.techniques.map(t => t.id)
    ];

    const locked = allIds.filter(id => !game.state.unlockedCards.includes(id));
    const pool = locked.length >= count ? locked : allIds;

    const selected = [];
    const tempPool = [...pool];
    for (let i = 0; i < count; i++) {
      if (tempPool.length === 0) break;
      const randIndex = Math.floor(Math.random() * tempPool.length);
      selected.push(tempPool[randIndex]);
      tempPool.splice(randIndex, 1);
    }

    stage.innerHTML = `
      <div class="booster-wrapper" id="booster-wrapper">
        <div class="booster-foil" id="booster-foil">
          <div class="booster-logo">✨ AURA ✨</div>
          <div class="booster-sub">COMIC TRADING CARDS</div>
          <div class="booster-burst-text">BOOM!</div>
          <p style="font-family: var(--font-heading); font-size: 1.2rem; color: #FFF; text-shadow: 1.5px 1.5px 0px #000; text-align: center;">
            ${count === 1 ? '1 MITRE ATT&CK CARD' : '3 MITRE ATT&CK CARDS'}
          </p>
          <button id="btn-rip-booster" class="action-button" style="background: #FFEA00; color: #FF0055; font-size: 1.3rem;">💥 RIP OPEN BOOSTER! 💥</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');

    document.getElementById('btn-rip-booster')?.addEventListener('click', () => {
      window.fireConfetti();
      window.showToast('KABOOM! 🃏', `Booster pack ripped open! Unlocked ${selected.length} new comic cards!`);

      selected.forEach(id => game.unlockCard(id));

      const wrapper = document.getElementById('booster-wrapper');
      wrapper.innerHTML = `
        <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--comic-pink); text-shadow: 2px 2px 0px #000; text-align: center; margin-bottom: 1rem;">
          ⚡ NEW CARDS UNLOCKED! ⚡
        </h3>
        <div class="booster-cards-revealed" id="revealed-cards-grid"></div>
        <button id="btn-close-booster" class="action-button mt-4" style="font-size: 1.2rem; align-self: center;">✨ ADD TO BINDER ✨</button>
      `;

      const grid = document.getElementById('revealed-cards-grid');
      selected.forEach(id => {
        const cardData = getComicCardData(id);
        if (!cardData) return;
        const svg = generateComicSVG(cardData);
        const xp = game.state.cardMastery?.[id] || 0;
        const mastery = getMasteryRank(xp);

        const cardEl = document.createElement('div');
        cardEl.className = 'comic-card-wrapper';
        cardEl.innerHTML = `
          <div class="comic-card">
            <div class="comic-card-front rarity-${cardData.rarity} ${mastery.borderStyle}">
              <div class="card-header-bar">
                <span class="card-rarity-badge rarity-${cardData.rarity}">${cardData.rarity}</span>
                <span class="mastery-rank-tag ${mastery.badgeClass}">${mastery.icon} ${mastery.title}</span>
                <span class="card-code">${cardData.code}</span>
              </div>
              <h4 class="card-title">${cardData.name}</h4>
              <div class="comic-card-art">
                ${svg}
                <div class="comic-card-action-burst">${cardData.burstWord}</div>
              </div>
              <div class="card-stats-row">
                <div class="card-stat-item">ATK: <span>${cardData.atk}</span></div>
                <div class="card-stat-item">DEF: <span>${cardData.def}</span></div>
              </div>
              <p class="card-lore-text">"${cardData.lore}"</p>
              <div class="card-flip-hint">Click to flip 🔄</div>
            </div>
            <div class="comic-card-back ${mastery.borderStyle}">
              <h4 class="card-back-title">${cardData.code} Details</h4>
              <p class="card-back-desc">${cardData.desc}</p>
              <div style="margin-top: 0.2rem;">
                <div style="font-size: 0.75rem; font-weight: 800; display: flex; justify-content: space-between; align-items: center;">
                  <span>Mastery: <span class="mastery-rank-tag ${mastery.badgeClass}">${mastery.icon} ${mastery.title}</span></span>
                  <span>${xp} XP</span>
                </div>
                <div class="mastery-progress-wrapper">
                  <div class="mastery-progress-fill" style="width: ${Math.min(100, Math.floor((xp / mastery.maxXP) * 100))}%;"></div>
                  <div class="mastery-progress-text">${xp} / ${mastery.maxXP} XP</div>
                </div>
              </div>
              <div class="card-back-footer">
                <span>Rarity: ${cardData.rarity.toUpperCase()}</span>
                <span>Click to flip 🔄</span>
              </div>
            </div>
          </div>
        `;

        const innerCard = cardEl.querySelector('.comic-card');
        innerCard.addEventListener('click', () => {
          innerCard.classList.toggle('flipped');
        });

        grid.appendChild(cardEl);
      });

      document.getElementById('btn-close-booster')?.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    });
  }

  let activeFilter = 'all';
  let searchQuery = '';

  function renderCardDeck(container) {
    container.innerHTML = `
      <div class="deck-container">
        <div class="deck-controls-bar">
          <div class="deck-filters">
            <button class="filter-tab ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All (46)</button>
            <button class="filter-tab ${activeFilter === 'tactics' ? 'active' : ''}" data-filter="tactics">🛡️ Tactics (14)</button>
            <button class="filter-tab ${activeFilter === 'techniques' ? 'active' : ''}" data-filter="techniques">⚡ Techniques (32)</button>
            <button class="filter-tab ${activeFilter === 'collected' ? 'active' : ''}" data-filter="collected">🌟 Collected</button>
            <button class="filter-tab ${activeFilter === 'locked' ? 'active' : ''}" data-filter="locked">🔒 Locked</button>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <input type="text" id="deck-search" class="deck-search-input" placeholder="🔍 Search card or ID..." value="${searchQuery}" />
            <button id="btn-draw-booster" class="action-button" style="background: var(--comic-pink); padding: 0.4rem 0.8rem; font-size: 1rem;">⚡ Draw Booster (100 pts)</button>
            <button id="btn-draw-single" class="action-button outline" style="padding: 0.4rem 0.8rem; font-size: 1rem;">🎲 Free Draw</button>
          </div>
        </div>

        <div class="deck-binder-grid" id="deck-binder-grid"></div>
      </div>
    `;

    const binderGrid = document.getElementById('deck-binder-grid');
    const allIds = [
      ...MITRE_DB.tactics.map(t => t.id),
      ...MITRE_DB.techniques.map(t => t.id)
    ];

    const filteredIds = allIds.filter(id => {
      const cardData = getComicCardData(id);
      if (!cardData) return false;

      const isUnlocked = game.state.unlockedCards.includes(id);

      if (activeFilter === 'tactics' && cardData.type !== 'tactic') return false;
      if (activeFilter === 'techniques' && cardData.type !== 'technique') return false;
      if (activeFilter === 'collected' && !isUnlocked) return false;
      if (activeFilter === 'locked' && isUnlocked) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameMatch = cardData.name.toLowerCase().includes(q);
        const codeMatch = cardData.code.toLowerCase().includes(q);
        if (!nameMatch && !codeMatch) return false;
      }

      return true;
    });

    if (filteredIds.length === 0) {
      binderGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(255,255,255,0.7); border: 3px solid #000; border-radius: 12px; margin-top: 1rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--comic-pink);">No Comic Cards Found</h3>
          <p style="font-weight: 700;">Try clearing your search query or switching your collection filter.</p>
        </div>
      `;
    } else {
      filteredIds.forEach(id => {
        const cardData = getComicCardData(id);
        if (!cardData) return;

        const isUnlocked = game.state.unlockedCards.includes(id);
        const svg = generateComicSVG(cardData);
        const xp = game.state.cardMastery?.[id] || 0;
        const mastery = getMasteryRank(xp);

        const cardEl = document.createElement('div');
        cardEl.className = 'comic-card-wrapper';

        if (isUnlocked) {
          cardEl.innerHTML = `
            <div class="comic-card">
              <div class="comic-card-front rarity-${cardData.rarity} ${mastery.borderStyle}">
                <div class="card-header-bar">
                  <span class="card-rarity-badge rarity-${cardData.rarity}">${cardData.rarity}</span>
                  <span class="mastery-rank-tag ${mastery.badgeClass}">${mastery.icon} ${mastery.title}</span>
                  <span class="card-code">${cardData.code}</span>
                </div>
                <h4 class="card-title">${cardData.name}</h4>
                <div class="comic-card-art">
                  ${svg}
                  <div class="comic-card-action-burst">${cardData.burstWord}</div>
                </div>
                <div class="card-stats-row">
                  <div class="card-stat-item">ATK: <span>${cardData.atk}</span></div>
                  <div class="card-stat-item">DEF: <span>${cardData.def}</span></div>
                </div>
                <p class="card-lore-text">"${cardData.lore}"</p>
                <div class="card-flip-hint">Click to flip 🔄</div>
              </div>
              <div class="comic-card-back ${mastery.borderStyle}">
                <h4 class="card-back-title">${cardData.code} Details</h4>
                <p class="card-back-desc">${cardData.desc}</p>
                <div style="margin-top: 0.2rem;">
                  <div style="font-size: 0.72rem; font-weight: 800; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                    <span>Mastery: <span class="mastery-rank-tag ${mastery.badgeClass}">${mastery.icon} ${mastery.title}</span></span>
                    <span>${xp} XP</span>
                  </div>
                  <div class="mastery-progress-wrapper">
                    <div class="mastery-progress-fill" style="width: ${Math.min(100, Math.floor((xp / mastery.maxXP) * 100))}%;"></div>
                    <div class="mastery-progress-text">${xp} / ${mastery.maxXP} XP</div>
                  </div>
                  <button class="action-button btn-train-card mt-1" data-id="${cardData.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: var(--comic-purple); width: 100%;">
                    ⚡ Practice Tech (+50 XP)
                  </button>
                </div>
                <div class="card-back-footer">
                  <span>Rarity: ${cardData.rarity.toUpperCase()}</span>
                  <span>Click to flip 🔄</span>
                </div>
              </div>
            </div>
          `;

          const innerCard = cardEl.querySelector('.comic-card');
          innerCard.addEventListener('click', () => {
            innerCard.classList.toggle('flipped');
          });

          const trainBtn = cardEl.querySelector('.btn-train-card');
          if (trainBtn) {
            trainBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              const techId = e.currentTarget.dataset.id;
              game.addCardMasteryXP(techId, 50);
            });
          }
        } else {
          cardEl.innerHTML = `
            <div class="comic-card locked-card">
              <div class="lock-overlay-icon">
                <span style="font-size: 2.5rem;">🔒</span>
                <span>LOCKED</span>
                <span style="font-size: 0.8rem; margin-top: 0.3rem;">Draw Booster to Unlock</span>
              </div>
              <div class="comic-card-front rarity-common">
                <div class="card-header-bar">
                  <span class="card-rarity-badge rarity-common">???</span>
                  <span class="card-code">${cardData.code}</span>
                </div>
                <h4 class="card-title">Secret Card</h4>
                <div class="comic-card-art"></div>
                <div class="card-stats-row">
                  <div class="card-stat-item">ATK: <span>??</span></div>
                  <div class="card-stat-item">DEF: <span>??</span></div>
                </div>
                <p class="card-lore-text">Collect from booster packs to reveal!</p>
              </div>
            </div>
          `;
        }

        binderGrid.appendChild(cardEl);
      });
    }

    container.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        activeFilter = e.target.dataset.filter;
        renderCardDeck(container);
      });
    });

    const searchEl = document.getElementById('deck-search');
    searchEl?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCardDeck(container);
      const newSearchEl = document.getElementById('deck-search');
      if (newSearchEl) {
        newSearchEl.focus();
        newSearchEl.selectionStart = newSearchEl.selectionEnd = searchQuery.length;
      }
    });

    document.getElementById('btn-draw-booster')?.addEventListener('click', () => {
      if (game.state.score >= 100) {
        game.state.score -= 100;
        game.saveGame();
        game.notify();
      }
      openBoosterPackModal(3);
    });

    document.getElementById('btn-draw-single')?.addEventListener('click', () => {
      openBoosterPackModal(1);
    });
  }

  function renderCanvas(state) {
    const canvas = document.getElementById('game-canvas');
    const phaseTitle = document.getElementById('phase-title');
    const phaseDesc = document.getElementById('phase-description');
    
    const badge = document.getElementById('unlocked-count-badge');
    const totalCardsCount = MITRE_DB.tactics.length + MITRE_DB.techniques.length;
    if (badge) {
      badge.textContent = `${game.state.unlockedCards.length}/${totalCardsCount}`;
    }

    const btnScenario = document.getElementById('view-mode-scenario');
    const btnCards = document.getElementById('view-mode-cards');
    if (btnScenario && btnCards) {
      if (state.activeView === 'cards') {
        btnScenario.classList.remove('active-view');
        btnScenario.classList.add('outline');
        btnCards.classList.add('active-view');
        btnCards.classList.remove('outline');
      } else {
        btnScenario.classList.add('active-view');
        btnScenario.classList.remove('outline');
        btnCards.classList.remove('active-view');
        btnCards.classList.add('outline');
      }
    }

    if (state.activeView === 'cards') {
      if (phaseTitle) phaseTitle.textContent = '🃏 ATT&CK Comic Card Binder';
      if (phaseDesc) phaseDesc.textContent = 'Draw booster packs, collect all 46 Tactics & Techniques cards, and inspect their 3D comic data.';
      renderCardDeck(canvas);
      return;
    }

    if (phaseTitle) phaseTitle.textContent = phaseNames[state.currentPhase];
    if (phaseDesc) phaseDesc.textContent = phaseDescriptions[state.currentPhase];

    if (state.currentPhase === 1) {
      if (!canvas.querySelector('.phase1-container')) {
        renderPhase1(canvas);
      }
    } else if (state.currentPhase === 2) {
      if (!canvas.querySelector('.phase2-container')) {
        renderPhase2(canvas);
      }
    } else if (state.currentPhase === 3) {
      if (!canvas.querySelector('.phase3-container')) {
        renderPhase3(canvas);
      }
    } else if (state.currentPhase === 4) {
      if (!canvas.querySelector('.phase4-container')) {
        renderPhase4(canvas);
      }
    } else if (state.currentPhase === 5) {
      if (!canvas.querySelector('.phase5-container')) {
        renderPhase5(canvas);
      }
    } else if (state.currentPhase === 6) {
      if (!canvas.querySelector('.certificate-container')) {
        renderPhase6(canvas);
      }
    } else {
      canvas.innerHTML = `
        <div class="welcome-card glass-panel">
          <h3>Phase ${state.currentPhase}</h3>
          <p>This phase is under construction. Advance via dev button if needed.</p>
          <button id="dev-advance" class="action-button mt-4">Dev: Next Phase</button>
        </div>
      `;
      document.getElementById('dev-advance')?.addEventListener('click', () => game.advancePhase());
    }
  }

  const modal = document.getElementById('welcome-modal');
  const btnResume = document.getElementById('btn-resume');
  const btnNewGame = document.getElementById('btn-new-game');
  
  const leaderboardModal = document.getElementById('leaderboard-modal');
  const btnLeaderboard = document.getElementById('btn-leaderboard');
  const btnCloseLeaderboard = document.getElementById('btn-close-leaderboard');

  // Tutorial logic
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const tutorialTitle = document.getElementById('tutorial-title');
  const tutorialText = document.getElementById('tutorial-text');
  const btnTutorialNext = document.getElementById('btn-tutorial-next');
  const btnTutorialSkip = document.getElementById('btn-tutorial-skip');
  
  const tutorialSteps = {
    1: [
      {
        title: "Welcome to Aura",
        text: "You are an Incident Responder navigating the MITRE ATT&CK framework. Let's look at your dashboard.",
        targetId: null
      },
      {
        title: "Track Your Progress",
        text: "Keep an eye on your Score and Clarity. Clarity drops when you make mistakes, affecting your final grade!",
        targetId: "nav-stats"
      },
      {
        title: "The Canvas",
        text: "This is your main canvas. You will solve challenges here to advance through the phases. Good luck!",
        targetId: "game-canvas"
      }
    ],
    2: [
      {
        title: "Phase 2: Extraction",
        text: "In this phase, you must analyze a CTI report and extract the specific MITRE ATT&CK techniques.",
        targetId: null
      },
      {
        title: "Identify Techniques",
        text: "Read the report and click on the highlighted sections of text to map them to the correct technique from the dropdown.",
        targetId: "report-card"
      }
    ]
  };
  
  let currentTutorialPhase = 1;
  let currentTutorialStep = 0;
  
  function showTutorialStep() {
    const steps = tutorialSteps[currentTutorialPhase] || [];
    if (currentTutorialStep >= steps.length) {
      endTutorial();
      return;
    }
    
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    
    const step = steps[currentTutorialStep];
    tutorialTitle.textContent = step.title;
    tutorialText.textContent = step.text;
    
    if (step.targetId) {
      const targetEl = document.getElementById(step.targetId);
      if (targetEl) {
        targetEl.classList.add('tutorial-highlight');
      }
    }
    
    if (currentTutorialStep === steps.length - 1) {
      btnTutorialNext.textContent = "Finish";
    } else {
      btnTutorialNext.textContent = "Next";
    }
  }
  
  function endTutorial() {
    tutorialOverlay?.classList.add('hidden');
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    localStorage.setItem(`aura_tutorial_seen_phase_${currentTutorialPhase}`, 'true');
  }
  
  btnTutorialNext?.addEventListener('click', () => {
    currentTutorialStep++;
    showTutorialStep();
  });
  
  btnTutorialSkip?.addEventListener('click', () => {
    endTutorial();
  });
  
  function startTutorialIfNeeded(phase) {
    const p = phase || game.state.currentPhase;
    if (tutorialSteps[p] && !localStorage.getItem(`aura_tutorial_seen_phase_${p}`)) {
      currentTutorialPhase = p;
      tutorialOverlay?.classList.remove('hidden');
      currentTutorialStep = 0;
      showTutorialStep();
    }
  }

  // Subscribe to phase changes to trigger tutorials
  game.subscribe((state) => {
    if (state.currentPhase === 2 && !localStorage.getItem(`aura_tutorial_seen_phase_2`)) {
       // slight delay to let render happen
       setTimeout(() => startTutorialIfNeeded(2), 500);
    }
  });

  btnResume?.addEventListener('click', () => {
    modal?.classList.add('hidden');
  });

  btnNewGame?.addEventListener('click', () => {
    game.clearSave();
    modal?.classList.add('hidden');
    startTutorialIfNeeded();
  });

  btnLeaderboard?.addEventListener('click', () => {
    const leaderboard = JSON.parse(localStorage.getItem('aura_leaderboard') || '[]');
    const container = document.getElementById('leaderboard-content');
    if (leaderboard.length === 0) {
      container.innerHTML = '<p style="text-align:center; color: var(--color-text-muted);">No entries yet. Complete a mission to join the leaderboard!</p>';
    } else {
      let html = '<table style="width: 100%; text-align: left; border-collapse: collapse;">';
      html += '<tr style="border-bottom: 1px solid var(--glass-border);"><th style="padding: 0.5rem;">Rank</th><th>Grade</th><th>Score</th><th>Time</th><th>Date</th></tr>';
      leaderboard.forEach((entry, idx) => {
        let badge = '';
        if (idx === 0) badge = '🏆';
        else if (idx === 1) badge = '🥈';
        else if (idx === 2) badge = '🥉';
        html += `<tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
          <td style="padding: 0.5rem; font-weight: bold;">${idx + 1} ${badge}</td>
          <td style="font-weight: 600; color: var(--color-primary);">${entry.grade}</td>
          <td style="font-family: var(--font-mono);">${entry.score.toLocaleString()}</td>
          <td style="font-family: var(--font-mono);">${entry.time}</td>
          <td style="font-size: 0.85rem; color: var(--color-text-muted);">${entry.date}</td>
        </tr>`;
      });
      html += '</table>';
      container.innerHTML = html;
    }
    leaderboardModal?.classList.remove('hidden');
  });

  btnCloseLeaderboard?.addEventListener('click', () => {
    leaderboardModal?.classList.add('hidden');
  });

  // Daily Missions Modal Render
  function renderDailyMissionsModal() {
    const missionsModal = document.getElementById('missions-modal');
    const listContainer = document.getElementById('missions-list-container');
    if (!missionsModal || !listContainer) return;

    game.checkDailyMissions();
    const missions = game.state.dailyMissions || [];

    listContainer.innerHTML = '';

    missions.forEach(m => {
      const cardData = getComicCardData(m.techId);
      const cardSvg = cardData ? generateComicSVG(cardData) : '';
      const xp = game.state.cardMastery?.[m.techId] || 0;
      const mastery = getMasteryRank(xp);

      const itemEl = document.createElement('div');
      itemEl.className = `mission-item-card ${m.completed ? 'completed-card' : ''}`;

      let actionBtnHtml = '';
      if (!m.completed) {
        actionBtnHtml = `
          <button class="action-button btn-research-mission" data-id="${m.id}" data-tech="${m.techId}" style="background: var(--comic-pink); font-size: 0.95rem; padding: 0.5rem 0.9rem;">
            🔬 Research Tech (${m.techId})
          </button>
        `;
      } else if (!m.claimed) {
        actionBtnHtml = `
          <button class="action-button btn-claim-mission" data-id="${m.id}" style="background: #FFEA00; color: #FF0055; font-size: 1.05rem; padding: 0.6rem 1rem;">
            🎁 Claim ${m.rewardType}!
          </button>
        `;
      } else {
        actionBtnHtml = `
          <div style="font-family: var(--font-heading); font-size: 0.95rem; color: #2E7D32; background: #C8E6C9; padding: 0.4rem 0.8rem; border: 2px solid #2E7D32; border-radius: 6px;">
            ✅ CLAIMED
          </div>
        `;
      }

      itemEl.innerHTML = `
        <div style="width: 75px; height: 75px; flex-shrink: 0; background: #FFFFFF; border: 2.5px solid #000; box-shadow: 2px 2px 0px #000; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
          ${cardSvg}
        </div>
        <div class="mission-info-block">
          <div class="mission-title-row">
            <span class="card-rarity-badge rarity-rare">${m.techId}</span>
            <span class="mastery-rank-tag ${mastery.badgeClass}">${mastery.icon} ${mastery.title}</span>
            <h4 class="mission-title-text">${m.title}</h4>
          </div>
          <p class="mission-desc-text">${m.description}</p>
          <div class="mission-reward-badge">
            🎁 Reward: ${m.rewardType} (+300 pts & +250 Mastery XP)
          </div>
        </div>
        <div>
          ${actionBtnHtml}
        </div>
      `;

      listContainer.appendChild(itemEl);
    });

    listContainer.querySelectorAll('.btn-research-mission').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mId = e.currentTarget.dataset.id;
        const techId = e.currentTarget.dataset.tech;
        game.completeMission(mId);
        game.toggleView('cards');
        missionsModal.classList.add('hidden');

        const searchEl = document.getElementById('deck-search');
        if (searchEl) {
          searchEl.value = techId;
          searchEl.dispatchEvent(new Event('input'));
        }
        window.showToast('🎯 Research Complete!', `Inspecting ${techId} in your ATT&CK Comic Binder!`);
        window.fireConfetti();
      });
    });

    listContainer.querySelectorAll('.btn-claim-mission').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mId = e.currentTarget.dataset.id;
        const packCount = game.claimMissionReward(mId);
        missionsModal.classList.add('hidden');

        window.showToast('🎉 Mission Reward Claimed!', `Earned ${mId} reward: +300 pts & ${packCount}x Booster Pack(s)!`);
        window.fireConfetti();

        openBoosterPackModal(packCount);
      });
    });

    missionsModal.classList.remove('hidden');
  }

  document.getElementById('btn-daily-missions')?.addEventListener('click', () => {
    renderDailyMissionsModal();
  });

  document.getElementById('btn-close-missions')?.addEventListener('click', () => {
    document.getElementById('missions-modal')?.classList.add('hidden');
  });

  // Card View Mode Toggles
  document.getElementById('btn-card-deck')?.addEventListener('click', () => {
    game.toggleView('cards');
  });

  document.getElementById('view-mode-scenario')?.addEventListener('click', () => {
    game.toggleView('scenario');
  });

  document.getElementById('view-mode-cards')?.addEventListener('click', () => {
    game.toggleView('cards');
  });

  // Initial render
  game.notify();

  // Try to load game, if success show modal
  if (game.loadGame()) {
    modal?.classList.remove('hidden');
  } else {
    startTutorialIfNeeded();
  }
});
