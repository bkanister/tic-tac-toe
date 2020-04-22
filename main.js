//constants
const select = document.getElementById('select');
const gameBoard = document.querySelector('.game-board');
const squares = document.getElementsByClassName('square');

//variables
let boardArray = [];
let squaresArray = [];
let currentPlayer = 'X';

//eventListeners
document.addEventListener('DOMContentLoaded', setBoard);
select.addEventListener('change', setBoard);

//functions
function setBoard() {
  boardArray = [];
  gameBoard.innerHTML = '';
  let squareCount = select.value ** 2;
    for (let i = 0; i < squareCount; i++) {
      let div = `<div class="letter square cell square__${i}"></div>`;
      gameBoard.insertAdjacentHTML('beforeend', div);
      boardArray.push('');
    }
  let rows = '';
  let cols = '';
  for (let i = 0; i < select.value; i++) {
    rows += '1fr ';
    cols += '1fr ';
  }
  gameBoard.style.gridTemplateRows = rows;
  gameBoard.style.gridTemplateColumns = cols;

  squaresArray = Array.from(squares);
  squaresArray.forEach(item => {
    item.addEventListener('click', handleTurn)
  });

  render();
  window.fitText(document.querySelectorAll(".square"), 0.13);
}


function render() {
  boardArray.forEach(function(mark, index) {
    squaresArray[index].textContent = mark;

      return (mark === 'X') ? squaresArray[index].classList.add('x') : (mark === 'O') ? squaresArray[index].classList.add('o') : null;
  });
}


function handleTurn(event) {
  if (currentPlayer === 'X') {
    document.querySelector('.player-x').classList.remove('current-player');
    document.querySelector('.player-o').classList.add('current-player');
  } else if (currentPlayer === 'O') {
    document.querySelector('.player-x').classList.add('current-player');
    document.querySelector('.player-o').classList.remove('current-player');
  }
  let squareIndex = squaresArray.findIndex(function(square) {
    return square === event.target;
  })
  boardArray[squareIndex] = currentPlayer;
  squaresArray[squareIndex].removeEventListener('click', handleTurn);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  render()
}
