// Función para formatear números
function formatNumberWithComma(value, decimals = 2) {
    return value.toFixed(decimals).replace('.', ',');
}

// Función para mostrar notificaciones
function showNotification(title, message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let icon = 'ℹ️';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '❌';
    if (type === 'success') icon = '✅';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Cerrar notificación
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-eliminar
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Validación de parámetros
function validateParameters() {
    let isValid = true;
    
    // Validar masa
    if (mass <= 0) {
        document.getElementById('mass-validation').textContent = "La masa debe ser mayor que cero";
        document.getElementById('mass-validation').style.display = 'block';
        isValid = false;
        showNotification('Error de Validación', 'La masa debe ser mayor que cero.', 'error');
    } else {
        document.getElementById('mass-validation').style.display = 'none';
    }
    
    // Validar contrapeso
    if (usePulley && pulleyConfig.counterMass <= 0) {
        document.getElementById('counter-mass-validation').textContent = "La masa del contrapeso debe ser mayor que cero";
        document.getElementById('counter-mass-validation').style.display = 'block';
        isValid = false;
        showNotification('Error de Validación', 'La masa del contrapeso debe ser mayor que cero.', 'error');
    } else {
        document.getElementById('counter-mass-validation').style.display = 'none';
    }
    
    return isValid;
}

// Función de exportación
function exportData() {
    if (simulationData.length === 0) {
        showNotification('Error de Exportación', 'No hay datos de simulación para exportar. Inicie la simulación primero.', 'warning');
        return;
    }
    
    // Lógica de exportación a Excel
    // ...
}