import {
  alt,
  between,
  chain,
  label,
  lookahead,
  many,
  many1,
  map,
  notFollowedBy,
  optional,
  parse,
  sepBy,
  seq,
  seqObj,
  tag,
} from 'parser/combinators';
import { digits, fail, regex, str, succeed } from 'parser/primitives';
import { failure, success } from 'parser/types';

describe('parser combinators', () => {
  describe('map', () => {
    test('transforms successful value', () => {
      const parser = map(digits, (s) => parseInt(s, 10));
      const result = parse(parser, '42abc');
      expect(result).toMatchObject({ ok: true, value: 42, pos: 2 });
    });

    test('passes through failures', () => {
      const parser = map(digits, (s) => parseInt(s, 10));
      const result = parse(parser, 'abc');
      expect(result.ok).toBe(false);
    });
  });

  describe('chain', () => {
    test('threads values across parsers', () => {
      const parser = chain(digits, (n) => map(str('x'), () => n + 'x'));
      const result = parse(parser, '42x');
      expect(result).toMatchObject({ ok: true, value: '42x', pos: 3 });
    });

    test('passes through initial parser failures', () => {
      const parser = chain(fail('first'), () => str('x'));
      expect(parse(parser, 'x')).toEqual(failure(0, ['first'], 0));
    });
  });

  describe('seq', () => {
    test('sequences parsers and collects values as a tuple', () => {
      const parser = seq(digits, str('-'), digits);
      const result = parse(parser, '12-34');
      expect(result).toMatchObject({ ok: true, value: ['12', '-', '34'], pos: 5 });
    });

    test('fails when any parser in the sequence fails', () => {
      const parser = seq(digits, str('-'), digits);
      const result = parse(parser, '12x34');
      expect(result.ok).toBe(false);
    });
  });

  describe('seqObj', () => {
    test('builds a keyed object result', () => {
      const parser = seqObj({
        left: digits,
        _sep: str('-'),
        right: digits,
      });
      const result = parse(parser, '12-34');
      expect(result).toMatchObject({
        ok: true,
        value: { left: '12', _sep: '-', right: '34' },
      });
    });

    test('fails and preserves expected tokens when a field parser fails', () => {
      const parser = seqObj({
        left: digits,
        sep: str('-'),
        right: digits,
      });
      const result = parse(parser, '12x');
      expect(result.ok).toBe(false);
      expect(result.expected).toContain('"-"');
    });

    test('merges expected tokens from successful fields at the same furthest point', () => {
      const parser = seqObj({
        first: () => success('a', 1, 0, ['first']),
        second: () => success('b', 2, 0, ['second']),
      });
      expect(parse(parser, 'ab')).toMatchObject({
        ok: true,
        expected: ['first', 'second'],
      });
    });

    test('keeps expectations empty when successful fields have none at the same furthest point', () => {
      const parser = seqObj({
        first: () => success('a', 1, 0, []),
      });
      expect(parse(parser, 'a')).toMatchObject({
        ok: true,
        expected: [],
      });
    });
  });

  describe('alt', () => {
    test('returns first successful branch', () => {
      const parser = alt(str('foo'), str('bar'));
      expect(parse(parser, 'foo')).toMatchObject({ ok: true, value: 'foo' });
      expect(parse(parser, 'bar')).toMatchObject({ ok: true, value: 'bar' });
    });

    test('fails if no branch matches', () => {
      const parser = alt(str('foo'), str('bar'));
      expect(parse(parser, 'baz').ok).toBe(false);
    });

    test('keeps expected tokens from a successful branch with furthest context', () => {
      const parser = alt(() => ({
        ok: true,
        value: 'ok',
        pos: 0,
        furthest: 0,
        expected: ['hint'],
      }));
      const result = parse(parser, '');
      expect(result).toMatchObject({ ok: true, value: 'ok', expected: ['hint'] });
    });

    test('merges same-position expectations before returning a successful branch', () => {
      const parser = alt(
        () => failure(0, ['first'], 0),
        () => success('ok', 0, 0, ['second']),
      );
      expect(parse(parser, '')).toMatchObject({
        ok: true,
        value: 'ok',
        expected: ['first', 'second'],
      });
    });
  });

  describe('optional', () => {
    test('returns null when parser fails without consuming', () => {
      const parser = optional(str('x'));
      expect(parse(parser, 'abc')).toMatchObject({ ok: true, value: null, pos: 0 });
    });

    test('returns value when parser succeeds', () => {
      const parser = optional(str('x'));
      expect(parse(parser, 'x')).toMatchObject({ ok: true, value: 'x', pos: 1 });
    });
  });

  describe('many', () => {
    test('collects zero or more values', () => {
      const parser = many(str('ab'));
      expect(parse(parser, 'ababab')).toMatchObject({ ok: true, value: ['ab', 'ab', 'ab'], pos: 6 });
      expect(parse(parser, 'xy')).toMatchObject({ ok: true, value: [], pos: 0 });
    });

    test('terminates on empty match', () => {
      const parser = many(succeed('x'));
      // should not infinite loop; succeed consumes nothing
      const result = parse(parser, 'abc');
      expect(result.ok).toBe(true);
    });

    test('merges same-position expectations across repeated matches', () => {
      let calls = 0;
      const parser = many(() => {
        calls += 1;
        if (calls === 1) return success('a', 1, 0, ['first']);
        if (calls === 2) return success('b', 2, 0, ['second']);
        return failure(2, [], 0);
      });
      expect(parse(parser, 'ab')).toMatchObject({
        ok: true,
        value: ['a', 'b'],
        expected: ['first', 'second'],
      });
    });
  });

  describe('many1', () => {
    test('requires at least one match', () => {
      const parser = many1(str('ab'));
      expect(parse(parser, 'abab')).toMatchObject({ ok: true, value: ['ab', 'ab'] });
      expect(parse(parser, 'xy').ok).toBe(false);
    });

    test('terminates after the first match when the next match is empty', () => {
      let calls = 0;
      const parser = many1(() => {
        calls += 1;
        return calls === 1 ? success('a', 1) : success('empty', 1);
      });
      expect(parse(parser, 'a')).toMatchObject({ ok: true, value: ['a'], pos: 1 });
    });

    test('adopts same-position expectations after the first match when none exist yet', () => {
      let calls = 0;
      const parser = many1(() => {
        calls += 1;
        if (calls === 1) return success('a', 1, 0, []);
        if (calls === 2) return success('b', 2, 0, ['second']);
        return failure(2, [], 0);
      });
      expect(parse(parser, 'ab')).toMatchObject({
        ok: true,
        expected: ['second'],
      });
    });

    test('merges same-position expectations after the first match', () => {
      let calls = 0;
      const parser = many1(() => {
        calls += 1;
        if (calls === 1) return success('a', 1, 0, ['first']);
        if (calls === 2) return success('b', 2, 0, ['second']);
        return failure(2, [], 0);
      });
      expect(parse(parser, 'ab')).toMatchObject({
        ok: true,
        expected: ['first', 'second'],
      });
    });
  });

  describe('sepBy', () => {
    test('parses separated list', () => {
      const parser = sepBy(digits, str(','));
      expect(parse(parser, '1,2,3')).toMatchObject({ ok: true, value: ['1', '2', '3'], pos: 5 });
      expect(parse(parser, '1')).toMatchObject({ ok: true, value: ['1'], pos: 1 });
      expect(parse(parser, '')).toMatchObject({ ok: true, value: [], pos: 0 });
    });

    test('stops after a trailing separator without consuming it', () => {
      const parser = sepBy(digits, str(','));
      expect(parse(parser, '1,')).toMatchObject({ ok: true, value: ['1'], pos: 1 });
    });
  });

  describe('between', () => {
    test('strips surrounding delimiters', () => {
      const parser = between(str('('), digits, str(')'));
      expect(parse(parser, '(42)')).toMatchObject({ ok: true, value: '42', pos: 4 });
    });
  });

  describe('lookahead', () => {
    test('matches without consuming input', () => {
      const parser = lookahead(str('abc'));
      const result = parse(parser, 'abc');
      expect(result).toMatchObject({ ok: true, value: 'abc', pos: 0 });
    });

    test('passes through failures without consuming input', () => {
      const parser = lookahead(str('abc'));
      expect(parse(parser, 'xyz')).toMatchObject({ ok: false, pos: 0 });
    });
  });

  describe('notFollowedBy', () => {
    test('succeeds when the parser fails', () => {
      const result = parse(notFollowedBy(str('x')), 'abc');
      expect(result).toMatchObject({ ok: true, pos: 0 });
    });

    test('fails when the parser succeeds', () => {
      const result = parse(notFollowedBy(str('x')), 'xyz');
      expect(result.ok).toBe(false);
    });
  });

  describe('label', () => {
    test('returns successful parser results unchanged', () => {
      const parser = label('a digit', regex(/[0-9]/));
      expect(parse(parser, '1')).toMatchObject({ ok: true, value: '1' });
    });

    test('replaces error expected with custom name', () => {
      const parser = label('a digit', regex(/[0-9]/));
      const result = parse(parser, 'abc');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.expected).toContain('a digit');
      }
    });
  });

  describe('tag', () => {
    test('adds a discriminator to object parser values', () => {
      const parser = tag(
        'number',
        map(digits, (value) => ({ value })),
      );
      expect(parse(parser, '123')).toMatchObject({ ok: true, value: { kind: 'number', value: '123' } });
    });
  });
});
