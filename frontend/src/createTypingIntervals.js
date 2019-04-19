import zipAdjacentWith from './zipAdjacentWith';
import RightOpenInterval from './RightOpenInterval';

/**
 * Given four numbers (a,b,c,d) returns a specific collection of intervals
 * with those four numbers as endpoints, i.e.,
 *     [a,b), [b,c), [c,d)
 *
 * Specifically, take the list of characters in a quote. We want to segment
 * the list into three intervals:
 *
 *   1. Typed characters between the start of the quote and the first typo,
 *   2. Mistyped characters between the the first typo and the cursor, and
 *   3. Untyped charcters between the cursor and the end of the quote
 *
 * This returns an object containing those three intervals.
 */
const createTypingIntervals = (start, mismatchedPos, cursorPos, textLength) => {
  const endpoints = [start, mismatchedPos, cursorPos, textLength];

  const [typed, mismatched, untyped] = zipAdjacentWith(endpoints, RightOpenInterval);

  return {
    typedInterval: typed,
    mismatchedInterval: mismatched,
    untypedInterval: untyped,
  };
};

export default createTypingIntervals;
