import type { Parser } from './types';

export interface ScanMatch<T> {
  readonly start: number;
  readonly end: number;
  readonly text: string;
  readonly value: T;
}

/**
 * Walks the input string and returns every non-overlapping match produced by
 * `parser`. The parser is attempted at each position; on success, the scanner
 * jumps past the consumed range; on failure it advances one character.
 *
 * This replaces the global `String.prototype.match(/pattern/ig)` loop in the
 * old global-regex scanning path.
 */
export function scanAll<T>(parser: Parser<T>, input: string): ScanMatch<T>[] {
  const results: ScanMatch<T>[] = [];
  let pos = 0;
  while (pos <= input.length) {
    const result = parser({ input, pos });
    if (result.ok && result.pos > pos) {
      results.push({
        start: pos,
        end: result.pos,
        text: input.slice(pos, result.pos),
        value: result.value,
      });
      pos = result.pos;
    } else {
      pos += 1;
    }
  }
  return results;
}
