import React from 'react';
import CheckedWord from './CheckedWord';

import './CheckedQuote.css';

const CheckedQuote = ({ quoteMap, currentWordIndex, currentPosition }) => {
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
              currentPosition={currentPosition}
            />
          );
        })
      }
    </blockquote>
  );
};

export default CheckedQuote;
