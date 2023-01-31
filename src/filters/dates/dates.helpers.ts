import { monthStringToNumber } from 'filters/month/month.helpers';
import { dayLite } from 'lib/date/dayLite';
import { contains, remove } from 'lib/string/stringUtil';
import { DateObjectSchema } from 'serina.schema';
import DATES from './dates.constants';

export function strToInt(dayStr: string, monthStr: string, yearStr: string): DateObjectSchema {
    return {
        day: parseInt(dayStr, 10),
        month: parseInt(monthStr, 10),
        year: parseInt(yearStr, 10),
    };
}

export function dateStringToDayMonthYear(date: string): Date {
    let day: string;
    let month: string;
    let year: string;
    const numDividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
    const txtDividerRegex = new RegExp(DATES.TXT_DIVIDER, 'gi');

    if (contains(date, DATES.NUM_DAY_MONTH_YEAR, false)) {
        [day, month, year] = date.replace(numDividerRegex, ' ').split(' ');
    } else if (contains(date, DATES.NUM_MONTH_DAY_YEAR, false)) {
        [month, day, year] = date.replace(numDividerRegex, ' ').split(' ');
    } else if (contains(date, DATES.NUM_YEAR_MONTH_DAY, false)) {
        [year, month, day] = date.replace(numDividerRegex, ' ').split(' ');
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

export function dateStringToDateObj(matchingText: string): Date {
    const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
    return dateStringToDayMonthYear(removedFillerWords);
}
