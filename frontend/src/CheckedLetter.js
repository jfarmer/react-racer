import React from 'react';
import './CheckedLetter.css';

const getLetterClassName = (typingIntervals, i) => {
  const { typedInterval, mismatchedInterval, untypedInterval } = typingIntervals;

  if (typedInterval.contains(i)) {
    return 'typed';
  }

  if (mismatchedInterval.contains(i)) {
    return 'mismatch';
  }

  if (untypedInterval.contains(i)) {
    return 'untyped';
  }

  return 'unknown';
};

const CheckedLetter = ({ letter, typingIntervals, position }) => {
  const letterClassName = getLetterClassName(typingIntervals, position);
  const componentClasses = ['checked-quote-letter', letterClassName];

  if (letter === ' ') {
    componentClasses.push('whitespace');
  } else {
    componentClasses.push('not-whitespace');
  }

  const componentClassString = componentClasses.join(' ');

  return (
    <span className={componentClassString}>{letter}</span>
  );
};

export default CheckedLetter;
