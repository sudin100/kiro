// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player object
const player = {
    x: 100,
    y: 100,
    width: 30,
    height: 30,
    color: '#FF5733',
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpPower: 12,
    grounded: false
};

// Platform object
const platform = {
    x: 0,
    y: 500,
    width: 800,
    height: 100,
    color: '#8B4513'
};

// Game constants
const GRAVITY = 0.5;

// Keyboard state
const keys = {};

// Event listeners for keyboard input
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Check collision between player and platform
function checkCollision() {
    if (player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y < platform.y + platform.height &&
        player.y + player.height > platform.y) {
        
        // Player is colliding with platform
        if (player.velocityY > 0) {
            // Landing on top of platform
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.grounded = true;
        }
    } else {
        player.grounded = false;
    }
}

// Update game state
function update() {
    // Horizontal movement
    player.velocityX = 0;
    
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        player.velocityX = -player.speed;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        player.velocityX = player.speed;
    }
    
    // Jump
    if ((keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) && player.grounded) {
        player.velocityY = -player.jumpPower;
        player.grounded = false;
    }
    
    // Apply gravity
    player.velocityY += GRAVITY;
    
    // Update position
    player.x += player.velocityX;
    player.y += player.velocityY;
    
    // Keep player within canvas bounds horizontally
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    
    // Check collision with platform
    checkCollision();
    
    // Prevent falling below canvas
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw platform
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
