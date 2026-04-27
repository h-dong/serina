import { parse } from 'parser/combinators';
import {
  any,
  digit,
  digits,
  eof,
  fail,
  optionalWhitespace,
  regex,
  str,
  stri,
  succeed,
  whitespace,
  word,
  wordBoundary,
} from 'parser/primitives';

describe('parser primitives', () => {
  describe('succeed / fail', () => {
    test('succeed always succeeds without consuming input', () => {
      const result = parse(succeed(42), 'abc');
      expect(result).toMatchObject({ ok: true, value: 42, pos: 0 });
    });

    test('fail always fails', () => {
      const result = parse(fail('nope'), 'abc');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.expected).toContain('nope');
      }
    });
  });

  describe('str', () => {
    test('matches exact literal', () => {
      const result = parse(str('hello'), 'hello world');
      expect(result).toMatchObject({ ok: true, value: 'hello', pos: 5 });
    });

    test('fails on mismatch', () => {
      const result = parse(str('hello'), 'goodbye');
      expect(result.ok).toBe(false);
    });

    test('is case sensitive', () => {
      const result = parse(str('hello'), 'Hello');
      expect(result.ok).toBe(false);
    });
  });

  describe('stri', () => {
    test('matches case insensitively', () => {
      const result = parse(stri('am'), 'AM');
      expect(result).toMatchObject({ ok: true, value: 'AM', pos: 2 });
    });

    test('preserves original capitalisation of input in returned value', () => {
      const result = parse(stri('pm'), 'Pm');
      expect(result).toMatchObject({ ok: true, value: 'Pm', pos: 2 });
    });
  });

  describe('regex', () => {
    test('matches at current position only', () => {
      const result = parse(regex(/[0-9]+/), '42abc');
      expect(result).toMatchObject({ ok: true, value: '42', pos: 2 });
    });

    test('preserves existing sticky flags', () => {
      const result = parse(regex(/[0-9]+/y), '42abc');
      expect(result).toMatchObject({ ok: true, value: '42', pos: 2 });
    });

    test('returns a requested capture group when present', () => {
      const result = parse(regex(/([0-9]+)([a-z]+)/, 2), '42abc');
      expect(result).toMatchObject({ ok: true, value: 'abc', pos: 5 });
    });

    test('falls back to the full match when a capture group is absent', () => {
      const result = parse(regex(/[0-9]+/, 1), '42abc');
      expect(result).toMatchObject({ ok: true, value: '42', pos: 2 });
    });

    test('fails if regex does not match at start', () => {
      const result = parse(regex(/[0-9]+/), 'abc42');
      expect(result.ok).toBe(false);
    });
  });

  describe('digit / digits', () => {
    test('digit consumes a single digit', () => {
      const result = parse(digit, '7x');
      expect(result).toMatchObject({ ok: true, value: '7', pos: 1 });
    });

    test('digits consumes one or more digits', () => {
      const result = parse(digits, '1234abc');
      expect(result).toMatchObject({ ok: true, value: '1234', pos: 4 });
    });
  });

  describe('word', () => {
    test('matches alpha run', () => {
      const result = parse(word, 'hello123');
      expect(result).toMatchObject({ ok: true, value: 'hello', pos: 5 });
    });
  });

  describe('whitespace / optionalWhitespace', () => {
    test('whitespace requires at least one space', () => {
      expect(parse(whitespace, '   hello').ok).toBe(true);
      expect(parse(whitespace, 'hello').ok).toBe(false);
    });

    test('optionalWhitespace always succeeds', () => {
      expect(parse(optionalWhitespace, 'hello')).toMatchObject({ ok: true, pos: 0 });
      expect(parse(optionalWhitespace, '   hello')).toMatchObject({ ok: true, pos: 3 });
    });
  });

  describe('eof', () => {
    test('succeeds at end of input', () => {
      const result = parse(eof, '');
      expect(result.ok).toBe(true);
    });

    test('fails if characters remain', () => {
      const result = parse(eof, 'abc');
      expect(result.ok).toBe(false);
    });
  });

  describe('any', () => {
    test('consumes any single character', () => {
      const result = parse(any(), 'abc');
      expect(result).toMatchObject({ ok: true, value: 'a', pos: 1 });
    });

    test('fails at end of input', () => {
      const result = parse(any(), '');
      expect(result.ok).toBe(false);
    });
  });

  describe('wordBoundary', () => {
    test('succeeds at start of string when next char is a word char', () => {
      const result = wordBoundary({ input: 'abc', pos: 0 });
      expect(result.ok).toBe(true);
    });

    test('succeeds between word and non-word', () => {
      const result = wordBoundary({ input: 'abc def', pos: 3 });
      expect(result.ok).toBe(true);
    });

    test('fails between two word chars', () => {
      const result = wordBoundary({ input: 'abc', pos: 1 });
      expect(result.ok).toBe(false);
    });
  });
});
