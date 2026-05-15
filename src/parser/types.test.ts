import { failure, mergeFurthest, success } from 'parser/types';

describe('parser result helpers', () => {
  test('creates success and failure results', () => {
    expect(success('ok', 2)).toEqual({ ok: true, value: 'ok', pos: 2, furthest: 2, expected: [] });
    expect(failure(1, ['digit'])).toEqual({ ok: false, pos: 1, furthest: 1, expected: ['digit'] });
  });

  test('mergeFurthest replaces expected tokens from a further result', () => {
    const result = success('ok', 1, 1, ['old']);
    expect(mergeFurthest(result, { furthest: 3, expected: ['new'] })).toEqual({
      ok: true,
      value: 'ok',
      pos: 1,
      furthest: 3,
      expected: ['new'],
    });
  });

  test('mergeFurthest appends expected tokens at the same position', () => {
    const result = failure(1, ['old'], 2);
    expect(mergeFurthest(result, { furthest: 2, expected: ['new'] })).toEqual({
      ok: false,
      pos: 1,
      furthest: 2,
      expected: ['old', 'new'],
    });
  });

  test('mergeFurthest adopts expected tokens at the same position when original expected is empty', () => {
    const result = failure(1, [], 2);
    expect(mergeFurthest(result, { furthest: 2, expected: ['new'] })).toEqual({
      ok: false,
      pos: 1,
      furthest: 2,
      expected: ['new'],
    });
  });

  test('mergeFurthest keeps the original result when other result is behind', () => {
    const result = success('ok', 1, 3, ['old']);
    expect(mergeFurthest(result, { furthest: 2, expected: ['new'] })).toBe(result);
  });
});
