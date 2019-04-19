import { zipWith, dropRight, tail } from 'lodash';

/**
 * Takes a list and a function and returns a list with the function applied to
 * adjacent pairs of list elements.
 *
 * @example
 *     // Returns [fn(a, b), fn(b, c), fn(c, d)]
 *     zipAdjacentWith([a, b, c, d], fn);
 *
 * @param {Array} list - The input list
 * @param {Function} fn - The function to apply to adjacent pairs of elements
 * @returns {Array} A list with the function applied to adjacent pairs of elements
 */

const zipAdjacentWith = (list, fn) => zipWith(dropRight(list, 1), tail(list), fn);

export default zipAdjacentWith;
