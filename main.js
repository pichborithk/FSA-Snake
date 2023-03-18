function renderSnake() {
  const lastSnake = board.querySelectorAll('.snake');
  lastSnake.forEach((part) => (part.className = ''));
  snake.body.forEach((part) => {
    const snakePart = board.querySelector(
      `[data-index='${part.row}'] > [data-index='${part.column}'] > div`
    );
    snakePart.className = 'snake';
  });
  let snakeHeadObject = snake.body[snake.body.length - 1];
  const snakeHead = board.querySelector(
    `[data-index='${snakeHeadObject.row}'] > [data-index='${snakeHeadObject.column}'] > .snake`
  );
  if (axis === 'vertical') {
    snakeHead.classList.add('head-vertical');
  } else {
    snakeHead.classList.add('head-horizontal');
  }
}

function renderApple() {
  const lastApple = board.querySelector('.apple');
  if (lastApple) lastApple.classList.remove('apple');
  makeNewApple();
  const appleSquare = board.querySelector(
    `[data-index='${apple.row}'] > [data-index='${apple.column}'] > div`
  );
  appleSquare.className = 'apple';
}

function eatApple() {
  let snakeHead = snake.body[snake.body.length - 1];
  if (!(snakeHead.column === apple.column && snakeHead.row === apple.row)) {
    snake.body.shift();
  } else {
    renderApple();
    currentPoints += applePoints;
    bestPoints = bestPoints > currentPoints ? bestPoints : currentPoints;
    averagePoints =
      pointsHistory.length < 1
        ? currentPoints
        : Math.floor(
            (currentPoints + pointsHistory.reduce((a, b) => a + b)) /
              (pointsHistory.length + 1)
          );
    renderPointsDisplay();
    applePoints = 50;
  }
}

function renderPointsDisplay() {
  document.querySelector('#avg').innerText = averagePoints;
  document.querySelector('#best').innerText = bestPoints;
}

function makeNewApple() {
  apple.row = Math.floor(Math.random() * gameInitialState.boardSize + 1);
  apple.column = Math.floor(Math.random() * gameInitialState.boardSize + 1);
  const isAvailable = snake.body.some((part) => {
    return part.row === apple.row && part.column === apple.column;
  });
  if (isAvailable) {
    console.log('no');
    makeNewApple();
  }
}

function buildInitialState() {
  renderSnake();
  renderApple();
  currentPoints = 0;
  console.log(pointsHistory);
}

function moveRight() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row;
  snake.nextDirection.column = snakeHead.column + 1;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'horizontal';
  renderSnake();
}

function moveLeft() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row;
  snake.nextDirection.column = snakeHead.column - 1;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'horizontal';
  renderSnake();
}

function moveDown() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row + 1;
  snake.nextDirection.column = snakeHead.column;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'vertical';
  renderSnake();
}

function moveUp() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row - 1;
  snake.nextDirection.column = snakeHead.column;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'vertical';
  renderSnake();
}

function move(event) {
  switch (event.key) {
    case 'ArrowRight':
      if (axis === 'horizontal') return;
      moveRight();
      clearInterval(isRunning);
      isRunning = setInterval(moveRight, difficulty);
      break;
    case 'ArrowLeft':
      if (axis === 'horizontal') return;
      moveLeft();
      clearInterval(isRunning);
      isRunning = setInterval(moveLeft, difficulty);
      break;
    case 'ArrowUp':
      if (axis === 'vertical') return;
      moveUp();
      clearInterval(isRunning);
      isRunning = setInterval(moveUp, difficulty);
      break;
    case 'ArrowDown':
      if (axis === 'vertical') return;
      moveDown();
      clearInterval(isRunning);
      isRunning = setInterval(moveDown, difficulty);
      break;
  }
}

function checkGameOver() {
  let snakeHead = snake.body[snake.body.length - 1];
  let snakeTail = snake.body.slice(0, -1);
  if (
    snakeHead.row > gameInitialState.boardSize ||
    snakeHead.row <= 0 ||
    snakeHead.column > gameInitialState.boardSize ||
    snakeHead.column <= 0 ||
    snakeTail.some(
      (part) => part.column === snakeHead.column && part.row === snakeHead.row
    )
  ) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(isRunning);
  isRunning = false;
  axis = '';
  startBtn.disabled = false;
  difficultySelect.disabled = false;
  main.classList.add('game-over');
  bannerGameOver.querySelector('#length').innerText = snake.body.length;
  bannerGameOver.querySelector('#point').innerText = currentPoints;
  bannerGameOver.classList.add('game-over');
  bannerGameOver.querySelector('button').addEventListener('click', restart);
}

function restart() {
  main.classList.remove('game-over');
  bannerGameOver.classList.remove('game-over');
  snake.body = [...gameInitialState.snake.body];
  snake.nextDirection = { ...gameInitialState.snake.nextDirection };
  pointsHistory.push(currentPoints);
  buildInitialState();
}

function handleDifficulty(event) {
  difficulty = Number(event.target.value);
  console.log(difficulty);
}

buildInitialState();

document.addEventListener('keydown', function (event) {
  if (!isRunning) {
    startBtn.disabled = true;
    difficultySelect.disabled = true;
  }
  move(event);
});
startBtn.addEventListener('click', function () {
  if (!isRunning) {
    startBtn.disabled = true;
    difficultySelect.disabled = true;
    moveRight();
    isRunning = setInterval(moveRight, difficulty);
  }
});
difficultySelect.addEventListener('change', handleDifficulty);
