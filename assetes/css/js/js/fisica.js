function calculatePhysics() {
    const angleRad = angle * Math.PI / 180;
    
    // Fuerza gravitatoria paralela al plano
    const gravitationalForce = mass * gravity * Math.sin(angleRad);
    
    // Fuerza normal
    const normalForce = mass * gravity * Math.cos(angleRad);
    
    // Fuerza de fricción
    const frictionForce = friction * normalForce;
    
    // Sistema con poleas
    if (usePulley) {
        const counterWeightForce = pulleyConfig.counterMass * gravity;
        
        if (gravitationalForce > frictionForce + counterWeightForce) {
            netForce = gravitationalForce - frictionForce - counterWeightForce;
            acceleration = netForce / (mass + pulleyConfig.counterMass);
        } else if (counterWeightForce > gravitationalForce - frictionForce) {
            netForce = counterWeightForce - (gravitationalForce - frictionForce);
            acceleration = netForce / (mass + pulleyConfig.counterMass);
            acceleration = -acceleration;
        } else {
            netForce = 0;
            acceleration = 0;
        }
    } else {
        // Sistema sin poleas
        netForce = gravitationalForce - frictionForce;
        acceleration = netForce / mass;
    }
    
    // Si la aceleración es muy pequeña, ajustar a cero
    if (Math.abs(acceleration) < 0.01) {
        acceleration = 0;
    }
    
    // Actualizar velocidad y posición
    updateMotion();
    
    // Calcular energía
    calculateEnergy(angleRad);
    
    // Actualizar valores en pantalla
    updateDisplayValues();
    
    // Guardar datos para exportación
    if (isRunning && !isPaused) {
        saveSimulationData();
    }
}

function updateMotion() {
    const deltaTime = 0.016; // Aproximadamente 60 FPS
    
    if (isRunning && !isPaused) {
        velocity += acceleration * deltaTime;
        
        // Límites físicos
        if (position <= 0 && velocity < 0) {
            velocity = 0;
            position = 0;
        }
        
        if (position >= length && velocity > 0) {
            velocity = 0;
            position = length;
            isRunning = false;
            showNotification('Simulación Completada', 'El objeto ha llegado al final del plano inclinado.', 'success');
        } else {
            position += velocity * deltaTime;
        }
        
        currentTime += deltaTime;
    }
}

function calculateEnergy(angleRad) {
    const heightFromTop = (length - position) * Math.sin(angleRad);
    const potentialEnergy = mass * gravity * heightFromTop;
    const kineticEnergy = 0.5 * mass * velocity * velocity;
    energy = potentialEnergy + kineticEnergy;
}