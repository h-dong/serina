import { type ParseResult, type Parser, type ParserState, failure, mergeFurthest, success } from './types';

export function map<A, B>(parser: Parser<A>, fn: (value: A) => B): Parser<B> {
  return (state: ParserState) => {
    const result = parser(state);
    if (!result.ok) return failure(result.pos, result.expected, result.furthest);
    return success(fn(result.value), result.pos, result.furthest, result.expected);
  };
}

export function chain<A, B>(parser: Parser<A>, fn: (value: A) => Parser<B>): Parser<B> {
  return (state: ParserState) => {
    const first = parser(state);
    if (!first.ok) return failure(first.pos, first.expected, first.furthest);
    const next = fn(first.value);
    const second = next({ input: state.input, pos: first.pos });
    return mergeFurthest(second, { furthest: first.furthest, expected: first.expected });
  };
}

type SeqValues<Ps extends readonly Parser<unknown>[]> = {
  [K in keyof Ps]: Ps[K] extends Parser<infer T> ? T : never;
};

export function seq<Ps extends readonly Parser<unknown>[]>(...parsers: Ps): Parser<SeqValues<Ps>> {
  return (state: ParserState) => {
    const values: unknown[] = [];
    let pos = state.pos;
    let furthest = state.pos;
    let expected: readonly string[] = [];
    for (const parser of parsers) {
      const result = parser({ input: state.input, pos });
      if (result.furthest > furthest) {
        furthest = result.furthest;
        expected = result.expected;
      } else if (result.furthest === furthest && result.expected.length > 0) {
        expected = expected.length === 0 ? result.expected : [...expected, ...result.expected];
      }
      if (!result.ok) {
        return failure(result.pos, expected, furthest);
      }
      values.push(result.value);
      pos = result.pos;
    }
    return success(values as SeqValues<Ps>, pos, furthest, expected);
  };
}

type SeqObjValues<O extends Record<string, Parser<unknown>>> = {
  [K in keyof O]: O[K] extends Parser<infer T> ? T : never;
};

export function seqObj<O extends Record<string, Parser<unknown>>>(schema: O): Parser<SeqObjValues<O>> {
  const entries = Object.entries(schema) as [keyof O & string, Parser<unknown>][];
  return (state: ParserState) => {
    const out: Record<string, unknown> = {};
    let pos = state.pos;
    let furthest = state.pos;
    let expected: readonly string[] = [];
    for (const [key, parser] of entries) {
      const result = parser({ input: state.input, pos });
      if (result.furthest > furthest) {
        furthest = result.furthest;
        expected = result.expected;
      } else if (result.furthest === furthest && result.expected.length > 0) {
        expected = expected.length === 0 ? result.expected : [...expected, ...result.expected];
      }
      if (!result.ok) {
        return failure(result.pos, expected, furthest);
      }
      out[key] = result.value;
      pos = result.pos;
    }
    return success(out as SeqObjValues<O>, pos, furthest, expected);
  };
}

export function alt<T>(...parsers: readonly Parser<T>[]): Parser<T> {
  return (state: ParserState) => {
    let furthest = state.pos;
    let expected: readonly string[] = [];
    for (const parser of parsers) {
      const result = parser(state);
      if (result.ok) {
        if (result.furthest > furthest) {
          furthest = result.furthest;
          expected = result.expected;
        } else if (result.furthest === furthest && result.expected.length > 0) {
          expected = expected.length === 0 ? result.expected : [...expected, ...result.expected];
        }
        return success(result.value, result.pos, furthest, expected);
      }
      if (result.furthest > furthest) {
        furthest = result.furthest;
        expected = result.expected;
      } else if (result.furthest === furthest && result.expected.length > 0) {
        expected = expected.length === 0 ? result.expected : [...expected, ...result.expected];
      }
    }
    return failure(state.pos, expected, furthest);
  };
}

export function optional<T>(parser: Parser<T>): Parser<T | null> {
  return (state: ParserState) => {
    const result = parser(state);
    if (result.ok) return result;
    return success<T | null>(null, state.pos, result.furthest, result.expected);
  };
}

export function many<T>(parser: Parser<T>): Parser<T[]> {
  return (state: ParserState) => {
    const values: T[] = [];
    let pos = state.pos;
    let furthest = state.pos;
    let expected: readonly string[] = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const result = parser({ input: state.input, pos });
      if (result.furthest > furthest) {
        furthest = result.furthest;
        expected = result.expected;
      } else if (result.furthest === furthest && result.expected.length > 0) {
        expected = expected.length === 0 ? result.expected : [...expected, ...result.expected];
      }
      if (!result.ok) break;
      if (result.pos === pos) break; // prevent infinite loop on empty matches
      values.push(result.value);
      pos = result.pos;
    }
    return success(values, pos, furthest, expected);
  };
}

export function many1<T>(parser: Parser<T>): Parser<T[]> {
  return (state: ParserState) => {
    const result = many(parser)(state);
    /* istanbul ignore next -- many() is intentionally total and never returns a failed ParseResult. */
    if (!result.ok) return result;
    if (result.value.length === 0) {
      return failure(state.pos, result.expected, result.furthest);
    }
    return result;
  };
}

export function sepBy<T, S>(parser: Parser<T>, separator: Parser<S>): Parser<T[]> {
  return (state: ParserState) => {
    const first = parser(state);
    if (!first.ok) {
      return success<T[]>([], state.pos, first.furthest, first.expected);
    }
    const values: T[] = [first.value];
    let pos = first.pos;
    let furthest = first.furthest;
    let expected = first.expected;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const sepResult = separator({ input: state.input, pos });
      if (sepResult.furthest > furthest) {
        furthest = sepResult.furthest;
        expected = sepResult.expected;
      }
      if (!sepResult.ok) break;
      const nextValue = parser({ input: state.input, pos: sepResult.pos });
      if (nextValue.furthest > furthest) {
        furthest = nextValue.furthest;
        expected = nextValue.expected;
      }
      if (!nextValue.ok) break;
      values.push(nextValue.value);
      pos = nextValue.pos;
    }
    return success(values, pos, furthest, expected);
  };
}

export function between<L, T, R>(left: Parser<L>, parser: Parser<T>, right: Parser<R>): Parser<T> {
  return map(seq(left, parser, right), ([, value]) => value);
}

export function lookahead<T>(parser: Parser<T>): Parser<T> {
  return (state: ParserState) => {
    const result = parser(state);
    if (!result.ok) return result;
    return success(result.value, state.pos, result.furthest, result.expected);
  };
}

export function notFollowedBy<T>(parser: Parser<T>): Parser<null> {
  return (state: ParserState) => {
    const result = parser(state);
    if (result.ok) {
      return failure(state.pos, ['not ' + (result.expected[0] ?? 'followed')]);
    }
    return success(null, state.pos);
  };
}

export function tag<T, K extends string>(kind: K, parser: Parser<T>): Parser<T & { kind: K }> {
  return map(parser, (value) => ({ ...(value as object), kind }) as T & { kind: K });
}

export function label<T>(name: string, parser: Parser<T>): Parser<T> {
  return (state: ParserState) => {
    const result = parser(state);
    if (result.ok) return result;
    return failure(result.pos, [name], result.furthest);
  };
}

export function parse<T>(parser: Parser<T>, input: string): ParseResult<T> {
  return parser({ input, pos: 0 });
}
