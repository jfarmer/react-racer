import React from 'react';
import CheckedLetter from './CheckedLetter';

const zipWith = fn => (xs, ys) => (
  xs.map((x, i) => fn(x, ys[i], i))
);

const zipCheckedLetter = zipWith((quotedLetter, typedLetter, position) => (
  CheckedLetter({ quotedLetter, typedLetter, position })
));

const CheckedQuote = ({ quote, typed }) => {
  const quotedLetters = Array.from(quote);
  const typedLetters = Array.from(typed);

  return (
    <blockquote className="checked-quote">
      {
        zipCheckedLetter(quotedLetters, typedLetters)
      }
    </blockquote>
  );
};

export default CheckedQuote;
