import { runGrammarParser } from 'parser';
import { yearGrammar } from 'parsers/year/year.grammar';

describe('Year', () => {
  test('return null if no match', () => {
    const result = runGrammarParser(yearGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(yearGrammar, 'test string 9999');
    expect(result).toEqual([
      {
        dateTime: new Date('9999-01-01T00:00:00.000Z'),
        matched: '9999',
        text: 'test string',
      },
    ]);
  });
});
