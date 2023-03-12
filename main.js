let snake = {
  body: [
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 1, column: 3 },
    { row: 1, column: 4 },
  ],
  nextDirection: { row: 1, column: 5 },
};

const easy = 500;
const normal = 300;
const hard = 100;

let gameState = {
  apple: { row: 6, column: 7 },
  snake: snake,
  difficulty: easy,
};

const board = document.querySelector('#board');
let gameStart;

function renderSnake(snake) {
  if (checkGameOver()) return;
  const allSquare = board.querySelectorAll('.snake');
  allSquare.forEach((square) => square.remove());
  snake.body.forEach((part) => {
    const snakePart = board.querySelector(
      `[data-index='${part.row}'] > [data-index='${part.column}']`
    );
    const div = document.createElement('div');
    div.className = 'snake';
    snakePart.appendChild(div);
  });
}

function renderApple(apple) {
  const appleSquare = board.querySelector(
    `[data-index='${apple.row}'] > [data-index='${apple.column}']`
  );
  const div = document.createElement('div');
  div.className = 'apple';
  appleSquare.appendChild(div);
}

function buildInitialState() {
  renderSnake(gameState.snake);
  renderApple(gameState.apple);
}

buildInitialState();

function moveRight() {
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row,
    column: snake.body[snake.body.length - 1].column + 1,
  };
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(gameStart);
    return;
  }
  renderSnake(snake);
  snake.nextDirection.column++;
}

function moveLeft() {
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row,
    column: snake.body[snake.body.length - 1].column - 1,
  };
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(gameStart);
    return;
  }
  renderSnake(snake);
  snake.nextDirection.column--;
}

function moveDown() {
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row + 1,
    column: snake.body[snake.body.length - 1].column,
  };
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(gameStart);
    return;
  }
  renderSnake(snake);
  snake.nextDirection.row++;
}

function moveUp() {
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row - 1,
    column: snake.body[snake.body.length - 1].column,
  };
  snake.body.push({ ...snake.nextDirection });
  eatApple();
  if (checkGameOver()) {
    clearInterval(gameStart);
    return;
  }
  renderSnake(snake);
  snake.nextDirection.row--;
}

function move(event) {
  switch (event.key) {
    case 'ArrowRight':
      moveRight();
      clearInterval(gameStart);
      gameStart = setInterval(moveRight, gameState.difficulty);
      break;
    case 'ArrowLeft':
      moveLeft();
      clearInterval(gameStart);
      gameStart = setInterval(moveLeft, gameState.difficulty);
      break;
    case 'ArrowUp':
      moveUp();
      clearInterval(gameStart);
      gameStart = setInterval(moveUp, gameState.difficulty);
      break;
    case 'ArrowDown':
      moveDown();
      clearInterval(gameStart);
      gameStart = setInterval(moveDown, gameState.difficulty);
      break;
  }
}

function checkGameOver() {
  if (
    snake.body[snake.body.length - 1].row > 10 ||
    snake.body[snake.body.length - 1].row <= 0 ||
    snake.body[snake.body.length - 1].column > 10 ||
    snake.body[snake.body.length - 1].column <= 0 ||
    (snake.body[snake.body.length - 1].column === snake.body[0].column &&
      snake.body[snake.body.length - 1].row === snake.body[0].row)
  ) {
    console.log('Game Over');
    return true;
  } else {
    return false;
  }
}

function eatApple() {
  if (
    !(
      snake.body[snake.body.length - 1].column === gameState.apple.column &&
      snake.body[snake.body.length - 1].row === gameState.apple.row
    )
  ) {
    snake.body.shift();
  } else {
    console.log('apple');
    board.querySelector('.apple').remove();
    makeNewApple();
    renderApple(gameState.apple);
  }
}

function makeNewApple() {
  gameState.apple.row = Math.floor(Math.random() * 10 + 1);
  gameState.apple.column = Math.floor(Math.random() * 10 + 1);
  console.log(gameState.apple);
  const isUnable = gameState.snake.body.some((part) => {
    return (
      part.row === gameState.apple.row && part.column === gameState.apple.column
    );
  });
  if (isUnable) {
    console.log('no');
    makeNewApple();
  }
}

document.addEventListener('keydown', move);

function renderState() {
  setInterval();
}
