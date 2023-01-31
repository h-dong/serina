import DATES from 'filters/dates/dates.constants';
import { dateStringToDayMonthYear } from 'filters/dates/dates.helpers';
import PARTIAL_DATES from 'filters/partialDates/partialDates.constants';
import { partialDateStringToDayMonthYear } from 'filters/partialDates/partialDates.helpers';
import { relativeDateStringToDayMonthYear } from 'filters/relativeDates/relativeDates.helpers';
import RELATIVE_DATES from 'filters/relativeDates/relativeDates.constants';
import TIME from 'filters/time/time.constants';
import { timeStringToDateObj } from 'filters/time/time.helpers';
import { dayLite } from 'lib/date/dayLite';
import { contains, matchPattern, remove } from 'lib/string/stringUtil';
import { DateObjectSchema } from 'serina.schema';

export function getDateString(matchingText: string) {
    const stringWithoutDateFillerWords = remove(matchingText, DATES.FILLER_WORDS);
    const dateStringMatches = matchPattern(
        stringWithoutDateFillerWords,
        `(${DATES.ANY}|${PARTIAL_DATES.ANY}|${RELATIVE_DATES.ANY})`
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

export function differentDateStringToObj(dateString: string): DateObjectSchema {
    let dateObj: DateObjectSchema;
    if (contains(dateString, DATES.ANY)) {
        const { day, month, year } = dayLite(dateStringToDayMonthYear(dateString));
        dateObj = { day, month, year };
    } else if (contains(dateString, `${PARTIAL_DATES.ANY}`)) {
        const { day, month, year } = dayLite(partialDateStringToDayMonthYear(dateString));
        dateObj = { day, month, year };
    } else {
        const { day, nativeMonth, year } = dayLite(relativeDateStringToDayMonthYear(dateString));
        dateObj = { day, month: nativeMonth, year };
    }

    if (!dateObj) return null;

    return dateObj;
}

export function dateAndTimeToDateObj(matchingText: string): Date {
    const dateString = getDateString(matchingText);
    const timeString = getTimeString(matchingText);

    if (!dateString || !timeString) return null;

    const dateObj = differentDateStringToObj(dateString);
    const timeObj = timeStringToDateObj(timeString);

    if (!dateObj || !timeObj) return null;

    const { day, month, year } = dateObj;
    const { hour, minute } = timeObj;

    return dayLite().set({ day, month, year, hour, minute }).start('minute').toDate();
}
