import { Tokenizer } from 'parser/Tokenizer';

describe('Tokenizer', () => {
  test('returns tokens with source offsets', () => {
    expect(new Tokenizer().tokenize('  meet  tomorrow ')).toEqual([
      { value: 'meet', start: 2, end: 6 },
      { value: 'tomorrow', start: 8, end: 16 },
    ]);
  });

  test('returns an empty list for blank input', () => {
    expect(new Tokenizer().tokenize('   ')).toEqual([]);
  });
});
