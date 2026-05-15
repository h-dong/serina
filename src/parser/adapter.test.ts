import { toLegacyFilter } from 'parser/adapter';
import { map } from 'parser/combinators';
import { digits } from 'parser/primitives';
import type { GrammarParser } from 'parsers/GrammarParser';

const hourGrammar: GrammarParser<number> = {
  name: 'hour',
  parser: map(digits, (raw) => parseInt(raw, 10)),
  evaluate: (hour, ctx) => {
    if (hour < 0 || hour > 23) return null;
    const out = ctx.now();
    out.setUTCHours(hour);
    return out;
  },
};

describe('toLegacyFilter', () => {
  test('exposes the Filter-compatible parseText signature', () => {
    const filter = toLegacyFilter(hourGrammar, { now: () => new Date('2024-01-01T00:00:00.000Z'), locale: 'en-GB' });
    expect(typeof filter.parseText).toBe('function');
  });

  test('returns null when no matches exist (matching legacy semantics)', () => {
    const filter = toLegacyFilter(hourGrammar, { now: () => new Date('2024-01-01T00:00:00.000Z'), locale: 'en-GB' });
    expect(filter.parseText('no digits here')).toBeNull();
  });

  test('returns legacy ParsedMatchSchema array on match', () => {
    const filter = toLegacyFilter(hourGrammar, { now: () => new Date('2024-01-01T00:00:00.000Z'), locale: 'en-GB' });
    const result = filter.parseText('at 7 today');
    expect(result).toEqual([
      {
        dateTime: new Date('2024-01-01T07:00:00.000Z'),
        matched: '7',
        text: 'at today',
      },
    ]);
  });

  test('allows a runtime context override', () => {
    const filter = toLegacyFilter(hourGrammar, { now: () => new Date('2024-01-01T00:00:00.000Z'), locale: 'en-GB' });
    const result = filter.parseText('at 7 today', {
      now: () => new Date('2024-02-01T00:00:00.000Z'),
      locale: 'en-US',
    });
    expect(result?.[0]?.dateTime).toEqual(new Date('2024-02-01T07:00:00.000Z'));
  });
});
