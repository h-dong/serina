import { map, seq } from 'parser/combinators';
import { digits, str } from 'parser/primitives';
import { type EvalContext, type GrammarParser, defaultContext, runGrammarParser } from 'parsers/GrammarParser';

interface DigitNode {
  value: number;
}

const digitGrammar: GrammarParser<DigitNode> = {
  name: 'digit',
  parser: map(digits, (raw) => ({ value: parseInt(raw, 10) })),
  evaluate: (node, ctx) => {
    if (node.value < 0 || node.value > 23) return null;
    const base = ctx.now();
    const out = new Date(base);
    out.setUTCHours(node.value, 0, 0, 0);
    return out;
  },
};

describe('runGrammarParser', () => {
  const ctx: EvalContext = { now: () => new Date('2024-01-01T00:00:00.000Z'), locale: 'en-GB' };

  test('creates a default context with current time and default locale', () => {
    vi.useFakeTimers().setSystemTime(new Date('2024-03-04T05:06:07.000Z'));
    expect(defaultContext().now()).toEqual(new Date('2024-03-04T05:06:07.000Z'));
    expect(defaultContext().locale).toBe('en-GB');
    vi.useRealTimers();
  });

  test('returns null if parser never matches', () => {
    const result = runGrammarParser(digitGrammar, 'no numbers here', ctx);
    expect(result).toBeNull();
  });

  test('returns legacy shape for each scanned match', () => {
    const result = runGrammarParser(digitGrammar, 'wake me 7 then 9', ctx);
    expect(result).toEqual([
      {
        dateTime: new Date('2024-01-01T07:00:00.000Z'),
        matched: '7',
        text: 'wake me then 9',
      },
      {
        dateTime: new Date('2024-01-01T09:00:00.000Z'),
        matched: '9',
        text: 'wake me 7 then',
      },
    ]);
  });

  test('drops matches whose evaluator returns null', () => {
    const result = runGrammarParser(digitGrammar, 'ok 99 maybe 5', ctx);
    expect(result).toEqual([
      {
        dateTime: new Date('2024-01-01T05:00:00.000Z'),
        matched: '5',
        text: 'ok 99 maybe',
      },
    ]);
  });

  test('returns null if every match is rejected by the evaluator', () => {
    const result = runGrammarParser(digitGrammar, 'only 99 and 44', ctx);
    expect(result).toBeNull();
  });

  test('preserves original input casing in matched field', () => {
    const upper: GrammarParser<string> = {
      name: 'upper',
      parser: map(seq(str('AM'), str('X')), () => 'hit'),
      evaluate: () => new Date('2024-01-01T00:00:00.000Z'),
    };
    const result = runGrammarParser(upper, 'hello AMX world', ctx);
    expect(result?.[0]?.matched).toBe('AMX');
  });
});
