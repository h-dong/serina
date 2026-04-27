import { scanAll } from 'parser/scan';
import type { Parser } from 'parser/types';
import type { ParseOptions, ParsedMatchSchema } from 'types';
import { resolveLocale } from 'utils/localeHelpers';
import { trimWhiteSpaces } from 'utils/string/stringUtil';

/**
 * Context threaded into every evaluator. Keeps `now()` injectable so tests
 * (and callers that want deterministic behaviour) don't have to stub the
 * global Date.
 */
export interface EvalContext {
  now: () => Date;
  locale: string;
}

export function defaultContext(options: ParseOptions = {}): EvalContext {
  return {
    now: () => options.referenceDate ?? new Date(),
    locale: resolveLocale(options.locale),
  };
}

/**
 * The new first-class grammar parser shape. Replaces the class-based
 * `Filter` with a value, so parsers can be composed, registered, and tested
 * in isolation.
 *
 * - `parser` consumes input and produces a typed AST node.
 * - `evaluate` turns the AST node into a `Date` (or null for "matched, but
 *    cannot be resolved"), using the injected context.
 */
export interface GrammarParser<TNode> {
  readonly name: string;
  readonly parser: Parser<TNode>;
  readonly evaluate: (node: TNode, ctx: EvalContext) => Date | null;
}

/**
 * Scans an input string with a `GrammarParser`, evaluates every match, and
 * returns the legacy `ParsedMatchSchema[]` shape so combinator-based parsers
 * can drop directly into the existing engine.
 *
 * - `text` is the remainder of the original input with the matched substring
 *    removed (whitespace collapsed), matching the current Filter behaviour.
 * - `matched` preserves the original casing of the input.
 * - Matches whose `evaluate` returns `null` are dropped.
 */
export function runGrammarParser<TNode>(
  grammar: GrammarParser<TNode>,
  input: string,
  ctx: EvalContext = defaultContext(),
): ParsedMatchSchema[] | null {
  const scanned = scanAll(grammar.parser, input);
  if (scanned.length === 0) return null;

  const matches: ParsedMatchSchema[] = [];
  for (const hit of scanned) {
    const dateTime = grammar.evaluate(hit.value, ctx);
    if (!dateTime) continue;

    const remainder = input.slice(0, hit.start) + input.slice(hit.end);

    matches.push({
      text: trimWhiteSpaces(remainder),
      dateTime,
      matched: trimWhiteSpaces(hit.text),
    });
  }

  return matches.length > 0 ? matches : null;
}
