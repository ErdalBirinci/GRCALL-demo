(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const g of document.querySelectorAll('link[rel="modulepreload"]'))d(g);new MutationObserver(g=>{for(const T of g)if(T.type==="childList")for(const y of T.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&d(y)}).observe(document,{childList:!0,subtree:!0});function u(g){const T={};return g.integrity&&(T.integrity=g.integrity),g.referrerPolicy&&(T.referrerPolicy=g.referrerPolicy),g.crossOrigin==="use-credentials"?T.credentials="include":g.crossOrigin==="anonymous"?T.credentials="omit":T.credentials="same-origin",T}function d(g){if(g.ep)return;g.ep=!0;const T=u(g);fetch(g.href,T)}})();const k={tactics:[{id:"TA0043",name:"Reconnaissance",description:"The adversary is trying to gather information they can use to plan future operations."},{id:"TA0042",name:"Resource Development",description:"The adversary is trying to establish resources they can use to support operations."},{id:"TA0001",name:"Initial Access",description:"The adversary is trying to get into your network."},{id:"TA0002",name:"Execution",description:"The adversary is trying to run malicious code."},{id:"TA0003",name:"Persistence",description:"The adversary is trying to maintain their foothold."},{id:"TA0004",name:"Privilege Escalation",description:"The adversary is trying to gain higher-level permissions."},{id:"TA0005",name:"Defense Evasion",description:"The adversary is trying to avoid being detected."},{id:"TA0006",name:"Credential Access",description:"The adversary is trying to steal account names and passwords."},{id:"TA0007",name:"Discovery",description:"The adversary is trying to figure out your environment."},{id:"TA0008",name:"Lateral Movement",description:"The adversary is trying to move through your environment."},{id:"TA0009",name:"Collection",description:"The adversary is trying to gather data of interest to their goal."},{id:"TA0011",name:"Command and Control",description:"The adversary is trying to communicate with compromised systems to control them."},{id:"TA0010",name:"Exfiltration",description:"The adversary is trying to steal data."},{id:"TA0040",name:"Impact",description:"The adversary is trying to manipulate, interrupt, or destroy your systems and data."}],techniques:[{id:"T1595",name:"Active Scanning",tactics:["TA0043"],description:"Adversaries may execute active reconnaissance scans to gather information."},{id:"T1592",name:"Gather Victim Host Information",tactics:["TA0043"],description:"Adversaries may gather information about the victim's hosts that can be used during targeting."},{id:"T1583",name:"Acquire Infrastructure",tactics:["TA0042"],description:"Adversaries may buy, lease, or rent infrastructure that can be used during targeting."},{id:"T1584",name:"Compromise Infrastructure",tactics:["TA0042"],description:"Adversaries may compromise third-party infrastructure that can be used during targeting."},{id:"T1566",name:"Phishing",tactics:["TA0001"],description:"Adversaries may send phishing messages to gain access to victim systems."},{id:"T1078",name:"Valid Accounts",tactics:["TA0001","TA0003","TA0004","TA0005"],description:"Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion."},{id:"T1133",name:"External Remote Services",tactics:["TA0001","TA0003"],description:"Adversaries may leverage external-facing remote services to initially access and/or persist within a network."},{id:"T1059",name:"Command and Scripting Interpreter",tactics:["TA0002"],description:"Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries."},{id:"T1203",name:"Exploitation for Client Execution",tactics:["TA0002"],description:"Adversaries may exploit software vulnerabilities in client applications to execute code."},{id:"T1053",name:"Scheduled Task/Job",tactics:["TA0002","TA0003","TA0004"],description:"Adversaries may abuse task scheduling functionality to facilitate initial or recurring execution of malicious code."},{id:"T1543",name:"Create or Modify System Process",tactics:["TA0003","TA0004"],description:"Adversaries may create or modify system-level processes to repeatedly execute malicious payloads."},{id:"T1098",name:"Account Manipulation",tactics:["TA0003","TA0004"],description:"Adversaries may manipulate accounts to maintain access to victim systems."},{id:"T1548",name:"Abuse Elevation Control Mechanism",tactics:["TA0004","TA0005"],description:"Adversaries may circumvent mechanisms designed to control elevate privileges to gain higher-level permissions."},{id:"T1055",name:"Process Injection",tactics:["TA0005","TA0004"],description:"Adversaries may inject code into processes in order to evade process-based defenses as well as possibly elevate privileges."},{id:"T1070",name:"Indicator Removal on Host",tactics:["TA0005"],description:"Adversaries may delete or modify artifacts generated within systems to remove evidence of their presence or hinder defenses."},{id:"T1027",name:"Obfuscated Files or Information",tactics:["TA0005"],description:"Adversaries may attempt to make an executable or file difficult to discover or analyze by encrypting, encoding, or otherwise obfuscating its contents."},{id:"T1003",name:"OS Credential Dumping",tactics:["TA0006"],description:"Adversaries may attempt to dump credentials to obtain account login and credential material, normally in the form of a hash or a clear text password."},{id:"T1555",name:"Credentials from Password Stores",tactics:["TA0006"],description:"Adversaries may search for common password storage locations to obtain user credentials."},{id:"T1110",name:"Brute Force",tactics:["TA0006"],description:"Adversaries may use brute force techniques to attempt access to accounts when passwords are unknown or when password hashes are obtained."},{id:"T1046",name:"Network Service Discovery",tactics:["TA0007"],description:"Adversaries may attempt to get a listing of services listening on remote hosts and local network infrastructure devices, then attempt to exploit them."},{id:"T1082",name:"System Information Discovery",tactics:["TA0007"],description:"An adversary may attempt to get detailed information about the operating system and hardware."},{id:"T1057",name:"Process Discovery",tactics:["TA0007"],description:"Adversaries may attempt to get information about running processes on a system."},{id:"T1021",name:"Remote Services",tactics:["TA0008"],description:"Adversaries may use Valid Accounts to log into a service specifically designed to accept remote connections."},{id:"T1570",name:"Lateral Tool Transfer",tactics:["TA0008"],description:"Adversaries may transfer tools or other files from one system to another to further their objectives."},{id:"T1560",name:"Archive Collected Data",tactics:["TA0009"],description:"An adversary may compress and/or encrypt data that is collected prior to exfiltration."},{id:"T1119",name:"Automated Collection",tactics:["TA0009"],description:"Once established within a system or network, an adversary may use automated techniques for collecting internal data."},{id:"T1071",name:"Application Layer Protocol",tactics:["TA0011"],description:"Adversaries may communicate using OSI application layer protocols to avoid detection/network filtering by blending in with existing traffic."},{id:"T1090",name:"Proxy",tactics:["TA0011"],description:"Adversaries may use a connection proxy to direct network traffic between systems or act as an intermediary for network communications to a command and control server to avoid direct connections to their infrastructure."},{id:"T1041",name:"Exfiltration Over C2 Channel",tactics:["TA0010"],description:"Adversaries may steal data by exfiltrating it over an existing command and control channel."},{id:"T1048",name:"Exfiltration Over Alternative Protocol",tactics:["TA0010"],description:"Adversaries may steal data by exfiltrating it over a different protocol than that of the existing command and control channel."},{id:"T1485",name:"Data Destruction",tactics:["TA0040"],description:"Adversaries may destroy data and files on specific systems or in large numbers on a network to interrupt availability to systems, services, and network resources."},{id:"T1486",name:"Data Encrypted for Impact",tactics:["TA0040"],description:"Adversaries may encrypt data on target systems or on large numbers of systems in a network to interrupt availability to system and network resources."}],mitigations:[{id:"M1032",name:"Multi-factor Authentication",description:"Use multi-factor authentication for user and privileged accounts."},{id:"M1042",name:"Disable or Remove Feature or Program",description:"Disable or remove unnecessary or vulnerable software or features."},{id:"M1027",name:"Password Policies",description:"Set and enforce secure password policies for accounts."},{id:"M1026",name:"Privileged Account Management",description:"Manage the creation, modification, use, and permissions associated to privileged accounts, including SYSTEM and root."},{id:"M1050",name:"Exploit Protection",description:"Use capabilities to detect and block conditions that may lead to or be indicative of a software exploit occurring."},{id:"M1036",name:"Account Use Policies",description:"Configure features related to account use like login attempt lockouts."},{id:"M1017",name:"User Training",description:"Train users to be aware of security threats such as phishing."},{id:"M1030",name:"Network Segmentation",description:"Architect sections of the network to isolate critical systems."},{id:"M1041",name:"Encrypt Sensitive Information",description:"Protect sensitive information with encryption."},{id:"M1019",name:"Execution Prevention",description:"Block execution of malicious code on a system."},{id:"M1040",name:"Behavior Prevention on Endpoint",description:"Use tools to prevent malicious behavior on endpoints."},{id:"M1028",name:"Filter Network Traffic",description:"Use network appliances to filter ingress or egress traffic."}],aptProfiles:[{id:"APT29",name:"APT29",description:"APT29 is a threat group that has been attributed to Russia's Foreign Intelligence Service (SVR).",preferredTechniques:["T1566","T1078","T1059","T1053","T1543","T1098","T1548","T1055","T1070","T1003","T1046","T1082","T1021","T1560","T1071","T1041"]},{id:"Lazarus Group",name:"Lazarus Group",description:"Lazarus Group is a state-sponsored cyber threat group attributed to the North Korean government.",preferredTechniques:["T1566","T1078","T1059","T1203","T1053","T1055","T1070","T1027","T1003","T1110","T1082","T1057","T1021","T1570","T1560","T1119","T1071","T1090","T1041","T1485","T1486"]}],helpers:{getTechniquesByTactic:s=>k.techniques.filter(a=>a.tactics.includes(s)),getTacticById:s=>k.tactics.find(a=>a.id===s),getTechniqueById:s=>k.techniques.find(a=>a.id===s),getAptProfileById:s=>k.aptProfiles.find(a=>a.id===s)}};function D(s){let a=k.tactics.find(P=>P.id===s),u="tactic";if(a||(a=k.techniques.find(P=>P.id===s),u="technique"),!a)return null;let d="common";const g=["TA0001","T1566","TA0006","T1003","TA0010","T1486"],T=["TA0002","T1059","TA0003","T1053","TA0004","TA0005","TA0011","T1071"],y=["TA0043","TA0042","T1595","T1078","T1055","T1027","TA0008","T1021","TA0009","TA0040"];g.includes(s)?d="legendary":T.includes(s)?d="epic":y.includes(s)&&(d="rare");let E=72,x=68;d==="legendary"?(E=96,x=88):d==="epic"?(E=88,x=80):d==="rare"&&(E=80,x=74);const F={TA0043:"SCAN!",T1595:"PULSE!",T1592:"SNOOP!",TA0042:"BUILD!",T1583:"BUY!",T1584:"HIJACK!",TA0001:"INTRUDE!",T1566:"PHISH!",T1078:"LOGIN!",T1133:"PORTAL!",TA0002:"RUN!",T1059:"HACK!",T1203:"EXPLOIT!",T1053:"CRON!",TA0003:"HOOK!",T1543:"DAEMON!",T1098:"CLONE!",TA0004:"ROOT!",T1548:"BYPASS!",TA0005:"VANISH!",T1055:"INJECT!",T1070:"ERASE!",T1027:"CLOAK!",TA0006:"SNIPE!",T1003:"CRACK!",T1555:"VAULT!",T1110:"BRUTE!",TA0007:"MAP!",T1046:"PROBE!",T1082:"INFO!",T1057:"PEEK!",TA0008:"LEAP!",T1021:"PIVOT!",T1570:"FETCH!",TA0009:"STASH!",T1560:"ZIP!",T1119:"SIPHON!",TA0011:"BEAM!",T1071:"SIGNAL!",T1090:"PROXY!",TA0010:"LAUNCH!",T1041:"DRAIN!",T1048:"TUNNEL!",TA0040:"BOOM!",T1485:"WIPE!",T1486:"LOCK!"}[s]||(u==="tactic"?"ATTACK!":"TACTIC!"),R={TA0043:"Scouting target vectors from the shadows before launching dark cyber operations.",TA0042:"Assembling malicious botnets and rogue domain infrastructure for the threat group.",TA0001:"Breaching the outer perimeter firewall with weaponized phishing payloads!",T1566:"A deceptive email containing a high-velocity malicious attachment!",TA0002:"Executing raw binary shellcode straight into victim process memory!",T1059:"Unleashing weaponized PowerShell commands to override security controls.",TA0003:"Planting persistent rootkit backdoors that survive system reboots!",T1053:"Scheduling stealth automated cron jobs to trigger payloads at midnight.",TA0004:"Escalating system privileges to full ROOT / SYSTEM administrator rights!",TA0005:"Cloaking malware binaries in encrypted obfuscation to bypass AV scanners.",T1027:"XOR-encrypting payload binaries to render them invisible to security analysts.",TA0006:"Dumping cleartext SAM hashes directly from system memory!",T1003:"Executing Mimikatz to siphon high-value kerberos credentials in real time.",TA0007:"Scanning internal subnet topology and active listening ports.",TA0008:"Pivoting laterally across domain controllers via valid administrator tokens.",TA0009:"Gathering high-value intellectual property into encrypted staging archives.",TA0011:"Establishing encrypted C2 beacon channels back to adversary command centers.",TA0010:"Exfiltrating classified corporate databases over covert DNS tunnels!",TA0040:"Deploying double-extortion ransomware to lock down critical cloud servers!"}[s]||`${a.name}: A vital ${u} employed in cyber warfare operations.`;return{id:a.id,type:u,name:a.name,code:a.id,rarity:d,atk:E,def:x,burstWord:F,lore:R,desc:a.description,tactics:a.tactics||[a.id]}}function V(s){const u={common:"#00F0FF",rare:"#7C4DFF",epic:"#FF6D00",legendary:"#FF0055"}[s.rarity]||"#00F0FF";let d="";return s.id.startsWith("TA0043")||s.id==="T1595"||s.id==="T1082"||s.id==="T1046"?d=`
      <circle cx="50" cy="50" r="32" fill="none" stroke="#000" stroke-width="4"/>
      <circle cx="50" cy="50" r="20" fill="none" stroke="#FFEA00" stroke-width="3"/>
      <circle cx="50" cy="50" r="8" fill="#FF0055"/>
      <line x1="50" y1="10" x2="50" y2="90" stroke="#000" stroke-width="3"/>
      <line x1="10" y1="50" x2="90" y2="50" stroke="#000" stroke-width="3"/>
      <polygon points="50,50 75,30 80,50" fill="#FFEA00" opacity="0.6"/>
    `:s.id==="T1566"||s.id==="TA0001"?d=`
      <rect x="20" y="30" width="60" height="40" rx="4" fill="#FFF" stroke="#000" stroke-width="4"/>
      <path d="M20,30 L50,52 L80,30" fill="none" stroke="#000" stroke-width="4"/>
      <polygon points="55,10 40,48 52,48 38,85 68,40 52,40" fill="#FFEA00" stroke="#000" stroke-width="3"/>
    `:s.id==="TA0002"||s.id==="T1059"?d=`
      <rect x="15" y="20" width="70" height="55" rx="6" fill="#000" stroke="#000" stroke-width="4"/>
      <rect x="20" y="25" width="60" height="45" rx="3" fill="#111"/>
      <path d="M26,38 L36,45 L26,52" fill="none" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
      <line x1="42" y1="52" x2="56" y2="52" stroke="#00E676" stroke-width="4" stroke-linecap="round"/>
      <polygon points="65,28 72,20 85,25 78,35" fill="#FF0055" stroke="#000" stroke-width="2"/>
    `:s.id==="TA0006"||s.id==="T1003"||s.id==="T1110"?d=`
      <circle cx="50" cy="40" r="18" fill="#FFEA00" stroke="#000" stroke-width="4"/>
      <polygon points="42,50 58,50 64,80 36,80" fill="#FFEA00" stroke="#000" stroke-width="4"/>
      <circle cx="50" cy="40" r="7" fill="#000"/>
      <polygon points="20,15 35,45 28,48 10,25" fill="#FF0055" stroke="#000" stroke-width="2"/>
    `:s.id==="TA0040"||s.id==="T1486"||s.id==="T1485"?d=`
      <rect x="25" y="42" width="50" height="42" rx="6" fill="#FF0055" stroke="#000" stroke-width="4"/>
      <path d="M35,42 V28 A15,15 0 0,1 65,28 V42" fill="none" stroke="#000" stroke-width="5"/>
      <circle cx="50" cy="58" r="6" fill="#FFEA00"/>
      <polygon points="47,62 53,62 55,74 45,74" fill="#FFEA00"/>
    `:s.id==="TA0010"||s.id==="T1041"?d=`
      <path d="M50,15 C65,30 65,60 65,75 L35,75 C35,60 35,30 50,15 Z" fill="#2979FF" stroke="#000" stroke-width="4"/>
      <circle cx="50" cy="42" r="8" fill="#FFEA00" stroke="#000" stroke-width="3"/>
      <polygon points="35,60 20,78 35,75" fill="#FF0055" stroke="#000" stroke-width="3"/>
      <polygon points="65,60 80,78 65,75" fill="#FF0055" stroke="#000" stroke-width="3"/>
      <polygon points="42,75 50,92 58,75" fill="#FFEA00" stroke="#000" stroke-width="2"/>
    `:s.id==="TA0011"||s.id==="T1071"?d=`
      <path d="M30,70 A30,30 0 0,1 70,70" fill="none" stroke="#000" stroke-width="5"/>
      <path d="M40,55 A18,18 0 0,1 60,55" fill="none" stroke="#FF0055" stroke-width="4"/>
      <circle cx="50" cy="75" r="8" fill="#FFEA00" stroke="#000" stroke-width="3"/>
      <line x1="50" y1="75" x2="50" y2="25" stroke="#000" stroke-width="4"/>
      <polygon points="50,20 62,35 38,35" fill="#00F0FF" stroke="#000" stroke-width="3"/>
    `:d=`
      <polygon points="50,15 80,30 80,65 50,85 20,65 20,30" fill="${u}" stroke="#000" stroke-width="4"/>
      <polygon points="50,25 58,40 75,42 62,55 66,72 50,62 34,72 38,55 25,42 42,40" fill="#FFEA00" stroke="#000" stroke-width="2"/>
    `,`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern-${s.id}" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.12)"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="${u}"/>
      <rect width="100" height="100" fill="url(#dotPattern-${s.id})"/>
      <polygon points="50,50 10,-10 30,-10" fill="#FFEA00" opacity="0.4"/>
      <polygon points="50,50 110,20 110,40" fill="#FFEA00" opacity="0.4"/>
      <polygon points="50,50 -10,80 -10,100" fill="#FFEA00" opacity="0.4"/>
      <polygon points="50,50 80,110 100,110" fill="#FFEA00" opacity="0.4"/>
      ${d}
    </svg>
  `}window.fireConfetti=function(){const s=document.getElementById("confetti-canvas");if(!s)return;const a=s.getContext("2d");s.width=window.innerWidth,s.height=window.innerHeight;const u=[],d=["#FF9F43","#A55EEA","#20BF6B","#FF6B6B","#48DBFB"];for(let T=0;T<120;T++)u.push({x:s.width/2,y:s.height/2+100,r:Math.random()*6+2,dx:Math.random()*12-6,dy:Math.random()*-15-5,color:d[Math.floor(Math.random()*d.length)],tilt:Math.floor(Math.random()*10)-10,tiltAngle:0,tiltAngleInc:Math.random()*.07+.05});function g(){a.clearRect(0,0,s.width,s.height);let T=!1;u.forEach(y=>{y.tiltAngle+=y.tiltAngleInc,y.y+=(Math.cos(y.tiltAngle)+1+y.r/2)/2,y.x+=Math.sin(y.tiltAngle)*2,y.dy+=.05,y.x+=y.dx,y.y+=y.dy,y.y<=s.height+20&&(T=!0),a.beginPath(),a.lineWidth=y.r,a.strokeStyle=y.color,a.moveTo(y.x+y.tilt+y.r,y.y),a.lineTo(y.x+y.tilt,y.y+y.tilt+y.r),a.stroke()}),T?requestAnimationFrame(g):a.clearRect(0,0,s.width,s.height)}g()};window.showToast=function(s,a){const u=document.getElementById("toast-container");if(!u)return;const d=document.createElement("div");d.className="toast",d.innerHTML=`
    <h4>${s}</h4>
    <p>${a}</p>
  `,u.appendChild(d),d.offsetWidth,d.classList.add("show"),setTimeout(()=>{d.classList.remove("show"),setTimeout(()=>d.remove(),400)},4e3)};function ue(){const s=new Date;return`${s.getFullYear()}-${(s.getMonth()+1).toString().padStart(2,"0")}-${s.getDate().toString().padStart(2,"0")}`}function B(s=0){return s>=1e3?{level:5,title:"Grandmaster",badgeClass:"mastery-tag-grandmaster",borderStyle:"mastery-border-grandmaster",icon:"👑",maxXP:1e3,prevXP:500}:s>=500?{level:4,title:"Master",badgeClass:"mastery-tag-master",borderStyle:"mastery-border-master",icon:"⭐",maxXP:1e3,prevXP:250}:s>=250?{level:3,title:"Expert",badgeClass:"mastery-tag-expert",borderStyle:"mastery-border-expert",icon:"🔮",maxXP:500,prevXP:100}:s>=100?{level:2,title:"Adept",badgeClass:"mastery-tag-adept",borderStyle:"mastery-border-adept",icon:"⚡",maxXP:250,prevXP:0}:{level:1,title:"Novice",badgeClass:"mastery-tag-novice",borderStyle:"mastery-border-novice",icon:"🌱",maxXP:100,prevXP:0}}const fe=[{techId:"T1566",title:"Phishing Vectors Research",description:"Research Spearphishing Attachment T1566 in your ATT&CK Comic Binder.",rewardPacks:2,rewardType:"2x Comic Booster Packs"},{techId:"T1059",title:"Command Execution Analysis",description:"Examine Command & Scripting Interpreter T1059 to understand shellcode threats.",rewardPacks:1,rewardType:"1x Rare Booster Pack"},{techId:"T1003",title:"Credential Dumping Safeguards",description:"Investigate OS Credential Dumping T1003 mechanics to harden system SAM & LSASS.",rewardPacks:2,rewardType:"2x Rare Booster Packs"},{techId:"TA0043",title:"Reconnaissance Operations Probe",description:"Study Reconnaissance Tactic TA0043 to detect early adversary active scanning.",rewardPacks:1,rewardType:"1x Booster Pack"},{techId:"T1027",title:"Obfuscation & Evasion Tactics",description:"Analyze Obfuscated Files/Information T1027 used by APT groups for stealth.",rewardPacks:2,rewardType:"2x Comic Booster Packs"},{techId:"T1486",title:"Ransomware Impact Mitigation",description:"Research Data Encrypted for Impact T1486 and evaluate recovery protocols.",rewardPacks:3,rewardType:"3x Mega Booster Packs"},{techId:"TA0001",title:"Initial Access Vector Audit",description:"Audit Initial Access Tactic TA0001 to strengthen perimeter defenses.",rewardPacks:1,rewardType:"1x Booster Pack"},{techId:"T1078",title:"Valid Accounts Hijack Analysis",description:"Research Valid Accounts T1078 to understand compromised credential risks.",rewardPacks:2,rewardType:"2x Booster Packs"}];class ye{constructor(){this.state={currentPhase:1,score:0,clarity:100,startTime:Date.now(),difficultyNotified:!1,unlockedCards:["TA0043","TA0001","T1566","T1059","TA0006","T1003"],activeView:"scenario",lastMissionDate:"",dailyMissions:[],cardMastery:{}},this.listeners=[],this.checkDailyMissions()}checkDailyMissions(){const a=ue();if(this.state.lastMissionDate!==a||!this.state.dailyMissions||this.state.dailyMissions.length===0){const d=[...fe].sort(()=>.5-Math.random()).slice(0,3).map((g,T)=>({id:`daily_${a}_${T}`,techId:g.techId,title:g.title,description:g.description,rewardPacks:g.rewardPacks,rewardType:g.rewardType,completed:!1,claimed:!1}));this.state.dailyMissions=d,this.state.lastMissionDate=a,this.saveGame()}}addCardMasteryXP(a,u){this.state.cardMastery||(this.state.cardMastery={});const d=this.state.cardMastery[a]||0,g=B(d),T=d+u;this.state.cardMastery[a]=T;const y=B(T);this.saveGame(),this.notify(),y.level>g.level&&(window.showToast("🏆 CARD MASTERY RANK UP!",`${a} Card reached ${y.title} Rank! (${y.icon} Level ${y.level})`),window.fireConfetti())}completeMission(a){const u=this.state.dailyMissions?.find(d=>d.id===a);return u&&!u.completed?(u.completed=!0,this.addCardMasteryXP(u.techId,150),this.saveGame(),this.notify(),!0):!1}claimMissionReward(a){const u=this.state.dailyMissions?.find(d=>d.id===a);return u&&u.completed&&!u.claimed?(u.claimed=!0,this.state.score+=300,this.unlockCard(u.techId),this.addCardMasteryXP(u.techId,250),this.saveGame(),this.notify(),u.rewardPacks):0}subscribe(a){this.listeners.push(a)}notify(){this.listeners.forEach(a=>a(this.state))}saveGame(){localStorage.setItem("aura_save",JSON.stringify(this.state))}loadGame(){const a=localStorage.getItem("aura_save");if(a){const u=JSON.parse(a);return this.state={...this.state,...u},this.state.startTime||(this.state.startTime=Date.now()),this.state.unlockedCards||(this.state.unlockedCards=["TA0043","TA0001","T1566","T1059","TA0006","T1003"]),this.state.activeView||(this.state.activeView="scenario"),this.state.cardMastery||(this.state.cardMastery={}),this.checkDailyMissions(),this.notify(),!0}return this.checkDailyMissions(),!1}clearSave(){localStorage.removeItem("aura_save"),this.state={currentPhase:1,score:0,clarity:100,startTime:Date.now(),difficultyNotified:!1,unlockedCards:["TA0043","TA0001","T1566","T1059","TA0006","T1003"],activeView:"scenario",lastMissionDate:"",dailyMissions:[],cardMastery:{}},this.checkDailyMissions(),this.notify()}unlockCard(a){if(this.state.unlockedCards.includes(a))this.addCardMasteryXP(a,100);else return this.state.unlockedCards.push(a),this.state.score+=200,this.addCardMasteryXP(a,100),this.saveGame(),this.notify(),!0;return!1}toggleView(a){this.state.activeView=a,this.notify()}saveToLeaderboard(a){const u=Math.floor((Date.now()-this.state.startTime)/1e3),d=Math.floor(u/60).toString().padStart(2,"0"),g=(u%60).toString().padStart(2,"0"),T=`${d}:${g}`,y={date:new Date().toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),score:this.state.score,clarity:this.state.clarity,grade:a,time:T,timeSeconds:u};let E=JSON.parse(localStorage.getItem("aura_leaderboard")||"[]");E.push(y),E.sort((x,L)=>L.score-x.score||x.timeSeconds-L.timeSeconds),E=E.slice(0,10),localStorage.setItem("aura_leaderboard",JSON.stringify(E))}nextPhase(){this.state.currentPhase<6&&(window.fireConfetti(),window.showToast("Phase Complete!","Great job Navigator. Advancing to the next phase."),this.state.currentPhase+=1,this.state.clarity=Math.max(0,this.state.clarity-15),this.saveGame(),setTimeout(()=>this.notify(),1500))}advancePhase(){this.nextPhase()}addScore(a){this.state.score+=a,this.saveGame(),this.notify()}modifyClarity(a){let u=a;if(a<0){let d=1;this.state.currentPhase>=2&&this.state.score>500&&(d+=.5),this.state.currentPhase>=3&&this.state.score>1500&&(d+=.5),this.state.currentPhase>=4&&this.state.score>3e3&&(d+=.5),u=Math.floor(a*d),d>1&&!this.state.difficultyNotified&&(window.showToast("Difficulty Increased","Your exceptional performance has triggered harder scenarios. Clarity penalties are increased!"),this.state.difficultyNotified=!0)}this.state.clarity=Math.max(0,Math.min(100,this.state.clarity+u)),this.saveGame(),this.notify()}}const o=new ye;document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("phase-display"),a=document.getElementById("score-display"),u=document.getElementById("clarity-display"),d=document.getElementById("clarity-fill"),g=document.getElementById("phase-title");document.getElementById("btn-advance"),document.getElementById("btn-score");const T={1:"Phase 1: The ATT&CK Lifecycle",2:"Phase 2: Intelligence Extraction",3:"Phase 3: The Threat Canvas",4:"Phase 4: Defensive Architecture",5:"Phase 5: The Final Scenario",6:"Certification"},y={1:"Reconstruct the MITRE ATT&CK enterprise matrix in chronological order.",2:"Analyze the intelligence report and map attacker actions to MITRE techniques.",3:"Connect the techniques in the correct chronological order of the attack lifecycle.",4:"Deploy proper mitigations against the identified threats.",5:"Navigate an interactive tabletop exercise against a simulated APT group.",6:"Claim your MITRE ATT&CK Certified Navigator Certificate."};o.subscribe(t=>{s.textContent=t.currentPhase,a.textContent=t.score.toLocaleString(),u.textContent=`${t.clarity}%`,d.style.width=`${t.clarity}%`,t.clarity>60?d.style.background="var(--color-accent)":t.clarity>30?d.style.background="var(--color-primary)":d.style.background="#FF4757",g.textContent=T[t.currentPhase];const r=g.nextElementSibling;r&&(r.textContent=y[t.currentPhase]);const m=(t.dailyMissions||[]).filter(h=>!h.claimed).length,n=document.getElementById("mission-badge-count");n&&(n.textContent=m,m===0?n.style.display="none":n.style.display="inline-block"),se(t)});const E=["TA0043","TA0042","TA0001","TA0002","TA0003","TA0004","TA0005","TA0006","TA0007","TA0008","TA0009","TA0011","TA0010","TA0040"];let x=null,L=0;function F(t){x=this,t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",this.dataset.tacticId),setTimeout(()=>this.classList.add("dragging"),0)}function K(t){this.classList.remove("dragging"),x=null}function R(t){t.preventDefault();const r=this,m=t.dataTransfer.getData("text/plain");if(r.dataset.tacticId===m){const n=r.querySelector(".slot-placeholder");n&&n.remove(),r.appendChild(x),x.draggable=!1,x.classList.remove("dragging"),x.classList.add("locked"),r.classList.add("pop-animation"),o.addScore(500),document.querySelectorAll("#cards-pool .tactic-card").length===0&&(L===0&&setTimeout(()=>window.showToast("Perfect Organizer 🏆","All tactics placed without a single mistake!"),500),setTimeout(()=>o.advancePhase(),2e3))}else L++,x&&(x.classList.add("bounce-back"),setTimeout(()=>x.classList.remove("bounce-back"),500)),o.modifyClarity(-5)}function P(t){t.preventDefault()}function J(t){t.innerHTML=`
      <div class="phase1-container">
        <div class="slots-container" id="slots-container"></div>
        <div class="cards-pool" id="cards-pool"></div>
      </div>
    `;const r=document.getElementById("slots-container"),m=document.getElementById("cards-pool");E.forEach((h,c)=>{const e=document.createElement("div");e.className="tactic-slot glass-panel",e.dataset.tacticId=h,e.innerHTML=`<span class="slot-number">${c+1}</span><span class="slot-placeholder">Drop here</span>`,e.addEventListener("dragover",P),e.addEventListener("drop",R),r.appendChild(e)});let n=[...k.tactics];n.sort(()=>Math.random()-.5),n.forEach(h=>{const c=document.createElement("div");c.className="tactic-card",c.draggable=!0,c.dataset.tacticId=h.id,c.textContent=h.name,c.addEventListener("dragstart",F),c.addEventListener("dragend",K),m.appendChild(c)})}function Z(t){t.innerHTML=`
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
    `;const r=document.getElementById("report-card"),m=document.getElementById("extraction-tooltip"),n=document.getElementById("technique-select"),h=document.getElementById("btn-verify-tech"),c=document.getElementById("btn-cancel-tech");let e=null,f=0,v=0;k.techniques.forEach(l=>{const i=document.createElement("option");i.value=l.id,i.textContent=`${l.id} - ${l.name}`,n.appendChild(i)}),r.addEventListener("mouseup",l=>{m.classList.contains("hidden")&&setTimeout(()=>{const i=window.getSelection(),p=i.toString().trim();if(p.length>10){const w=r.querySelectorAll(".secret-text:not(.solved)");let A=null;for(const b of w){const C=b.textContent.replace(/\s+/g," ").trim(),M=p.replace(/\s+/g," ").trim();if(i.anchorNode&&b.contains(i.anchorNode)||i.focusNode&&b.contains(i.focusNode)||i.containsNode&&i.containsNode(b,!0)||C.includes(M)||M.includes(C.substring(0,10))){A=b;break}}if(A){e=A;const C=i.getRangeAt(0).getBoundingClientRect(),M=t.getBoundingClientRect();let pe=C.bottom-M.top+10,G=C.left-M.left;G+320>M.width&&(G=M.width-330),m.style.top=`${Math.max(0,pe)}px`,m.style.left=`${Math.max(0,G)}px`,m.classList.remove("hidden"),A.classList.add("selecting")}}},10)}),c.addEventListener("click",()=>{m.classList.add("hidden"),e&&e.classList.remove("selecting"),e=null,window.getSelection().removeAllRanges()}),h.addEventListener("click",()=>{if(!e)return;n.value===e.dataset.tactic?(e.classList.remove("selecting"),e.classList.add("solved"),m.classList.add("hidden"),window.getSelection().removeAllRanges(),n.value="",o.addScore(1e3),f++,f===5&&(v===0&&setTimeout(()=>window.showToast("Speed Reader ⚡","Extracted all intel without a single error!"),500),setTimeout(()=>o.advancePhase(),2e3))):(v++,o.modifyClarity(-10),m.classList.add("bounce-back"),setTimeout(()=>m.classList.remove("bounce-back"),500))})}function Q(t,r,m){const n=()=>{const c=t.getBoundingClientRect(),e=r.getBoundingClientRect(),f=m.getBoundingClientRect(),v=c.left+c.width/2-f.left,l=c.top+c.height/2-f.top,i=e.left+e.width/2-f.left,p=e.top+e.height/2-f.top;h.setAttribute("x1",v),h.setAttribute("y1",l),h.setAttribute("x2",i),h.setAttribute("y2",p)},h=document.createElementNS("http://www.w3.org/2000/svg","line");h.setAttribute("stroke","var(--color-accent)"),h.setAttribute("stroke-width","4"),h.setAttribute("stroke-linecap","round"),h.style.strokeDasharray="1000",h.style.strokeDashoffset="1000",h.style.animation="drawLineAnim 2s ease-out forwards",m.appendChild(h),n(),window.addEventListener("resize",n)}function ee(t){t.innerHTML=`
      <div class="phase3-container relative">
        <div class="canvas-header w-full text-left mb-4">
          <h3 class="text-xl font-bold text-slate-800">Map the APT29 Campaign</h3>
          <p class="text-slate-500 text-sm">Connect the techniques in the correct chronological order of the attack lifecycle.</p>
        </div>
        <div class="node-canvas relative w-full flex-1" id="node-canvas">
          <svg id="connection-lines" class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;"></svg>
        </div>
      </div>
    `;const r=document.getElementById("node-canvas"),m=document.getElementById("connection-lines"),n=["T1566","T1059","T1053","T1003","T1082","T1041"];let c=[...n.map(i=>k.helpers.getTechniqueById(i))];c.sort(()=>Math.random()-.5);const e=[{top:"25%",left:"20%"},{top:"20%",left:"50%"},{top:"25%",left:"80%"},{top:"75%",left:"20%"},{top:"80%",left:"50%"},{top:"75%",left:"80%"}];e.sort(()=>Math.random()-.5);let f=0,v=null,l=0;c.forEach((i,p)=>{const w=document.createElement("div");w.className="canvas-node glass-panel",w.dataset.techId=i.id,w.style.top=e[p].top,w.style.left=e[p].left;const A=i.id==="T1566"?"📧":i.id==="T1059"?"💻":i.id==="T1053"?"⏰":i.id==="T1003"?"🔑":i.id==="T1082"?"🔍":"📤";w.innerHTML=`
        <div class="node-icon">${A}</div>
        <div class="text-xs font-bold text-slate-700 mt-2 leading-tight">${i.name}</div>
        <div class="text-[9px] text-slate-400 mt-1">${i.id}</div>
        <div class="canvas-node-tooltip">${i.description}</div>
      `,w.addEventListener("click",()=>{i.id===n[f]?(w.classList.add("active"),o.addScore(300),v&&Q(v,w,m),v=w,f++,f===n.length&&(l===0&&setTimeout(()=>window.showToast("Master Tracker 🕵️‍♂️","Mapped the campaign perfectly!"),500),setTimeout(()=>o.advancePhase(),2500))):w.classList.contains("active")||(l++,o.modifyClarity(-10),w.classList.add("bounce-back"),setTimeout(()=>w.classList.remove("bounce-back"),500))}),r.appendChild(w)})}function te(t){t.innerHTML=`
      <div class="phase4-container">
        <div class="threats-column" id="threats-column">
          <h4 class="text-slate-700 font-bold mb-4 text-center">Threat Landscape (Techniques)</h4>
        </div>
        <div class="mitigations-column" id="mitigations-column">
          <h4 class="text-slate-700 font-bold mb-4 text-center">Defensive Arsenal (Mitigations)</h4>
        </div>
      </div>
    `;const r=document.getElementById("threats-column"),m=document.getElementById("mitigations-column"),n={T1566:"M1017",T1078:"M1032",T1110:"M1036",T1003:"M1026",T1203:"M1050",T1021:"M1030",T1048:"M1028",T1027:"M1040"};let h=0,c=0;const e=Object.keys(n);e.forEach(l=>{const i=k.helpers.getTechniqueById(l),p=document.createElement("div");p.className="threat-card glass-panel",p.dataset.techId=l,p.dataset.requiredMitigation=n[l],p.innerHTML=`
        <div class="threat-icon">⚠️</div>
        <div class="threat-info">
          <div class="threat-name">${i.name}</div>
          <div class="threat-id">${i.id}</div>
        </div>
      `,p.addEventListener("dragover",w=>w.preventDefault()),p.addEventListener("drop",function(w){w.preventDefault();const A=w.dataTransfer.getData("text/plain");if(this.dataset.requiredMitigation===A){this.classList.add("neutralized"),this.innerHTML=`
            <div class="threat-icon">🛡️</div>
            <div class="threat-info">
              <div class="threat-name">${i.name} Secured</div>
              <div class="threat-id">${A} Applied</div>
            </div>
          `;const b=document.querySelector(`.mitigation-card[data-mit-id="${A}"]`);b&&b.remove(),o.addScore(400),h++,h===e.length&&(c===0&&setTimeout(()=>window.showToast("Defensive Architect 🛡️","Perfect Mitigation deployment!"),500),setTimeout(()=>o.advancePhase(),2e3))}else c++,o.modifyClarity(-10),this.classList.add("bounce-back"),setTimeout(()=>this.classList.remove("bounce-back"),500)}),r.appendChild(p)});let f=[...k.mitigations];f.sort(()=>Math.random()-.5);const v=document.createElement("div");v.className="mitigations-pool",f.forEach(l=>{const i=document.createElement("div");i.className="mitigation-card",i.dataset.mitId=l.id,i.draggable=!0,i.innerHTML=`
        <div class="mit-name">${l.name}</div>
        <div class="mit-id">${l.id}</div>
      `,i.addEventListener("dragstart",p=>{p.dataTransfer.effectAllowed="move",p.dataTransfer.setData("text/plain",l.id),setTimeout(()=>i.classList.add("dragging"),0)}),i.addEventListener("dragend",()=>{i.classList.remove("dragging")}),v.appendChild(i)}),m.appendChild(v)}function ie(t){const r={start:{text:"An alert fires at 03:00 AM for suspicious PowerShell activity on the public-facing web server. The command string appears heavily obfuscated. The simulated APT group 'Cosmic Fox' is suspected.",options:[{text:"Ignore it, likely a false positive from an admin.",next:"fail_ignore",clarity:-20,score:0},{text:"Isolate the server immediately from the network.",next:"fail_isolate",clarity:-10,score:0},{text:"Analyze and decode the obfuscated payload.",next:"step_2",clarity:10,score:200}]},fail_ignore:{text:"You ignored the alert. The attacker successfully escalated privileges and deployed ransomware. Mission Failed.",options:[{text:"Restart Scenario",next:"start",clarity:0,score:0}]},fail_isolate:{text:"You isolated the server without investigation, causing an unacceptable business outage. The C-suite is furious. Mission Failed.",options:[{text:"Restart Scenario",next:"start",clarity:0,score:0}]},step_2:{text:"You decode the payload. It attempts to bypass the Execution Policy and run a script from memory. Which MITRE technique does this represent?",options:[{text:"T1059 - Command and Scripting Interpreter",next:"step_3",clarity:10,score:300},{text:"T1053 - Scheduled Task/Job",next:"fail_wrong",clarity:-10,score:0},{text:"T1203 - Exploitation for Client Execution",next:"fail_wrong",clarity:-10,score:0}]},fail_wrong:{text:"Incorrect technique identification led the response team down the wrong path. The attacker slipped away and completed their mission. Mission Failed.",options:[{text:"Restart Scenario",next:"start",clarity:0,score:0}]},step_3:{text:"Correct (T1059). The script downloads a secondary payload that targets 'lsass.exe'. What is the primary objective of targeting this process?",options:[{text:"Defense Evasion via Process Injection",next:"fail_wrong",clarity:-10,score:0},{text:"Credential Access via OS Credential Dumping (T1003)",next:"step_4",clarity:10,score:300},{text:"Execution via API calls",next:"fail_wrong",clarity:-10,score:0}]},step_4:{text:"They want credentials! You monitor the network. Suddenly, you observe SMB traffic to the Database Server using the service account credentials obtained from the web server.",options:[{text:"Brute Force (T1110) against the DB",next:"fail_wrong",clarity:-10,score:0},{text:"Lateral Movement using Remote Services (T1021) and Valid Accounts (T1078)",next:"step_5",clarity:10,score:400}]},step_5:{text:"Yes, they moved laterally. On the DB server, they execute queries to extract the 'customers' table and compress the output into a password-protected zip file.",options:[{text:"Archive Collected Data (T1560) for Collection",next:"step_6",clarity:10,score:400},{text:"Data Destruction (T1485)",next:"fail_wrong",clarity:-10,score:0}]},step_6:{text:"The data is staged. The attacker then initiates a connection to a seemingly benign external domain (e.g., a CDN or social media site) over HTTPS to communicate.",options:[{text:"Exfiltration Over Web Service (T1567)",next:"fail_wrong",clarity:-10,score:0},{text:"Command and Control via Application Layer Protocol (T1071)",next:"step_7",clarity:10,score:500}]},step_7:{text:"It's C2 (T1071). They intend to pull the staged zip file over this established C2 channel to bypass DLP network appliances.",options:[{text:"Exfiltration Over Alternative Protocol (T1048)",next:"fail_wrong",clarity:-10,score:0},{text:"Exfiltration Over C2 Channel (T1041)",next:"step_8",clarity:10,score:500}]},step_8:{text:"Correct! You successfully block the C2 domain, isolate the DB server, and change the compromised credentials. The attack is thwarted. Based on this modus operandi, which APT profile does 'Cosmic Fox' resemble most?",options:[{text:"Lazarus Group",next:"fail_wrong",clarity:-10,score:0},{text:"APT29",next:"step_win",clarity:20,score:1e3}]},step_win:{text:"Excellent! You successfully mapped the campaign and neutralized the threat. You are a true ATT&CK Navigator! Simulation Complete.",options:[]}};let m="start";t.innerHTML=`
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
    `;const n=document.getElementById("scenario-text"),h=document.getElementById("scenario-options"),c=document.getElementById("scenario-history");function e(f){const v=r[f];if(n.innerHTML=`<p>${v.text}</p>`,f==="step_win"&&(window.fireConfetti(),window.showToast("Incident Responder 🌟","Simulation successfully neutralized!")),h.innerHTML="",v.options&&v.options.length>0){if(v.options.forEach(l=>{const i=document.createElement("button");i.className="scenario-option-btn",i.textContent=l.text,i.addEventListener("click",()=>{l.clarity&&o.modifyClarity(l.clarity),l.score&&o.addScore(l.score);const p=document.createElement("div");p.className="history-item bg-white/60 border border-slate-200 p-3 rounded-lg text-sm shadow-sm",p.innerHTML=`
              <div class="text-slate-500 text-xs mb-1 font-bold uppercase tracking-wide">Decision Made</div>
              <div class="text-slate-800 font-medium">${l.text}</div>
            `,c.appendChild(p),c.scrollTop=c.scrollHeight,n.classList.add("pop-animation"),setTimeout(()=>n.classList.remove("pop-animation"),400),e(l.next)}),h.appendChild(i)}),!f.startsWith("fail")){const l=document.createElement("div");l.className="mt-4 flex justify-end";const i=document.createElement("button");i.className="action-button outline text-sm px-4 py-2 flex items-center gap-2",i.innerHTML='<span>💡 Request Hint</span><span class="text-xs font-bold opacity-80">(-5 Clarity)</span>',i.addEventListener("click",()=>{if(o.state.clarity<5){window.showToast("Low Clarity","Not enough clarity to use a hint!");return}o.modifyClarity(-5);const p=v.options.find(w=>!w.next.startsWith("fail"));if(p){const A=Array.from(h.querySelectorAll(".scenario-option-btn")).find(b=>b.textContent===p.text);if(A){A.style.backgroundColor="#dbeafe",A.style.borderColor="#3b82f6",A.style.color="#1e3a8a";const b=document.createElement("span");b.className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full uppercase tracking-wide",b.textContent="Suggested",A.appendChild(b),i.disabled=!0,i.style.opacity="0.5",i.style.cursor="not-allowed",i.innerHTML="<span>💡 Hint Applied</span>"}}}),l.appendChild(i),h.appendChild(l)}}else{const l=document.createElement("button");l.className="action-button mt-4 self-start",l.textContent="View Certificate",l.addEventListener("click",()=>{o.advancePhase()}),h.appendChild(l)}}e(m)}function ae(t){const r=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});let m="A+";(o.state.clarity<80||o.state.score<5e3)&&(m="A"),(o.state.clarity<50||o.state.score<3e3)&&(m="B"),(o.state.clarity<20||o.state.score<1e3)&&(m="C"),o.state.leaderboardSaved||(o.saveToLeaderboard(m),o.state.leaderboardSaved=!0,o.saveGame()),t.innerHTML=`
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
                <div class="stat-value">${o.state.score.toLocaleString()}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Clarity Level</div>
                <div class="stat-value">${o.state.clarity}%</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Final Grade</div>
                <div class="stat-value">${m}</div>
              </div>
            </div>
            <div class="cert-details">
              <p>✔️ Successfully neutralized threats across the full ATT&CK Lifecycle</p>
              <p>✔️ Techniques Mitigated: 8/8</p>
              <p>✔️ Campaigns Analyzed: APT29, Cosmic Fox</p>
            </div>
          </div>
          <div class="cert-footer">
            <div class="date-issued">Date: ${r}</div>
            <div class="watermark">Verified by GRCHub.eu</div>
          </div>
        </div>
        <div class="cert-actions no-print">
          <button id="btn-print" class="action-button">Print Certificate</button>
          <button id="btn-restart" class="action-button outline">Restart Game</button>
        </div>
      </div>
    `,document.getElementById("btn-print").addEventListener("click",()=>{window.print()}),document.getElementById("btn-restart").addEventListener("click",()=>{o.clearSave(),window.location.reload()})}function N(t=3){const r=document.getElementById("booster-modal"),m=document.getElementById("booster-stage");if(!r||!m)return;const n=[...k.tactics.map(v=>v.id),...k.techniques.map(v=>v.id)],h=n.filter(v=>!o.state.unlockedCards.includes(v)),c=h.length>=t?h:n,e=[],f=[...c];for(let v=0;v<t&&f.length!==0;v++){const l=Math.floor(Math.random()*f.length);e.push(f[l]),f.splice(l,1)}m.innerHTML=`
      <div class="booster-wrapper" id="booster-wrapper">
        <div class="booster-foil" id="booster-foil">
          <div class="booster-logo">✨ AURA ✨</div>
          <div class="booster-sub">COMIC TRADING CARDS</div>
          <div class="booster-burst-text">BOOM!</div>
          <p style="font-family: var(--font-heading); font-size: 1.2rem; color: #FFF; text-shadow: 1.5px 1.5px 0px #000; text-align: center;">
            ${t===1?"1 MITRE ATT&CK CARD":"3 MITRE ATT&CK CARDS"}
          </p>
          <button id="btn-rip-booster" class="action-button" style="background: #FFEA00; color: #FF0055; font-size: 1.3rem;">💥 RIP OPEN BOOSTER! 💥</button>
        </div>
      </div>
    `,r.classList.remove("hidden"),document.getElementById("btn-rip-booster")?.addEventListener("click",()=>{window.fireConfetti(),window.showToast("KABOOM! 🃏",`Booster pack ripped open! Unlocked ${e.length} new comic cards!`),e.forEach(i=>o.unlockCard(i));const v=document.getElementById("booster-wrapper");v.innerHTML=`
        <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--comic-pink); text-shadow: 2px 2px 0px #000; text-align: center; margin-bottom: 1rem;">
          ⚡ NEW CARDS UNLOCKED! ⚡
        </h3>
        <div class="booster-cards-revealed" id="revealed-cards-grid"></div>
        <button id="btn-close-booster" class="action-button mt-4" style="font-size: 1.2rem; align-self: center;">✨ ADD TO BINDER ✨</button>
      `;const l=document.getElementById("revealed-cards-grid");e.forEach(i=>{const p=D(i);if(!p)return;const w=V(p),A=o.state.cardMastery?.[i]||0,b=B(A),C=document.createElement("div");C.className="comic-card-wrapper",C.innerHTML=`
          <div class="comic-card">
            <div class="comic-card-front rarity-${p.rarity} ${b.borderStyle}">
              <div class="card-header-bar">
                <span class="card-rarity-badge rarity-${p.rarity}">${p.rarity}</span>
                <span class="mastery-rank-tag ${b.badgeClass}">${b.icon} ${b.title}</span>
                <span class="card-code">${p.code}</span>
              </div>
              <h4 class="card-title">${p.name}</h4>
              <div class="comic-card-art">
                ${w}
                <div class="comic-card-action-burst">${p.burstWord}</div>
              </div>
              <div class="card-stats-row">
                <div class="card-stat-item">ATK: <span>${p.atk}</span></div>
                <div class="card-stat-item">DEF: <span>${p.def}</span></div>
              </div>
              <p class="card-lore-text">"${p.lore}"</p>
              <div class="card-flip-hint">Click to flip 🔄</div>
            </div>
            <div class="comic-card-back ${b.borderStyle}">
              <h4 class="card-back-title">${p.code} Details</h4>
              <p class="card-back-desc">${p.desc}</p>
              <div style="margin-top: 0.2rem;">
                <div style="font-size: 0.75rem; font-weight: 800; display: flex; justify-content: space-between; align-items: center;">
                  <span>Mastery: <span class="mastery-rank-tag ${b.badgeClass}">${b.icon} ${b.title}</span></span>
                  <span>${A} XP</span>
                </div>
                <div class="mastery-progress-wrapper">
                  <div class="mastery-progress-fill" style="width: ${Math.min(100,Math.floor(A/b.maxXP*100))}%;"></div>
                  <div class="mastery-progress-text">${A} / ${b.maxXP} XP</div>
                </div>
              </div>
              <div class="card-back-footer">
                <span>Rarity: ${p.rarity.toUpperCase()}</span>
                <span>Click to flip 🔄</span>
              </div>
            </div>
          </div>
        `;const M=C.querySelector(".comic-card");M.addEventListener("click",()=>{M.classList.toggle("flipped")}),l.appendChild(C)}),document.getElementById("btn-close-booster")?.addEventListener("click",()=>{r.classList.add("hidden")})})}let I="all",S="";function O(t){t.innerHTML=`
      <div class="deck-container">
        <div class="deck-controls-bar">
          <div class="deck-filters">
            <button class="filter-tab ${I==="all"?"active":""}" data-filter="all">All (46)</button>
            <button class="filter-tab ${I==="tactics"?"active":""}" data-filter="tactics">🛡️ Tactics (14)</button>
            <button class="filter-tab ${I==="techniques"?"active":""}" data-filter="techniques">⚡ Techniques (32)</button>
            <button class="filter-tab ${I==="collected"?"active":""}" data-filter="collected">🌟 Collected</button>
            <button class="filter-tab ${I==="locked"?"active":""}" data-filter="locked">🔒 Locked</button>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <input type="text" id="deck-search" class="deck-search-input" placeholder="🔍 Search card or ID..." value="${S}" />
            <button id="btn-draw-booster" class="action-button" style="background: var(--comic-pink); padding: 0.4rem 0.8rem; font-size: 1rem;">⚡ Draw Booster (100 pts)</button>
            <button id="btn-draw-single" class="action-button outline" style="padding: 0.4rem 0.8rem; font-size: 1rem;">🎲 Free Draw</button>
          </div>
        </div>

        <div class="deck-binder-grid" id="deck-binder-grid"></div>
      </div>
    `;const r=document.getElementById("deck-binder-grid"),n=[...k.tactics.map(c=>c.id),...k.techniques.map(c=>c.id)].filter(c=>{const e=D(c);if(!e)return!1;const f=o.state.unlockedCards.includes(c);if(I==="tactics"&&e.type!=="tactic"||I==="techniques"&&e.type!=="technique"||I==="collected"&&!f||I==="locked"&&f)return!1;if(S){const v=S.toLowerCase(),l=e.name.toLowerCase().includes(v),i=e.code.toLowerCase().includes(v);if(!l&&!i)return!1}return!0});n.length===0?r.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(255,255,255,0.7); border: 3px solid #000; border-radius: 12px; margin-top: 1rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--comic-pink);">No Comic Cards Found</h3>
          <p style="font-weight: 700;">Try clearing your search query or switching your collection filter.</p>
        </div>
      `:n.forEach(c=>{const e=D(c);if(!e)return;const f=o.state.unlockedCards.includes(c),v=V(e),l=o.state.cardMastery?.[c]||0,i=B(l),p=document.createElement("div");if(p.className="comic-card-wrapper",f){p.innerHTML=`
            <div class="comic-card">
              <div class="comic-card-front rarity-${e.rarity} ${i.borderStyle}">
                <div class="card-header-bar">
                  <span class="card-rarity-badge rarity-${e.rarity}">${e.rarity}</span>
                  <span class="mastery-rank-tag ${i.badgeClass}">${i.icon} ${i.title}</span>
                  <span class="card-code">${e.code}</span>
                </div>
                <h4 class="card-title">${e.name}</h4>
                <div class="comic-card-art">
                  ${v}
                  <div class="comic-card-action-burst">${e.burstWord}</div>
                </div>
                <div class="card-stats-row">
                  <div class="card-stat-item">ATK: <span>${e.atk}</span></div>
                  <div class="card-stat-item">DEF: <span>${e.def}</span></div>
                </div>
                <p class="card-lore-text">"${e.lore}"</p>
                <div class="card-flip-hint">Click to flip 🔄</div>
              </div>
              <div class="comic-card-back ${i.borderStyle}">
                <h4 class="card-back-title">${e.code} Details</h4>
                <p class="card-back-desc">${e.desc}</p>
                <div style="margin-top: 0.2rem;">
                  <div style="font-size: 0.72rem; font-weight: 800; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                    <span>Mastery: <span class="mastery-rank-tag ${i.badgeClass}">${i.icon} ${i.title}</span></span>
                    <span>${l} XP</span>
                  </div>
                  <div class="mastery-progress-wrapper">
                    <div class="mastery-progress-fill" style="width: ${Math.min(100,Math.floor(l/i.maxXP*100))}%;"></div>
                    <div class="mastery-progress-text">${l} / ${i.maxXP} XP</div>
                  </div>
                  <button class="action-button btn-train-card mt-1" data-id="${e.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: var(--comic-purple); width: 100%;">
                    ⚡ Practice Tech (+50 XP)
                  </button>
                </div>
                <div class="card-back-footer">
                  <span>Rarity: ${e.rarity.toUpperCase()}</span>
                  <span>Click to flip 🔄</span>
                </div>
              </div>
            </div>
          `;const w=p.querySelector(".comic-card");w.addEventListener("click",()=>{w.classList.toggle("flipped")});const A=p.querySelector(".btn-train-card");A&&A.addEventListener("click",b=>{b.stopPropagation();const C=b.currentTarget.dataset.id;o.addCardMasteryXP(C,50)})}else p.innerHTML=`
            <div class="comic-card locked-card">
              <div class="lock-overlay-icon">
                <span style="font-size: 2.5rem;">🔒</span>
                <span>LOCKED</span>
                <span style="font-size: 0.8rem; margin-top: 0.3rem;">Draw Booster to Unlock</span>
              </div>
              <div class="comic-card-front rarity-common">
                <div class="card-header-bar">
                  <span class="card-rarity-badge rarity-common">???</span>
                  <span class="card-code">${e.code}</span>
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
          `;r.appendChild(p)}),t.querySelectorAll(".filter-tab").forEach(c=>{c.addEventListener("click",e=>{I=e.target.dataset.filter,O(t)})}),document.getElementById("deck-search")?.addEventListener("input",c=>{S=c.target.value,O(t);const e=document.getElementById("deck-search");e&&(e.focus(),e.selectionStart=e.selectionEnd=S.length)}),document.getElementById("btn-draw-booster")?.addEventListener("click",()=>{o.state.score>=100&&(o.state.score-=100,o.saveGame(),o.notify()),N(3)}),document.getElementById("btn-draw-single")?.addEventListener("click",()=>{N(1)})}function se(t){const r=document.getElementById("game-canvas"),m=document.getElementById("phase-title"),n=document.getElementById("phase-description"),h=document.getElementById("unlocked-count-badge"),c=k.tactics.length+k.techniques.length;h&&(h.textContent=`${o.state.unlockedCards.length}/${c}`);const e=document.getElementById("view-mode-scenario"),f=document.getElementById("view-mode-cards");if(e&&f&&(t.activeView==="cards"?(e.classList.remove("active-view"),e.classList.add("outline"),f.classList.add("active-view"),f.classList.remove("outline")):(e.classList.add("active-view"),e.classList.remove("outline"),f.classList.remove("active-view"),f.classList.add("outline"))),t.activeView==="cards"){m&&(m.textContent="🃏 ATT&CK Comic Card Binder"),n&&(n.textContent="Draw booster packs, collect all 46 Tactics & Techniques cards, and inspect their 3D comic data."),O(r);return}m&&(m.textContent=T[t.currentPhase]),n&&(n.textContent=y[t.currentPhase]),t.currentPhase===1?r.querySelector(".phase1-container")||J(r):t.currentPhase===2?r.querySelector(".phase2-container")||Z(r):t.currentPhase===3?r.querySelector(".phase3-container")||ee(r):t.currentPhase===4?r.querySelector(".phase4-container")||te(r):t.currentPhase===5?r.querySelector(".phase5-container")||ie(r):t.currentPhase===6?r.querySelector(".certificate-container")||ae(r):(r.innerHTML=`
        <div class="welcome-card glass-panel">
          <h3>Phase ${t.currentPhase}</h3>
          <p>This phase is under construction. Advance via dev button if needed.</p>
          <button id="dev-advance" class="action-button mt-4">Dev: Next Phase</button>
        </div>
      `,document.getElementById("dev-advance")?.addEventListener("click",()=>o.advancePhase()))}const q=document.getElementById("welcome-modal"),ne=document.getElementById("btn-resume"),re=document.getElementById("btn-new-game"),U=document.getElementById("leaderboard-modal"),oe=document.getElementById("btn-leaderboard"),ce=document.getElementById("btn-close-leaderboard"),X=document.getElementById("tutorial-overlay"),de=document.getElementById("tutorial-title"),le=document.getElementById("tutorial-text"),_=document.getElementById("btn-tutorial-next"),me=document.getElementById("btn-tutorial-skip"),Y={1:[{title:"Welcome to Aura",text:"You are an Incident Responder navigating the MITRE ATT&CK framework. Let's look at your dashboard.",targetId:null},{title:"Track Your Progress",text:"Keep an eye on your Score and Clarity. Clarity drops when you make mistakes, affecting your final grade!",targetId:"nav-stats"},{title:"The Canvas",text:"This is your main canvas. You will solve challenges here to advance through the phases. Good luck!",targetId:"game-canvas"}],2:[{title:"Phase 2: Extraction",text:"In this phase, you must analyze a CTI report and extract the specific MITRE ATT&CK techniques.",targetId:null},{title:"Identify Techniques",text:"Read the report and click on the highlighted sections of text to map them to the correct technique from the dropdown.",targetId:"report-card"}]};let H=1,$=0;function W(){const t=Y[H]||[];if($>=t.length){j();return}document.querySelectorAll(".tutorial-highlight").forEach(m=>m.classList.remove("tutorial-highlight"));const r=t[$];if(de.textContent=r.title,le.textContent=r.text,r.targetId){const m=document.getElementById(r.targetId);m&&m.classList.add("tutorial-highlight")}$===t.length-1?_.textContent="Finish":_.textContent="Next"}function j(){X?.classList.add("hidden"),document.querySelectorAll(".tutorial-highlight").forEach(t=>t.classList.remove("tutorial-highlight")),localStorage.setItem(`aura_tutorial_seen_phase_${H}`,"true")}_?.addEventListener("click",()=>{$++,W()}),me?.addEventListener("click",()=>{j()});function z(t){const r=t||o.state.currentPhase;Y[r]&&!localStorage.getItem(`aura_tutorial_seen_phase_${r}`)&&(H=r,X?.classList.remove("hidden"),$=0,W())}o.subscribe(t=>{t.currentPhase===2&&!localStorage.getItem("aura_tutorial_seen_phase_2")&&setTimeout(()=>z(2),500)}),ne?.addEventListener("click",()=>{q?.classList.add("hidden")}),re?.addEventListener("click",()=>{o.clearSave(),q?.classList.add("hidden"),z()}),oe?.addEventListener("click",()=>{const t=JSON.parse(localStorage.getItem("aura_leaderboard")||"[]"),r=document.getElementById("leaderboard-content");if(t.length===0)r.innerHTML='<p style="text-align:center; color: var(--color-text-muted);">No entries yet. Complete a mission to join the leaderboard!</p>';else{let m='<table style="width: 100%; text-align: left; border-collapse: collapse;">';m+='<tr style="border-bottom: 1px solid var(--glass-border);"><th style="padding: 0.5rem;">Rank</th><th>Grade</th><th>Score</th><th>Time</th><th>Date</th></tr>',t.forEach((n,h)=>{let c="";h===0?c="🏆":h===1?c="🥈":h===2&&(c="🥉"),m+=`<tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
          <td style="padding: 0.5rem; font-weight: bold;">${h+1} ${c}</td>
          <td style="font-weight: 600; color: var(--color-primary);">${n.grade}</td>
          <td style="font-family: var(--font-mono);">${n.score.toLocaleString()}</td>
          <td style="font-family: var(--font-mono);">${n.time}</td>
          <td style="font-size: 0.85rem; color: var(--color-text-muted);">${n.date}</td>
        </tr>`}),m+="</table>",r.innerHTML=m}U?.classList.remove("hidden")}),ce?.addEventListener("click",()=>{U?.classList.add("hidden")});function he(){const t=document.getElementById("missions-modal"),r=document.getElementById("missions-list-container");if(!t||!r)return;o.checkDailyMissions();const m=o.state.dailyMissions||[];r.innerHTML="",m.forEach(n=>{const h=D(n.techId),c=h?V(h):"",e=o.state.cardMastery?.[n.techId]||0,f=B(e),v=document.createElement("div");v.className=`mission-item-card ${n.completed?"completed-card":""}`;let l="";n.completed?n.claimed?l=`
          <div style="font-family: var(--font-heading); font-size: 0.95rem; color: #2E7D32; background: #C8E6C9; padding: 0.4rem 0.8rem; border: 2px solid #2E7D32; border-radius: 6px;">
            ✅ CLAIMED
          </div>
        `:l=`
          <button class="action-button btn-claim-mission" data-id="${n.id}" style="background: #FFEA00; color: #FF0055; font-size: 1.05rem; padding: 0.6rem 1rem;">
            🎁 Claim ${n.rewardType}!
          </button>
        `:l=`
          <button class="action-button btn-research-mission" data-id="${n.id}" data-tech="${n.techId}" style="background: var(--comic-pink); font-size: 0.95rem; padding: 0.5rem 0.9rem;">
            🔬 Research Tech (${n.techId})
          </button>
        `,v.innerHTML=`
        <div style="width: 75px; height: 75px; flex-shrink: 0; background: #FFFFFF; border: 2.5px solid #000; box-shadow: 2px 2px 0px #000; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
          ${c}
        </div>
        <div class="mission-info-block">
          <div class="mission-title-row">
            <span class="card-rarity-badge rarity-rare">${n.techId}</span>
            <span class="mastery-rank-tag ${f.badgeClass}">${f.icon} ${f.title}</span>
            <h4 class="mission-title-text">${n.title}</h4>
          </div>
          <p class="mission-desc-text">${n.description}</p>
          <div class="mission-reward-badge">
            🎁 Reward: ${n.rewardType} (+300 pts & +250 Mastery XP)
          </div>
        </div>
        <div>
          ${l}
        </div>
      `,r.appendChild(v)}),r.querySelectorAll(".btn-research-mission").forEach(n=>{n.addEventListener("click",h=>{const c=h.currentTarget.dataset.id,e=h.currentTarget.dataset.tech;o.completeMission(c),o.toggleView("cards"),t.classList.add("hidden");const f=document.getElementById("deck-search");f&&(f.value=e,f.dispatchEvent(new Event("input"))),window.showToast("🎯 Research Complete!",`Inspecting ${e} in your ATT&CK Comic Binder!`),window.fireConfetti()})}),r.querySelectorAll(".btn-claim-mission").forEach(n=>{n.addEventListener("click",h=>{const c=h.currentTarget.dataset.id,e=o.claimMissionReward(c);t.classList.add("hidden"),window.showToast("🎉 Mission Reward Claimed!",`Earned ${c} reward: +300 pts & ${e}x Booster Pack(s)!`),window.fireConfetti(),N(e)})}),t.classList.remove("hidden")}document.getElementById("btn-daily-missions")?.addEventListener("click",()=>{he()}),document.getElementById("btn-close-missions")?.addEventListener("click",()=>{document.getElementById("missions-modal")?.classList.add("hidden")}),document.getElementById("btn-card-deck")?.addEventListener("click",()=>{o.toggleView("cards")}),document.getElementById("view-mode-scenario")?.addEventListener("click",()=>{o.toggleView("scenario")}),document.getElementById("view-mode-cards")?.addEventListener("click",()=>{o.toggleView("cards")}),o.notify(),o.loadGame()?q?.classList.remove("hidden"):z()});
