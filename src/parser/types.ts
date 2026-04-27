export interface ParserState {
  readonly input: string;
  readonly pos: number;
}

export interface ParseSuccess<T> {
  readonly ok: true;
  readonly value: T;
  readonly pos: number;
  readonly furthest: number;
  readonly expected: readonly string[];
}

export interface ParseFailure {
  readonly ok: false;
  readonly pos: number;
  readonly furthest: number;
  readonly expected: readonly string[];
}

export type ParseResult<T> = ParseSuccess<T> | ParseFailure;

export type Parser<T> = (state: ParserState) => ParseResult<T>;

export function success<T>(
  value: T,
  pos: number,
  furthest: number = pos,
  expected: readonly string[] = [],
): ParseSuccess<T> {
  return { ok: true, value, pos, furthest, expected };
}

export function failure(pos: number, expected: readonly string[], furthest: number = pos): ParseFailure {
  return { ok: false, pos, furthest, expected };
}

export function mergeFurthest<T>(
  result: ParseResult<T>,
  other: { furthest: number; expected: readonly string[] },
): ParseResult<T> {
  if (other.furthest > result.furthest) {
    return { ...result, furthest: other.furthest, expected: other.expected };
  }
  if (other.furthest === result.furthest && other.expected.length > 0) {
    const merged = result.expected.length === 0 ? other.expected : [...result.expected, ...other.expected];
    return { ...result, expected: merged };
  }
  return result;
}
