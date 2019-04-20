/**
 * Given two endpoints A and B, returns an object representing the
 * right half-open interval [A, B), i.e., all the numbers x such
 * that A <= x < B.
 *
 * @param {number} left - The left endpoint of the interval
 * @param {number} right - The right endpoint of the interval
 */
const RightOpenInterval = (left, right) => {
  const smaller = Math.min(left, right);
  const larger = right;

  return {
    left: smaller,
    right: larger,
    contains(num) {
      return smaller <= num && num < larger;
    },
  };
};

export default RightOpenInterval;
