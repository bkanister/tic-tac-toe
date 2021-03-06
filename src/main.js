import {
  choosePlayerDiv,
  gameBoard,
  newGameButton,
  playerO,
  playerX,
  select,
  squares} from "./constants/constants.js";
import {winning} from "./checkWinner.js";
import {minimax, getEmptyCells} from "./minimax.js";

let boardArray = [];
let squaresArray = [];
let currentPlayer = '';
let steps = 0;


const chooseXorO = (e) => {
  //remove letters animation
  choosePlayerDiv.firstElementChild.classList.remove('animate__infinite');
  choosePlayerDiv.lastElementChild.classList.remove('animate__infinite');

  //activate board
  squaresArray.forEach(item => {
    item.addEventListener('click', handleTurn);
    item.style.cursor = 'pointer';
  });
//adapt board to player's choice
  if (e.target.classList.contains('x')) {
    playerO.innerHTML = `Player <span class='letter o o__small'><i class="fa fa-desktop"></i></span>`;
    playerX.innerHTML = `Player <span class='letter x x__small'>X</span>`;
    steps=2;
    currentPlayer = 'X';
    document.querySelector('.player-x').classList.add('current-player');
  } else if (e.target.classList.contains('o')) {
    playerX.innerHTML = `Player <span class='letter x x__small'><i class="fa fa-desktop"></i></span>`;
    playerO.innerHTML = `Player <span class='letter o o__small'>O</span>`;
    steps=1;
    currentPlayer = 'X';
    computerTurn();
  }
}

//make board adaptive from 3 to 5
const setBoard = () => {
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
  render();
  window.fitText(document.querySelectorAll(".square"), 0.13);
}


const render = () => {
  boardArray.forEach((mark, index) => {
    squaresArray[index].textContent = mark;
      return (mark === 'X')
          ? squaresArray[index].classList.add('x')
          : (mark === 'O')
              ? squaresArray[index].classList.add('o')
              : null;
  })
}


const handleTurn = (event) => {
  if (currentPlayer === 'X') {
    playerX.classList.remove('current-player');
    playerO.classList.add('current-player');
  } else if (currentPlayer === 'O') {
    playerX.classList.add('current-player');
    playerO.classList.remove('current-player');
  }
  let squareIndex = squaresArray.findIndex(square => {
    return square === event.target;
  })
  boardArray[squareIndex] = currentPlayer;
  squaresArray[squareIndex].removeEventListener('click', handleTurn);
  steps += 1;
  render();
  checkWin(currentPlayer);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (steps % 2 !== 0) {
    computerTurn();
  }
}


const startNewGame = () => {
  steps=0;
  choosePlayerDiv.firstElementChild.classList.add('infinite');
  choosePlayerDiv.lastElementChild.classList.add('infinite');
  playerX.innerHTML = `Player <span class='letter x x__small'>X</span>`;
  playerO.innerHTML = `Player <span class='letter o o__small'>O</span>`;
  playerX.classList.remove('current-player');
  playerO.classList.remove('current-player');
  setBoard();
}


const computerTurn = () => {
    if (currentPlayer === 'O') {
      playerX.classList.remove('current-player');
      playerO.classList.add('current-player');

      let idx = minimax(boardArray, currentPlayer).index;
      boardArray[idx] = 'O';

      squaresArray[idx].removeEventListener('click', handleTurn);
      setTimeout(() => {
        playerX.classList.add('current-player');
        playerO.classList.remove('current-player');
        render()
      }, 1500);
    }
    if (currentPlayer === 'X') {
      playerX.classList.add('current-player');
      playerO.classList.remove('current-player');

      let idx = minimax(boardArray, currentPlayer).index;
      boardArray[idx] = 'X';
      squaresArray[idx].removeEventListener('click', handleTurn);
      setTimeout(() => {
        playerX.classList.remove('current-player');
        playerO.classList.add('current-player');
        render()
      }, 1500);
    }
    steps++;
    checkWin(currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


const checkWin = (player) => {
  if (winning(boardArray, player)) {
    document.querySelector('.player-choice-header').textContent = `${player} wins!`;
    newGameButton.textContent = 'Play again!';
  }
  if (getEmptyCells(boardArray).length === 0) {
    document.querySelector('.player-choice-header').textContent = `That's a tie!`;
    newGameButton.textContent = 'Play again!';
  }
}

document.addEventListener('DOMContentLoaded', setBoard);
select.addEventListener('change', setBoard);
newGameButton.addEventListener('click', startNewGame);
choosePlayerDiv.addEventListener('click', chooseXorO)
