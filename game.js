// Simple JavaScript Game

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let player = { x: 50, y: 50, size: 20 };

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function updateGame() {
    // Update game logic here
    drawPlayer();
    requestAnimationFrame(updateGame);
}

window.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            player.y -= 5;
            break;
        case 'ArrowDown':
            player.y += 5;
            break;
        case 'ArrowLeft':
            player.x -= 5;
            break;
        case 'ArrowRight':
            player.x += 5;
            break;
    }
});

// Start the game loop
updateGame();