import io from 'socket.io-client';

import React, { useState, useEffect } from 'react';
import RacerStates from './RacerStates';

import TypeRacer from './TypeRacer';
import 'normalize.css';
import './App.css';


// const socket = io('http://localhost:4001');
// host = 'https://2v0n4v15z0.sse.codesandbox.io'
// const server = process.env.SERVER || 'localhost'
const server = window.location.origin || 'localhost'
const port = process.env.PORT || '4001'
const socket = io(`${server}:${port}`);

const App = () => {
  const [racerState, setRacerState] = useState(RacerStates.WAITING);
  const [msg, setMsg] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playersPct, setPlayersPct] = useState({});

  useEffect(() => {
    socket.on('game.message', setMsg);

    socket.on('game.player.join', (playerId) => {
      setPlayers(players => players.concat(playerId));
    });

    socket.on('game.playerId', setPlayerId);

    socket.on('game.start', () => {
      setRacerState(RacerStates.IN_PROGRESS);
    });

    socket.on('game.player.setPct', ({ id, pct }) => {
      setPlayersPct((playersPct) => {
        return {
          ...playersPct,
          [id]: pct
        };
      });
    });

    socket.emit('game.join');

    return () => socket.close();
  }, []);

  function onFinish() {
    setRacerState(RacerStates.FINISHED);
  }

  function emit(msg, data) {
    socket.emit(msg, data);
  }

  const message = msg === null ? 'No message yet' : `Message is: ${msg}`;

  return (
    <div id="page">
      <header>
        <h1>ReactRacer</h1>
      </header>

      <h2>{message}</h2>

      <TypeRacer
        racerState={racerState}
        emit={emit}
        playerId={playerId}
        players={players}
        playersPct={playersPct}
        onFinish={onFinish}
        quote="What good are prayers and shrines to a person mad with love?
              The flame keeps gnawing into her tender marrow hour by hour,
              and deep in her heart the silent wound lives on."
      />
    </div>
  );
};

export default App;
