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

const numMonthYear = `(${MONTH.NUMBERS}${numDividers}${YEAR.ANY})`;
const numYearMonth = `(${YEAR.ANY}${numDividers}${MONTH.NUMBERS})`;
const numMonthDay = `(${MONTH.NUMBERS}${numDividers}${DAY.NUMBERS})`;
const numDayMonth = `(${DAY.NUMBERS}${numDividers}${MONTH.NUMBERS})`;
const txtMonthDay = `(${MONTH.ANY}${txtDividers}${DAY.ANY})`;
const txtDayMonth = `(${DAY.ANY}${txtDividers}${MONTH.ANY})`;
const txtMonthYear = `(${MONTH.ANY}${txtDividers}${YEAR.ANY})`;
const txtYearMonth = `(${YEAR.ANY}${txtDividers}${MONTH.ANY})`;

const PARTIAL_DATES = {
    ANY: `${numMonthYear}|${numYearMonth}|${numMonthDay}|${numDayMonth}|${txtMonthYear}|${txtMonthDay}|${txtYearMonth}|${txtDayMonth}`,
    NUM_MONTH_YEAR: numMonthYear,
    NUM_YEAR_MONTH: numYearMonth,
    NUM_MONTH_DAY: numMonthDay,
    NUM_DAY_MONTH: numDayMonth,
    TXT_MONTH_YEAR: txtMonthYear,
    TXT_MONTH_DAY: txtMonthDay,
    TXT_DAY_MONTH: txtDayMonth,
    TXT_YEAR_MONTH: txtYearMonth,
};

export { DATES, PARTIAL_DATES };
