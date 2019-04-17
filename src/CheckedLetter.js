import React from 'react';
import './CheckedLetter.css';

const CheckedLetter = ({ quotedLetter, typedLetter, position }) => {
  const componentClasses = ['checked-quote-letter'];

  if (!typedLetter) {
    componentClasses.push('untyped');
  } else if (quotedLetter !== typedLetter) {
    componentClasses.push('incorrect');
  } else {
    componentClasses.push('correct');
  }

  const componentClassString = componentClasses.join(' ');

  return (
    <span key={position} className={componentClassString}>{quotedLetter}</span>
  );
};

export default CheckedLetter;
