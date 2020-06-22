onselectstart = (e) => {
  e.preventDefault();
};
const ticTacToeGame = new TicTacToeGame();

//Starting the game
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);

  let turn = 0;
  this.start = function () {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((element) => observer.observe(element, config));
    takeTurn();
  };

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 === 0) {
      //Time for human to play
      humanPlayer.takeTurn();
    } else {
      //Time for computer to play
      computerPlayer.takeTurn();
    }
    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll(".col-4"));

  this.checkForWinner = function () {
    let winner = false;

    //Below shows winning combinations in the board
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    const positions = this.positions;

    //Looping through to determine if someone have won
    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningCombo =
        pos0InnerText !== "" &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;

      if (isWinningCombo) {
        winner = true;

        //styling the winning combination in green color
        winningCombo.forEach((index) => {
          positions[index].classList.add("winner");
        });
      }
    });
    if (winner) document.querySelector("#btn").style.display = "block";

    // when it returns true, no player can play again
    return winner;
  };
}

function HumanPlayer(board) {
  this.takeTurn = function () {
    board.positions.forEach((el) => {
      el.addEventListener("click", handleTurnTaken);
    });
  };

  function handleTurnTaken(e) {
    //if position has been selected
    if (e.target.innerHTML !== "") return;

    //select new position
    e.target.innerHTML = "X";
    board.positions.forEach((el) =>
      el.removeEventListener("click", handleTurnTaken)
    );
  }
}

function ComputerPlayer(board) {
  this.takeTurn = function () {
    const availablePositions = board.positions.filter((p) => p.innerText == "");
    const move = Math.floor(Math.random() * availablePositions.length);
    if (availablePositions.length !== 0) {
      let p0 = board.positions[0].innerHTML;
      let p1 = board.positions[1].innerHTML;
      let p2 = board.positions[2].innerHTML;
      let p3 = board.positions[3].innerHTML;
      let p4 = board.positions[4].innerHTML;
      let p5 = board.positions[5].innerHTML;
      let p6 = board.positions[6].innerHTML;
      let p7 = board.positions[7].innerHTML;
      let p8 = board.positions[8].innerHTML;
      if (p4 === "") {
        //Making computer play for center position if human fails to play on center
        ////////////////////////
        return setTimeout(() => (board.positions[4].innerHTML = 0), 800);

        //first layer
        ////////////////////////
      } else if (p0 === "X" && p1 === "X" && p2 === "") {
        return setTimeout(() => (board.positions[2].innerHTML = 0), 800);
      } else if (p1 === "X" && p2 === "X" && p0 === "") {
        return setTimeout(() => (board.positions[0].innerHTML = 0), 800);
      } else if (p0 === "X" && p2 === "X" && p1 === "") {
        return setTimeout(() => (board.positions[1].innerHTML = 0), 800);
        //second layer
        ///////////////////////////
      } else if (p3 === "X" && p4 === "X" && p5 === "") {
        return setTimeout(() => (board.positions[5].innerHTML = 0), 800);
      } else if (p3 === "X" && p5 === "X" && p4 === "") {
        return setTimeout(() => (board.positions[4].innerHTML = 0), 800);
      } else if (p4 === "X" && p5 === "X" && p3 === "") {
        return setTimeout(() => (board.positions[3].innerHTML = 0), 800);

        //third layer
        ///////////////////////////
      } else if (p6 === "X" && p7 === "X" && p8 === "") {
        return setTimeout(() => (board.positions[8].innerHTML = 0), 800);
      } else if (p6 === "X" && p8 === "X" && p7 === "") {
        return setTimeout(() => (board.positions[7].innerHTML = 0), 800);
      } else if (p7 === "X" && p8 === "X" && p6 === "") {
        return setTimeout(() => (board.positions[6].innerHTML = 0), 800);

        //left top to down layer
        ///////////////////////////
      } else if (p0 === "X" && p3 === "X" && p6 === "") {
        return setTimeout(() => (board.positions[6].innerHTML = 0), 800);
      } else if (p0 === "X" && p6 === "X" && p3 === "") {
        return setTimeout(() => (board.positions[3].innerHTML = 0), 800);
      } else if (p3 === "X" && p6 === "X" && p0 === "") {
        return setTimeout(() => (board.positions[0].innerHTML = 0), 800);

        //top left to bottom right
        ///////////////////////////
      } else if (p0 === "X" && p4 === "X" && p8 === "") {
        return setTimeout(() => (board.positions[8].innerHTML = 0), 800);
      } else if (p0 === "X" && p8 === "X" && p4 === "") {
        return setTimeout(() => (board.positions[4].innerHTML = 0), 800);
      } else if (p4 === "X" && p8 === "X" && p0 === "") {
        return setTimeout(() => (board.positions[0].innerHTML = 0), 800);

        //right top to bottom
        ///////////////////////////
      } else if (p2 === "X" && p5 === "X" && p8 === "") {
        return setTimeout(() => (board.positions[8].innerHTML = 0), 800);
      } else if (p2 === "X" && p8 === "X" && p5 === "") {
        return setTimeout(() => (board.positions[5].innerHTML = 0), 800);
      } else if (p5 === "X" && p8 === "X" && p2 === "") {
        return setTimeout(() => (board.positions[2].innerHTML = 0), 800);

        //top right to bottom left
        ///////////////////////////
      } else if (p2 === "X" && p4 === "X" && p6 === "") {
        return setTimeout(() => (board.positions[6].innerHTML = 0), 800);
      } else if (p4 === "X" && p6 === "X" && p2 === "") {
        return setTimeout(() => (board.positions[2].innerHTML = 0), 800);

        //middle top to bottom
        ///////////////////////////
      } else if (p1 === "X" && p4 === "X" && p7 === "") {
        return setTimeout(() => (board.positions[7].innerHTML = 0), 800);
      } else if (p4 === "X" && p7 === "X" && p1 === "") {
        return setTimeout(() => (board.positions[1].innerHTML = 0), 800);

        //final else for random
        ///////////////////////////
      } else {
        return setTimeout(() => (availablePositions[move].innerHTML = 0), 800);
      }
    } else {
      document.querySelector("#btn").style.display = "block";
    }
  };
}
