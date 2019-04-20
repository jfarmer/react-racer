import io from 'socket.io-client';

import React, { useState, useEffect } from 'react';
import RacerStates from './RacerStates';

import TypeRacer from './TypeRacer';
import 'normalize.css';
import './App.css';

const socket = io('http://localhost:4001');

const App = () => {
  const [racerState, setRacerState] = useState(RacerStates.WAITING);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    socket.emit('game.join');
    socket.on('game.message', setMsg);
    socket.on('game.start', () => {
      setRacerState(RacerStates.IN_PROGRESS);
    })
  }, []);

  const message = msg === null ? 'No message yet' : `Message is: ${msg}`;

  return (
    <div id="page">
      <header>
        <h1>ReactRacer</h1>
      </header>

      <h2>{message}</h2>

      <TypeRacer
        racerState={racerState}
        quote="What good are prayers and shrines to a person mad with love?
              The flame keeps gnawing into her tender marrow hour by hour,
              and deep in her heart the silent wound lives on."
      />
    </div>
  );
};

export default App;
