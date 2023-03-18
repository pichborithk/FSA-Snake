let gameInitialState = {
  snake: {
    body: [
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 },
      { row: 1, column: 4 },
    ],
    nextDirection: { row: 1, column: 5 },
  },
  difficulty: 500,
  axis: '',
  isRunning: false,
  boardSize: 20,
};

let snake = {};
snake.body = [...gameInitialState.snake.body];
snake.nextDirection = { ...gameInitialState.snake.nextDirection };
let apple = {};
let difficulty = gameInitialState.difficulty;
let axis = gameInitialState.axis;
let isRunning = gameInitialState.isRunning;
let currentPoints = 0;
let bestPoints = 0;
let averagePoints = 0;
let pointsHistory = [];
let applePoints = 50;

const main = document.querySelector('main');
const board = document.querySelector('#board');
const startBtn = document.querySelector('#start');
const bannerGameOver = document.querySelector('.banner');
const difficultySelect = document.querySelector('#difficulty');
const averagePointsDisplay = document.querySelector('#avg');
const bestPointsDisplay = document.querySelector('#best');
const currentPointsDisplay = document.querySelector('#current-points');

for (let i = 1; i <= gameInitialState.boardSize; i++) {
  const row = document.createElement('tr');
  row.className = 'row';
  row.dataset.index = i;
  for (let j = 1; j <= gameInitialState.boardSize; j++) {
    const td = document.createElement('td');
    td.className = 'column';
    td.dataset.index = j;
    const div = document.createElement('div');
    td.appendChild(div);
    row.appendChild(td);
  }
  board.appendChild(row);
}
