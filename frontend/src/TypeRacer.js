import React, { useState } from 'react';

import RacerStates from './RacerStates';

import ActiveRacer from './ActiveRacer';

import './TypeRacer.css';

const TypeRacer = ({ quote, onFinish, racerState, ...props }) => {
  console.log(racerState);
  const [wpm, setWpm] = useState(0);

  function finishedRacing({ finalWpm }) {
    setWpm(finalWpm);
    onFinish(finalWpm);
  }

  if (racerState === RacerStates.WAITING) {
    return (
      <h2>Please wait for game to start.</h2>
    );
  }

  if (racerState === RacerStates.IN_PROGRESS) {
    return (
      <div className="racer-container">
        <ActiveRacer quote={quote} onFinish={finishedRacing} {...props} />
      </div>
    );
  }

  if (racerState === RacerStates.FINISHED) {
    return (
      <h2>
        {`Congrats! You typed ${wpm} words per minute.`}
      </h2>
    );
  }

  return (
    <h2>Unknown game state.</h2>
  );
};

export default TypeRacer;
