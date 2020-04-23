//constants
const select = document.getElementById('select');
const gameBoard = document.querySelector('.game-board');
const squares = document.getElementsByClassName('square');
const newGameButton = document.querySelector('.new-game-button')
const againstComputerButton = document.querySelector('.against-computer-button');
//variables
let boardArray = [];
let squaresArray = [];
let currentPlayer = '';
let steps = 0;
//eventListeners
document.addEventListener('DOMContentLoaded', setBoard);
select.addEventListener('change', setBoard);
newGameButton.addEventListener('click', startNewGame);

//choose for who you play
document.querySelector('.x-or-o').addEventListener('click', function(e) {
  if(e.target.classList.contains('x')) {
    document.querySelector('.player-o').innerHTML = `Player <span class='letter o o__small'><i class="fa fa-desktop"></i></span>`;
    document.querySelector('.player-x').innerHTML = `Player <span class='letter x x__small'>X</span>`;
    steps=2;
    currentPlayer = 'X';
    document.querySelector('.player-x').classList.add('current-player');
  } else if(e.target.classList.contains('o')) {
    document.querySelector('.player-x').innerHTML = `Player <span class='letter x x__small'><i class="fa fa-desktop"></i></span>`;
    document.querySelector('.player-o').innerHTML = `Player <span class='letter o o__small'>O</span>`;
    steps=1;
    currentPlayer = 'X';
    computerTurn();
  }

  console.log(currentPlayer)
  console.log(steps)
})

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
    item.addEventListener('click', function() {
      !currentPlayer ? null : handleTurn(event);
    })
  });
  render();
  window.fitText(document.querySelectorAll(".square"), 0.13);
}


function render() {
  boardArray.forEach(function(mark, index) {
    squaresArray[index].textContent = mark;
      return (mark === 'X') ? squaresArray[index].classList.add('x') : (mark === 'O') ? squaresArray[index].classList.add('o') : null;
  })
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
  steps += 1;
  render();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if(steps % 2 !== 0) {
    computerTurn();
  }
}


function startNewGame() {
  location.reload();
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


function computerTurn() {
    let randomIndex = getRandomTurn();
    if (currentPlayer === 'O') {
      document.querySelector('.player-x').classList.remove('current-player');
      document.querySelector('.player-o').classList.add('current-player');
      boardArray[randomIndex] = 'O';
      squaresArray[randomIndex].removeEventListener('click', handleTurn);
      setTimeout(() => {
        document.querySelector('.player-x').classList.add('current-player');
        document.querySelector('.player-o').classList.remove('current-player');
        render()
      }, 1500);
    }
    if (currentPlayer === 'X') {
      document.querySelector('.player-x').classList.add('current-player');
      document.querySelector('.player-o').classList.remove('current-player');
      boardArray[randomIndex] = 'X';
      squaresArray[randomIndex].removeEventListener('click', handleTurn);
      setTimeout(() => {
        document.querySelector('.player-x').classList.remove('current-player');
        document.querySelector('.player-o').classList.add('current-player');
        render()
      }, 1500);
    }
    steps++;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    console.log(currentPlayer)
    console.log(steps)
}
