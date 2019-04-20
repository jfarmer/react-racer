const express = require('express');
const http = require("http");
const socketIo = require('socket.io');

const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Hello').status(200);
});

io.on('connection', (socket) => {
  socket.emit('test', { hello: 'world' });
  socket.on('matched-word', (data) => {
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
