// Game variables and settings
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Character image
const characterImg = new Image();
characterImg.src = "character.png"; // Replace with your own PNG file

// Dino settings
const dino = {
  x: 50,
  y: HEIGHT - 80,
  width: 50,
  height: 50,
  isJumping: false,
  jumpVelocity: 0,
  gravity: 0.5,
  maxJump: -10,
};

// Obstacle settings
const obstacle = {
  x: WIDTH,
  y: HEIGHT - 60,
  width: 30,
  height: 50,
  color: "red",
  speed: 5,
};

// Game state
let score = 0;
let isGameOver = false;

// Function to draw the Dino (with PNG image)
function drawDino() {
  ctx.drawImage(characterImg, dino.x, dino.y, dino.width, dino.height);
}

// Function to draw the obstacle
function drawObstacle() {
  ctx.fillStyle = obstacle.color;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Function to draw the score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, WIDTH - 120, 30);
}

// Function to reset the game
function resetGame() {
  obstacle.x = WIDTH;
  dino.y = HEIGHT - 80;
  dino.isJumping = false;
  dino.jumpVelocity = 0;
  score = 0;
  isGameOver = false;
}

// Function to check collision
function checkCollision() {
  if (
    dino.x < obstacle.x + obstacle.width &&
    dino.x + dino.width > obstacle.x &&
    dino.y < obstacle.y + obstacle.height &&
    dino.y + dino.height > obstacle.y
  ) {
    isGameOver = true;
  }
}

// Main game loop
function gameLoop() {
  if (isGameOver) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", WIDTH / 2 - 80, HEIGHT / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Press R to Restart", WIDTH / 2 - 100, HEIGHT / 2 + 40);
    return;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Update Dino position
  if (dino.isJumping) {
    dino.y += dino.jumpVelocity;
    dino.jumpVelocity += dino.gravity;

    // Stop the jump when Dino lands
    if (dino.y >= HEIGHT - dino.height - 30) {
      dino.y = HEIGHT - dino.height - 30;
      dino.isJumping = false;
    }
  }

  // Update obstacle position
  obstacle.x -= obstacle.speed;
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = WIDTH;
    score++;
  }

  // Check collision
  checkCollision();

  // Draw the Dino, obstacle, and score
  drawDino();
  drawObstacle();
  drawScore();

  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !dino.isJumping) {
    dino.isJumping = true;
    dino.jumpVelocity = dino.maxJump;
  }
  if (event.code === "KeyR" && isGameOver) {
    resetGame();
    gameLoop();
  }
});

// Start the game loop
characterImg.onload = () => {
  gameLoop();
};
