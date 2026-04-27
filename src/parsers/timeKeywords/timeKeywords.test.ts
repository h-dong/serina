import { runGrammarParser } from 'parser';
import { timeKeywordsGrammar } from 'parsers/timeKeywords/timeKeywords.grammar';

describe('Time Keywords', () => {
  // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
  const mockDate = new Date('2019-01-19T18:06:18Z');
  vi.useFakeTimers().setSystemTime(mockDate);

  afterAll(() => {
    vi.useRealTimers();
  });

  test('return null if no match', () => {
    const result = runGrammarParser(timeKeywordsGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(timeKeywordsGrammar, 'test string midday');
    expect(result).toEqual([
      {
        dateTime: new Date('2019-01-20T12:00:00.000Z'),
        matched: 'midday',
        text: 'test string',
      },
    ]);
  });
});
