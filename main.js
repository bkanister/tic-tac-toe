//constants
const select = document.getElementById('select');
const gameBoard = document.querySelector('.game-board');
const squares = document.getElementsByClassName('square');
//variables
let boardArray = [];
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
      let div = `<div class="square square__${i}"></div>`;
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
}


function render() {
  boardArray.forEach(function(mark, index){
    squaresArray[index].textContent = mark;
  });
}

function handleTurn(square) {
console.log('turn')
  let squareIndex = squaresArray.findIndex(function(squareFromArray) {
    return squareFromArray === square;
  })
  // console.log(squareIndex)
  boardArray[squareIndex] = currentPlayer;
  // console.log(boardArray);
  render()
}
