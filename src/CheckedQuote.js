import React from 'react';
import CheckedWord from './CheckedWord';

import './CheckedQuote.css';

const CheckedQuote = ({
  quoteMap,
  currentWordIndex,
  cursorPosition,
  typingIntervals,
}) => {
  const words = Array.from(quoteMap.words());

  return (
    <blockquote className="checked-quote">
      {
        words.map((word, wordIndex) => {
          const isCurrent = wordIndex === currentWordIndex;

          return (
            <CheckedWord
              key={word.offset}
              word={word}
              isCurrent={isCurrent}
              cursorPosition={cursorPosition}
              typingIntervals={typingIntervals}
            />
          );
        })
      }
    </blockquote>
  );
};

export default CheckedQuote;
