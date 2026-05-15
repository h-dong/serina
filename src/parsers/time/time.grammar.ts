import { type GrammarParser, type Parser, alt, map, optional, regex, seq, stri, wordBoundary } from 'parser';

import { timeStringToHourMinute } from './time.helpers';

/**
 * Typed AST node emitted by the Time grammar.
 *
 * `raw` is the original matched substring so the evaluator can delegate to
 * the existing, well-tested `timeStringToHourMinute` helper for meridiem /
 * "to" / "half / quarter" semantics. Future Phase 2 ports can widen this
 * node shape (e.g. split hour / minute / meridiem into first-class fields)
 * without changing the scanner.
 */
export interface TimeNode {
  readonly kind: 'time';
  readonly raw: string;
}

function keyword(literal: string): Parser<string> {
  return map(seq(wordBoundary, stri(literal)), ([, value]) => value);
}

function joined(parsers: Parser<unknown>[]): Parser<string> {
  return map(seq(...parsers), (parts) => (parts as unknown[]).join(''));
}

const MERIDIEM = alt(stri('a.m.'), stri('am.'), stri('p.m.'), stri('pm.'), stri('am'), stri('pm'));

const FILLER = alt(keyword('at'), keyword('by'));

const HOUR = regex(/[0-9]{1,2}/);
const MINUTE = regex(/[0-5][0-9]/);
const OPT_SPACE = regex(/[ ]?/);
const SPACE = regex(/ /);

const VERBAL = alt(keyword('half'), keyword('quarter'));
const REL_FILLER = alt(keyword('to'), keyword('until'), keyword('past'), keyword('after'));
const MIN_ID = alt(keyword('minutes'), keyword('minute'), keyword('mins'), keyword('min'));

// "4am" / "4 am"
const FORMAT_JUST_HOUR = joined([HOUR, OPT_SPACE, MERIDIEM]);

// "04:30"
const FORMAT_HOUR_WITH_MINS = joined([HOUR, regex(/:/), MINUTE]);

// "04:30am" / "04:30 am"
const FORMAT_HOUR_WITH_MINS_AND_MERIDIEM = joined([HOUR, regex(/:/), MINUTE, OPT_SPACE, MERIDIEM]);

// "half past 3pm" / "quarter to 4"
const FORMAT_VERBAL_QUANTIFIER = joined([VERBAL, SPACE, REL_FILLER, SPACE, alt(FORMAT_JUST_HOUR, HOUR)]);

// "20 mins to 11" / "20 min past 4"
const FORMAT_DIGIT_RELATIVE = joined([
  MINUTE,
  SPACE,
  map(optional(joined([MIN_ID, SPACE])), (v) => v ?? ''),
  REL_FILLER,
  SPACE,
  alt(FORMAT_JUST_HOUR, HOUR),
]);

// Longest / most-specific alternatives come first so the scanner prefers
// "04:30am" over the shorter "04:30" prefix, and "half past 3pm" over "3pm".
export const timeBody: Parser<string> = alt(
  FORMAT_VERBAL_QUANTIFIER,
  FORMAT_DIGIT_RELATIVE,
  FORMAT_HOUR_WITH_MINS_AND_MERIDIEM,
  FORMAT_JUST_HOUR,
  FORMAT_HOUR_WITH_MINS,
);

const TIME_WITH_FILLER: Parser<string> = map(
  seq(optional(joined([FILLER, SPACE])), timeBody),
  ([prefix, body]) => (prefix ?? '') + body,
);

export const timeParser: Parser<TimeNode> = map(TIME_WITH_FILLER, (raw) => ({ kind: 'time', raw }));

export const timeGrammar: GrammarParser<TimeNode> = {
  name: 'time',
  parser: timeParser,
  evaluate: (node) => timeStringToHourMinute(node.raw),
};
