import { timeStringToDateObj } from 'parsers/time/time.helpers';
import { weekdayStringToNumber } from 'parsers/weekday/weekday.helpers';
import TIME from 'patterns/time/time.constants';
import WEEKDAY from 'patterns/weekday/weekday.constants';
import { dayLite } from 'utils/date/dayLite';
import { contains, matchPattern } from 'utils/string/stringUtil';

export function getValidMatch(text: string, pattern: string): string {
  const matched = matchPattern(text, pattern);
  if (!matched) return null;
  const [value] = matched;
  return value;
}

export function weekdayAndTimeToDateObj(matchingText) {
  const timeString = getValidMatch(matchingText, TIME.ANY);
  const { hour, minute } = timeStringToDateObj(timeString);
  const [weekdayString] = matchPattern(matchingText, WEEKDAY.ANY);
  const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
  const weekday = weekdayStringToNumber(weekdayString, pastWeekday);

  return dayLite().set({ weekday, hour, minute }).startOf('minute').toDate();
}
