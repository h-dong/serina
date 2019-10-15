import { DateTime } from 'luxon';
import { DateObjectSchema } from 'serina.schema';
import { DATES, PARTIAL_DATES } from 'filters/dates/dates.constants';
import contains from './contains';
import monthStringToNumber from 'utils/monthStringToNumber';
import strToInt from 'utils/strToInt';

/**
 * We want to return a future date, so if the month has already occurred this year, we give next year's date.
 */
function getFutureYearIfDateIsInThePast(monthStr, dayStr): string {
    const currentDate = DateTime.utc();
    const year = currentDate.year;
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const tempDate = DateTime.utc().set({ month, day, year });
    if (tempDate < currentDate) {
        return (year + 1).toString();
    }
    return year.toString();
}

function getNextMonthIfDayIsInThePast(dayStr): number {
    const currentDate = DateTime.utc();
    const day = parseInt(dayStr, 10);
    const currMonth = currentDate.month;
    const month = day < currentDate.day ? currMonth + 1 : currMonth;
    return month < 13 ? month : 1;
}

function convertPartialDateStringToObj(date: string): DateObjectSchema {
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

    return strToInt(day, month, year);
}

export default convertPartialDateStringToObj;
