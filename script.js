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

    const whichPlayerWins = (marker) => {
        if (marker == 'X') {
            window.alert(`${playerController.playerOne.name} wins!`);
            playerController.updateScore(playerController.playerOne);
        }
        else {
            window.alert(`${playerController.playerTwo.name} wins!`);
            playerController.updateScore(playerController.playerTwo);
        }
    }

    const checkForRow = () => {
        //Check first row
        if (boardArray[0] != 'E' && boardArray[0] == boardArray[1] && boardArray[0] == boardArray[2]) {
            whichPlayerWins(boardArray[0]);
        }
        //Check second row
        if (boardArray[3] != 'E' && boardArray[3] == boardArray[4] && boardArray[3] == boardArray[5]) {
            whichPlayerWins(boardArray[3]);
        }
        //Check third row
        if (boardArray[6] != 'E' && boardArray[6] == boardArray[7] && boardArray[6] == boardArray[8]) {
            whichPlayerWins(boardArray[6]);
        }
    };

    const checkForColumn = () => {
        //Check first column
        if (boardArray[0] != 'E' && boardArray[0] == boardArray[3] && boardArray[0] == boardArray[6]) {
            whichPlayerWins(boardArray[0]);
        }
        //Check second column
        if (boardArray[1] != 'E' && boardArray[1] == boardArray[4] && boardArray[1] == boardArray[7]) {
            whichPlayerWins(boardArray[1]);
        }
        //Check third column
        if (boardArray[2] != 'E' && boardArray[2] == boardArray[5] && boardArray[2] == boardArray[8]) {
            whichPlayerWins(boardArray[3]);
        }
    }

    const checkForDiagonal = () => {
        //Check L-R
        if (boardArray[0] != 'E' && boardArray[0] == boardArray[4] && boardArray[0] == boardArray[8]) {
            whichPlayerWins(boardArray[0]);
        }
        //Check R-L
        if (boardArray[2] != 'E' && boardArray[2] == boardArray[4] && boardArray[2] == boardArray[6]) {
            whichPlayerWins(boardArray[2]);
        }
    }

    const checkWin = () => {
        checkForRow();
        checkForColumn();
        checkForDiagonal();
    }

    const resetBoardArray = () => {
        boardArray.forEach((el,i,arr) => { arr[i] = 'E'});
    }

    return { boardArray, updateBoardArray, checkWin, resetBoardArray };
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

    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener('click', () => { restartGame() });

    const restartGame = () => {
        for (let tile of boardTiles) {
            tile.textContent = '';
        }
        boardController.resetBoardArray();
    }

})();

//player functions.
const playerFactory = (name, score = 0) => {
    return { name, score };
}

const playerController = (() => {
    const playerOneName = window.prompt("Enter player one's name:","Player One");
    const playerTwoName = window.prompt("Enter player two's name:","Player Two");

    const playerOne = playerFactory(playerOneName);
    const playerTwo = playerFactory(playerTwoName);

    const playerInfoDivs = document.getElementsByClassName("playerInfo");

    playerInfoDivs[0].firstChild.textContent = playerOne.name;
    playerInfoDivs[0].lastChild.textContent = `Wins: ${playerOne.score}`;
    playerInfoDivs[1].firstChild.textContent = playerTwo.name;
    playerInfoDivs[1].lastChild.textContent = `Wins: ${playerTwo.score}`;

    const updateScore = (winningPlayer) => {
        if (winningPlayer.name == playerOne.name) {
            playerOne.score += 1;
            playerInfoDivs[0].lastChild.textContent = `Wins: ${playerOne.score}`;
        }
        else {
            playerTwo.score += 1;
            playerInfoDivs[1].lastChild.textContent = `Wins: ${playerTwo.score}`;
        }
    }

    return { playerOne , playerTwo , updateScore};
})();