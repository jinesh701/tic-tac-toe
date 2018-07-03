jQuery(function() {
  let socket = io.connect('http://localhost:8080');

  function findWinner(mark) {
    let buttons = $('.board').children('button');
    winner = false;
    if (
      buttons[0].innerHTML === mark &&
      buttons[1].innerHTML === mark &&
      buttons[2].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[3].innerHTML === mark &&
      buttons[4].innerHTML === mark &&
      buttons[5].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[6].innerHTML === mark &&
      buttons[7].innerHTML === mark &&
      buttons[8].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[0].innerHTML === mark &&
      buttons[3].innerHTML === mark &&
      buttons[6].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[1].innerHTML === mark &&
      buttons[4].innerHTML === mark &&
      buttons[7].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[2].innerHTML === mark &&
      buttons[5].innerHTML === mark &&
      buttons[8].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[0].innerHTML === mark &&
      buttons[4].innerHTML === mark &&
      buttons[8].innerHTML === mark
    ) {
      winner = true;
    } else if (
      buttons[2].innerHTML === mark &&
      buttons[4].innerHTML === mark &&
      buttons[6].innerHTML === mark
    ) {
      winner = true;
    }
    return winner;
  }

  let ticTacToe = {
    currentTurn: 'X',
    changeTurn: changeTurn,
    findWinner: findWinner
  };

  function changeTurn() {
    if (ticTacToe.currentTurn === 'X') {
      ticTacToe.currentTurn = 'O';
      $('.messages').html("O's turn");
    } else {
      ticTacToe.currentTurn = 'X';
      $('.messages').html("X's turn");
    }
  }

  socket.on('gameOver', data => {
    console.log('Game Over!!!');
    let buttons = $('.board').children('button');
    let winner = data.winner;
    buttons.attr('disabled', true);
    $('.messages').html(winner + ' WINS!');
  });

  socket.on('playTurn', data => {
    let selectedSpot = data.selectedSpot;
    let previousPlayer = data.previousPlayer;
    $('#' + selectedSpot)
      .prop('disabled', true)
      .html(previousPlayer);
    if (ticTacToe.findWinner('X') || ticTacToe.findWinner('O')) {
      socket.emit('winner', previousPlayer);
    } else {
      ticTacToe.changeTurn();
    }
  });

  $('.board').on('click', 'button', function() {
    $(this).html(ticTacToe.currentTurn);
    $(this).attr('disabled', true);
    socket.emit('playTurn', {
      previousPlayer: ticTacToe.currentTurn,
      selectedSpot: $(this).attr('id')
    });

    if (ticTacToe.findWinner('X') || ticTacToe.findWinner('O')) {
      socket.emit('winner', ticTacToe.currentTurn);
    } else {
      ticTacToe.changeTurn();
    }
  });
});
