import React, { useState } from 'react';
import CheckedQuote from './CheckedQuote';
import TypingInput from './TypingInput';

import './TypeRacer.css';

const TypeRacer = () => {
  const quote = 'She sells sea shells by the sea shore.'
  const [typed, setTyped] = useState('');

  return (
    <div className="racer-container">
      <form>
        <CheckedQuote quote={quote} typed={typed} />
        <TypingInput onInputChange={setTyped} />
      </form>
    </div>
  )
};

export default TypeRacer;
