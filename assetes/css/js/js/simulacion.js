const canvas = document.getElementById('simulation-canvas');
const ctx = canvas.getContext('2d');

function setupCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

function drawSimulation() {
    const width = canvas.width;
    const height = canvas.height;
    
    // Calcular dimensiones del plano
    const angleRad = angle * Math.PI / 180;
    const planeHeight = Math.min(height * 0.5, width * 0.6 * Math.tan(angleRad));
    const planeWidth = planeHeight / Math.tan(angleRad);
    
    // Ajustar posición inicial
    const baseX = usePulley ? width * 0.4 : width * 0.2;
    const baseY = height - 100;
    
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar plano inclinado
    drawInclinedPlane(baseX, baseY, planeWidth, planeHeight);
    
    // Dibujar poleas si están activadas
    if (usePulley) {
        drawPulleySystem(width, height, baseX, baseY, planeWidth, planeHeight);
    }
    
    // Dibujar masa
    drawMass(baseX, baseY, planeWidth, planeHeight, angleRad);
    
    // Dibujar ángulo
    drawAngle(baseX, baseY, planeWidth, planeHeight, angleRad);
}

function drawInclinedPlane(baseX, baseY, planeWidth, planeHeight) {
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + planeWidth, baseY);
    ctx.lineTo(baseX, baseY - planeHeight);
    ctx.closePath();
    ctx.fillStyle = "#a3c9a8";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawMass(baseX, baseY, planeWidth, planeHeight, angleRad) {
    ctx.save();
    
    const inclineXStart = baseX;
    const inclineYStart = baseY - planeHeight;
    ctx.translate(inclineXStart, inclineYStart);
    ctx.rotate(angleRad);
    
    const inclineLengthCanvas = planeWidth / Math.cos(angleRad);
    const distanceMovedFromTop = (position / length) * inclineLengthCanvas;
    const massDrawX = distanceMovedFromTop;
    const massDrawY = 0;
    
    // Dibujar cuerpo
    const massWidth = 40;
    const massHeight = 25;
    ctx.fillStyle = "rgba(211, 211, 211, 0.9)";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5;
    ctx.fillRect(massDrawX, massDrawY - massHeight, massWidth, massHeight);
    ctx.strokeRect(massDrawX, massDrawY - massHeight, massWidth, massHeight);
    
    // Dibujar centro de masa
    const massCenterX = massDrawX + massWidth / 2;
    const massCenterY = massDrawY - massHeight / 2;
    
    ctx.beginPath();
    ctx.arc(massCenterX, massCenterY, 3.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#e53e3e";
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    
    ctx.restore();
}

// ... resto de funciones de dibujo ...