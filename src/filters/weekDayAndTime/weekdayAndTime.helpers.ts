import TIME from 'filters/time/time.constants';
import { timeStringToDateObj } from 'filters/time/time.helpers';
import WEEKDAY from 'filters/weekday/weekday.constants';
import { weekdayStringToNumber } from 'filters/weekday/weekday.helpers';
import { dayLite } from 'lib/date/dayLite';
import { contains, matchPattern } from 'lib/string/stringUtil';

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
