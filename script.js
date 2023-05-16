//board controller module
//Array of either E (empty), O, or X. Later, the index # of the array will be compared to the index # of the board tile.
const boardController = (() => {
    const boardArray = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];

    //Method that updates boardArray depending on the move passed in  
    const updateBoardArray = (tileIndex) => {
        console.log(tileIndex);
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
        });
    }

    //if E, then leave tile empty; if O, put O in tile; if X, put X in tile.

})();

//player functions. Marker = whether theyre X or O.
const playerFactory = (name, marker) => {
    return { name, marker };
}


//So a player chooses whether they're X or O. They click on a tile, and which player made the move is passed over to the controller,
//which updates the board array and then calls the displayController to update the game board.