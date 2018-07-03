jQuery(function($) {
  let socket = io.connect('http://localhost:8080/');

  let ticTacToe = {
    playerTurn: 'X'
  };

  function changeTurn() {
    if (ticTacToe.playerTurn === 'X') {
      ticTacToe.playerTurn = 'O';
    } else {
      ticTacToe.playerTurn = 'X';
    }
  }

  function findWinner() {
    let buttons = $('.board').children('button');
    let winner = false;

    if (
      buttons[a0].innerHTML === mark &&
      buttons[a1].innerHTML === mark &&
      buttons[a2].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[b0].innerHTML === mark &&
      buttons[b1].innerHTML === mark &&
      buttons[b2].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[c0].innerHTML === mark &&
      buttons[c1].innerHTML === mark &&
      buttons[c2].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[a0].innerHTML === mark &&
      buttons[b1].innerHTML === mark &&
      buttons[c2].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[a2].innerHTML === mark &&
      buttons[b1].innerHTML === mark &&
      buttons[c0].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[a0].innerHTML === mark &&
      buttons[b0].innerHTML === mark &&
      buttons[c0].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[a1].innerHTML === mark &&
      buttons[b1].innerHTML === mark &&
      buttons[c1].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[a2].innerHTML === mark &&
      buttons[b2].innerHTML === mark &&
      buttons[c2].innerHTML === mark
    ) {
      winner = true;
    }
    return winner;
  }
});
