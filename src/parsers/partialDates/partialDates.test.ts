import { runGrammarParser } from 'parser';
import { partialDatesGrammar } from 'parsers/partialDates/partialDates.grammar';

describe('Partial Dates', () => {
  // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
  const mockDate = new Date('2019-01-19T18:06:18Z');
  vi.useFakeTimers().setSystemTime(mockDate);

  afterAll(() => {
    vi.useRealTimers();
  });

  test('return null if no match', () => {
    const result = runGrammarParser(partialDatesGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(partialDatesGrammar, 'test string February 2019');
    expect(result).toEqual([
      {
        dateTime: new Date('2019-02-01T00:00:00.000Z'),
        matched: 'February 2019',
        text: 'test string',
      },
    ]);
  });
});
