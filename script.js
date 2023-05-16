//board controller module
//Array of either E (empty), O, or X. Later, the index # of the array will be compared to the index # of the board tile.
const boardController = (() => {
    const boardArray = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];

    //Method that updates boardArray depending on the move passed in

    return { boardArray };
})();

//board display module
const boardDisplayController = (() => {
    const boardTiles = document.getElementsByClassName("gameBoardTile");

    //if E, then leave tile empty; if O, put O in tile; if X, put X in tile.
})();

//player functions. Marker = whether theyre X or O.
const playerFactory = (name, marker) => {

}