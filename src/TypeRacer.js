import React, { useState } from 'react';
import CheckedQuote from './CheckedQuote';
import CheckedInput from './CheckedInput';

import QuoteMap from './QuoteMap';

import './TypeRacer.css';

const TypeRacer = ({ quote }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [anyWordsLeft, setAnyWordsLeft] = useState(true);

  const quoteMap = QuoteMap({ quote });

  const currentWord = quoteMap.getWord(wordIndex);
  const currentOffset = quoteMap.getWordOffset(wordIndex);

  const onWordMatch = () => {
    if (wordIndex < quoteMap.wordsCount() - 1) {
      return setWordIndex(wordIndex + 1);
    }
    return setAnyWordsLeft(false);
  };

  const onInputChange = value => setCurrentPosition(currentOffset + value.length);

  return (
    <div className="racer-container">
      <form>
        <CheckedQuote
          quoteMap={quoteMap}
          currentWordIndex={wordIndex}
          currentPosition={currentPosition}
        />
        {anyWordsLeft ? (
          <CheckedInput
            expectedWord={currentWord}
            onInputChange={onInputChange}
            onWordMatch={onWordMatch}
          />
        ) : (
          <span>Congrats!</span>
        )}
      </form>
    </div>
  );
};

export default TypeRacer;
