import { DateObjectSchema } from 'serina.schema';
import { DATES, PARTIAL_DATES } from 'filters/dates/dates.constants';
import contains from './contains';
import { monthStringToNumber } from 'utils';
import { DateTime } from 'luxon';

function strToInt(dayStr: string, monthStr: string, yearStr: string): DateObjectSchema {
    return {
        day: parseInt(dayStr, 10),
        month: parseInt(monthStr, 10),
        year: parseInt(yearStr, 10),
    };
}

function convertPartialDateStringToObj(date: string): DateObjectSchema {
    const currentYear = DateTime.utc().year;
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
        year = currentYear.toString();
    } else if (contains(date, PARTIAL_DATES.NUM_MONTH_DAY)) {
        dividerRegex = new RegExp(DATES.NUM_DIVIDER, 'g');
        [month, day] = date.replace(dividerRegex, ' ').split(' ');
        year = currentYear.toString();
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
        year = currentYear.toString();
        month = monthStringToNumber(month).toString();
    } else if (contains(date, PARTIAL_DATES.TXT_MONTH_DAY)) {
        dividerRegex = new RegExp(DATES.TXT_DIVIDER, 'g');
        [month, day] = date.replace(dividerRegex, ' ').split(' ');
        year = currentYear.toString();
        month = monthStringToNumber(month).toString();
    }

    if (!day || !month || !year) return null;

    return strToInt(day, month, year);
}

export default convertPartialDateStringToObj;
