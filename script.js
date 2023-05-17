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

    const checkForRow = () => {
        //Check first row
        if (boardArray[0] != 'E' && boardArray[0] == boardArray[1] && boardArray[0] == boardArray[2]) {
            console.log('First row');
        }
        //Check second row
        if (boardArray[3] != 'E' && boardArray[3] == boardArray[4] && boardArray[3] == boardArray[5]) {
            console.log('Second row');
        }
        //Check third row
        if (boardArray[6] != 'E' && boardArray[6] == boardArray[7] && boardArray[6] == boardArray[8]) {
            console.log('Third row');
        }
    };

    const checkForColumn = () => {
        //Check first column
        if (boardArray[0] != 'E' && boardArray[0] == boardArray[3] && boardArray[0] == boardArray[6]) {
            console.log('First column');
        }
        //Check second column
        if (boardArray[1] != 'E' && boardArray[1] == boardArray[4] && boardArray[1] == boardArray[7]) {
            console.log('Second column');
        }
        //Check third column
        if (boardArray[2] != 'E' && boardArray[2] == boardArray[5] && boardArray[2] == boardArray[8]) {
            console.log('Third column')
        }
    }

    const checkForDiagonal = () => {
        //Check L-R
        if (boardArray[0] != 'E' && boardArray[0] == boardArray[4] && boardArray[0] == boardArray[8]) {
            console.log('LR diagonal');
        }
        //Check R-L
        if (boardArray[2] != 'E' && boardArray[2] == boardArray[4] && boardArray[2] == boardArray[6]) {
            console.log('RL diagonal');
        }
    }

    const checkWin = () => {
        checkForRow();
        checkForColumn();
        checkForDiagonal();
    }

    return { boardArray, updateBoardArray, checkWin};
})();

//board display module
const boardDisplayController = (() => {
    const boardTiles = document.getElementsByClassName("gameBoardTile");

    //add event listeners to all the tiles
    for (let i = 0; i < boardTiles.length; i++) {
        boardTiles[i].addEventListener('click', () => {
            boardController.updateBoardArray(i);
            updateTile(i);
            boardController.checkWin();
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