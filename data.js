const easy = 500;
const normal = 300;
const hard = 100;

let gameState = {
  apple: { row: 6, column: 7 },
  snake: {
    body: [
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 },
      { row: 1, column: 4 },
    ],
    nextDirection: { row: 1, column: 5 },
  },
  difficulty: easy,
};
const main = document.querySelector('main');
const board = document.querySelector('#board');
const startBtn = document.querySelector('#start');
const bannerGameOver = document.querySelector('.banner');

for (let i = 1; i <= 10; i++) {
  const row = document.createElement('tr');
  row.className = 'row';
  row.dataset.index = i;
  for (let j = 1; j <= 10; j++) {
    const td = document.createElement('td');
    td.className = 'column';
    td.dataset.index = j;
    const div = document.createElement('div');
    td.appendChild(div);
    row.appendChild(td);
  }
  board.appendChild(row);
}
