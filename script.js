//board controller module
//Array of either E (empty), O, or X. Later, the index # of the array will be compared to the index # of the board tile.
const boardController = (() => {
    const boardArray = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
    let moveTurn = 1;

    const updateBoardArray = (tileIndex) => {
        //Make it only overwrite 'E' values.
        if (boardArray[tileIndex] == 'E') {
            if (moveTurn % 2 == 0) {
                boardArray[tileIndex] = 'O';
            }
            else {
                boardArray[tileIndex] = 'X';
            }
            moveTurn++;
        }
    };

    return { boardArray, updateBoardArray };
})();

//board display module
const boardDisplayController = (() => {
    const boardTiles = document.getElementsByClassName("gameBoardTile");

    //add event listeners to all the tiles
    for (let i = 0; i < boardTiles.length; i++) {
        boardTiles[i].addEventListener('click', () => {
            boardController.updateBoardArray(i);
            updateTile(i);
        });
    }

    const updateTile = (boardIndex) => {
        //retrieve tile value from boardcontroller and compare
        if (boardController.boardArray[boardIndex] == 'X') {
            boardTiles[boardIndex].textContent = 'X';
        }
        if (boardController.boardArray[boardIndex] == 'O') {
            boardTiles[boardIndex].textContent = 'O';
        }
    };

})();

//player functions.
const playerFactory = (name, score) => {
    return { name, score };
}


//Player 1 is X, player 2 is O. They click on a tile, and which player made the move is passed over to the controller,
//which updates the board array and then calls the displayController to update the game board.

//First click = player 1. So on odd moveturns, update to X ??
//Second click = player 2. So on even moveturns, update to O.