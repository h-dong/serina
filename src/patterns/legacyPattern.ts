import { map } from 'parser/combinators';
import { regex } from 'parser/primitives';
import type { Parser } from 'parser/types';

export interface LegacyPatternNode<K extends string> {
  readonly kind: K;
  readonly raw: string;
}

export interface LegacyPatternOptions {
  readonly wordBoundary?: boolean;
}

/**
 * Transitional helper for filters whose parsing rules still live in legacy
 * regex constants. It gives them a typed GrammarParser surface first; later
 * ports can replace the regex body with richer combinators filter by filter.
 */
export function legacyPatternParser<K extends string>(
  kind: K,
  pattern: string,
  options: LegacyPatternOptions = {},
): Parser<LegacyPatternNode<K>> {
  const wordBoundary = options.wordBoundary ?? true;
  const source = wordBoundary ? `\\b(?:${pattern})\\b` : `(?:${pattern})`;

  return map(regex(new RegExp(source, 'i')), (raw) => ({ kind, raw }));
}
