import React, { useState } from 'react';

import RightOpenInterval from './RightOpenInterval';
import QuoteMap from './QuoteMap';

import CheckedQuote from './CheckedQuote';
import CheckedInput from './CheckedInput';

import firstMismatchPosition from './firstMismatchPosition';
import zipAdjacentWith from './zipAdjacentWith';

const TypingIntervals = (start, mismatchedPos, cursorPos, textLength) => {
  const endpoints = [start, mismatchedPos, cursorPos, textLength];

  const [typed, mismatched, untyped] = zipAdjacentWith(endpoints, RightOpenInterval);

  return {
    typedInterval: typed,
    mismatchedInterval: mismatched,
    untypedInterval: untyped,
  };
};

const getOffsetMismatchPosition = (offset, word, input) => {
  const inputMismatchPosition = firstMismatchPosition(word, input);

  return offset + Math.min(input.length, inputMismatchPosition);
};

/**
 * FIXME: This component should be renderable even if we've typed everything.
 * Otherwise, we rely on the parent component to ensure we don't get rendered.
 */
const ActiveRacer = ({ quote, onFinish }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

  const quoteMap = QuoteMap({ quote });

  const currentWord = quoteMap.getWord(wordIndex);
  const currentOffset = quoteMap.getWordOffset(wordIndex);

  const cursorPosition = currentOffset + currentInput.length;

  const quoteMismatchPos = getOffsetMismatchPosition(currentOffset, currentWord.text, currentInput);

  const typingIntervals = TypingIntervals(0, quoteMismatchPos, cursorPosition, quote.length);

  function onWordMatch() {
    if (wordIndex < quoteMap.wordsCount() - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      onFinish();
    }
  }

  return (
    <div className="active-racer">
      <form>
        <CheckedQuote
          quoteMap={quoteMap}
          currentWordIndex={wordIndex}
          currentInput={currentInput}
          cursorPosition={cursorPosition}
          typingIntervals={typingIntervals}
        />
        <CheckedInput
          expectedWord={currentWord}
          onInputChange={setCurrentInput}
          onWordMatch={onWordMatch}
        />
      </form>
    </div>
  );
};

export default ActiveRacer;
