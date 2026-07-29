let algebraMode = 'solver';

/* --- SETTINGS CABINET DRAWER CONTROLS & THEME SWITCHER --- */
function openCabinet() {
  document.getElementById('settings-cabinet').classList.add('open');
  document.getElementById('cabinet-overlay').classList.add('active');
}

function closeCabinet() {
  document.getElementById('settings-cabinet').classList.remove('open');
  document.getElementById('cabinet-overlay').classList.remove('active');
}

const themes = {
  blue: {
    '--bg-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    '--card-bg': 'rgba(30, 41, 59, 0.7)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)',
    '--accent-color': '#38bdf8',
    '--accent-hover': '#0284c7',
    '--text-main': '#f8fafc',
    '--text-muted': '#94a3b8',
    '--btn-bg': '#334155',
    '--btn-hover': '#475569',
    '--btn-sci': '#1e293b',
    '--btn-sci-hover': '#334155',
    '--btn-op': '#0284c7',
    '--btn-op-hover': '#0369a1',
    '--inner-box-bg': 'rgba(15, 23, 42, 0.85)',
    '--input-bg': 'rgba(30, 41, 59, 0.9)',
    '--btn-sec-text': '#f8fafc'
  },
  purple: {
    '--bg-gradient': 'linear-gradient(135deg, #180d2a 0%, #2a1b4e 100%)',
    '--card-bg': 'rgba(42, 27, 78, 0.7)',
    '--glass-border': 'rgba(255, 255, 255, 0.12)',
    '--accent-color': '#c084fc',
    '--accent-hover': '#a855f7',
    '--text-main': '#faf5ff',
    '--text-muted': '#c084fc',
    '--btn-bg': '#3b2164',
    '--btn-hover': '#522f8a',
    '--btn-sci': '#241442',
    '--btn-sci-hover': '#3b2164',
    '--btn-op': '#9333ea',
    '--btn-op-hover': '#7e22ce',
    '--inner-box-bg': 'rgba(24, 13, 42, 0.85)',
    '--input-bg': 'rgba(42, 27, 78, 0.9)',
    '--btn-sec-text': '#faf5ff'
  },
  emerald: {
    '--bg-gradient': 'linear-gradient(135deg, #062c21 0%, #0d4a38 100%)',
    '--card-bg': 'rgba(13, 74, 56, 0.7)',
    '--glass-border': 'rgba(255, 255, 255, 0.12)',
    '--accent-color': '#34d399',
    '--accent-hover': '#10b981',
    '--text-main': '#ecfdf5',
    '--text-muted': '#6ee7b7',
    '--btn-bg': '#12614b',
    '--btn-hover': '#187e62',
    '--btn-sci': '#0a3d2e',
    '--btn-sci-hover': '#12614b',
    '--btn-op': '#059669',
    '--btn-op-hover': '#047857',
    '--inner-box-bg': 'rgba(6, 44, 33, 0.85)',
    '--input-bg': 'rgba(13, 74, 56, 0.9)',
    '--btn-sec-text': '#ecfdf5'
  },
  sunset: {
    '--bg-gradient': 'linear-gradient(135deg, #2c120a 0%, #4a2113 100%)',
    '--card-bg': 'rgba(74, 33, 19, 0.7)',
    '--glass-border': 'rgba(255, 255, 255, 0.12)',
    '--accent-color': '#fb923c',
    '--accent-hover': '#f97316',
    '--text-main': '#fff7ed',
    '--text-muted': '#fdba74',
    '--btn-bg': '#612a18',
    '--btn-hover': '#7e3720',
    '--btn-sci': '#3d1a0e',
    '--btn-sci-hover': '#612a18',
    '--btn-op': '#ea580c',
    '--btn-op-hover': '#c2410c',
    '--inner-box-bg': 'rgba(44, 18, 10, 0.85)',
    '--input-bg': 'rgba(74, 33, 19, 0.9)',
    '--btn-sec-text': '#fff7ed'
  },
  light: {
    '--bg-gradient': 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    '--card-bg': 'rgba(255, 255, 255, 0.9)',
    '--glass-border': 'rgba(0, 0, 0, 0.12)',
    '--accent-color': '#0284c7',
    '--accent-hover': '#0369a1',
    '--text-main': '#0f172a',
    '--text-muted': '#475569',
    '--btn-bg': '#e2e8f0',
    '--btn-hover': '#cbd5e1',
    '--btn-sci': '#f1f5f9',
    '--btn-sci-hover': '#e2e8f0',
    '--btn-op': '#0284c7',
    '--btn-op-hover': '#0369a1',
    '--inner-box-bg': 'rgba(241, 245, 249, 0.9)',
    '--input-bg': '#ffffff',
    '--btn-sec-text': '#0f172a'
  }
};

function selectThemeDrawer(themeKey) {
  const selectedTheme = themes[themeKey] || themes.blue;
  const root = document.documentElement;

  for (const [property, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(property, value);
  }

  document.querySelectorAll('.theme-drawer-card').forEach(card => card.classList.remove('active'));
  const activeCard = document.getElementById(`drawer-${themeKey}`);
  if (activeCard) activeCard.classList.add('active');

  localStorage.setItem('site_theme', themeKey);
}

// Load saved theme on boot
const savedTheme = localStorage.getItem('site_theme') || 'blue';
selectThemeDrawer(savedTheme);

/* --- SIDEBAR NAV & TAB LOGIC --- */
function toggleNavDropdown(btn) {
  btn.classList.toggle('open');
  document.getElementById('calc-sub-menu').classList.toggle('show');
}

function switchNavMode(mode) {
  document.querySelectorAll('.sub-menu-btn').forEach(btn => btn.classList.remove('active'));
  const topTabs = document.getElementById('top-tabs');
  
  if (mode === 'scientific') {
    document.getElementById('btn-sub-sci').classList.add('active');
    topTabs.style.display = 'flex';
    switchTab('calculator');
  } else if (mode === 'algebra') {
    document.getElementById('btn-sub-alg').classList.add('active');
    topTabs.style.display = 'none';
    switchTab('algebra');
  } else if (mode === 'future') {
    document.getElementById('btn-sub-fut').classList.add('active');
    topTabs.style.display = 'none';
    switchTab('future');
  }
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

  if (tab === 'calculator') {
    document.getElementById('tab-calc-btn').classList.add('active');
    document.getElementById('calculator-view').classList.add('active');
  } else if (tab === 'converter') {
    document.getElementById('tab-conv-btn').classList.add('active');
    document.getElementById('converter-view').classList.add('active');
  } else if (tab === 'algebra') {
    document.getElementById('algebra-view').classList.add('active');
  } else if (tab === 'future') {
    document.getElementById('future-view').classList.add('active');
  }
}

/* --- ALGEBRA ENGINE & BUILDER --- */
function switchAlgebraMode(mode) {
  algebraMode = mode;
  document.getElementById('mode-solver-btn').classList.toggle('active', mode === 'solver');
  document.getElementById('mode-reverse-btn').classList.toggle('active', mode === 'reverse');
  document.getElementById('alg-action-btn').innerText = mode === 'solver' ? 'Solve Equation' : 'Generate Equations';
  document.getElementById('result-title').innerText = mode === 'solver' ? 'Calculated Solution:' : 'Generated Matching Equation:';
  renderAlgebraBuilder();
}

function renderAlgebraBuilder() {
  const container = document.getElementById('algebra-builder-container');
  const eqType = document.getElementById('alg-eq-type').value;

  if (algebraMode === 'reverse') {
    container.innerHTML = `
      <span class="alg-symbol">Target Value:</span>
      <select id="alg-var-name" class="alg-select">
        <option value="x">x</option>
        <option value="y">y</option>
        <option value="z">z</option>
        <option value="a">a</option>
        <option value="b">b</option>
      </select>
      <span class="alg-symbol">=</span>
      <input type="number" id="alg-target-val" class="alg-input" value="7" placeholder="val" />
    `;
    return;
  }

  if (eqType === 'linear') {
    container.innerHTML = `
      <input type="number" id="alg-coeff" class="alg-input" value="4" placeholder="a" />
      <select id="alg-var-name" class="alg-select">
        <option value="x">x</option>
        <option value="y">y</option>
        <option value="z">z</option>
        <option value="a">a</option>
        <option value="b">b</option>
      </select>
      <select id="alg-exponent" class="alg-select">
        <option value="1">¹</option>
        <option value="2">²</option>
      </select>
      <select id="alg-op" class="alg-select">
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input type="number" id="alg-const" class="alg-input" value="3" placeholder="b" />
      <span class="alg-symbol">=</span>
      <input type="number" id="alg-rhs" class="alg-input" value="15" placeholder="c" />
    `;
  } else if (eqType === 'quadratic') {
    container.innerHTML = `
      <input type="number" id="alg-q-a" class="alg-input" value="1" placeholder="a" />
      <select id="alg-var-name" class="alg-select">
        <option value="x">x</option>
        <option value="y">y</option>
        <option value="z">z</option>
      </select>
      <span class="alg-symbol">² +</span>
      <input type="number" id="alg-q-b" class="alg-input" value="-5" placeholder="b" />
      <span class="alg-symbol">(var) +</span>
      <input type="number" id="alg-q-c" class="alg-input" value="6" placeholder="c" />
      <span class="alg-symbol">= 0</span>
    `;
  } else if (eqType === 'rational') {
    container.innerHTML = `
      <input type="number" id="alg-r-a" class="alg-input" value="12" placeholder="a" />
      <span class="alg-symbol">/</span>
      <select id="alg-var-name" class="alg-select">
        <option value="x">x</option>
        <option value="y">y</option>
        <option value="z">z</option>
      </select>
      <select id="alg-op" class="alg-select">
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input type="number" id="alg-r-b" class="alg-input" value="2" placeholder="b" />
      <span class="alg-symbol">=</span>
      <input type="number" id="alg-r-c" class="alg-input" value="6" placeholder="c" />
    `;
  }
}

function executeAlgebraAction() {
  if (algebraMode === 'reverse') {
    generateReverseAlgebra();
  } else {
    solveAlgebra();
  }
}

function solveAlgebra() {
  const eqType = document.getElementById('alg-eq-type').value;
  const v = document.getElementById('alg-var-name').value;
  const solDisplay = document.getElementById('algebra-solution');
  const stepDisplay = document.getElementById('algebra-steps');

  if (eqType === 'linear') {
    const a = parseFloat(document.getElementById('alg-coeff').value);
    const exp = parseInt(document.getElementById('alg-exponent').value);
    const op = document.getElementById('alg-op').value;
    const b = parseFloat(document.getElementById('alg-const').value);
    const c = parseFloat(document.getElementById('alg-rhs').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      solDisplay.innerText = "Invalid Input";
      stepDisplay.innerText = "Please enter valid numbers.";
      return;
    }

    let adjustedC = (op === '+') ? (c - b) : (c + b);
    let stepText = `1. Isolate variable term: ${a}${v}${exp === 2 ? '²' : ''} = ${c} ${op === '+' ? '-' : '+'} ${b} = ${adjustedC}\n`;
    let val = adjustedC / a;
    stepText += `2. Divide by coefficient (${a}): ${v}${exp === 2 ? '²' : ''} = ${val}\n`;

    let finalAns = '';
    if (exp === 1) {
      finalAns = `${v} = ${val % 1 === 0 ? val : val.toFixed(2)}`;
    } else {
      if (val < 0) {
        finalAns = "No Real Solution";
        stepText += `3. Square root of negative values is imaginary.`;
      } else {
        let root = Math.sqrt(val);
        finalAns = `${v} = ±${root % 1 === 0 ? root : root.toFixed(2)}`;
        stepText += `3. Take square root: ${v} = ±${root % 1 === 0 ? root : root.toFixed(2)}`;
      }
    }
    solDisplay.innerText = finalAns;
    stepDisplay.innerText = stepText;
    saveHistory(`Algebra: ${a}${v}${exp === 2 ? '²' : ''} ${op} ${b} = ${c} ➔ ${finalAns}`);

  } else if (eqType === 'quadratic') {
    const a = parseFloat(document.getElementById('alg-q-a').value);
    const b = parseFloat(document.getElementById('alg-q-b').value);
    const c = parseFloat(document.getElementById('alg-q-c').value);

    const disc = b * b - 4 * a * c;
    let stepText = `1. Discriminant (b² - 4ac) = (${b})² - 4(${a})(${c}) = ${disc}\n`;

    if (disc < 0) {
      solDisplay.innerText = "No Real Roots";
      stepText += `2. Discriminant < 0, equation has complex solutions.`;
    } else {
      const r1 = (-b + Math.sqrt(disc)) / (2 * a);
      const r2 = (-b - Math.sqrt(disc)) / (2 * a);
      const ans = `${v} = ${r1 % 1 === 0 ? r1 : r1.toFixed(2)}, ${v} = ${r2 % 1 === 0 ? r2 : r2.toFixed(2)}`;
      solDisplay.innerText = ans;
      stepText += `2. Apply Quadratic Formula: ${v} = (-b ± √D) / 2a\n`;
      stepText += `3. Calculated roots: ${ans}`;
      saveHistory(`Quadratic: ${a}${v}² + ${b}${v} + ${c} = 0 ➔ ${ans}`);
    }
    stepDisplay.innerText = stepText;

  } else if (eqType === 'rational') {
    const a = parseFloat(document.getElementById('alg-r-a').value);
    const op = document.getElementById('alg-op').value;
    const b = parseFloat(document.getElementById('alg-r-b').value);
    const c = parseFloat(document.getElementById('alg-r-c').value);

    let targetRHS = op === '+' ? (c - b) : (c + b);
    let stepText = `1. Isolate term: ${a}/${v} = ${c} ${op === '+' ? '-' : '+'} ${b} = ${targetRHS}\n`;
    let val = a / targetRHS;
    stepText += `2. Solve for ${v}: ${v} = ${a} / ${targetRHS} = ${val % 1 === 0 ? val : val.toFixed(2)}`;

    const ans = `${v} = ${val % 1 === 0 ? val : val.toFixed(2)}`;
    solDisplay.innerText = ans;
    stepDisplay.innerText = stepText;
    saveHistory(`Rational: ${a}/${v} ${op} ${b} = ${c} ➔ ${ans}`);
  }
}

function generateReverseAlgebra() {
  const v = document.getElementById('alg-var-name').value;
  const targetVal = parseFloat(document.getElementById('alg-target-val').value);
  const solDisplay = document.getElementById('algebra-solution');
  const stepDisplay = document.getElementById('algebra-steps');

  if (isNaN(targetVal)) {
    solDisplay.innerText = "Invalid Input";
    return;
  }

  const a = Math.floor(Math.random() * 5) + 2;
  const b = Math.floor(Math.random() * 10) + 1;
  const c = a * targetVal + b;

  const generatedEq = `${a}${v} + ${b} = ${c}`;
  solDisplay.innerText = generatedEq;
  stepDisplay.innerText = `Reverse Engine Proof:\n1. Start with target: ${v} = ${targetVal}\n2. Multiply by ${a}: ${a}${v} = ${a * targetVal}\n3. Add constant ${b}: ${a}${v} + ${b} = ${c}`;

  saveHistory(`Reverse Gen: Target ${v}=${targetVal} ➔ ${generatedEq}`);
}

function generateRandomAlgebra() {
  if (algebraMode === 'reverse') {
    document.getElementById('alg-target-val').value = Math.floor(Math.random() * 15) - 5;
    generateReverseAlgebra();
    return;
  }

  const eqType = document.getElementById('alg-eq-type').value;
  if (eqType === 'linear') {
    document.getElementById('alg-coeff').value = Math.floor(Math.random() * 8) + 1;
    document.getElementById('alg-const').value = Math.floor(Math.random() * 10) + 1;
    document.getElementById('alg-rhs').value = Math.floor(Math.random() * 30) + 5;
  } else if (eqType === 'quadratic') {
    document.getElementById('alg-q-a').value = 1;
    document.getElementById('alg-q-b').value = -1 * (Math.floor(Math.random() * 8) + 2);
    document.getElementById('alg-q-c').value = Math.floor(Math.random() * 12) + 1;
  } else if (eqType === 'rational') {
    document.getElementById('alg-r-a').value = Math.floor(Math.random() * 20) + 5;
    document.getElementById('alg-r-b').value = Math.floor(Math.random() * 5) + 1;
    document.getElementById('alg-r-c').value = Math.floor(Math.random() * 10) + 6;
  }
  solveAlgebra();
}

/* --- CALCULATOR ENGINE LOGIC --- */
let currentInput = '0';
let previousInput = '';
let operator = null;
let fullEquation = '';
let isNewCalculation = false;
let calculationHistory = JSON.parse(localStorage.getItem('calc_history')) || [];

const currOpDisplay = document.getElementById('curr-op');
const prevOpDisplay = document.getElementById('prev-op');
const historyList = document.getElementById('history-list');

function updateDisplay() {
  currOpDisplay.innerText = currentInput;
  prevOpDisplay.innerText = fullEquation !== '' ? fullEquation : (operator ? `${previousInput} ${operator}` : '');
}

function appendNumber(number) {
  if (isNewCalculation) {
    currentInput = '0';
    fullEquation = '';
    isNewCalculation = false;
  }
  if (number === '.' && currentInput.includes('.')) return;
  currentInput = currentInput === '0' && number !== '.' ? number : currentInput + number;
  updateDisplay();
}

function appendOperator(op) {
  if (isNewCalculation) {
    fullEquation = '';
    isNewCalculation = false;
  }
  if (currentInput === '' && previousInput === '') return;
  if (previousInput !== '' && operator !== null) computeResult();
  operator = op;
  previousInput = currentInput;
  currentInput = '0';
  fullEquation = '';
  updateDisplay();
}

function appendConstant(constant) {
  if (isNewCalculation) {
    currentInput = '0';
    fullEquation = '';
    isNewCalculation = false;
  }
  if (constant === 'pi') currentInput = Math.PI.toString();
  if (constant === 'e') currentInput = Math.E.toString();
  updateDisplay();
}

function appendFunc(func) {
  let val = parseFloat(currentInput);
  if (isNaN(val)) return;

  let result;
  let label = `${func}(${val})`;

  switch(func) {
    case 'sin': result = Math.sin(val * (Math.PI / 180)); break;
    case 'cos': result = Math.cos(val * (Math.PI / 180)); break;
    case 'tan': result = Math.tan(val * (Math.PI / 180)); break;
    case 'log': result = Math.log10(val); break;
    case 'ln': result = Math.log(val); break;
    case 'sqrt': result = Math.sqrt(val); break;
    case 'pow': result = Math.pow(val, 2); label = `${val}²`; break;
    case 'abs': result = Math.abs(val); label = `|${val}|`; break;
  }

  fullEquation = `${label} =`;
  saveHistory(`${label} = ${result}`);
  currentInput = result.toString();
  isNewCalculation = true;
  updateDisplay();
}

function computeResult() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current) || !operator) return;

  switch (operator) {
    case '+': computation = prev + current; break;
    case '-': computation = prev - current; break;
    case '*': computation = prev * current; break;
    case '/': computation = current === 0 ? 'Error' : prev / current; break;
    case '%': computation = prev % current; break;
    default: return;
  }

  fullEquation = `${previousInput} ${operator} ${currentInput} =`;
  saveHistory(`${fullEquation} ${computation}`);

  currentInput = computation.toString();
  operator = null;
  previousInput = '';
  isNewCalculation = true;
  updateDisplay();
}

function clearCalculator() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  fullEquation = '';
  isNewCalculation = false;
  updateDisplay();
}

function deleteNumber() {
  if (isNewCalculation) return;
  currentInput = currentInput.length === 1 ? '0' : currentInput.slice(0, -1);
  updateDisplay();
}

function saveHistory(entry) {
  calculationHistory.unshift(entry);
  if (calculationHistory.length > 25) calculationHistory.pop();
  localStorage.setItem('calc_history', JSON.stringify(calculationHistory));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  calculationHistory.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerText = item;
    historyList.appendChild(li);
  });
}

function clearHistory() {
  calculationHistory = [];
  localStorage.removeItem('calc_history');
  renderHistory();
}

/* --- UNIT CONVERTER LOGIC --- */
const unitData = {
  length: { Meter: 1, Kilometer: 1000, Centimeter: 0.01, Mile: 1609.34, Foot: 0.3048 },
  weight: { Kilogram: 1, Gram: 0.001, Pound: 0.453592, Ounce: 0.0283495 },
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

function updateUnits() {
  const category = document.getElementById('category').value;
  const fromSelect = document.getElementById('from-unit');
  const toSelect = document.getElementById('to-unit');

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  const units = category === 'temperature' ? unitData.temperature : Object.keys(unitData[category]);

  units.forEach(unit => {
    fromSelect.add(new Option(unit, unit));
    toSelect.add(new Option(unit, unit));
  });

  if (toSelect.options.length > 1) toSelect.selectedIndex = 1;
  convertUnit();
}

function convertUnit() {
  const category = document.getElementById('category').value;
  const fromUnit = document.getElementById('from-unit').value;
  const toUnit = document.getElementById('to-unit').value;
  const val = parseFloat(document.getElementById('from-value').value);
  const toInput = document.getElementById('to-value');

  if (isNaN(val)) {
    toInput.value = '';
    return;
  }

  if (category === 'temperature') {
    toInput.value = convertTemperature(val, fromUnit, toUnit).toFixed(2);
  } else {
    const baseValue = val * unitData[category][fromUnit];
    const result = baseValue / unitData[category][toUnit];
    toInput.value = result.toFixed(4);
  }
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  let celsius;
  if (from === 'Celsius') celsius = value;
  else if (from === 'Fahrenheit') celsius = (value - 32) * (5 / 9);
  else if (from === 'Kelvin') celsius = value - 273.15;

  if (to === 'Celsius') return celsius;
  if (to === 'Fahrenheit') return celsius * (9 / 5) + 32;
  if (to === 'Kelvin') return celsius + 273.15;
}

renderHistory();
updateUnits();
renderAlgebraBuilder();