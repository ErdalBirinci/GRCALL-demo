/**
 * Neural Net-Worth: The NIST RMF Simulator - Core Engine
 */

class AIProject {
  constructor(name, riskLevel) {
    this.name = name;
    this.riskLevel = riskLevel;
    this.isDeployed = false;
    this.isCertified = false;
    this.developmentProgress = 0;
    this.mapLevel = 0;
    this.measureLevel = 0;
    this.manageLevel = 0;
    this.governLevel = 0;
  }
}

const INCIDENTS = [
  {
    title: "Systemic Bias Found in Data",
    description: "An external audit revealed that the AI model strongly favors specific demographic backgrounds due to biased historical training data.",
    targetFunction: "measureLevel",
    threshold: 80,
    impactFail: { rep: 25, budget: 100000 },
    impactSuccess: { rep: 2, budget: 5000 },
    category: "FAIRNESS & BIAS",
    color: "rose"
  },
  {
    title: "AI Hallucinates Legal Advice",
    description: "The model provided incorrect, hallucinated advice to users, leading to a lawsuit threat.",
    targetFunction: "manageLevel",
    threshold: 75,
    impactFail: { rep: 30, budget: 150000 },
    impactSuccess: { rep: 5, budget: 10000 },
    category: "RELIABILITY",
    color: "amber"
  },
  {
    title: "EU AI Act Compliance Audit",
    description: "Regulators have selected this project for a sudden compliance audit under the new EU AI Act framework.",
    targetFunction: "governLevel",
    threshold: 85,
    impactFail: { rep: 15, budget: 200000 },
    impactSuccess: { rep: 0, budget: 0 },
    category: "COMPLIANCE",
    color: "sky"
  },
  {
    title: "Unforeseen Edge Case",
    description: "The model encountered a completely undocumented edge case in the operational environment, causing a system halt.",
    targetFunction: "mapLevel",
    threshold: 70,
    impactFail: { rep: 10, budget: 75000 },
    impactSuccess: { rep: 0, budget: 5000 },
    category: "CONTEXT & RISKS",
    color: "emerald"
  }
];

const GameState = {
  currentMonth: 1,
  maxMonths: 36,
  budget: 500000,
  reputation: 100,
  actionPointsPerMonth: 5,
  currentActionPoints: 5,
  projects: [],
  upgrades: { automatedTesting: false, riskDashboard: false, prFirm: false },
  monthlyModifier: null
};

const ACTION_COSTS = {
  dev: { ap: 1, money: 10000, name: "Push Development" },
  map: { ap: 1, money: 5000, name: "Invest in Map" },
  measure: { ap: 1, money: 15000, name: "Invest in Measure" },
  manage: { ap: 1, money: 10000, name: "Invest in Manage" },
  govern: { ap: 1, money: 5000, name: "Invest in Govern" },
  redteam: { ap: 2, money: 25000, name: "Red Team Test" }
};

let currentDifficulty = 'normal';
let baselineCost = 15000;

window.startGame = function(difficulty) {
  currentDifficulty = difficulty;
  
  if (difficulty === 'easy') {
      GameState.budget = 1000000;
      GameState.reputation = 100;
      GameState.actionPointsPerMonth = 6;
      baselineCost = 10000;
  } else if (difficulty === 'normal') {
      GameState.budget = 500000;
      GameState.reputation = 100;
      GameState.actionPointsPerMonth = 5;
      baselineCost = 15000;
  } else if (difficulty === 'hard') {
      GameState.budget = 250000;
      GameState.reputation = 80;
      GameState.actionPointsPerMonth = 4;
      baselineCost = 20000;
  }
  
  document.getElementById('welcome-screen').classList.add('hidden');
  initGame();
};

function initGame() {
  GameState.currentMonth = 1;
  GameState.currentActionPoints = GameState.actionPointsPerMonth;

  GameState.projects = [
    new AIProject("HR Resume Screener", "Low"),
    new AIProject("Customer Support LLM", "Medium"),
    new AIProject("Autonomous Logistics AI", "High")
  ];
  GameState.upgrades = { automatedTesting: false, riskDashboard: false, prFirm: false, leadResearcher: false, riskOfficer: false };
  GameState.monthlyModifier = null;

  document.getElementById('terminal-feed').innerHTML = ''; // Clear static terminal
  logTerminal("INFO: Neural Net-Worth Engine successfully deployed.");
  logTerminal(`INFO: Chief AI Officer assigned. Budget allocated: $${GameState.budget.toLocaleString()}.`);
  logTerminal(`INFO: Difficulty set to ${currentDifficulty.toUpperCase()}.`);
  
  renderDashboard();
  setupEventListeners();
}

function nextMonth() {
  if (GameState.currentMonth >= GameState.maxMonths) {
    gameOver(true, "Simulation Complete");
    return;
  }
  
  GameState.currentMonth++;
  GameState.currentActionPoints = GameState.actionPointsPerMonth;
  
  // Apply baseline operational costs
  const baselineCost = 15000;
  GameState.budget -= baselineCost;
  logTerminal(`INFO: Baseline ops cost -$${baselineCost.toLocaleString()}.`);

  GameState.monthlyModifier = null;

  // Calculate revenue from deployed projects
  const revenues = { Low: 10000, Medium: 25000, High: 50000 };
  let totalRevenue = 0;
  GameState.projects.forEach(p => {
    if (p.isDeployed) {
      const rev = p.isCertified ? (revenues[p.riskLevel] * 2) : revenues[p.riskLevel];
      totalRevenue += rev;
    }
  });
  
  // Apply Random Modifier
  if (Math.random() < 0.30) {
      const mods = ['TechBoom', 'Scrutiny', 'Breakthrough', 'CompetitorLeap'];
      GameState.monthlyModifier = mods[Math.floor(Math.random() * mods.length)];
  }

  if (GameState.monthlyModifier === 'TechBoom') {
      totalRevenue = Math.floor(totalRevenue * 1.5);
  }

  if (totalRevenue > 0) {
    GameState.budget += totalRevenue;
    logTerminal(`INFO: Revenue from live projects +$${totalRevenue.toLocaleString()}.`);
  }

  logTerminal(`INFO: Month ${GameState.currentMonth} started. Action points replenished.`);
  
  if (GameState.monthlyModifier === 'TechBoom') logTerminal("MARKET: Tech Boom! +50% Revenue this month.");
  if (GameState.monthlyModifier === 'Scrutiny') {
      logTerminal("MARKET: Regulatory Scrutiny! -$10k extra baseline cost.");
      GameState.budget -= 10000;
  }
  if (GameState.monthlyModifier === 'Breakthrough') logTerminal("MARKET: Open Source Breakthrough! Dev actions +10% this month.");
  if (GameState.monthlyModifier === 'CompetitorLeap') {
      const hasDeployed = GameState.projects.some(p => p.isDeployed);
      if (!hasDeployed) {
          logTerminal("MARKET: Competitor launched their AI first! -10% Reputation.");
          GameState.reputation -= 10;
      } else {
          logTerminal("MARKET: Competitor launched, but we hold market share.");
      }
  }

  // Apply Passive Talent Buffs
  if (GameState.upgrades.leadResearcher) {
      GameState.projects.forEach(p => {
          if (!p.isDeployed && p.developmentProgress < 100) p.developmentProgress = Math.min(100, p.developmentProgress + 10);
      });
  }
  if (GameState.upgrades.riskOfficer) {
      GameState.projects.forEach(p => {
          if (!p.isDeployed) {
              p.mapLevel = Math.min(100, p.mapLevel + 5);
              p.governLevel = Math.min(100, p.governLevel + 5);
          }
      });
  }
  
  // Check Board Directive
  let directiveTriggered = false;
  if (GameState.currentMonth % 6 === 0) {
    directiveTriggered = evaluateBoardDirective(GameState.currentMonth);
  }

  if (directiveTriggered) {
    return; // UI updating and game over checks happen when modal closes
  }

  // Check for events
  let eventTriggered = false;
  const liveProjects = GameState.projects.filter(p => p.isDeployed);
  if (liveProjects.length > 0) {
    if (Math.random() < 0.40) { // 40% chance
      const randomProject = liveProjects[Math.floor(Math.random() * liveProjects.length)];
      if (!randomProject.isCertified) {
        triggerEvent(randomProject);
        eventTriggered = true;
      } else {
        logTerminal(`INFO: Incident averted. ${randomProject.name} is Certified Trustworthy.`);
      }
    }
  }

  if (eventTriggered) {
    return; // UI updating and game over checks happen when modal closes
  }

  if (GameState.budget < 0) {
    gameOver(false, "Fired by the Board (Bankrupt)");
    return;
  }
  
  if (GameState.reputation < 0) {
    gameOver(false, "Fired by the Board (Reputation Destroyed)");
    return;
  }

  renderDashboard();
}

function evaluateBoardDirective(month) {
  let title = "Board Review";
  let description = "";
  let passed = false;
  let repImpact = 0;
  let budgetImpact = 0;

  if (month === 6) {
    title = "Directive: Initial Deployment";
    description = "The Board demands the HR Resume Screener be deployed by Month 6.";
    const p = GameState.projects.find(p => p.name.includes("HR"));
    passed = p && p.isDeployed;
    repImpact = passed ? 5 : -20;
    budgetImpact = passed ? 50000 : 0;
  } else if (month === 12) {
    title = "Directive: Risk Management Baseline";
    description = "The Board requires all Map levels to be at least 50% across all projects.";
    passed = GameState.projects.every(p => p.mapLevel >= 50);
    repImpact = passed ? 10 : -25;
    budgetImpact = passed ? 75000 : 0;
  } else if (month === 18) {
    title = "Directive: Medium Risk Live";
    description = "Customer Support LLM must be deployed to handle Q3 volumes.";
    const p = GameState.projects.find(p => p.name.includes("Customer"));
    passed = p && p.isDeployed;
    repImpact = passed ? 15 : -30;
    budgetImpact = passed ? 100000 : 0;
  } else if (month === 24) {
    title = "Directive: Governance Excellence";
    description = "Govern levels must be above 80% on all deployed projects.";
    const deployed = GameState.projects.filter(p => p.isDeployed);
    if (deployed.length === 0) passed = false;
    else passed = deployed.every(p => p.governLevel >= 80);
    repImpact = passed ? 15 : -35;
    budgetImpact = passed ? 150000 : 0;
  } else if (month === 30) {
    title = "Directive: High Stakes Logistics";
    description = "Logistics AI must be deployed with at least 80% in Measure and Manage to ensure safety.";
    const p = GameState.projects.find(p => p.name.includes("Logistics"));
    passed = p && p.isDeployed && p.measureLevel >= 80 && p.manageLevel >= 80;
    repImpact = passed ? 20 : -40;
    budgetImpact = passed ? 200000 : 0;
  } else {
    return false;
  }

  GameState.reputation += repImpact;
  GameState.budget += budgetImpact;
  
  if (repImpact < 0) {
     logTerminal(`ERROR: Board Directive Failed: ${title}`);
  } else {
     logTerminal(`INFO: Board Directive Met: ${title}`);
  }

  document.getElementById('modal-color-bar').className = `absolute top-0 left-0 w-full h-1 bg-purple-500`;
  document.getElementById('modal-category').innerText = "BOARD OF DIRECTORS";
  document.getElementById('modal-category').className = `text-[10px] text-purple-500 font-bold uppercase tracking-widest mb-1`;
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-description').innerText = description;
  
  let defenseLogHTML = `
    <p><span class="text-black">></span> Evaluating Month ${month} KPI...</p>
    <p class="${passed ? 'text-emerald-500' : 'text-rose-500'}">> STATUS: ${passed ? 'REQUIREMENTS MET' : 'REQUIREMENTS FAILED'}</p>
  `;
  document.getElementById('modal-defense-log').innerHTML = defenseLogHTML;
  
  const repEl = document.getElementById('modal-rep-impact');
  repEl.innerText = `${repImpact > 0 ? '+' : ''}${repImpact}%`;
  repEl.className = `text-xl font-bold ${repImpact > 0 ? 'text-green-600' : 'text-rose-500'}`;
  
  const budEl = document.getElementById('modal-budget-impact');
  budEl.innerText = `${budgetImpact > 0 ? '+' : ''}$${budgetImpact.toLocaleString()}`;
  budEl.className = `text-xl font-bold ${budgetImpact > 0 ? 'text-green-600' : 'text-slate-400'}`;

  document.getElementById('event-modal').classList.remove('hidden');
  return true;
}

function triggerEvent(project) {
  const incident = INCIDENTS[Math.floor(Math.random() * INCIDENTS.length)];
  const nistValue = project[incident.targetFunction];
  const passed = nistValue >= incident.threshold;

  let repImpact = 0;
  let budgetImpact = 0;
  
  let defenseLogHTML = `
    <p><span class="text-black">></span> Target Project: <span class="text-white">${project.name}</span></p>
    <p><span class="text-black">></span> Checking ${incident.targetFunction.replace('Level', '').toUpperCase()} level: <span class="text-blue-600">${nistValue}%</span></p>
    <p><span class="text-black">></span> Required threshold: <span class="text-slate-400">${incident.threshold}%</span></p>
  `;

  if (passed) {
    repImpact = incident.impactSuccess.rep;
    budgetImpact = incident.impactSuccess.budget;
    defenseLogHTML += `<p class="text-emerald-500">> DEFENSE SUCCESSFUL: Mitigation controls in place.</p>`;
    logTerminal(`INFO: ${incident.title} on ${project.name} mitigated successfully.`);
  } else {
    repImpact = incident.impactFail.rep;
    if (GameState.upgrades.prFirm) {
        repImpact = Math.floor(repImpact / 2);
        defenseLogHTML += `<p class="text-purple-400">> PR FIRM ACTIVE: Reputation damage halved.</p>`;
    }
    budgetImpact = incident.impactFail.budget;
    defenseLogHTML += `<p class="text-rose-500">> DEFENSE FAILED: Inadequate NIST RMF adherence.</p>`;
    logTerminal(`ERROR: ${incident.title} on ${project.name} caused a public scandal!`);
  }

  GameState.reputation -= repImpact;
  GameState.budget -= budgetImpact;

  // Render Modal
  document.getElementById('modal-color-bar').className = `absolute top-0 left-0 w-full h-1 bg-${incident.color}-500`;
  document.getElementById('modal-category').innerText = incident.category;
  document.getElementById('modal-category').className = `text-[10px] text-${incident.color}-500 font-bold uppercase tracking-widest mb-1`;
  document.getElementById('modal-title').innerText = incident.title;
  document.getElementById('modal-description').innerText = incident.description;
  document.getElementById('modal-defense-log').innerHTML = defenseLogHTML;
  
  const repEl = document.getElementById('modal-rep-impact');
  repEl.innerText = `-${repImpact}%`;
  repEl.className = `text-xl font-bold ${passed ? 'text-slate-400' : 'text-rose-500'}`;
  
  const budEl = document.getElementById('modal-budget-impact');
  budEl.innerText = `-$${budgetImpact.toLocaleString()}`;
  budEl.className = `text-xl font-bold ${passed ? 'text-slate-400' : 'text-rose-500'}`;

  document.getElementById('event-modal').classList.remove('hidden');
}

function closeEventModal() {
  document.getElementById('event-modal').classList.add('hidden');
  
  if (GameState.budget < 0) {
    gameOver(false, "Fired by the Board (Bankrupt)");
  } else if (GameState.reputation < 0) {
    gameOver(false, "Fired by the Board (Reputation Destroyed)");
  } else {
    renderDashboard();
  }
}

function performAction(projectIndex, actionType) {
  const cost = ACTION_COSTS[actionType];
  if (GameState.currentActionPoints < cost.ap) {
    logTerminal(`ERROR: Not enough Action Points for ${cost.name}.`);
    return;
  }
  if (GameState.budget < cost.money) {
    logTerminal(`ERROR: Insufficient funds for ${cost.name}.`);
    return;
  }

  GameState.currentActionPoints -= cost.ap;
  GameState.budget -= cost.money;

  const p = GameState.projects[projectIndex];
  let increment = Math.floor(Math.random() * 11) + 10; // Random between 10-20
  
  if (GameState.monthlyModifier === 'Breakthrough' && actionType === 'dev') increment += 10;
  if (GameState.upgrades.automatedTesting && (actionType === 'dev' || actionType === 'measure')) increment += 5;
  if (GameState.upgrades.riskDashboard && (actionType === 'map' || actionType === 'manage' || actionType === 'govern')) increment += 5;
  
  if (actionType === 'dev') p.developmentProgress = Math.min(100, p.developmentProgress + increment);
  else if (actionType === 'map') p.mapLevel = Math.min(100, p.mapLevel + increment);
  else if (actionType === 'measure') p.measureLevel = Math.min(100, p.measureLevel + increment);
  else if (actionType === 'manage') p.manageLevel = Math.min(100, p.manageLevel + increment);
  else if (actionType === 'govern') p.governLevel = Math.min(100, p.governLevel + increment);
  else if (actionType === 'redteam') {
      p.mapLevel = Math.min(100, p.mapLevel + 20);
      p.measureLevel = Math.min(100, p.measureLevel + 20);
  }

  logTerminal(`ACTION: ${cost.name} on ${p.name} (+${actionType === 'redteam' ? '20' : increment}%).`);
  
  if (p.mapLevel >= 100 && p.measureLevel >= 100 && p.manageLevel >= 100 && p.governLevel >= 100 && !p.isCertified) {
    p.isCertified = true;
    logTerminal(`INFO: ${p.name} achieved Trustworthy AI Certification!`);
  }

  renderDashboard();
}

function deployModel(projectIndex) {
  const p = GameState.projects[projectIndex];
  if (p.developmentProgress < 100) return;
  
  p.isDeployed = true;
  logTerminal(`ACTION: Deployed ${p.name} to Production.`);
  renderDashboard();
}

function gameOver(win, reason) {
  logTerminal(`INFO: GAME OVER - ${reason}`);
  const board = document.getElementById('game-board');
  
  if (!win) {
    board.innerHTML = `
    <div class="flex-1 flex flex-col items-center justify-center border-8 border-black bg-yellow-300 p-8 relative overflow-hidden shadow-[16px_16px_0px_#000] transform rotate-1">
      <div class="absolute top-0 left-0 w-full h-4 bg-blue-500 border-b-4 border-black"></div>
      
      <p class="text-black bg-white border-2 border-black px-2 py-1 font-black text-sm tracking-widest uppercase mb-2 shadow-[2px_2px_0px_#000] transform -rotate-1">3-Year AI Governance Review</p>
      <h2 class="text-6xl font-['Bangers'] text-black mb-8 drop-shadow-[2px_2px_0px_#fff] transform rotate-1">Final Audit Report!</h2>
      
      <div class="grid grid-cols-2 gap-8 w-full max-w-2xl mb-8">
        <div class="space-y-4">
          <div class="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000] transform -rotate-1">
            <p class="text-[10px] text-black font-black uppercase tracking-widest mb-1">Final Budget</p>
            <p class="text-4xl font-['Bangers'] text-green-600 drop-shadow-[1px_1px_0px_#000]">${GameState.budget.toLocaleString()}</p>
          </div>
          <div class="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000] transform rotate-1">
            <p class="text-[10px] text-black font-black uppercase tracking-widest mb-1">Final Reputation</p>
            <p class="text-4xl font-['Bangers'] text-blue-600 drop-shadow-[1px_1px_0px_#000]">${GameState.reputation}%</p>
          </div>
        </div>
        
        <div class="bg-white border-4 border-black p-4 flex flex-col items-center justify-center shadow-[4px_4px_0px_#000] transform -rotate-2">
          <p class="text-xs text-black font-black uppercase tracking-widest mb-2 bg-yellow-200 border-2 border-black px-2">Overall Grade</p>
          <div class="w-32 h-32 rounded-full border-8 ${grade.includes('A') ? 'border-green-500 text-green-500' : (grade.includes('B') ? 'border-blue-500 text-blue-500' : (grade.includes('C') ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'))} flex items-center justify-center text-6xl font-['Bangers'] drop-shadow-[2px_2px_0px_#000]">
            ${grade}
          </div>
        </div>
      </div>
      
      <div class="w-full max-w-2xl bg-white border-4 border-black p-4 mb-8 shadow-[8px_8px_0px_#000] transform rotate-1">
        <p class="text-xs text-black font-black uppercase tracking-widest mb-4 border-b-4 border-black pb-2">Portfolio Summary</p>
        <div class="space-y-2 text-lg text-black font-bold">
          <p class="flex justify-between border-b-2 border-dashed border-gray-300 pb-1"><span>Projects Deployed:</span> <span class="font-black text-blue-600">${deployedCount} / 3</span></p>
          <p class="flex justify-between border-b-2 border-dashed border-gray-300 pb-1"><span>Trustworthy Certified AI:</span> <span class="font-black text-green-600">${certifiedCount}</span></p>
          <p class="flex justify-between border-b-2 border-dashed border-gray-300 pb-1"><span>Total NIST Framework Score:</span> <span class="font-black text-blue-600">${totalNist} pts</span></p>
          <p class="flex justify-between"><span>Global Talents Recruited:</span> <span class="font-black text-purple-600">${(GameState.upgrades.leadResearcher ? 1 : 0) + (GameState.upgrades.riskOfficer ? 1 : 0)} / 2</span></p>
        </div>
      </div>

      <button onclick="location.reload()" class="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-['Bangers'] text-3xl uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#000] transform -rotate-1">Play Again!</button>
    </div>
  `;
  
  // Disable top UI elements
  document.getElementById('btn-advance-month').disabled = true;
  document.getElementById('btn-advance-month').classList.add('opacity-30', 'cursor-not-allowed');
}

function updateGauges() {
  document.getElementById('ui-month').innerHTML = `${String(GameState.currentMonth).padStart(2, '0')}<span class="text-sm">/36</span>`;
  document.getElementById('ui-budget').innerText = `$${GameState.budget.toLocaleString()}`;
  document.getElementById('ui-reputation').innerText = `${GameState.reputation}%`;
  
  const apContainer = document.getElementById('ui-ap');
  apContainer.innerHTML = '';
  const totalPips = Math.max(GameState.actionPointsPerMonth, GameState.currentActionPoints);
  for(let i=0; i<totalPips; i++) {
    const pip = document.createElement('div');
    pip.className = `w-4 h-4 border-2 border-black ${i < GameState.currentActionPoints ? (i >= GameState.actionPointsPerMonth ? 'bg-red-500' : 'bg-blue-500') : 'bg-gray-300'} transition-all duration-300`;
    apContainer.appendChild(pip);
  }
}

function renderProjectCards() {
  const container = document.getElementById('project-cards-container');
  container.innerHTML = '';

  const riskColors = { Low: 'green-400', Medium: 'yellow-400', High: 'red-400' };
  const riskDescriptions = {
    Low: "AI-driven vetting for high-volume recruitment cycles. Low privacy sensitivity.",
    Medium: "Generative assistant for client interactions. Potential for hallucinations and PII leaks.",
    High: "Autonomous navigation for warehouse fleet. Safety-critical physical operations."
  };

  GameState.projects.forEach((p, index) => {
    const color = riskColors[p.riskLevel];
    const desc = riskDescriptions[p.riskLevel];
    const outOfAp = GameState.currentActionPoints <= 0;
    
    // Check if buttons should be visually disabled
    const getBtnState = (cost, apCost = 1) => {
       if (GameState.currentActionPoints < apCost || GameState.budget < cost) return 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 shadow-[2px_2px_0px_#000]';
       return 'hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#000] shadow-[2px_2px_0px_#000] bg-white text-black hover:bg-yellow-100';
    };

    const card = document.createElement('div');
    const rotateClass = index === 0 ? 'rotate-1' : (index === 1 ? '-rotate-1' : 'rotate-2');
    card.className = `bg-white border-4 border-black flex flex-col p-5 relative overflow-hidden transition-transform duration-300 shadow-[6px_6px_0px_#000] transform ${rotateClass} hover:-translate-y-2`;
    card.innerHTML = `
      <div class="absolute top-0 left-0 w-full h-3 bg-${color} border-b-4 border-black"></div>
      <div class="flex justify-between items-start mb-4 mt-2">
        <h2 class="text-2xl font-['Bangers'] text-black">${p.name}</h2>
        <span class="bg-${color} border-2 border-black text-black px-2 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#000] transform rotate-2">Risk: ${p.riskLevel}</span>
      </div>
      <p class="text-sm text-black font-bold mb-6 h-12">${desc}</p>
      
      <div class="mb-4">
        <div class="flex justify-between text-xs font-black uppercase mb-1">
          <span>Dev Progress</span>
          <span class="text-black">${p.developmentProgress}%</span>
        </div>
        <div class="w-full h-4 bg-gray-200 border-2 border-black overflow-hidden">
          <div class="h-full bg-blue-400 transition-all duration-500 border-r-2 border-black" style="width: ${p.developmentProgress}%"></div>
        </div>
      </div>

      <div class="space-y-4 mb-6">
        <p class="text-[10px] text-black font-black uppercase tracking-widest bg-yellow-200 inline-block px-2 border-2 border-black transform -rotate-1 shadow-[1px_1px_0px_#000]">NIST RMF Functions</p>
        <div class="space-y-3 text-xs uppercase font-bold">
          <div>
            <div class="flex justify-between mb-1"><span>Map</span><span class="text-blue-600">${p.mapLevel}%</span></div>
            <div class="w-full h-3 bg-gray-200 border-2 border-black"><div class="h-full bg-blue-500 border-r-2 border-black transition-all" style="width: ${p.mapLevel}%"></div></div>
          </div>
          <div>
            <div class="flex justify-between mb-1"><span>Measure</span><span class="text-green-600">${p.measureLevel}%</span></div>
            <div class="w-full h-3 bg-gray-200 border-2 border-black"><div class="h-full bg-green-500 border-r-2 border-black transition-all" style="width: ${p.measureLevel}%"></div></div>
          </div>
          <div>
            <div class="flex justify-between mb-1"><span>Manage</span><span class="text-purple-600">${p.manageLevel}%</span></div>
            <div class="w-full h-3 bg-gray-200 border-2 border-black"><div class="h-full bg-purple-500 border-r-2 border-black transition-all" style="width: ${p.manageLevel}%"></div></div>
          </div>
          <div>
            <div class="flex justify-between mb-1"><span>Govern</span><span class="text-red-600">${p.governLevel}%</span></div>
            <div class="w-full h-3 bg-gray-200 border-2 border-black"><div class="h-full bg-red-500 border-r-2 border-black transition-all" style="width: ${p.governLevel}%"></div></div>
          </div>
        </div>
      </div>

      <div class="mt-auto grid gap-2 transition-opacity duration-300">
        ${p.isDeployed ? `
          <div class="col-span-2 py-3 bg-green-200 border-4 border-black text-center relative overflow-hidden shadow-[4px_4px_0px_#000] transform rotate-1">
            <span class="text-black text-xl font-['Bangers'] uppercase tracking-widest block mb-1">STATUS: LIVE!</span>
            <span class="text-black font-bold text-xs">${p.isCertified ? '<span class="bg-yellow-300 px-1 border border-black">TRUSTWORTHY AI CERTIFIED (2X REV)</span>' : 'Generating Monthly Revenue'}</span>
          </div>
        ` : (p.developmentProgress >= 100 ? `
          <button class="deploy-btn col-span-2 py-3 bg-green-400 text-black text-xl font-['Bangers'] uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#000]" data-index="${index}">Deploy to Production!</button>
        ` : `
          <div class="grid grid-cols-2 gap-2">
            <button class="action-btn col-span-2 py-1.5 text-xs font-black uppercase border-2 border-black transition-transform ${getBtnState(10000)}" data-action="dev" data-index="${index}">Push Dev ($10k)</button>
            <button class="action-btn py-1.5 text-xs font-black uppercase border-2 border-black transition-transform ${getBtnState(5000)}" data-action="map" data-index="${index}">Map ($5k)</button>
            <button class="action-btn py-1.5 text-xs font-black uppercase border-2 border-black transition-transform ${getBtnState(15000)}" data-action="measure" data-index="${index}">Measure ($15k)</button>
            <button class="action-btn py-1.5 text-xs font-black uppercase border-2 border-black transition-transform ${getBtnState(10000)}" data-action="manage" data-index="${index}">Manage ($10k)</button>
            <button class="action-btn py-1.5 text-xs font-black uppercase border-2 border-black transition-transform ${getBtnState(5000)}" data-action="govern" data-index="${index}">Govern ($5k)</button>
            <button class="action-btn col-span-2 py-1.5 text-xs font-black uppercase border-2 border-black transition-transform ${getBtnState(25000, 2)} !bg-red-400 !text-white hover:!bg-red-300" data-action="redteam" data-index="${index}">Red Team ($25k / 2 AP)</button>
          </div>
        `)}
      </div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('cursor-not-allowed')) return;
      const action = e.target.getAttribute('data-action');
      const index = e.target.getAttribute('data-index');
      performAction(index, action);
    });
  });

  document.querySelectorAll('.deploy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      deployModel(index);
    });
  });
}

function renderDashboard() {
  updateGauges();
  renderProjectCards();
}

function logTerminal(msg) {
  const terminal = document.getElementById('terminal-feed');
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
  const p = document.createElement('p');
  
  if (msg.startsWith('ERROR')) {
    p.innerHTML = `<span class="text-black">[${time}]</span> <span class="text-rose-500">ERROR</span>: ${msg.replace('ERROR: ', '')}`;
  } else if (msg.startsWith('ACTION')) {
    p.innerHTML = `<span class="text-black">[${time}]</span> <span class="text-blue-600">ACTION</span>: ${msg.replace('ACTION: ', '')}`;
  } else if (msg.startsWith('INFO')) {
    p.innerHTML = `<span class="text-black">[${time}]</span> <span class="text-green-600">INFO</span>: ${msg.replace('INFO: ', '')}`;
  } else if (msg.startsWith('MARKET')) {
    p.innerHTML = `<span class="text-black">[${time}]</span> <span class="text-purple-400">MARKET</span>: ${msg.replace('MARKET: ', '')}`;
  }
  
  terminal.appendChild(p);
  while (terminal.childElementCount > 5) {
    terminal.removeChild(terminal.firstElementChild);
  }
}

function crunchTime() {
  if (GameState.budget < 25000 || GameState.reputation <= 5) {
    logTerminal("ERROR: Cannot authorize Crunch Time (Need $25k & >5% Rep).");
    return;
  }
  GameState.budget -= 25000;
  GameState.reputation -= 5;
  GameState.currentActionPoints += 2;
  logTerminal("ACTION: Crunch Time authorized! +2 AP, -$25k, -5% Rep.");
  renderDashboard();
}

function openStrategyModal() {
  renderStrategyModal();
  document.getElementById('strategy-modal').classList.remove('hidden');
}

function closeStrategyModal() {
  document.getElementById('strategy-modal').classList.add('hidden');
}

window.buyUpgrade = function(upgradeKey, cost) {
  if (GameState.budget < cost) {
    logTerminal("ERROR: Insufficient funds for upgrade.");
    return;
  }
  if (GameState.upgrades[upgradeKey]) {
    return;
  }
  
  GameState.budget -= cost;
  GameState.upgrades[upgradeKey] = true;
  logTerminal(`INFO: Acquired Global Upgrade: ${upgradeKey}`);
  renderDashboard();
  renderStrategyModal();
};

function renderStrategyModal() {
  const container = document.getElementById('strategy-list');
  container.innerHTML = '';
  
  const upgrades = [
    { key: 'automatedTesting', name: 'Automated Testing Framework', desc: 'Permanently adds +5% progress to Dev and Measure actions.', cost: 50000 },
    { key: 'riskDashboard', name: 'Enterprise Risk Dashboard', desc: 'Permanently adds +5% progress to Map, Manage, and Govern actions.', cost: 40000 },
    { key: 'prFirm', name: 'Retain PR Firm', desc: 'Halves Reputation damage from all Critical Incidents and Scandals.', cost: 75000 },
    { key: 'leadResearcher', name: 'Hire Lead AI Researcher', desc: 'Passive: +10% Dev progress to all unreleased projects every month.', cost: 80000 },
    { key: 'riskOfficer', name: 'Hire Risk Compliance Officer', desc: 'Passive: +5% Map and Govern to all unreleased projects every month.', cost: 60000 }
  ];

  upgrades.forEach((upg, index) => {
    const isOwned = GameState.upgrades[upg.key];
    const canAfford = GameState.budget >= upg.cost;
    
    const rotateClass = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
    const div = document.createElement('div');
    div.className = `p-4 border-4 border-black ${isOwned ? 'bg-green-300 shadow-[4px_4px_0px_#000]' : 'bg-white shadow-[4px_4px_0px_#000]'} flex justify-between items-center transform ${rotateClass}`;
    
    div.innerHTML = `
      <div>
        <h3 class="font-['Bangers'] text-2xl text-black">${upg.name}</h3>
        <p class="text-xs text-black font-bold mt-1 bg-yellow-200 inline-block px-2 border-2 border-black transform rotate-1">${upg.desc}</p>
      </div>
      <div>
        ${isOwned 
          ? '<span class="text-black font-black bg-white px-2 py-1 border-2 border-black transform -rotate-2 inline-block shadow-[2px_2px_0px_#000]">ACTIVE!</span>' 
          : `<button class="px-4 py-2 ${canAfford ? 'bg-blue-400 hover:bg-blue-300 hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#000]' : 'bg-gray-300 opacity-50 cursor-not-allowed'} text-black font-['Bangers'] text-xl uppercase tracking-widest border-4 border-black transition-transform shadow-[4px_4px_0px_#000]" onclick="buyUpgrade('${upg.key}', ${upg.cost})">Acquire ($${upg.cost.toLocaleString()})</button>`}
      </div>
    `;
    container.appendChild(div);
  });
}

function setupEventListeners() {
  document.getElementById('btn-advance-month').addEventListener('click', nextMonth);
  document.getElementById('btn-close-modal').addEventListener('click', closeEventModal);
  document.getElementById('btn-global-strategy').addEventListener('click', openStrategyModal);
  document.getElementById('btn-crunch-time').addEventListener('click', crunchTime);
  document.getElementById('btn-close-strategy').addEventListener('click', closeStrategyModal);
  
  // Welcome screen / help listeners
  const helpBtn = document.getElementById('btn-how-to-play');
  if (helpBtn) helpBtn.addEventListener('click', () => {
      document.getElementById('help-modal').classList.remove('hidden');
  });
  
  const closeHelpBtn = document.getElementById('btn-close-help');
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', () => {
      document.getElementById('help-modal').classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});


}
