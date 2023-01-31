import { contains, remove } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';
import { monthStringToNumber } from 'filters/month/month.helpers';
import PARTIAL_DATES from './partialDates.constants';
import DATES from 'filters/dates/dates.constants';

/**
 * We want to return a future date, so if the month has already occurred this year, we give next year's date.
 */
export function getFutureYearIfDateIsInThePast(monthStr: string, dayStr: string): string {
    const currentDate = dayLite();
    const year = currentDate.year;
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const tempDate = dayLite().set({ month, day, year });
    if (tempDate < currentDate) {
        return (year + 1).toString();
    }
    return year.toString();
}

export function getNextMonthIfDayIsInThePast(dayStr: string): number {
    const currentDate = dayLite();
    const day = parseInt(dayStr, 10);
    const currMonth = currentDate.month;
    const month = day < currentDate.day ? currMonth + 1 : currMonth;
    return month < 13 ? month : 1;
}

export function partialDateStringToDayMonthYear(date: string): Date {
    let day: string;
    let month: string;
    let year: string;
    let dividerRegex: RegExp;

    if (contains(date, PARTIAL_DATES.NUM_MONTH_YEAR)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [month, year] = date.replace(dividerRegex, ' ').split(' ');
        day = '1';
    } else if (contains(date, PARTIAL_DATES.NUM_YEAR_MONTH)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [year, month] = date.replace(dividerRegex, ' ').split(' ');
        day = '1';
    } else if (contains(date, PARTIAL_DATES.NUM_DAY_MONTH)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [day, month] = date.replace(dividerRegex, ' ').split(' ');
        year = getFutureYearIfDateIsInThePast(month, day);
    } else if (contains(date, PARTIAL_DATES.NUM_MONTH_DAY)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [month, day] = date.replace(dividerRegex, ' ').split(' ');
        year = getFutureYearIfDateIsInThePast(month, day);
    } else if (contains(date, PARTIAL_DATES.TXT_MONTH_YEAR)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'g');
        [month, year] = date.replace(dividerRegex, ' ').split(' ');
        day = '1';
        month = monthStringToNumber(month).toString();
    } else if (contains(date, PARTIAL_DATES.TXT_YEAR_MONTH)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'g');
        [year, month] = date.replace(dividerRegex, ' ').split(' ');
        day = '1';
        month = monthStringToNumber(month).toString();
    } else if (contains(date, PARTIAL_DATES.TXT_DAY_MONTH)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'g');
        [day, month] = date.replace(dividerRegex, ' ').split(' ');
        month = monthStringToNumber(month).toString();
        year = getFutureYearIfDateIsInThePast(month, day);
    } else if (contains(date, PARTIAL_DATES.TXT_MONTH_DAY)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'g');
        [month, day] = date.replace(dividerRegex, ' ').split(' ');
        month = monthStringToNumber(month).toString();
        year = getFutureYearIfDateIsInThePast(month, day);
    } else if (contains(date, PARTIAL_DATES.DAY)) {
        day = date;
        month = getNextMonthIfDayIsInThePast(day).toString();
        year = getFutureYearIfDateIsInThePast(month, date);
    }

    if (!day || !month || !year) return null;

    return dayLite()
        .set({ day: parseInt(day), month: parseInt(month), year: parseInt(year) })
        .start('day')
        .toDate();
}

export function partialDateStringToDateObj(matchingText: string): Date {
    const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
    return partialDateStringToDayMonthYear(removedFillerWords);
}
