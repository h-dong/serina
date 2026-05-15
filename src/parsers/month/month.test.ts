import { runGrammarParser } from 'parser';
import { monthGrammar } from 'parsers/month/month.grammar';

describe('Month', () => {
  beforeAll(() => {
    // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2019, 2, 19)));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('return null if no match', () => {
    const result = runGrammarParser(monthGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(monthGrammar, 'test string march');
    expect(result).toEqual([
      {
        dateTime: new Date('2019-03-01T00:00:00.000Z'),
        matched: 'march',
        text: 'test string',
      },
    ]);
  });
});
