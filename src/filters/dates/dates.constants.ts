import DAY from 'filters/day/day.constants';
import MONTH from 'filters/month/month.constants';
import YEAR from 'filters/year/year.constants';
import TIME from 'filters/time/time.constants';
import RELATIVE_DATES from 'filters/relativeDates/relativeDates.constants';
import { wrapInBracket } from 'utils/wrapInBracket';

const NUM_DIVIDER = '(/|(-))';
const NUM_DAY_MONTH_YEAR = wrapInBracket([DAY.NUMBERS, MONTH.NUMBERS, YEAR.ANY].join(NUM_DIVIDER));
const NUM_MONTH_DAY_YEAR = wrapInBracket([MONTH.NUMBERS, DAY.NUMBERS, YEAR.ANY].join(NUM_DIVIDER));
const NUM_YEAR_MONTH_DAY = wrapInBracket([YEAR.ANY, MONTH.NUMBERS, DAY.NUMBERS].join(NUM_DIVIDER));
const TXT_DIVIDER = '((,)? )';
const TXT_DAY_MONTH_YEAR = wrapInBracket([DAY.ANY, MONTH.ANY, YEAR.ANY].join(TXT_DIVIDER));
const TXT_MONTH_DAY_YEAR = wrapInBracket([MONTH.ANY, DAY.ANY, YEAR.ANY].join(TXT_DIVIDER));

const DATES = {
    ANY: [NUM_DAY_MONTH_YEAR, NUM_MONTH_DAY_YEAR, NUM_YEAR_MONTH_DAY, TXT_DAY_MONTH_YEAR, TXT_MONTH_DAY_YEAR].join('|'),
    NUM_DAY_MONTH_YEAR,
    NUM_MONTH_DAY_YEAR,
    NUM_YEAR_MONTH_DAY,
    TXT_DAY_MONTH_YEAR,
    TXT_MONTH_DAY_YEAR,
    FILLER_WORDS: '(on|by) (the )?',
    NUM_DIVIDER,
    TXT_DIVIDER,
};

const NUM_MONTH_YEAR = wrapInBracket([MONTH.NUMBERS, YEAR.ANY].join(NUM_DIVIDER));
const NUM_YEAR_MONTH = wrapInBracket([YEAR.ANY, MONTH.NUMBERS].join(NUM_DIVIDER));
const NUM_MONTH_DAY = wrapInBracket([MONTH.NUMBERS, DAY.NUMBERS].join(NUM_DIVIDER));
const NUM_DAY_MONTH = wrapInBracket([DAY.NUMBERS, MONTH.NUMBERS].join(NUM_DIVIDER));
const TXT_MONTH_DAY = wrapInBracket([MONTH.ANY, DAY.ANY].join(TXT_DIVIDER));
const TXT_DAY_MONTH = wrapInBracket([DAY.ANY, MONTH.ANY].join(TXT_DIVIDER));
const TXT_MONTH_YEAR = wrapInBracket([MONTH.ANY, YEAR.ANY].join(TXT_DIVIDER));
const TXT_YEAR_MONTH = wrapInBracket([YEAR.ANY, MONTH.ANY].join(TXT_DIVIDER));

const PARTIAL_DATES = {
    ANY: wrapInBracket(
        [
            NUM_MONTH_YEAR,
            NUM_YEAR_MONTH,
            NUM_MONTH_DAY,
            NUM_DAY_MONTH,
            TXT_MONTH_YEAR,
            TXT_MONTH_DAY,
            TXT_YEAR_MONTH,
            TXT_DAY_MONTH,
            DAY.DAY_WITH_ORDINAL,
        ].join('|')
    ),
    NUM_MONTH_YEAR,
    NUM_YEAR_MONTH,
    NUM_MONTH_DAY,
    NUM_DAY_MONTH,
    TXT_MONTH_YEAR,
    TXT_MONTH_DAY,
    TXT_DAY_MONTH,
    TXT_YEAR_MONTH,
    DAY: DAY.DAY_WITH_ORDINAL,
};

const DATE_PART = `(${DATES.FILLER_WORDS})?(${[DATES.ANY, PARTIAL_DATES.ANY, RELATIVE_DATES.ANY].join('|')})`;
const TIME_PART = `(${TIME.FILLER_WORDS}( ))?${TIME.ANY}`;

const DATE_FIRST = [DATE_PART, TIME_PART].join(' ');
const TIME_FIRST = [TIME_PART, DATE_PART].join(' ');

const DATE_AND_TIME = {
    ANY: [DATE_FIRST, TIME_FIRST].join('|'),
    DATE_FIRST: DATE_FIRST,
    TIME_FIRST: TIME_FIRST,
};

export { DATES, PARTIAL_DATES, DATE_AND_TIME };
