//constants
const select = document.getElementById('select');
const gameBoard = document.querySelector('.game-board');
const squares = document.getElementsByClassName('square');
const newGameButton = document.querySelector('.new-game-button')
const chooseX = document.getElementById('choose-x');
const chooseO = document.getElementById('choose-o');
const againstComputerButton = document.querySelector('.against-computer-button');
//variables
let boardArray = [];
let squaresArray = [];
let currentPlayer = 'X';
let playWithAI = false;
//eventListeners
document.addEventListener('DOMContentLoaded', setBoard);
select.addEventListener('change', setBoard);
newGameButton.addEventListener('click', startNewGame);
chooseX.addEventListener('click', playForX);
chooseO.addEventListener('click', playForO);
againstComputerButton.addEventListener('click', setBoardForAI);
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

  if (playWithAI === true) {
    let randomIndex = getRandomTurn();
    if (currentPlayer === 'O' && boardArray.includes('X')) {
      document.querySelector('.player-x').classList.remove('current-player');
      document.querySelector('.player-o').classList.add('current-player');
      boardArray[randomIndex]='O';
      currentPlayer = 'X';
      setTimeout(() => {
        document.querySelector('.player-x').classList.add('current-player');
        document.querySelector('.player-o').classList.remove('current-player');
        render()
      }, 2000);

    }
  };
}


function startNewGame() {
  location.reload();
}

function playForX() {
  if (currentPlayer === 'X') return;
  let playersDiv = document.querySelector('.which-turn-div');
  playersDiv.firstElementChild.remove();
  playersDiv.insertAdjacentHTML('beforeend', `<div class="player-o">Player <span class='letter o o__small'>O</span></div>`)
  document.querySelector('.player-o').classList.remove('current-player');
  document.querySelector('.player-x').classList.add('current-player');
  currentPlayer = 'X';
}

function playForO() {
  if (currentPlayer === 'O') return;
  let playersDiv = document.querySelector('.which-turn-div');
  playersDiv.lastElementChild.remove();
  playersDiv.insertAdjacentHTML('afterbegin', `<div class="player-o">Player <span class='letter o o__small'>O</span></div>`)
  document.querySelector('.player-o').classList.add('current-player');
  document.querySelector('.player-x').classList.remove('current-player');
  currentPlayer = 'O';
}

function setBoardForAI() {
if (currentPlayer === 'X') {
  document.querySelector('.player-o').innerHTML = `Player <span class='letter o o__small'><i class="fa fa-desktop"></i></span>`;
}
if (currentPlayer === 'O') {
    document.querySelector('.player-x').innerHTML = `Player <span class='letter x x__small'><i class="fa fa-desktop"></i></span>`;
}
playWithAI = true;
// gameWithAI(currentPlayer);
}

function getRandomTurn() {
  let emptyCells = [];
  emptyCells = boardArray.map(function(item, index) {
    if (item === '') {
      return index;
    }
  })
  emptyCells = emptyCells.filter(item => item !== undefined);
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

// function gameWithAI(currentPlayer) {
//   let randomIndex = getRandomTurn();
//   if (currentPlayer === 'O' && boardArray.includes('X')) {
//     boardArray[randomIndex]='O';
//     render();
//   }
// }

//
// let squareIndex = squaresArray.findIndex(function(square) {
//   return square === event.target;
// })
// boardArray[squareIndex] = currentPlayer;
// squaresArray[squareIndex].removeEventListener('click', handleTurn);
// currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
