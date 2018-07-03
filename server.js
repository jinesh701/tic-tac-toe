let express = require('express');
let socket = require('socket.io');

//App setup
let app = express();

app.use(express.static('public'));

let server = app.listen(8080, function() {
  console.log('listening on port 8080');
});

//Socket setup
let io = socket(server);

io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  socket.on('playTurn', function(data) {
    socket.broadcast.emit('playTurn', data);
  });
  socket.on('winner', function(data) {
    socket.broadcast.emit('gameOver', { winner: data });
  });
});
