import { runGrammarParser } from 'parser';
import { datesGrammar } from 'parsers/dates/dates.grammar';
import { defaultContext } from 'parsers/GrammarParser';

describe('Dates', () => {
  test('return null if no match', () => {
    const result = runGrammarParser(datesGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(datesGrammar, 'test string 2023/01/01');
    expect(result).toEqual([
      {
        dateTime: new Date('2023-01-01T00:00:00.000Z'),
        matched: '2023/01/01',
        text: 'test string',
      },
    ]);
  });

  test('respects locale when parsing ambiguous numeric dates', () => {
    const result = runGrammarParser(datesGrammar, 'test string 10/02/2009', defaultContext({ locale: 'en-US' }));
    expect(result).toEqual([
      {
        dateTime: new Date('2009-10-02T00:00:00.000Z'),
        matched: '10/02/2009',
        text: 'test string',
      },
    ]);
  });
});
