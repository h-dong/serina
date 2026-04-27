import { runGrammarParser } from 'parser';
import { relativeTimeGrammar } from 'parsers/relativeTime/relativeTime.grammar';

describe('RelativeTime', () => {
  // Mock Date Time to 2018/11/1 23:30:00 GMT+0110
  const mockDate = new Date('2018-11-01T23:30:00Z');
  vi.useFakeTimers().setSystemTime(mockDate);

  afterAll(() => {
    vi.useRealTimers();
  });

  test('return null if no match', () => {
    const result = runGrammarParser(relativeTimeGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(relativeTimeGrammar, 'test string in half an hour');
    expect(result).toEqual([
      {
        dateTime: new Date('2018-11-02T00:00:00.000Z'),
        matched: 'in half an hour',
        text: 'test string',
      },
    ]);
  });
});
