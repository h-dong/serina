import { runGrammarParser } from 'parser';
import { dateAndTimeGrammar } from 'parsers/dateAndTime/dateAndTime.grammar';
import { defaultContext } from 'parsers/GrammarParser';

describe('Date And Time', () => {
  test('return null if no match', () => {
    const result = runGrammarParser(dateAndTimeGrammar, 'some random text');
    expect(result).toBeNull();
  });

  test('return correct date object', () => {
    const result = runGrammarParser(dateAndTimeGrammar, 'test string 2022/12/25 2am');
    expect(result).toEqual([
      {
        dateTime: new Date('2022-12-25T02:00:00.000Z'),
        matched: '2022/12/25 2am',
        text: 'test string',
      },
    ]);
  });

  test('respects locale when parsing ambiguous numeric dates with time', () => {
    const result = runGrammarParser(
      dateAndTimeGrammar,
      'test string 10/02/2022 2am',
      defaultContext({ locale: 'en-US' }),
    );
    expect(result).toEqual([
      {
        dateTime: new Date('2022-10-02T02:00:00.000Z'),
        matched: '10/02/2022 2am',
        text: 'test string',
      },
    ]);
  });
});
