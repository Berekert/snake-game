// selecting the elements and the canvas and making the canvas 2d

let canvas = document.getElementById("can");
let ctx = canvas.getContext("2d");
let scoreText = document.getElementById("score");
let restartBtn = document.getElementById("restartBtn");
let gameWidth = canvas.width;
let gameHeight = canvas.height;
let boardBackground = "#10231a";
let snakeColor = "#90ee90";
let snakeBorder = "#d9f5e5";
let foodColor = "#ef4444";
let unitSize = 20;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let gameTimer;
let score = 0;
let scoreDisplay = document.getElementById("scoreDisplay");
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);

function gameStart() {
  clearBoard();
  running = true;
  scoreDisplay.hidden = false;
  scoreText.textContent = score;
  createFood();
  draw();
  nextTick();
}
function nextTick() {
  if (running) {
    gameTimer = setTimeout(() => {
      clearBoard();
      moveSnake();
      checkGameOver();
      draw();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  do {
    foodX = Math.floor(Math.random() * (gameWidth / unitSize)) * unitSize;
    foodY = Math.floor(Math.random() * (gameHeight / unitSize)) * unitSize;
  } while (snake.some((part) => part.x === foodX && part.y === foodY));
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  let head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  //if food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function draw() {
  clearBoard();
  drawFood();
  drawSnake();
}
function changeDirection(event) {
  let keyPressed = event.key;

  let goingUp = yVelocity == -unitSize;
  let goingDown = yVelocity == unitSize;
  let goingRight = xVelocity == unitSize;
  let goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == "ArrowLeft" && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == "ArrowUp" && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == "ArrowRight" && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == "ArrowDown" && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  scoreDisplay.hidden = true;
  ctx.font = "bold 22px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "right";
  ctx.fillText(`Final score: ${score}`, gameWidth - unitSize, unitSize + 4);
  running = false;
}
function restartGame() {
  clearTimeout(gameTimer);
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
/* 
psudo code to do snake game using javascript

*/
