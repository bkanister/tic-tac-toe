import {winning} from "./checkWinner.js";

export function getEmptyCells(boardArray) {
    let emptyCells = [];
    emptyCells = boardArray.map(function(item, index) {
        if (item === '') {
            return index;
        }
    })
    emptyCells = emptyCells.filter(item => item !== undefined);
    return emptyCells;
}

export const minimax = (newBoard, player) => {
    let availSpots = getEmptyCells(newBoard);

    if (winning(newBoard, 'X')){
        return {score: -10};
    }
    else if (winning(newBoard, 'O')){
        return {score: 10};
    }
    else if (availSpots.length === 0){
        return {score:0};
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++){
        let move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;
        if (player === 'O'){
            let result = minimax(newBoard, 'X');
            move.score = result.score;
        }
        if (player === 'X') {
            let result = minimax(newBoard, 'O');
            move.score = result.score;
        }
        newBoard[availSpots[i]] = '';
        moves.push(move);
    }
    let bestMove;
    if(player === 'O'){
        let bestScore = -10000;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}
