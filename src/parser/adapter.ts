import { type EvalContext, type GrammarParser, defaultContext, runGrammarParser } from 'parsers/GrammarParser';
import type { ParsedMatchSchema } from 'types';

/**
 * Shape of parser entries that `ParserRegistry` iterates over.
 * We re-declare it here (instead of importing the concrete Filter class) so
 * combinator-based parsers never have to extend the regex-era base class.
 */
export interface LegacyFilter {
  parseText(text: string, ctx?: EvalContext): ParsedMatchSchema[] | null;
}

/**
 * Wraps a `GrammarParser` so it looks exactly like a legacy Filter instance,
 * letting grammar parsers slot into the registry while the public API keeps
 * returning the legacy match shape.
 */
export function toLegacyFilter<TNode>(
  grammar: GrammarParser<TNode>,
  ctx: EvalContext = defaultContext(),
): LegacyFilter {
  return {
    parseText(text: string, runtimeCtx: EvalContext = ctx) {
      return runGrammarParser(grammar, text, runtimeCtx);
    },
  };
}
