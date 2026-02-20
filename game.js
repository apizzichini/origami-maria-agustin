// Estado del juego
let gameState = {
    level: 1,
    score: 0,
    attempts: 0,
    paper: { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, folds: [] },
    challenges: [
        { id: 1, text: "Dobla el papel por la mitad", action: "fold", expected: 1 },
        { id: 2, text: "Gira el papel 90 grados", action: "rotate", expected: 90 },
        { id: 3, text: "Voltea el papel", action: "flip", expected: -1 }
    ],
    currentChallenge: 0,
    gameActive: true
};

const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const attemptsDisplay = document.getElementById('attempts');
const challengeText = document.getElementById('challenge-text');
const origamiSvg = document.getElementById('origami-svg');
const messageDiv = document.getElementById('message');

const foldBtn = document.getElementById('fold-btn');
const unfoldBtn = document.getElementById('unfold-btn');
const rotateBtn = document.getElementById('rotate-btn');
const flipBtn = document.getElementById('flip-btn');
const verifyBtn = document.getElementById('verify-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const resetBtn = document.getElementById('reset-btn');

function initGame() {
    gameState.currentChallenge = 0;
    gameState.paper = { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, folds: [] };
    gameState.gameActive = true;
    clearMessage();
    displayChallenge();
    drawPaper();
}

function displayChallenge() {
    if (gameState.currentChallenge < gameState.challenges.length) {
        const challenge = gameState.challenges[gameState.currentChallenge];
        challengeText.textContent = challenge.text;
    } else {
        challengeText.textContent = "¡Felicidades! Has completado todos los desafíos.";
        gameState.gameActive = false;
    }
}

function drawPaper() {
    origamiSvg.innerHTML = '';
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '50');
    rect.setAttribute('y', '50');
    rect.setAttribute('width', '300');
    rect.setAttribute('height', '300');
    rect.setAttribute('fill', '#FFE4B5');
    rect.setAttribute('stroke', '#333');
    rect.setAttribute('stroke-width', '2');
    
    let transform = `translate(${gameState.paper.x + 200}, ${gameState.paper.y + 200}) `;
    transform += `rotate(${gameState.paper.rotation}) `;
    transform += `scale(${gameState.paper.scaleX}, ${gameState.paper.scaleY})`;
    rect.setAttribute('transform', transform);
    origamiSvg.appendChild(rect);
}

function fold() {
    if (!gameState.gameActive) return;
    gameState.paper.folds.push('fold');
    gameState.paper.scaleY *= 0.5;
    gameState.attempts++;
    updateUI();
    drawPaper();
    showMessage('✓ Papel doblado', 'success');
}

function unfold() {
    if (!gameState.gameActive) return;
    if (gameState.paper.folds.length > 0) {
        gameState.paper.folds.pop();
        gameState.paper.scaleY *= 2;
        gameState.attempts++;
        updateUI();
        drawPaper();
        showMessage('✓ Papel desdoblado', 'success');
    }
}

function rotate() {
    if (!gameState.gameActive) return;
    gameState.paper.rotation += 90;
    if (gameState.paper.rotation >= 360) gameState.paper.rotation = 0;
    gameState.attempts++;
    updateUI();
    drawPaper();
    showMessage('✓ Papel girado 90°', 'success');
}

function flip() {
    if (!gameState.gameActive) return;
    gameState.paper.scaleX *= -1;
    gameState.attempts++;
    updateUI();
    drawPaper();
    showMessage('✓ Papel volteado', 'success');
}

function verifySolution() {
    if (!gameState.gameActive) return;
    const challenge = gameState.challenges[gameState.currentChallenge];
    let correct = false;
    
    if (challenge.action === 'fold' && gameState.paper.folds.length >= 1) correct = true;
    else if (challenge.action === 'rotate' && gameState.paper.rotation === 90) correct = true;
    else if (challenge.action === 'flip' && gameState.paper.scaleX === -1) correct = true;
    
    if (correct) {
        gameState.score += 10;
        showMessage('¡Correcto! 🎉', 'success');
        setTimeout(() => { nextLevel(); }, 1500);
    } else {
        showMessage('Intenta de nuevo ❌', 'error');
    }
    updateUI();
}

function nextLevel() {
    gameState.currentChallenge++;
    gameState.paper = { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, folds: [] };
    if (gameState.currentChallenge < gameState.challenges.length) {
        gameState.level++;
        updateUI();
        displayChallenge();
        drawPaper();
        clearMessage();
    } else {
        gameState.gameActive = false;
        showMessage('¡Ganaste el juego! 🏆', 'success');
    }
}

function resetGame() {
    gameState.level = 1;
    gameState.score = 0;
    gameState.attempts = 0;
    initGame();
    showMessage('Juego reiniciado', 'info');
}

function updateUI() {
    levelDisplay.textContent = gameState.level;
    scoreDisplay.textContent = gameState.score;
    attemptsDisplay.textContent = gameState.attempts;
}

function showMessage(text, type = 'info') {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}

function clearMessage() {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

foldBtn.addEventListener('click', fold);
unfoldBtn.addEventListener('click', unfold);
rotateBtn.addEventListener('click', rotate);
flipBtn.addEventListener('click', flip);
verifyBtn.addEventListener('click', verifySolution);
nextLevelBtn.addEventListener('click', nextLevel);
resetBtn.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', initGame);
initGame();
