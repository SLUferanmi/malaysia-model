// =============================================================================
//  CORE DATASET & LOGIC — MALAYSIA PADDY MLR ANALYSIS
//  Group 19 | Kwara State University, Malete
// =============================================================================

// 1. EMBEDDED DATASET (DOSM Table 9.1: 1980–2019)
const dataset = [
    {"Year":1980,"PlantedArea":716873,"AvgYield":2852,"PaddyProduction":2044604,"RiceProduction":1318332},
    {"Year":1981,"PlantedArea":710789,"AvgYield":2842,"PaddyProduction":2019900,"RiceProduction":1302921},
    {"Year":1982,"PlantedArea":682070,"AvgYield":2762,"PaddyProduction":1883604,"RiceProduction":1213281},
    {"Year":1983,"PlantedArea":665813,"AvgYield":2605,"PaddyProduction":1734325,"RiceProduction":1116937},
    {"Year":1984,"PlantedArea":630833,"AvgYield":2491,"PaddyProduction":1571674,"RiceProduction":1010279},
    {"Year":1985,"PlantedArea":656375,"AvgYield":2975,"PaddyProduction":1952914,"RiceProduction":1257970},
    {"Year":1986,"PlantedArea":650875,"AvgYield":2640,"PaddyProduction":1718215,"RiceProduction":1104501},
    {"Year":1987,"PlantedArea":658954,"AvgYield":2469,"PaddyProduction":1626699,"RiceProduction":1046467},
    {"Year":1988,"PlantedArea":671755,"AvgYield":2525,"PaddyProduction":1696239,"RiceProduction":1091478},
    {"Year":1989,"PlantedArea":664137,"AvgYield":2625,"PaddyProduction":1743444,"RiceProduction":122617},
    {"Year":1990,"PlantedArea":680647,"AvgYield":2769,"PaddyProduction":1884984,"RiceProduction":1215065},
    {"Year":1991,"PlantedArea":683640,"AvgYield":2818,"PaddyProduction":1926354,"RiceProduction":1241796},
    {"Year":1992,"PlantedArea":672753,"AvgYield":2992,"PaddyProduction":2012732,"RiceProduction":1297914},
    {"Year":1993,"PlantedArea":693434,"AvgYield":3035,"PaddyProduction":2104447,"RiceProduction":1357432},
    {"Year":1994,"PlantedArea":698624,"AvgYield":3061,"PaddyProduction":2138788,"RiceProduction":1378945},
    {"Year":1995,"PlantedArea":672787,"AvgYield":3162,"PaddyProduction":2127271,"RiceProduction":1372584},
    {"Year":1996,"PlantedArea":685468,"AvgYield":3251,"PaddyProduction":2228489,"RiceProduction":1438794},
    {"Year":1997,"PlantedArea":690975,"AvgYield":3068,"PaddyProduction":2119615,"RiceProduction":1367951},
    {"Year":1998,"PlantedArea":674404,"AvgYield":2883,"PaddyProduction":1944240,"RiceProduction":1256854},
    {"Year":1999,"PlantedArea":692389,"AvgYield":2941,"PaddyProduction":2036641,"RiceProduction":1314437},
    {"Year":2000,"PlantedArea":698702,"AvgYield":3064,"PaddyProduction":2140904,"RiceProduction":1381662},
    {"Year":2001,"PlantedArea":673634,"AvgYield":3110,"PaddyProduction":2094995,"RiceProduction":1351461},
    {"Year":2002,"PlantedArea":678544,"AvgYield":3238,"PaddyProduction":2197351,"RiceProduction":1415117},
    {"Year":2003,"PlantedArea":671820,"AvgYield":3360,"PaddyProduction":2257037,"RiceProduction":1453137},
    {"Year":2004,"PlantedArea":676310,"AvgYield":3434,"PaddyProduction":2291353,"RiceProduction":1467052},
    {"Year":2005,"PlantedArea":666781,"AvgYield":3471,"PaddyProduction":2314378,"RiceProduction":1490015},
    {"Year":2006,"PlantedArea":676034,"AvgYield":3236,"PaddyProduction":2187519,"RiceProduction":1407220},
    {"Year":2007,"PlantedArea":676111,"AvgYield":3514,"PaddyProduction":2375604,"RiceProduction":1530971},
    {"Year":2008,"PlantedArea":656602,"AvgYield":3584,"PaddyProduction":2353032,"RiceProduction":1516470},
    {"Year":2009,"PlantedArea":674928,"AvgYield":3720,"PaddyProduction":2511043,"RiceProduction":1620259},
    {"Year":2010,"PlantedArea":677884,"AvgYield":3636,"PaddyProduction":2464831,"RiceProduction":1588457},
    {"Year":2011,"PlantedArea":687940,"AvgYield":3748,"PaddyProduction":2578519,"RiceProduction":1661260},
    {"Year":2012,"PlantedArea":684545,"AvgYield":3797,"PaddyProduction":2599382,"RiceProduction":1674981},
    {"Year":2013,"PlantedArea":671679,"AvgYield":3876,"PaddyProduction":2603654,"RiceProduction":1677368},
    {"Year":2014,"PlantedArea":679239,"AvgYield":4194,"PaddyProduction":2848560,"RiceProduction":1834831},
    {"Year":2015,"PlantedArea":681559,"AvgYield":4022,"PaddyProduction":2741404,"RiceProduction":1767407},
    {"Year":2016,"PlantedArea":688770,"AvgYield":3978,"PaddyProduction":2739606,"RiceProduction":1766115},
    {"Year":2017,"PlantedArea":685548,"AvgYield":3750,"PaddyProduction":2570513,"RiceProduction":1656302},
    {"Year":2018,"PlantedArea":700306,"AvgYield":3770,"PaddyProduction":2639916,"RiceProduction":1700231},
    {"Year":2019,"PlantedArea":684416,"AvgYield":4255,"PaddyProduction":2912203,"RiceProduction":1876922}
];

// 2. MODEL PARAMETERS
const MODEL = {
    intercept: 2981.146056,
    betaPlantedArea: -0.004403,
    betaRiceProduction: 0.002291,
};

// 3. CORE PREDICTION FUNCTION
function predictYield(plantedArea, riceProduction) {
    return MODEL.intercept + (MODEL.betaPlantedArea * plantedArea) + (MODEL.betaRiceProduction * riceProduction);
}

// Compute pre-calculated predictions and residuals
dataset.forEach(row => {
    row.PredictedYield = predictYield(row.PlantedArea, row.RiceProduction);
    row.Residual = row.AvgYield - row.PredictedYield;
});

// 4. SECTION SWITCHING LOGIC (Sidebar controls)
const sections = {
    'section-dashboard': { title: 'Dashboard', subtitle: 'Predictive crop yield engine' },
    'section-analytics': { title: 'Model Analytics', subtitle: 'Regression coefficients & variance checks' },
    'section-charts': { title: 'Diagnostic Charts', subtitle: 'Interactive assumptions checking' },
    'section-explorer': { title: 'Data Explorer', subtitle: 'Historical DOSM statistics (1980–2019)' },
    'section-info': { title: 'Methodology & Info', subtitle: 'Abstract, guidelines, and study limitations' }
};

function switchSection(sectionId, event) {
    // Hide all section views
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Remove active class from menu items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section view
    document.getElementById(sectionId).classList.add('active');
    
    // Mark clicked menu item as active
    if (event) {
        event.currentTarget.classList.add('active');
    }
    
    // Update headers dynamically
    document.getElementById('current-section-title').textContent = sections[sectionId].title;
    document.getElementById('current-section-subtitle').textContent = sections[sectionId].subtitle;
    
    // Trigger chart resize on view change to prevent canvas rendering errors
    if (sectionId === 'section-charts') {
        setTimeout(() => {
            Object.keys(charts).forEach(key => {
                if (charts[key] && typeof charts[key].resize === 'function') {
                    charts[key].resize();
                }
            });
        }, 50);
    }
}

// 5. INPUT SYNCHRONIZATION AND ESTIMATION
const plantedAreaInput = document.getElementById('planted-area');
const plantedAreaRange = document.getElementById('planted-area-range');
const riceProductionInput = document.getElementById('rice-production');
const riceProductionRange = document.getElementById('rice-production-range');

const predictionOutput = document.getElementById('prediction-output');
const predictionProgressFill = document.getElementById('prediction-progress-fill');
const predictionInterpretation = document.getElementById('prediction-interpretation');

function formatNumber(num) {
    return new Intl.NumberFormat().format(Math.round(num));
}

function updatePrediction() {
    const area = parseFloat(plantedAreaInput.value) || 0;
    const prod = parseFloat(riceProductionInput.value) || 0;
    
    // Execute OLS Prediction
    const prediction = predictYield(area, prod);
    
    // Render text output
    predictionOutput.textContent = formatNumber(prediction);
    
    // Render description text
    predictionInterpretation.innerHTML = `Crop yield is estimated at <strong>${formatNumber(prediction)} kg/ha</strong> based on a planted area of <strong>${formatNumber(area)} ha</strong> and rice production of <strong>${formatNumber(prod)} tonnes</strong>.`;
    
    // Update yield progress bar (Map yield range [2000, 4600] to scale [0%, 100%])
    const minYield = 2000;
    const maxYield = 4600;
    let pct = ((prediction - minYield) / (maxYield - minYield)) * 100;
    pct = Math.max(0, Math.min(100, pct)); // clamp
    predictionProgressFill.style.width = `${pct}%`;
}

function syncInputs(numInput, rangeSlider) {
    numInput.addEventListener('input', () => {
        let val = parseFloat(numInput.value);
        const min = parseFloat(numInput.min);
        const max = parseFloat(numInput.max);
        if (isNaN(val)) val = min;
        if (val < min) val = min;
        if (val > max) val = max;
        rangeSlider.value = val;
        updatePrediction();
    });
    rangeSlider.addEventListener('input', () => {
        numInput.value = rangeSlider.value;
        updatePrediction();
    });
}

syncInputs(plantedAreaInput, plantedAreaRange);
syncInputs(riceProductionInput, riceProductionRange);

// Trigger initial estimation
updatePrediction();


// 6. CHARTS INITIALIZATION
let charts = {};

function switchChartTab(evt, tabId) {
    // Hide all chart tabs
    document.querySelectorAll('.chart-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate segment buttons
    document.querySelectorAll('.segment-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show current tab & activate button
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
    
    // Resize chart inside tab
    if (charts[tabId]) {
        charts[tabId].resize();
    }
    if (tabId === 'chart-linearity' && charts['chart-linearity-2']) {
        charts['chart-linearity-2'].resize();
    }
    if (tabId === 'chart-diagnostics' && charts['chart-diagnostics-qq']) {
        charts['chart-diagnostics-qq'].resize();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const years = dataset.map(d => d.Year);
    const actuals = dataset.map(d => d.AvgYield);
    const predictions = dataset.map(d => Math.round(d.PredictedYield));
    const plantedAreas = dataset.map(d => d.PlantedArea);
    const riceProductions = dataset.map(d => d.RiceProduction);
    const residuals = dataset.map(d => d.Residual);

    // Global Chart.js styling overrides (Cinematic Dark theme compatible)
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#a1a1aa';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.04)';
    Chart.defaults.plugins.tooltip.backgroundColor = '#18181b';
    Chart.defaults.plugins.tooltip.titleColor = '#fafafa';
    Chart.defaults.plugins.tooltip.titleFont = { family: "'Space Grotesk', sans-serif", weight: 'bold' };
    Chart.defaults.plugins.tooltip.bodyColor = '#a1a1aa';
    Chart.defaults.plugins.tooltip.borderColor = '#27272a';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;

    const chartGridConfig = {
        x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { font: { size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { font: { size: 10 } } }
    };

    // Chart 1: Timeline Actual vs Predicted
    const ctxTimeline = document.getElementById('timelineChart').getContext('2d');
    charts['chart-timeline'] = new Chart(ctxTimeline, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Actual Yield',
                    data: actuals,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.03)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#10b981',
                    tension: 0.1,
                    fill: true
                },
                {
                    label: 'Predicted Yield',
                    data: predictions,
                    borderColor: '#f59e0b',
                    borderWidth: 1.5,
                    borderDash: [5, 5],
                    pointRadius: 2,
                    pointHoverRadius: 4,
                    pointBackgroundColor: '#f59e0b',
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { font: { family: "'Space Grotesk', sans-serif", size: 11 } } },
                tooltip: {
                    callbacks: {
                        label: context => ` ${context.dataset.label}: ${formatNumber(context.raw)} kg/ha`
                    }
                }
            },
            scales: chartGridConfig
        }
    });

    // Helper: Regression line calculator
    function getTrendlinePoints(x, y) {
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        const n = x.length;
        for (let i = 0; i < n; i++) {
            sumX += x[i];
            sumY += y[i];
            sumXY += x[i] * y[i];
            sumXX += x[i] * x[i];
        }
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        const minX = Math.min(...x);
        const maxX = Math.max(...x);
        
        return [
            { x: minX, y: slope * minX + intercept },
            { x: maxX, y: slope * maxX + intercept }
        ];
    }

    // Chart 2A: Linearity - Planted Area
    const ctxLinearity1 = document.getElementById('linearityChart1').getContext('2d');
    const areaTrend = getTrendlinePoints(plantedAreas, actuals);
    charts['chart-linearity'] = new Chart(ctxLinearity1, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Observations',
                    data: dataset.map(d => ({ x: d.PlantedArea, y: d.AvgYield })),
                    backgroundColor: 'rgba(16, 185, 129, 0.75)',
                    borderColor: 'rgba(255,255,255,0.05)',
                    borderWidth: 1,
                    radius: 4,
                    hoverRadius: 6
                },
                {
                    label: 'Trendline',
                    data: areaTrend,
                    type: 'line',
                    borderColor: '#71717a',
                    borderWidth: 1,
                    fill: false,
                    radius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { family: "'Space Grotesk', sans-serif" } } } },
            scales: {
                x: { title: { display: true, text: 'Planted Area (ha)', font: { size: 11 } }, ...chartGridConfig.x },
                y: { title: { display: true, text: 'Average Yield (kg/ha)', font: { size: 11 } }, ...chartGridConfig.y }
            }
        }
    });

    // Chart 2B: Linearity - Rice Production
    const ctxLinearity2 = document.getElementById('linearityChart2').getContext('2d');
    const prodTrend = getTrendlinePoints(riceProductions, actuals);
    charts['chart-linearity-2'] = new Chart(ctxLinearity2, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Observations',
                    data: dataset.map(d => ({ x: d.RiceProduction, y: d.AvgYield })),
                    backgroundColor: 'rgba(245, 158, 11, 0.75)',
                    borderColor: 'rgba(255,255,255,0.05)',
                    borderWidth: 1,
                    radius: 4,
                    hoverRadius: 6
                },
                {
                    label: 'Trendline',
                    data: prodTrend,
                    type: 'line',
                    borderColor: '#71717a',
                    borderWidth: 1,
                    fill: false,
                    radius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { family: "'Space Grotesk', sans-serif" } } } },
            scales: {
                x: { title: { display: true, text: 'Rice Production (t)', font: { size: 11 } }, ...chartGridConfig.x },
                y: { title: { display: true, text: 'Average Yield (kg/ha)', font: { size: 11 } }, ...chartGridConfig.y }
            }
        }
    });

    // Chart 3A: Residual vs Fitted Values
    const ctxResidual = document.getElementById('residualChart').getContext('2d');
    charts['chart-diagnostics'] = new Chart(ctxResidual, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Residuals',
                    data: dataset.map(d => ({ x: d.PredictedYield, y: d.Residual })),
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    radius: 4.5
                },
                {
                    label: 'Null Residual Line',
                    data: [
                        { x: 2300, y: 0 },
                        { x: 4400, y: 0 }
                    ],
                    type: 'line',
                    borderColor: '#ef4444',
                    borderDash: [4, 4],
                    borderWidth: 1,
                    fill: false,
                    radius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { family: "'Space Grotesk', sans-serif" } } } },
            scales: {
                x: { title: { display: true, text: 'Fitted Values (kg/ha)', font: { size: 11 } }, ...chartGridConfig.x },
                y: { title: { display: true, text: 'Residuals', font: { size: 11 } }, ...chartGridConfig.y }
            }
        }
    });

    // Inverse Normal CDF Approximation (Blom's Method)
    function inverseNormalCdf(p) {
        const a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
        const a4 = 138.357751867269, a5 = -30.6647989143041, a6 = 2.50662827745924;
        const b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
        const b4 = 66.8013118877197, b5 = -13.2806815528857;
        const c1 = -0.00778489400243029, c2 = -0.322396458041136, c3 = -2.40075827716184;
        const c4 = -2.54973253934373, c5 = 4.37466414146497, c6 = 2.93816398269878;
        const d1 = 0.00778469570904146, d2 = 0.32246712907004, d3 = 2.44513413714299;
        const d4 = 3.75440866190742;
        
        if (p <= 0 || p >= 1) return 0;
        
        let q, r;
        if (p < 0.02425) {
            q = Math.sqrt(-2 * Math.log(p));
            return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
                   ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        } else if (p > 1 - 0.02425) {
            q = Math.sqrt(-2 * Math.log(1 - p));
            return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
                    ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        } else {
            q = p - 0.5;
            r = q * q;
            return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
                   (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
        }
    }

    // Build Q-Q values
    const meanResid = residuals.reduce((a, b) => a + b, 0) / residuals.length;
    const stdDevResid = Math.sqrt(residuals.reduce((a, b) => a + Math.pow(b - meanResid, 2), 0) / (residuals.length - 1));
    const stdResiduals = residuals.map(r => r / stdDevResid);
    const sortedStdResids = [...stdResiduals].sort((a, b) => a - b);
    const qqLen = sortedStdResids.length;
    
    const qqPoints = [];
    for (let i = 1; i <= qqLen; i++) {
        // Blom: p_i = (i - 0.375) / (n + 0.25)
        const p = (i - 0.375) / (qqLen + 0.25);
        const z = inverseNormalCdf(p);
        qqPoints.push({ x: z, y: sortedStdResids[i - 1] });
    }

    // Chart 3B: Normal Q-Q Plot
    const ctxQq = document.getElementById('qqChart').getContext('2d');
    charts['chart-diagnostics-qq'] = new Chart(ctxQq, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Residuals',
                    data: qqPoints,
                    backgroundColor: 'rgba(245, 158, 11, 0.75)',
                    radius: 4.5
                },
                {
                    label: 'Reference (y = x)',
                    data: [
                        { x: -2.4, y: -2.4 },
                        { x: 2.4, y: 2.4 }
                    ],
                    type: 'line',
                    borderColor: '#71717a',
                    borderWidth: 1,
                    fill: false,
                    radius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { family: "'Space Grotesk', sans-serif" } } } },
            scales: {
                x: { title: { display: true, text: 'Theoretical Quantiles', font: { size: 11 } }, min: -2.5, max: 2.5, ...chartGridConfig.x },
                y: { title: { display: true, text: 'Standardized Residuals', font: { size: 11 } }, min: -2.5, max: 2.5, ...chartGridConfig.y }
            }
        }
    });

    // 7. RENDER CORRELATION MATRIX GRID
    const matrixLabels = ["Planted Area", "Rice Prod.", "Avg Yield"];
    const corrValues = [
        [1.000000, 0.358832, 0.231636],
        [0.358832, 1.000000, 0.990732],
        [0.231636, 0.990732, 1.000000]
    ];
    
    const heatmapBox = document.getElementById('correlationHeatmap');
    heatmapBox.innerHTML = '';
    
    // Top-left blank spacer cell
    const spacer = document.createElement('div');
    spacer.className = 'heatmap-label';
    heatmapBox.appendChild(spacer);
    
    // Top column headers
    matrixLabels.forEach(lbl => {
        const colHeader = document.createElement('div');
        colHeader.className = 'heatmap-label top';
        colHeader.textContent = lbl;
        heatmapBox.appendChild(colHeader);
    });
    
    // Rows
    for (let r = 0; r < 3; r++) {
        // Row label
        const rowHeader = document.createElement('div');
        rowHeader.className = 'heatmap-label';
        rowHeader.textContent = matrixLabels[r];
        heatmapBox.appendChild(rowHeader);
        
        // Cells
        for (let c = 0; c < 3; c++) {
            const val = corrValues[r][c];
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            // Background saturation proportional to correlation magnitude
            cell.style.backgroundColor = `rgba(16, 185, 129, ${Math.abs(val) * 0.95})`;
            // Maintain high text contrast
            cell.style.color = Math.abs(val) > 0.5 ? '#09090b' : '#fafafa';
            cell.textContent = val.toFixed(4);
            
            heatmapBox.appendChild(cell);
        }
    }
});


// 8. DATA EXPLORER SYSTEM WITH PAGINATION AND SEARCH
let currentPage = 1;
const rowsPerPage = 10;
let filteredData = [...dataset];

const searchInput = document.getElementById('search-input');
const explorerTbody = document.getElementById('explorer-tbody');
const paginationInfo = document.getElementById('pagination-info');
const paginationPages = document.getElementById('pagination-pages');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');

function renderTable() {
    explorerTbody.innerHTML = '';
    
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const pageRows = filteredData.slice(startIdx, endIdx);
    
    pageRows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${row.Year}</strong></td>
            <td class="num-col mono">${formatNumber(row.PlantedArea)}</td>
            <td class="num-col mono">${formatNumber(row.RiceProduction)}</td>
            <td class="num-col mono">${formatNumber(row.PaddyProduction)}</td>
            <td class="num-col mono"><strong>${formatNumber(row.AvgYield)}</strong></td>
            <td class="num-col mono" style="color: var(--accent-amber); font-weight: 500;">${formatNumber(row.PredictedYield)}</td>
            <td class="num-col mono" style="color: ${row.Residual >= 0 ? 'var(--accent-emerald)' : '#ef4444'}; font-weight: 500;">${row.Residual.toFixed(2)}</td>
        `;
        explorerTbody.appendChild(tr);
    });
    
    // Pagination status text
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage) || 1;
    const showStart = totalRecords === 0 ? 0 : startIdx + 1;
    const showEnd = Math.min(endIdx, totalRecords);
    
    paginationInfo.textContent = `Showing ${showStart}-${showEnd} of ${totalRecords} records`;
    
    // Prev / Next button states
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    
    // Render individual page numbers
    paginationPages.innerHTML = '';
    for (let p = 1; p <= totalPages; p++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-num ${currentPage === p ? 'active' : ''}`;
        pageBtn.textContent = p;
        pageBtn.onclick = () => {
            currentPage = p;
            renderTable();
        };
        paginationPages.appendChild(pageBtn);
    }
}

// Live Search Year filter
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    filteredData = dataset.filter(row => row.Year.toString().includes(query));
    currentPage = 1;
    renderTable();
});

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

// Initial draw
renderTable();


// 9. CLIENT SIDE DATA CSV EXPORT
function exportData() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Year,Planted Area (Hectares),Rice Production (Tonnes),Paddy Production (Tonnes),Average Yield (Kg/Ha),Predicted Yield (Kg/Ha),Residual (Error)\n";
    
    dataset.forEach(row => {
        const line = `${row.Year},${row.PlantedArea},${row.RiceProduction},${row.PaddyProduction},${row.AvgYield},${row.PredictedYield.toFixed(4)},${row.Residual.toFixed(4)}`;
        csvContent += line + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Malaysia_Paddy_MLR_Analysis_Dataset.csv");
    document.body.appendChild(link); // Required for Firefox compatibility
    
    link.click();
    document.body.removeChild(link);
}

// 10. THEME TOGGLE & CHART SYNC LOGIC
const themeToggleBtn = document.getElementById('theme-toggle');

function updateThemeButton(isLight) {
    if (isLight) {
        themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> <span>Light Mode</span>`;
    } else {
        themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>`;
    }
}

function updateChartsTheme(isLight) {
    const gridColor = isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.03)';
    const textColor = isLight ? '#475569' : '#a1a1aa';
    const tooltipBg = isLight ? '#ffffff' : '#18181b';
    const tooltipBorder = isLight ? '#cbd5e1' : '#27272a';
    const tooltipText = isLight ? '#0f172a' : '#a1a1aa';

    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;

    Object.keys(charts).forEach(key => {
        const chart = charts[key];
        if (chart && chart.options && chart.options.scales) {
            Object.keys(chart.options.scales).forEach(scaleKey => {
                const scale = chart.options.scales[scaleKey];
                if (scale && scale.grid) scale.grid.color = gridColor;
                if (scale && scale.ticks) scale.ticks.color = textColor;
                if (scale && scale.title) scale.title.color = textColor;
            });
            if (chart.options.plugins && chart.options.plugins.tooltip) {
                chart.options.plugins.tooltip.backgroundColor = tooltipBg;
                chart.options.plugins.tooltip.borderColor = tooltipBorder;
                chart.options.plugins.tooltip.titleColor = isLight ? '#0f172a' : '#fafafa';
                chart.options.plugins.tooltip.bodyColor = tooltipText;
            }
            if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
                chart.options.plugins.legend.labels.color = textColor;
            }
            chart.update();
        }
    });

    // Handle nested secondary charts
    ['chart-linearity-2', 'chart-diagnostics-qq'].forEach(key => {
        const chart = charts[key];
        if (chart && chart.options && chart.options.scales) {
            Object.keys(chart.options.scales).forEach(scaleKey => {
                const scale = chart.options.scales[scaleKey];
                if (scale && scale.grid) scale.grid.color = gridColor;
                if (scale && scale.ticks) scale.ticks.color = textColor;
                if (scale && scale.title) scale.title.color = textColor;
            });
            if (chart.options.plugins && chart.options.plugins.tooltip) {
                chart.options.plugins.tooltip.backgroundColor = tooltipBg;
                chart.options.plugins.tooltip.borderColor = tooltipBorder;
                chart.options.plugins.tooltip.titleColor = isLight ? '#0f172a' : '#fafafa';
                chart.options.plugins.tooltip.bodyColor = tooltipText;
            }
            if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
                chart.options.plugins.legend.labels.color = textColor;
            }
            chart.update();
        }
    });
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeButton(isLight);
        updateChartsTheme(isLight);
    });
}

// Initialize theme from cache on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeButton(true);
        // Wait briefly for Chart.js instances to mount before updates
        setTimeout(() => updateChartsTheme(true), 80);
    }
});

