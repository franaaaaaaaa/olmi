// Variables globales eaea
let animationId;
let isRunning = false;
let isPaused = false;
let currentTime = 0;
let position = 0;
let velocity = 0;
let acceleration = 0;
let netForce = 0;
let energy = 0;
let simulationData = [];

// Parámetros iniciales
let mass = parseFloat(document.getElementById('mass-input').value);
let angle = parseFloat(document.getElementById('angle-input').value);
let friction = parseFloat(document.getElementById('friction-input').value);
let length = parseFloat(document.getElementById('length-input').value);
let gravity = parseFloat(document.getElementById('gravity-input').value);
let usePulley = false;
let pulleyConfig = {
    counterMass: parseFloat(document.getElementById('counter-mass-input').value)
};

// Historial
let configHistory = JSON.parse(localStorage.getItem('inclinedPlaneHistory')) || [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupCanvas();
    drawSimulation();
    updateResultsExplanation();
    renderHistory();
    setupEventListeners();
    showNotification('Bienvenido', 'El laboratorio virtual de plano inclinado está listo. Configure los parámetros y presione "Iniciar Simulación".', 'info');
});

function setupEventListeners() {
    // Configurar pestañas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });
    
    // Botones principales
    document.getElementById('start-btn').addEventListener('click', startSimulation);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('reset-btn').addEventListener('click', resetSimulation);
    document.getElementById('export-btn').addEventListener('click', exportData);
    document.getElementById('save-config-btn').addEventListener('click', saveConfiguration);
    
    // Inputs básicos
    document.getElementById('mass-input').addEventListener('change', handleMassChange);
    document.getElementById('angle-range').addEventListener('input', handleAngleRangeInput);
    document.getElementById('angle-range').addEventListener('change', handleAngleRangeChange);
    // ... resto de event listeners ...
    
    // Redimensionamiento
    window.addEventListener('resize', function() {
        setupCanvas();
        drawSimulation();
    });
}

function handleTabClick() {
    const tabId = this.getAttribute('data-tab');
    usePulley = (tabId === 'pulley');
    
    // Lógica para cambiar pestañas
    // ...
}

function startSimulation() {
    if (!validateParameters()) return;
    
    if (!isRunning) {
        isRunning = true;
        isPaused = false;
        document.getElementById('pause-btn').textContent = "Pausar";
        if (currentTime === 0) {
            simulationData = [];
        }
        animate();
        showNotification('Simulación Iniciada', 'La simulación ha comenzado.', 'success');
    } else if (isPaused) {
        isPaused = false;
        document.getElementById('pause-btn').textContent = "Pausar";
        animate();
        showNotification('Simulación Reanudada', 'La simulación ha sido reanudada.', 'info');
    }
}

function togglePause() {
    if (isRunning) {
        isPaused = !isPaused;
        const pauseBtn = document.getElementById('pause-btn');
        pauseBtn.textContent = isPaused ? "Continuar" : "Pausar";
        if (!isPaused) {
            animate();
            showNotification('Simulación Reanudada', 'La simulación ha sido reanudada.', 'info');
        } else {
            showNotification('Simulación Pausada', 'La simulación ha sido pausada.', 'info');
        }
    }
}

// ... resto de funciones principales ...