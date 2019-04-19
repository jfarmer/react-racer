import React, { useState } from 'react';

import './TypeRacer.css';

import ActiveRacer from './ActiveRacer';

const TypeRacer = ({ quote }) => {
  const [inProgress, setInProgress] = useState(true);

  function setNotInProgress() {
    setInProgress(false);
  }

  if (inProgress) {
    return (
      <div className="racer-container">
        <ActiveRacer quote={quote} onFinish={setNotInProgress} />
      </div>
    );
  }

  return (
    <h2>Congrats!</h2>
  );
};

export default TypeRacer;
