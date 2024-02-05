var playerRed = "R";
var playerGreen = "G";
var currPlayer = playerRed; // START PLAYER

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

window.onload = function() {
  setGame();
}


// SET GAME FUNCTION
function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(' ');
      // HTML
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

// SET PIECE FUNCTION
function setPiece() {
  if (gameOver) {
    return;
  }

  // CHECK COORDINATES OF TILE
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // FIGURE OUT WHICH ROW THE COLUMN SHOULD BE ON
  r = currColumns[c];

  if (r < 0) { // board[r][c] != ' '
    return;
  }

  board[r][c] = currPlayer; // UPDATE BOARD
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerGreen;
  }
  else {
    tile.classList.add("green-piece");
    currPlayer = playerRed;
  }

  r -= 1; //UPDATE ROW HEIGHT FOR COLUMN
  currColumns[c] = r; //UPDATE ARRAY

  checkWinner();
}

function checkWinner() {
  // CHECK HORIZONTAL WINNER
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // CHECK VERTICAL WINNER
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // ANTI DIAGONAL
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // CHECK DIAGONAL WINNER
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}


// SET WINNER FUNCTION
function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == playerRed) {
    winner.innerText = "Red Wins!";
  } else {
    winner.innerText = "Green Wins!";
  }
  gameOver = true;
}
