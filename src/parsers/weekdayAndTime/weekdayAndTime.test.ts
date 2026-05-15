import { runGrammarParser } from 'parser';
import { weekdayAndTimeGrammar } from 'parsers/weekdayAndTime/weekdayAndTime.grammar';

describe('Weekday and Time', () => {
  // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
  const mockDate = new Date('2019-01-19T18:06:18Z');
  vi.useFakeTimers().setSystemTime(mockDate);

  afterAll(() => {
    vi.useRealTimers();
  });

  test('return null if no match', () => {
    const result = runGrammarParser(weekdayAndTimeGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(weekdayAndTimeGrammar, 'test string 2am monday');
    expect(result).toEqual([
      {
        dateTime: new Date('2019-01-21T02:00:00.000Z'),
        matched: '2am monday',
        text: 'test string',
      },
    ]);
  });
});
