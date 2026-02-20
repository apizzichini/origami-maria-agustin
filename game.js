// New Game Code

console.log('game.js loaded successfully');

// Game state
let gameState = {
    level: 1,
    score: 0,
    attempts: 0,
    rotation: 0,
    isFlipped: false,
    folds: 0
};

// Wait for the DOM to be ready
window.addEventListener('load', function() {
    console.log('DOM loaded - Initializing game');
    initGame();
});

function initGame() {
    console.log('Game initialized');
    updateDisplay();
    drawPaper();
    
    // Connect buttons
    document.getElementById('fold-btn').addEventListener('click', doFold);
    document.getElementById('unfold-btn').addEventListener('click', doUnfold);
    document.getElementById('rotate-btn').addEventListener('click', doRotate);
    document.getElementById('flip-btn').addEventListener('click', doFlip);
    document.getElementById('verify-btn').addEventListener('click', verify);
    document.getElementById('next-level-btn').addEventListener('click', nextLevel);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
}

function doFold() {
    console.log('Folding paper...');
    gameState.folds++;
    gameState.attempts++;
    showMessage('✓ Paper folded', 'success');
    drawPaper();
    updateDisplay();
}

function doUnfold() {
    console.log('Unfolding paper...');
    if (gameState.folds > 0) {
        gameState.folds--;
        gameState.attempts++;
        showMessage('✓ Paper unfolded', 'success');
        drawPaper();
        updateDisplay();
    }
}

function doRotate() {
    console.log('Rotating paper...');
    gameState.rotation += 90;
    if (gameState.rotation >= 360) {
        gameState.rotation = 0;
    }
    gameState.attempts++;
    showMessage('✓ Paper rotated 90°', 'success');
    drawPaper();
    updateDisplay();
}

function doFlip() {
    console.log('Flipping paper...');
    gameState.isFlipped = !gameState.isFlipped;
    gameState.attempts++;
    showMessage('✓ Paper flipped', 'success');
    drawPaper();
    updateDisplay();
}

function verify() {
    console.log('Verifying solution...');
    gameState.score += 10;
    showMessage('Correct! 🎉', 'success');
    updateDisplay();
}

function nextLevel() {
    console.log('Next level...');
    gameState.level++;
    gameState.rotation = 0;
    gameState.isFlipped = false;
    gameState.folds = 0;
    showMessage('Level ' + gameState.level, 'info');
    drawPaper();
    updateDisplay();
}

function resetGame() {
    console.log('Resetting game...');
    gameState.level = 1;
    gameState.score = 0;
    gameState.attempts = 0;
    gameState.rotation = 0;
    gameState.isFlipped = false;
    gameState.folds = 0;
    showMessage('Game reset', 'info');
    drawPaper();
    updateDisplay();
}

function drawPaper() {
    const svg = document.getElementById('origami-svg');
    svg.innerHTML = ''; // Clear
    
    // Create rectangle (paper)
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '50');
    rect.setAttribute('y', '50');
    rect.setAttribute('width', '300');
    rect.setAttribute('height', '300');
    rect.setAttribute('fill', '#FFE4B5');
    rect.setAttribute('stroke', '#333');
    rect.setAttribute('stroke-width', '2');
    
    // Apply transformations
    let transform = 'translate(200, 200) ';
    transform += 'rotate(' + gameState.rotation + ') ';
    if (gameState.isFlipped) {
        transform += 'scaleX(-1) ';
    }
    transform += 'scale(' + (1 - gameState.folds * 0.1) + ', 1)';
    
    rect.setAttribute('transform', transform);
    svg.appendChild(rect);
    
    // Show number of folds
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '200');
    text.setAttribute('y', '210');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '24');
    text.setAttribute('fill', '#333');
    text.textContent = gameState.folds + ' folds';
    svg.appendChild(text);
}

function updateDisplay() {
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('attempts').textContent = gameState.attempts;
    
    // Show current challenge
    const challenges = [
        'Fold the paper once',
        'Rotate the paper 90 degrees',
        'Flip the paper',
        'Fold twice and rotate'
    ];
    
    const challengeIndex = (gameState.level - 1) % challenges.length;
    document.getElementById('challenge-text').textContent = challenges[challengeIndex];
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    
    // Clear message after 3 seconds
    setTimeout(function() {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}

console.log('Game code ready!');