import React, { useState } from 'react';

import './TypeRacer.css';

import ActiveRacer from './ActiveRacer';

const RacerStates = Object.freeze({
  WAITING: Symbol('RACER_STATE_WAITING'),
  IN_PROGRESS: Symbol('RACER_STATE_IN_PROGRESS'),
  FINISHED: Symbol('RACER_STATE_FINISHED'),
});

const TypeRacer = ({ quote }) => {
  const [racerState, setRacerState] = useState({
    state: RacerStates.WAITING,
    wpm: 0,
  });

  function startRacing() {
    setRacerState({
      state: RacerStates.IN_PROGRESS,
      wpm: racerState.wpm,
    });
  }

  function finishedRacing({ finalWpm }) {
    setRacerState({
      state: RacerStates.FINISHED,
      wpm: finalWpm,
    });
  }

  if (racerState.state === RacerStates.WAITING) {
    return (
      <button type="button" onClick={startRacing}>
        Start!
      </button>
    );
  }

  if (racerState.state === RacerStates.IN_PROGRESS) {
    return (
      <div className="racer-container">
        <ActiveRacer quote={quote} onFinish={finishedRacing} />
      </div>
    );
  }

  return (
    <h2>
      {`Congrats! You typed ${racerState.wpm} words per minute.`}
    </h2>
  );
};

export default TypeRacer;
