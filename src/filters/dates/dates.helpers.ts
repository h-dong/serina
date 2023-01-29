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

export function dateStringToDayMonthYear(date: string): DateObjectSchema {
    let day: string;
    let month: string;
    let year: string;
    let dividerRegex: RegExp;

    if (contains(date, DATES.NUM_DAY_MONTH_YEAR, false)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [day, month, year] = date.replace(dividerRegex, ' ').split(' ');
    } else if (contains(date, DATES.NUM_MONTH_DAY_YEAR, false)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [month, day, year] = date.replace(dividerRegex, ' ').split(' ');
    } else if (contains(date, DATES.NUM_YEAR_MONTH_DAY, false)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [year, month, day] = date.replace(dividerRegex, ' ').split(' ');
    } else if (contains(date, DATES.TXT_DAY_MONTH_YEAR, false)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'gi');
        [day, month, year] = date.replace(dividerRegex, ' ').split(' ');
        month = monthStringToNumber(month).toString();
    } else if (contains(date, DATES.TXT_MONTH_DAY_YEAR, false)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'gi');
        [month, day, year] = date.replace(dividerRegex, ' ').split(' ');
        month = monthStringToNumber(month).toString();
    }

    if (!day || !month || !year) return null;

    return strToInt(day, month, year);
}

export function dateStringToDateObj(matchingText: string): Date {
    const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
    const dateObj = dateStringToDayMonthYear(removedFillerWords);

    if (!dateObj) return null;

    const { day, month, year } = dateObj;
    return dayLite().set({ day, month, year }).start('day').toDate();
}
