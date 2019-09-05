import { DateObjectSchema } from 'serina.schema';
import { DATES, PARTIAL_DATES } from 'filters/dates/dates.constants';
import contains from './contains';
import { monthStringToNumber, strToInt } from 'utils';
import { DateTime } from 'luxon';

/**
 * We want to return a future date, so if the month has already occurred this year, we give next year's date.
 */
function getFutureYearIfDateIsInThePast(month, day): string {
    const currentDate = DateTime.utc();
    const year = currentDate.year;
    const monthInt = parseInt(month, 10);
    if (monthInt < currentDate.month) {
        return (year + 1).toString();
    } else if (monthInt === currentDate.month) {
        (parseInt(day, 10) >= currentDate.day ? year : year + 1).toString();
    }
    return year.toString();
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
    }

    if (!day || !month || !year) return null;

    return strToInt(day, month, year);
}

export default convertPartialDateStringToObj;
