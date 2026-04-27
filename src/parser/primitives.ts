import { type Parser, type ParserState, failure, success } from './types';

export function succeed<T>(value: T): Parser<T> {
  return (state: ParserState) => success(value, state.pos);
}

export function fail(message: string): Parser<never> {
  return (state: ParserState) => failure(state.pos, [message]);
}

export function str<S extends string>(literal: S): Parser<S> {
  const len = literal.length;
  const expected = [JSON.stringify(literal)];
  return (state: ParserState) => {
    const slice = state.input.substr(state.pos, len);
    if (slice === literal) {
      return success(literal, state.pos + len);
    }
    return failure(state.pos, expected);
  };
}

export function stri(literal: string): Parser<string> {
  const len = literal.length;
  const lower = literal.toLowerCase();
  const expected = [`${JSON.stringify(literal)} (case-insensitive)`];
  return (state: ParserState) => {
    const slice = state.input.substr(state.pos, len);
    if (slice.toLowerCase() === lower) {
      return success(slice, state.pos + len);
    }
    return failure(state.pos, expected);
  };
}

export function regex(re: RegExp, group = 0): Parser<string> {
  const flags = re.flags.includes('y') ? re.flags : re.flags + 'y';
  const sticky = new RegExp(re.source, flags);
  const expected = [`/${re.source}/`];
  return (state: ParserState) => {
    sticky.lastIndex = state.pos;
    const match = sticky.exec(state.input);
    if (match && match.index === state.pos) {
      const captured = match[group] ?? match[0];
      return success(captured, state.pos + match[0].length);
    }
    return failure(state.pos, expected);
  };
}

export const digit: Parser<string> = regex(/[0-9]/);

export const digits: Parser<string> = regex(/[0-9]+/);

export const word: Parser<string> = regex(/[A-Za-z]+/);

export const whitespace: Parser<string> = regex(/[ \t\n\r]+/);

export const optionalWhitespace: Parser<string> = regex(/[ \t\n\r]*/);

export const eof: Parser<null> = (state: ParserState) => {
  if (state.pos >= state.input.length) {
    return success(null, state.pos);
  }
  return failure(state.pos, ['end of input']);
};

export function any(): Parser<string> {
  return (state: ParserState) => {
    if (state.pos < state.input.length) {
      return success(state.input.charAt(state.pos), state.pos + 1);
    }
    return failure(state.pos, ['any character']);
  };
}

const WORD_CHAR = /[A-Za-z0-9_]/;

function isWordChar(char: string | undefined): boolean {
  return typeof char === 'string' && WORD_CHAR.test(char);
}

export const wordBoundary: Parser<null> = (state: ParserState) => {
  const before = state.pos > 0 ? state.input.charAt(state.pos - 1) : undefined;
  const after = state.pos < state.input.length ? state.input.charAt(state.pos) : undefined;
  if (isWordChar(before) !== isWordChar(after)) {
    return success(null, state.pos);
  }
  return failure(state.pos, ['word boundary']);
};
