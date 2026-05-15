import { parse } from 'parser';
import { dateAndTimeGrammar, dateAndTimeParser } from 'parsers/dateAndTime/dateAndTime.grammar';

describe('dateAndTime.grammar', () => {
  describe('dateAndTimeParser', () => {
    test.each([['2022/12/25 2am'], ['2am 2022/12/25'], ['15/12/2019 at 5pm'], ['at 5pm 15/12/2019']])(
      'matches %s',
      (input) => {
        const result = parse(dateAndTimeParser, input);
        expect(result.ok).toBe(true);
      },
    );

    test('emits a tagged AST node with split date / time sides', () => {
      const result = parse(dateAndTimeParser, '2022/12/25 2am');
      expect(result).toMatchObject({
        ok: true,
        value: {
          kind: 'dateAndTime',
          rawDate: expect.stringContaining('2022/12/25'),
          rawTime: expect.stringContaining('2am'),
        },
      });
    });
  });

  describe('dateAndTimeGrammar.evaluate', () => {
    test('resolves composed date + time into a single Date', () => {
      const node = {
        kind: 'dateAndTime' as const,
        rawDate: '2022/12/25',
        rawTime: '2am',
      };
      const result = dateAndTimeGrammar.evaluate(node, { now: () => new Date(), locale: 'en-GB' });
      expect(result).toEqual(new Date('2022-12-25T02:00:00.000Z'));
    });

    test('returns null when the split node does not contain a date', () => {
      const node = {
        kind: 'dateAndTime' as const,
        rawDate: 'not a date',
        rawTime: '2am',
      };
      const result = dateAndTimeGrammar.evaluate(node, { now: () => new Date(), locale: 'en-GB' });
      expect(result).toBeNull();
    });

    test('returns null when the split node does not contain a time', () => {
      const node = {
        kind: 'dateAndTime' as const,
        rawDate: '2022/12/25',
        rawTime: 'not a time',
      };
      const result = dateAndTimeGrammar.evaluate(node, { now: () => new Date(), locale: 'en-GB' });
      expect(result).toBeNull();
    });

    test('returns null when the split time is outside the valid range', () => {
      const node = {
        kind: 'dateAndTime' as const,
        rawDate: '2022/12/25',
        rawTime: '99:30',
      };
      const result = dateAndTimeGrammar.evaluate(node, { now: () => new Date(), locale: 'en-GB' });
      expect(result).toBeNull();
    });
  });
});
