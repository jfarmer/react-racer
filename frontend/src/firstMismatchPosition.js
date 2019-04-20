import { zip, findIndex } from 'lodash';

/**
 * Given two input strings, returns the first position where the strings
 * differ.  If they do not differ, returns Infinity.  Ignores characters
 * in the longer string beyond the end of the shorter string.
 *
 * We return Infinity rather than -1 when no difference is found to make
 * it easier to create half open intervals.  The interval [-1, 10) is
 * non-empty, but the interval [Infinity, 10) is empty.
 *
 * @example
 *     firstMismatchPosition('hello', 'hullo'); // returns 1
 *     firstMismatchPosition('hello', 'hello'); // returns Infinity
 *     firstMismatchPosition('hello', 'hel');   // returns Infinity
 *
 * @param {string} str1
 * @param {string} str2
 * @returns {number} The first position at which the input strings differ,
 *   or Infinity if they do not differ up to the length of the shorter
 *   input string.
 */
const firstMismatchPosition = (str1, str2) => {
  const index = findIndex(zip([...str1], [...str2]), ([s, t]) => s !== t);

  if (index === -1 || index >= Math.min(str1.length, str2.length)) {
    return Infinity;
  }

  return index;
};

export default firstMismatchPosition;
