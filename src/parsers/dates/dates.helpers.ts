import { monthStringToNumber } from 'parsers/month/month.helpers';
import DATES from 'patterns/dates/dates.constants';
import type { DateObjectSchema } from 'types';
import { dayLite } from 'utils/date/dayLite';
import { getDateOrder } from 'utils/localeHelpers';
import { contains, remove } from 'utils/string/stringUtil';

export function strToInt(dayStr: string, monthStr: string, yearStr: string): DateObjectSchema {
  return {
    day: parseInt(dayStr, 10),
    month: parseInt(monthStr, 10),
    year: parseInt(yearStr, 10),
  };
}

function isAmbiguousNumericDate(date: string): boolean {
  return contains(date, DATES.NUM_DAY_MONTH_YEAR, false) && contains(date, DATES.NUM_MONTH_DAY_YEAR, false);
}

export function dateStringToDayMonthYear(date: string, locale?: string): Date {
  let day: string;
  let month: string;
  let year: string;
  const numDividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
  const txtDividerRegex = new RegExp(DATES.TXT_DIVIDER, 'gi');

  if (contains(date, DATES.NUM_YEAR_MONTH_DAY, false)) {
    [year, month, day] = date.replace(numDividerRegex, ' ').split(' ');
  } else if (isAmbiguousNumericDate(date) && getDateOrder(locale) === 'MDY') {
    [month, day, year] = date.replace(numDividerRegex, ' ').split(' ');
  } else if (contains(date, DATES.NUM_DAY_MONTH_YEAR, false)) {
    [day, month, year] = date.replace(numDividerRegex, ' ').split(' ');
  } else if (contains(date, DATES.NUM_MONTH_DAY_YEAR, false)) {
    [month, day, year] = date.replace(numDividerRegex, ' ').split(' ');
  } else if (contains(date, DATES.TXT_DAY_MONTH_YEAR, false)) {
    [day, month, year] = date.replace(txtDividerRegex, ' ').split(' ');
    month = monthStringToNumber(month).toString();
  } else if (contains(date, DATES.TXT_MONTH_DAY_YEAR, false)) {
    [month, day, year] = date.replace(txtDividerRegex, ' ').split(' ');
    month = monthStringToNumber(month).toString();
  }

  if (!day || !month || !year) return null;

  return dayLite()
    .set({ day: parseInt(day), month: parseInt(month), year: parseInt(year) })
    .start('day')
    .toDate();
}

export function dateStringToDateObj(matchingText: string, locale?: string): Date {
  const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
  return dateStringToDayMonthYear(removedFillerWords, locale);
}
