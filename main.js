let snake = gameState.snake;
let apple = gameState.apple;
let difficulty = gameState.difficulty;
let axis;
let running = true;

function renderSnake(snake) {
  if (!running) return;
  const allSquare = board.querySelectorAll('.snake');
  allSquare.forEach((square) => square.classList.remove('snake'));
  snake.body.forEach((part) => {
    const snakePart = board.querySelector(
      `[data-index='${part.row}'] > [data-index='${part.column}'] > div`
    );
    snakePart.className = 'snake';
  });
}

function renderApple(apple) {
  const appleSquare = board.querySelector(
    `[data-index='${apple.row}'] > [data-index='${apple.column}'] > div`
  );
  appleSquare.className = 'apple';
}

function buildInitialState() {
  renderSnake(snake);
  renderApple(apple);
}

buildInitialState();

function moveRight() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row;
  snake.nextDirection.column = snakeHead.column + 1;
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  checkGameOver();
  if (!running) return;
  renderSnake(snake);
  axis = 'horizontal';
}

function moveLeft() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row;
  snake.nextDirection.column = snakeHead.column - 1;
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(running);
    return;
  }
  renderSnake(snake);
  axis = 'horizontal';
}

function moveDown() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row + 1;
  snake.nextDirection.column = snakeHead.column;
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(running);
    return;
  }
  renderSnake(snake);
  axis = 'vertical';
}

function moveUp() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row - 1;
  snake.nextDirection.column = snakeHead.column;
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(running);
    return;
  }
  renderSnake(snake);
  axis = 'vertical';
}

function move(event) {
  if (!running) return;
  switch (event.key) {
    case 'ArrowRight':
      if (axis === 'horizontal') return;
      moveRight();
      clearInterval(running);
      running = setInterval(moveRight, difficulty);
      break;
    case 'ArrowLeft':
      if (axis === 'horizontal') return;
      moveLeft();
      clearInterval(running);
      running = setInterval(moveLeft, difficulty);
      break;
    case 'ArrowUp':
      if (axis === 'vertical') return;
      moveUp();
      clearInterval(running);
      running = setInterval(moveUp, difficulty);
      break;
    case 'ArrowDown':
      if (axis === 'vertical') return;
      moveDown();
      clearInterval(running);
      running = setInterval(moveDown, difficulty);
      break;
  }
}

function checkGameOver() {
  let snakeHead = snake.body[snake.body.length - 1];
  let snakeTail = snake.body.slice(0, -1);
  if (
    snakeHead.row > 10 ||
    snakeHead.row <= 0 ||
    snakeHead.column > 10 ||
    snakeHead.column <= 0 ||
    snakeTail.some(
      (part) => part.column === snakeHead.column && part.row === snakeHead.row
    )
  ) {
    clearInterval(running);
    console.log('Game Over');
    running = false;
  }
}

function eatApple() {
  let snakeHead = snake.body[snake.body.length - 1];
  if (!(snakeHead.column === apple.column && snakeHead.row === apple.row)) {
    snake.body.shift();
  } else {
    board.querySelector('.apple').classList.remove('apple');
    makeNewApple();
    renderApple(apple);
    console.log(snake.body.length);
  }
}

function makeNewApple() {
  apple.row = Math.floor(Math.random() * 10 + 1);
  apple.column = Math.floor(Math.random() * 10 + 1);
  console.log(apple);
  const isAvailable = snake.body.some((part) => {
    return part.row === apple.row && part.column === apple.column;
  });
  if (isAvailable) {
    console.log('no');
    makeNewApple();
  }
}

document.addEventListener('keydown', move);
