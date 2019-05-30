var   board;
const humPlayer = 'O';
      aiPlayer  = 'X';
      cells = document.querySelectorAll('.cell');
      winCells = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [6,4,2]
      ]


startGame();

function startGame() {
    document.querySelector('.end').style.display = "none"
    board = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color')
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if(typeof board[square.target.id] == 'number') {
        turn(square.target.id, humPlayer)
        if(!checkTie()) turn(bestSpot(), aiPlayer);
    }
}

function turn(squareId, player){
    board[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(board, player)
    if (gameWon) gameOver(gameWon)
}

function checkWin (onBoard, player) {
    let plays = onBoard.reduce((a, e, i) =>
         (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of winCells.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {index:index, player: player};
        break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCells[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == humPlayer ? "blue" : "red";
    }
    for ( var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humPlayer ? "Победа!" : "Ну,сорян!");
}

function declareWinner(person) {
    document.querySelector('.end').style.display ="block"
    document.querySelector('.end .text').innerText = person;
}

function emptySquares() {
    return board.filter(s => typeof s =='number');
}

function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    if(emptySquares().length == 0) {
        for ( var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green"
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Ничья!")
        return true;
    }
    return false
}