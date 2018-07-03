let express = require('express');
let socket = require('socket.io');

//App setup
let app = express();

app.use(express.static('public'));

let server = app.listen(8080, () => {
  console.log('listening on port 8080');
});

//Socket setup
let io = socket(server);

io.on('connection', socket => {
  console.log('made socket connection', socket.id);
});
