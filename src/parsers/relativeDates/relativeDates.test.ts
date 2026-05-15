import { runGrammarParser } from 'parser';
import { relativeDatesGrammar } from 'parsers/relativeDates/relativeDates.grammar';

describe('RelativeDates', () => {
  // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
  vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52.123Z'));

  afterAll(() => {
    vi.useRealTimers();
  });

  test('return null if no match', () => {
    const result = runGrammarParser(relativeDatesGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(relativeDatesGrammar, 'test string today');
    expect(result).toEqual([
      {
        dateTime: new Date('2019-06-20T00:00:00.000Z'),
        matched: 'today',
        text: 'test string',
      },
    ]);
  });
});
