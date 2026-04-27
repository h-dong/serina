import { parse, scanAll } from 'parser';
import { timeGrammar, timeParser } from 'parsers/time/time.grammar';

describe('time.grammar', () => {
  describe('timeParser', () => {
    test.each([
      ['4am'],
      ['4 am'],
      ['04:30'],
      ['04:30am'],
      ['04:30 am'],
      ['at 8:30am'],
      ['by 7pm'],
      ['at quarter past 4'],
      ['at half past 4'],
      ['at 20 min to 19'],
      ['at 20 to 19'],
      ['at 20 minutes past 4'],
      ['5:27 p.m.'],
      ['19:27 PM.'],
    ])('matches %s', (input) => {
      const result = parse(timeParser, input);
      expect(result.ok).toBe(true);
    });

    test('emits a tagged AST node', () => {
      const result = parse(timeParser, '4am');
      expect(result).toMatchObject({ ok: true, value: { kind: 'time', raw: '4am' } });
    });

    test('prefers the longest form when scanning', () => {
      const hits = scanAll(timeParser, 'meet at 4:30pm please');
      expect(hits).toHaveLength(1);
      expect(hits[0]?.text).toBe('at 4:30pm');
    });
  });

  describe('timeGrammar.evaluate', () => {
    const mockDate = new Date('2024-06-15T00:00:00.000Z');
    beforeAll(() => {
      vi.useFakeTimers().setSystemTime(mockDate);
    });
    afterAll(() => {
      vi.useRealTimers();
    });

    test('resolves a simple hour-only time', () => {
      const node = { kind: 'time' as const, raw: '5pm' };
      expect(timeGrammar.evaluate(node, { now: () => mockDate, locale: 'en-GB' })).toEqual(
        new Date('2024-06-15T17:00:00.000Z'),
      );
    });

    test('returns null for an unparseable node', () => {
      const node = { kind: 'time' as const, raw: '25pm' };
      expect(timeGrammar.evaluate(node, { now: () => mockDate, locale: 'en-GB' })).toBeNull();
    });
  });
});
