import React, { useState } from 'react';

import useInterval from './useInterval';

import QuoteMap from './QuoteMap';

import ProgressBar from './ProgressBar';

import CheckedQuote from './CheckedQuote';
import CheckedInput from './CheckedInput';

import firstMismatchPosition from './firstMismatchPosition';
import createTypingIntervals from './createTypingIntervals';

const getOffsetMismatchPosition = (offset, word, input) => {
  const inputMismatchPosition = firstMismatchPosition(word, input);

  return offset + Math.min(input.length, inputMismatchPosition);
};

/**
 * FIXME: This component should be renderable even if we've typed everything.
 * Otherwise, we rely on the parent component to ensure we don't get rendered.
 *
 * It's not renderable because it relies on wordIndex to decide what to display,
 * but after the race has finished we can't increment wordIndex and re-render because
 * wordIndex will be beyond the end of the list of words.
 *
 * But if we don't increment it, it will render as if we have yet to type the last word.
 */
const ActiveRacer = ({ quote, onFinish }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [currentWpm, setCurrentWpm] = useState(0);
  const [pctTyped, setPctTyped] = useState(0);

  const quoteMap = QuoteMap({ quote });

  const currentWord = quoteMap.getWord(wordIndex);
  const currentOffset = quoteMap.getWordOffset(wordIndex);

  const cursorPosition = currentOffset + currentInput.length;

  const quoteMismatchPos = getOffsetMismatchPosition(currentOffset, currentWord.text, currentInput);

  const typingIntervals = createTypingIntervals(0, quoteMismatchPos, cursorPosition, quote.length);

  useInterval((elapsed) => {
    const wordsTyped = wordIndex;
    const elapsedMin = elapsed / (60 * 1000);

    const wpm = wordsTyped > 0 ? wordsTyped / elapsedMin : 0;

    setCurrentWpm(Math.floor(wpm));
  }, 500);

  function onWordMatch() {
    if (wordIndex < quoteMap.wordsCount() - 1) {
      setPctTyped((wordIndex + 1) / quoteMap.wordsCount());
      setWordIndex(wordIndex + 1);
    } else {
      setPctTyped(100);
      onFinish({ finalWpm: currentWpm });
    }
  }

  return (
    <div className="active-racer">
      <ProgressBar percent={pctTyped} />
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

        <div>
          <strong>WPM:</strong>
          <span>{currentWpm}</span>
        </div>
      </form>
    </div>
  );
};

export default ActiveRacer;
