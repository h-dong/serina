import DAY from 'filters/day/day.constants';
import MONTH from 'filters/month/month.constants';
import YEAR from 'filters/year/year.constants';
import TIME from '../time/time.constants';

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
    FILLER_WORDS: '(on|by) (the )?',
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
const day = `${DAY.ORDINAL_ONLY}`;

const PARTIAL_DATES = {
    ANY: `(${numMonthYear}|${numYearMonth}|${numMonthDay}|${numDayMonth}|${txtMonthYear}|${txtMonthDay}|${txtYearMonth}|${txtDayMonth}|${day})`,
    NUM_MONTH_YEAR: numMonthYear,
    NUM_YEAR_MONTH: numYearMonth,
    NUM_MONTH_DAY: numMonthDay,
    NUM_DAY_MONTH: numDayMonth,
    TXT_MONTH_YEAR: txtMonthYear,
    TXT_MONTH_DAY: txtMonthDay,
    TXT_DAY_MONTH: txtDayMonth,
    TXT_YEAR_MONTH: txtYearMonth,
    DAY: day,
};

const timePart = `(${TIME.FILLER_WORDS})?${TIME.ANY}`;
const datePart = `(${DATES.FILLER_WORDS})?(${DATES.ANY}|${PARTIAL_DATES.ANY})`;

const dateFirst = `${datePart}( )?${timePart}`;
const timeFirst = `${timePart}( )?${datePart}`;

const DATE_AND_TIME = {
    ANY: `${dateFirst}|${timeFirst}`,
    DATE_FIRST: dateFirst,
    TIME_FIRST: timeFirst,
};

export { DATES, PARTIAL_DATES, DATE_AND_TIME };
