import { DateObjectSchema } from 'serina.schema';
import { DATES } from 'filters/dates/dates.constants';
import { contains } from 'lib/string/stringUtil';
import monthStringToNumber from 'utils/monthStringToNumber';
import strToInt from 'utils/strToInt';

function convertDateStringToObj(date: string): DateObjectSchema {
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

export default convertDateStringToObj;
