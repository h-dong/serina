# Parser combinator core

A small, typed, zero-dependency parser combinator toolkit used to build Serina's grammar engine. This replaces the regex-based `Filter` base class with composable, testable, position-aware parsers.

## Concepts

- **`Parser<T>`** — a pure function `(state: ParserState) => ParseResult<T>`. A parser either succeeds (advancing `pos`) or fails (tracking the furthest position reached and a list of expected tokens, for good error messages).
- **`ParserState`** — `{ input: string; pos: number }`. Parsers never mutate state; they return a new `pos` in the result.
- **`ParseResult<T>`** — a discriminated union of `ParseSuccess<T>` and `ParseFailure`.
- **`GrammarParser<TNode>`** — the filter-level shape: `{ name, parser, evaluate }`. The parser produces a typed AST node; the evaluator turns that node into a `Date | null` using an injected `EvalContext`.

## API surface

### Primitives

| Parser                              | Description                                                                                                    |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `str(s)`                            | Matches literal `s` (case sensitive).                                                                          |
| `stri(s)`                           | Matches literal `s` case-insensitively, returns the original input slice so casing is preserved.               |
| `regex(re, group?)`                 | Matches `re` at the current position (sticky). Returns the full match, or a capture group if `group` is given. |
| `digit` / `digits`                  | One / one-or-more `[0-9]`.                                                                                     |
| `word`                              | `[A-Za-z]+`.                                                                                                   |
| `whitespace` / `optionalWhitespace` | One-or-more / zero-or-more `[ \t\n\r]`.                                                                        |
| `eof`                               | Succeeds only at end of input.                                                                                 |
| `wordBoundary`                      | Position-only check (consumes nothing). Same idea as regex `\b`.                                               |
| `succeed(v)`                        | Always succeeds with `v`, no input consumed.                                                                   |
| `fail(msg)`                         | Always fails.                                                                                                  |
| `any()`                             | Consume exactly one character.                                                                                 |

### Combinators

| Combinator              | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `map(p, fn)`            | Transform the value on success.                                  |
| `chain(p, fn)`          | Feed the result into a parser-returning function (monadic bind). |
| `seq(p1, p2, ...)`      | Run in order, collect tuple of values.                           |
| `seqObj({ k: p, ... })` | Run in order, collect keyed object.                              |
| `alt(p1, p2, ...)`      | First-match-wins ordered choice.                                 |
| `optional(p)`           | Returns `T \| null`.                                             |
| `many(p)` / `many1(p)`  | Zero-or-more / one-or-more.                                      |
| `sepBy(p, sep)`         | List separated by `sep` (trailing separator not consumed).       |
| `between(l, p, r)`      | `seq(l, p, r)` keeping only `p`'s value.                         |
| `lookahead(p)`          | Succeed if `p` succeeds, consume nothing.                        |
| `notFollowedBy(p)`      | Succeed if `p` fails, consume nothing.                           |
| `label(name, p)`        | Replace error's expected-set with a friendly name.               |
| `tag(kind, p)`          | Add a discriminator `kind` to the value (useful for AST nodes).  |
| `parse(p, input)`       | Run a parser on a whole string.                                  |

### Scanner

- **`scanAll(parser, input)`** — walks the input and returns every non-overlapping `{ start, end, text, value }` match. This is what replaces the global `/…/ig` loop in the legacy `Filter` base.

### Grammar & engine

- **`GrammarParser<TNode>`** — the interface that parser modules implement.
- **`EvalContext`** — `{ now: () => Date }` injected into evaluators.
- **`runGrammarParser(grammar, input, ctx?)`** — scans + evaluates, returns `ParsedMatchSchema[] | null` matching the legacy `Filter.parseText` shape.
- **`toLegacyFilter(grammar, ctx?)`** — wraps a `GrammarParser` in an object exposing `parseText(text)`, so grammar parsers drop straight into [`ParserRegistry`](./ParserRegistry.ts) while the public `serina(text)` API stays unchanged.

## Porting a Parser

Every parser port follows the same three-step pattern. See [`src/parsers/time/time.grammar.ts`](../parsers/time/time.grammar.ts) for a real example.

1. **Define the AST node** — a tagged, readonly interface.

   ```ts
   export interface TimeNode {
     readonly kind: 'time';
     readonly raw: string; // or hour/minute/meridiem once helpers are inlined
   }
   ```

2. **Build the parser** from primitives + combinators. Prefer `alt(longest, shorter)` to avoid partial matches eating the greedier form.

   ```ts
   export const timeParser: Parser<TimeNode> = map(seq(optional(filler), timeBody), ([prefix, body]) => ({
     kind: 'time',
     raw: (prefix ?? '') + body,
   }));
   ```

3. **Export a `GrammarParser<TNode>`** with a pure `evaluate`. The evaluator may delegate to existing helpers during the migration — the point of Phase 2 is to switch the parsing layer first.

   ```ts
   export const timeGrammar: GrammarParser<TimeNode> = {
     name: 'time',
     parser: timeParser,
     evaluate: (node) => timeStringToHourMinute(node.raw),
   };
   ```

4. **Wire it into the engine** by adding the grammar through [`ParserRegistry`](./ParserRegistry.ts):

   ```ts
   const filters: LegacyFilter[] = [
     // ...
     toLegacyFilter(timeGrammar),
     // ...
   ];
   ```

That's it — the public `serina(text)` API does not change, so grammar and integration tests should keep passing.

## Migration status

All production parsers now expose the `GrammarParser` interface and the engine registry uses `toLegacyFilter(...)` for every entry. Some grammar files are still transitional wrappers around the old regex constants plus existing evaluator helpers; those should be replaced with richer combinators incrementally as their semantics are revisited.

## Out of scope (Phase 2)

- Public `SerinaEngine` registry / plugin API — Phase 3.
- Exporting combinator primitives as part of the published bundle — Phase 3.
- Temporal migration — tracked separately on the roadmap.
