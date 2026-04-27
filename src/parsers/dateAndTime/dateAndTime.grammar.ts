import { type GrammarParser, type Parser, alt, map, optional, regex, seq } from 'parser';
import { timeBody } from 'parsers/time/time.grammar';
import { timeStringToDateObj } from 'parsers/time/time.helpers';
import DATES from 'patterns/dates/dates.constants';
import PARTIAL_DATES from 'patterns/partialDates/partialDates.constants';
import RELATIVE_DATES from 'patterns/relativeDates/relativeDates.constants';
import { dayLite } from 'utils/date/dayLite';

import { differentDateStringToObj, getDateString, getTimeString } from './dateAndTime.helpers';

/**
 * Typed AST node produced by the DateAndTime grammar.
 *
 * Rather than re-deriving every date format here (the date-side filters
 * haven't been ported yet), we keep `rawDate` and `rawTime` so the evaluator
 * can delegate to the existing, well-tested helpers. Once the date filters
 * land on combinators, `rawDate` becomes a structured `DateNode` union.
 */
export interface DateAndTimeNode {
  readonly kind: 'dateAndTime';
  readonly rawDate: string;
  readonly rawTime: string;
}

/**
 * Bridge parser: wraps the current date regex alternation from the
 * (as-yet unported) date filters. This is the one place we touch the
 * legacy regex constants from new combinator code, and it disappears as
 * those filters migrate to their own grammars.
 */
const dateFiller = regex(new RegExp(DATES.FILLER_WORDS, 'i'));
const dateBody = regex(new RegExp(`(${[DATES.ANY, PARTIAL_DATES.ANY, RELATIVE_DATES.ANY].join('|')})`, 'i'));

const datePart: Parser<string> = map(seq(optional(dateFiller), dateBody), ([prefix, body]) => (prefix ?? '') + body);

const timeFiller = regex(/(at|by) /i);
const timePart: Parser<string> = map(seq(optional(timeFiller), timeBody), ([prefix, body]) => (prefix ?? '') + body);

const space = regex(/ /);

const dateFirst: Parser<DateAndTimeNode> = map(seq(datePart, space, timePart), ([rawDate, , rawTime]) => ({
  kind: 'dateAndTime' as const,
  rawDate,
  rawTime,
}));

const timeFirst: Parser<DateAndTimeNode> = map(seq(timePart, space, datePart), ([rawTime, , rawDate]) => ({
  kind: 'dateAndTime' as const,
  rawDate,
  rawTime,
}));

export const dateAndTimeParser: Parser<DateAndTimeNode> = alt(dateFirst, timeFirst);

export const dateAndTimeGrammar: GrammarParser<DateAndTimeNode> = {
  name: 'dateAndTime',
  parser: dateAndTimeParser,
  // The evaluator reuses the existing helpers that the unported date
  // filters still rely on. When those filters migrate, this shrinks to
  // "read dateNode, read timeNode, combine".
  evaluate: (node, ctx) => {
    // `getDateString` / `getTimeString` accept the whole composite match
    // today; our AST already has them split, but we still route through
    // the same string-based helpers so the semantics stay identical.
    const combined = `${node.rawDate} ${node.rawTime}`;
    const dateString = getDateString(combined);
    const timeString = getTimeString(combined);
    if (!dateString || !timeString) return null;

    const dateObj = differentDateStringToObj(dateString, ctx.locale);
    const timeObj = timeStringToDateObj(timeString);
    if (!dateObj || !timeObj) return null;

    const { day, month, year } = dateObj;
    const { hour, minute } = timeObj;
    return dayLite().set({ day, month, year, hour, minute }).start('minute').toDate();
  },
};
