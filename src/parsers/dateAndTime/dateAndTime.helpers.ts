import { dateStringToDayMonthYear } from 'parsers/dates/dates.helpers';
import { partialDateStringToDayMonthYear } from 'parsers/partialDates/partialDates.helpers';
import { relativeDateStringToDayMonthYear } from 'parsers/relativeDates/relativeDates.helpers';
import { timeStringToDateObj } from 'parsers/time/time.helpers';
import DATES from 'patterns/dates/dates.constants';
import PARTIAL_DATES from 'patterns/partialDates/partialDates.constants';
import RELATIVE_DATES from 'patterns/relativeDates/relativeDates.constants';
import TIME from 'patterns/time/time.constants';
import type { DateObjectSchema } from 'types';
import { dayLite } from 'utils/date/dayLite';
import { contains, matchPattern, remove } from 'utils/string/stringUtil';

export function getDateString(matchingText: string) {
  const stringWithoutDateFillerWords = remove(matchingText, DATES.FILLER_WORDS);
  const dateStringMatches = matchPattern(
    stringWithoutDateFillerWords,
    `(${DATES.ANY}|${PARTIAL_DATES.ANY}|${RELATIVE_DATES.ANY})`,
  );

  if (!dateStringMatches) return null;

  return dateStringMatches[0];
}

export function getTimeString(matchingText: string) {
  const stringWithoutTimeFillerWords = remove(matchingText, TIME.FILLER_WORDS);
  const timeStringMatches = matchPattern(stringWithoutTimeFillerWords, TIME.ANY);

  if (!timeStringMatches) return null;

  return timeStringMatches[0];
}

export function differentDateStringToObj(dateString: string, locale?: string): DateObjectSchema {
  let dateObj: DateObjectSchema;
  if (contains(dateString, DATES.ANY)) {
    const { day, month, year } = dayLite(dateStringToDayMonthYear(dateString, locale));
    dateObj = { day, month, year };
  } else if (contains(dateString, `${PARTIAL_DATES.ANY}`)) {
    const { day, month, year } = dayLite(partialDateStringToDayMonthYear(dateString, locale));
    dateObj = { day, month, year };
  } else {
    const { day, nativeMonth, year } = dayLite(relativeDateStringToDayMonthYear(dateString));
    dateObj = { day, month: nativeMonth, year };
  }

  /* istanbul ignore next -- all callers pass strings already matched by one of the date grammars above. */
  if (!dateObj) return null;

  return dateObj;
}

export function dateAndTimeToDateObj(matchingText: string, locale?: string): Date {
  const dateString = getDateString(matchingText);
  const timeString = getTimeString(matchingText);

  if (!dateString || !timeString) return null;

  const dateObj = differentDateStringToObj(dateString, locale);
  const timeObj = timeStringToDateObj(timeString);

  if (!dateObj || !timeObj) return null;

  const { day, month, year } = dateObj;
  const { hour, minute } = timeObj;

  return dayLite().set({ day, month, year, hour, minute }).start('minute').toDate();
}
