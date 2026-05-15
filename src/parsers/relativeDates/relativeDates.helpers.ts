import RELATIVE_DATES from 'patterns/relativeDates/relativeDates.constants';
import { dayLite } from 'utils/date/dayLite';
import type { DayLiteUnits } from 'utils/date/types';
import findMatchingKey from 'utils/findMatchingKey';
import { contains, matchPattern, remove } from 'utils/string/stringUtil';

export type RegexTimeUnit = keyof typeof RELATIVE_DATES.TIME_UNITS;

export function regexTimeUnitToDayLiteTimeUnit(regexTimeUnit: RegexTimeUnit): DayLiteUnits {
  switch (regexTimeUnit) {
    case 'DAYS':
      return 'day';
    case 'WEEKS':
      return 'week';
    case 'MONTHS':
      return 'month';
    case 'YEARS':
      return 'year';
    case 'ANY':
      return null;
  }
}

export function convertRelativeAdverbToObj(relativeDateStr: string): Date {
  if (contains(relativeDateStr, RELATIVE_DATES.RELATIVE_ADVERB.TODAY)) {
    return dayLite().start('day').toDate();
  }

  if (contains(relativeDateStr, RELATIVE_DATES.RELATIVE_ADVERB.YESTERDAY)) {
    return dayLite().minus(1, 'day').start('day').toDate();
  }

  return dayLite().plus(1, 'day').start('day').toDate();
}

export function convertRelativeExpressionToObj(expression: string): Date {
  const match = matchPattern(expression, RELATIVE_DATES.TIME_UNITS.ANY);

  if (!match) return null;

  const [timeUnit] = match;
  const unit = findMatchingKey(RELATIVE_DATES.TIME_UNITS, timeUnit) as RegexTimeUnit;

  /* istanbul ignore next -- the time unit came from RELATIVE_DATES.TIME_UNITS.ANY, so a key must exist. */
  if (!unit) return null;

  const dayLiteTimeUnit = regexTimeUnitToDayLiteTimeUnit(unit);
  const period = remove(expression, unit);
  let quantity: number;

  if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.ONE)) {
    quantity = 1;
  } else if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.NEXT)) {
    return dayLite().start(dayLiteTimeUnit).next(1, dayLiteTimeUnit).toDate();
  } else {
    quantity = parseInt(period, 10);
  }

  const test = dayLite().plus(quantity, dayLiteTimeUnit).start('day').toDate();

  return test;
}

export function relativeDateStringToDayMonthYear(date: string): Date {
  const removedFillerWords = remove(date, RELATIVE_DATES.FILLER_WORDS);
  if (contains(removedFillerWords, RELATIVE_DATES.RELATIVE_ADVERB.ANY)) {
    return convertRelativeAdverbToObj(removedFillerWords);
  } else {
    return convertRelativeExpressionToObj(removedFillerWords);
  }
}

export function relativeDateStringToDateObj(matchingText: string): Date {
  const dateObj = relativeDateStringToDayMonthYear(matchingText);
  if (!dateObj) return null;
  return dayLite(dateObj).start('day').toDate();
}
