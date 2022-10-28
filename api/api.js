const { v4: uuid } = require('uuid');
const express = require('express');
const http = require("http");
const { Server: SocketIO } = require('socket.io');

const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = new SocketIO(server);

const RacerStates = Object.freeze({
  WAITING: Symbol('RACER_STATE_WAITING'),
  IN_PROGRESS: Symbol('RACER_STATE_IN_PROGRESS'),
  FINISHED: Symbol('RACER_STATE_FINISHED'),
});

const noop = () => {};

class Game {
  constructor({ id, state, maxPlayers, onGameStart = noop, onGameFinished = noop }) {
    this.state = state;
    this.maxPlayers = maxPlayers;
    this.onGameStart = onGameStart;
    this.onGameFinished = onGameFinished;
    this.players = [];
    this.id = id;
  }

  addPlayer(player) {
    if (!this.isWaiting()) {
      throw 'Cannot add player to already-running game.';
    }

    this.players.push(player);

    return this;
  }

  hasPlayer(player) {
    return this.players.includes(player);
  }

  start() {
    this.state = RacerStates.IN_PROGRESS;
    this.onGameStart(this);
  }

  isFull() {
    return this.players.length === 2;
  }

  isWaiting() {
    return this.state === RacerStates.WAITING;
  }

  isInProgress() {
    return this.state === RacerStates.IN_PROGRESS;
  }

  isFinished() {
    return this.state === RacerStates.FINISHED;
  }
}

class Player {
  constructor({ id, socketId }) {
    this.id = id;
    this.socketId = socketId;
  }
}

const createNewGame = ( { onGameStart }) => {
  return new Game({ maxPlayers: 2, onGameStart, id: uuid(), state: RacerStates.WAITING });
}

let activeGame = null;

app.get('/', (req, res) => {
  res.send('Hello').status(200);
});

io.on('connection', (socket) => {
  const player = new Player({ id: uuid(), socketId: socket.id });

  socket.on('disconnect', () => {
    if (activeGame && activeGame.hasPlayer(player)) {
      io.to(activeGame.id).emit('game.message', 'Player disconnected. Game ended.');
      activeGame = null;
    }
  });

  socket.on('game.join', () => {
    if (!activeGame) {
      activeGame = createNewGame({
        onGameStart: (game) => {
          io.to(game.id).emit('game.start');
          io.to(game.id).emit('game.message', 'We have a game!');
        }
      });
    }

    if (activeGame.isWaiting()) {
      socket.join(activeGame.id);
      socket.emit('game.message', 'Waiting for players.');

      socket.emit('game.playerId', player.id);

      // TODO: This is a hack. Should send down
      // list of existing players when someone connects.
      activeGame.players.forEach((player) => {
        socket.emit('game.player.join', player.id);
      });

      activeGame.addPlayer(player);

      io.in(activeGame.id).emit('game.player.join', player.id);

      if (activeGame.isFull()) {
        activeGame.start();
      }
    } else {
      socket.emit('game.message', 'The game is full.');
    }
  });

  socket.on('game.player.pct', ({ id, pct }) => {
    io.to(activeGame.id).emit('game.player.setPct', { id, pct });
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
