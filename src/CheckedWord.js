import React from 'react';

const CheckedWord = ({ word, isCurrent }) => {
  const componentClasses = ['word'];

  if (isCurrent) {
    componentClasses.push('current');
  }

  const componentClassString = componentClasses.join(' ');

  return (
    <span key={word.offset} className={componentClassString}>
      <span className="not-whitespace">{word.word}</span>
      {word.hasWhitespace() && <span className="whitespace">{word.whitespace}</span>}
    </span>
  );
};

export default CheckedWord;
