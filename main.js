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
  difficulty: hard,
};

const board = document.querySelector('#board');
let gameStart;

function renderSnake(snake) {
  const allSquare = board.querySelectorAll('.column');
  allSquare.forEach((square) => square.classList.remove('snake'));
  snake.body.forEach((part) => {
    const snakePart = board.querySelector(
      `[data-index='${part.row}'] > [data-index='${part.column}']`
    );
    snakePart.classList.add('snake');
  });
}

function renderApple(apple) {
  const appleSquare = board.querySelector(
    `[data-index='${apple.row}'] > [data-index='${apple.column}']`
  );
  appleSquare.classList.add('apple');
}

function buildInitialState() {
  renderSnake(gameState.snake);
  renderApple(gameState.apple);
}

buildInitialState();

function moveRight() {
  if (snake.body[snake.body.length - 1].column >= 10) {
    clearInterval(gameStart);
    return;
  }
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row,
    column: snake.body[snake.body.length - 1].column + 1,
  };
  snake.body.push({ ...snake.nextDirection });
  snake.body.shift();
  renderSnake(snake);
  snake.nextDirection.column++;
}

function moveLeft() {
  if (snake.body[snake.body.length - 1].column <= 0) {
    clearInterval(gameStart);
    return;
  }
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row,
    column: snake.body[snake.body.length - 1].column - 1,
  };
  snake.body.push({ ...snake.nextDirection });
  snake.body.shift();
  renderSnake(snake);
  snake.nextDirection.column--;
}

function moveDown() {
  if (snake.body[snake.body.length - 1].row >= 10) {
    clearInterval(gameStart);
    return;
  }
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row + 1,
    column: snake.body[snake.body.length - 1].column,
  };
  snake.body.push({ ...snake.nextDirection });
  snake.body.shift();
  renderSnake(snake);
  snake.nextDirection.row++;
}

function moveUp() {
  if (snake.body[snake.body.length - 1].row <= 0) {
    clearInterval(gameStart);
    return;
  }
  snake.nextDirection = {
    row: snake.body[snake.body.length - 1].row - 1,
    column: snake.body[snake.body.length - 1].column,
  };
  snake.body.push({ ...snake.nextDirection });
  snake.body.shift();
  renderSnake(snake);
  snake.nextDirection.row--;
}

function move(event) {
  switch (event.key) {
    case 'ArrowRight':
      clearInterval(gameStart);
      gameStart = setInterval(moveRight, gameState.difficulty);
      break;
    case 'ArrowLeft':
      clearInterval(gameStart);
      gameStart = setInterval(moveLeft, gameState.difficulty);
      break;
    case 'ArrowUp':
      clearInterval(gameStart);
      gameStart = setInterval(moveUp, gameState.difficulty);
      break;
    case 'ArrowDown':
      clearInterval(gameStart);
      gameStart = setInterval(moveDown, gameState.difficulty);
      break;
  }
}

// let gameStart = setInterval(moveRight, 1000);
document.addEventListener('keydown', move);
// document.addEventListener('keydown', moveRight);

function renderState() {
  setInterval();
}
