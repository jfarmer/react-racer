/* eslint-disable react/no-array-index-key */

import React from 'react';
import CheckedLetter from './CheckedLetter';

const CheckedWord = ({
  word,
  isCurrent,
  cursorPosition,
  typingIntervals,
}) => {
  const componentClasses = ['word'];

  if (isCurrent) {
    componentClasses.push('current');
  }

  const componentClassString = componentClasses.join(' ');

  const { offset } = word;

  return (
    <span key={`checked-word-${offset}`} className={componentClassString}>
      {
        word.letters.map((letter, i) => (
          <CheckedLetter
            key={`checked-letter-${offset}-${i}`}
            letter={letter}
            typingIntervals={typingIntervals}
            cursorPosition={cursorPosition}
            position={offset + i}
          />
        ))
      }
    </span>
  );
};

export default CheckedWord;
