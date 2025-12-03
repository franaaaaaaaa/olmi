function updateDisplayValues() {
    document.getElementById('time-value').textContent = formatNumberWithComma(currentTime) + " s";
    document.getElementById('position-value').textContent = formatNumberWithComma(position) + " m";
    document.getElementById('velocity-value').textContent = formatNumberWithComma(velocity) + " m/s";
    document.getElementById('acceleration-value').textContent = formatNumberWithComma(acceleration) + " m/s²";
    document.getElementById('force-value').textContent = formatNumberWithComma(netForce) + " N";
    document.getElementById('energy-value').textContent = formatNumberWithComma(energy) + " J";
    
    updateResultsExplanation();
}

function updateResultsExplanation() {
    const angleRad = angle * Math.PI / 180;
    const gravitationalForce = mass * gravity * Math.sin(angleRad);
    const normalForce = mass * gravity * Math.cos(angleRad);
    const frictionForce = friction * normalForce;
    let netForceValue = gravitationalForce - frictionForce;
    
    if (usePulley) {
        const counterWeightForce = pulleyConfig.counterMass * gravity;
        netForceValue = gravitationalForce - frictionForce - counterWeightForce;
    }
    
    // Actualizar textos de explicación
    updateExplanationTexts(netForceValue, gravitationalForce, frictionForce, angleRad);
}

function updateExplanationTexts(netForceValue, gravitationalForce, frictionForce, angleRad) {
    const movementAnalysis = document.getElementById('movement-analysis');
    const systemBehavior = document.getElementById('system-behavior');
    const displacementExplanation = document.getElementById('displacement-explanation');
    
    // Actualizar cada sección según los cálculos
    // ...
}

// Funciones del historial
function renderHistory() {
    // Renderizar historial de configuraciones
    // ...
}

function saveConfiguration() {
    // Guardar configuración actual
    // ...
}

function loadConfig(id) {
    // Cargar configuración del historial
    // ...
}