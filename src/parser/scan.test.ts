import { map, seq } from 'parser/combinators';
import { digits, str } from 'parser/primitives';
import { scanAll } from 'parser/scan';

describe('scanAll', () => {
  test('returns empty array if parser never matches', () => {
    const parser = str('foo');
    expect(scanAll(parser, 'no match here')).toEqual([]);
  });

  test('finds every non-overlapping match', () => {
    const parser = map(digits, (s) => parseInt(s, 10));
    const results = scanAll(parser, 'foo 12 bar 34 baz');
    expect(results).toEqual([
      { start: 4, end: 6, text: '12', value: 12 },
      { start: 11, end: 13, text: '34', value: 34 },
    ]);
  });

  test('advances past consumed range (no overlap)', () => {
    const parser = seq(digits, str('-'), digits);
    const results = scanAll(parser, '1-2 3-4');
    expect(results).toHaveLength(2);
    expect(results[0]).toMatchObject({ start: 0, end: 3, text: '1-2' });
    expect(results[1]).toMatchObject({ start: 4, end: 7, text: '3-4' });
  });

  test('does not infinite loop on empty-matching parser', () => {
    // A parser that succeeds without consuming is skipped to advance the scanner
    const parser = map(str(''), () => 'empty');
    const results = scanAll(parser, 'abc');
    expect(results).toEqual([]);
  });
});
