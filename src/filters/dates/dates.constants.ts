import DAY from 'filters/day/day.constants';
import MONTH from 'filters/month/month.constants';
import YEAR from 'filters/year/year.constants';

const numDividers = '(\/|\-)';
const numDayMonthYear = `(${DAY.NUMBERS}${numDividers}${MONTH.NUMBERS}${numDividers}${YEAR.ANY})`;
const numMonthDayYear = `(${MONTH.NUMBERS}${numDividers}${DAY.NUMBERS}${numDividers}${YEAR.ANY})`;
const numYearMonthDay = `(${YEAR.ANY}${numDividers}${MONTH.NUMBERS}${numDividers}${DAY.NUMBERS})`;
const txtDividers = '((\,)? )';
const txtDayMonthYear = `(${DAY.ANY}?${txtDividers}${MONTH.ANY}${txtDividers}${YEAR.ANY})`;
const txtMonthDayYear = `(${MONTH.ANY}${txtDividers}${DAY.ANY}?${txtDividers}${YEAR.ANY})`;

const DATES = {
    ANY: `${numDayMonthYear}|${numMonthDayYear}|${numYearMonthDay}|${txtDayMonthYear}|${txtMonthDayYear}`,
    NUM_DAY_MONTH_YEAR: numDayMonthYear,
    NUM_MONTH_DAY_YEAR: numMonthDayYear,
    NUM_YEAR_MONTH_DAY: numYearMonthDay,
    TXT_DAY_MONTH_YEAR: txtDayMonthYear,
    TXT_MONTH_DAY_YEAR: txtMonthDayYear,
    FILLER_WORDS: '(on|by) ',
    NUM_DIVIDER: numDividers,
    TXT_DIVIDER: txtDividers,
};

export default DATES;
