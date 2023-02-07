import DATES from 'filters/dates/dates.constants';
import DAY from 'filters/day/day.constants';
import MONTH from 'filters/month/month.constants';
import YEAR from 'filters/year/year.constants';
import { wrapInBracket } from 'utils/wrapInBracket';

const NUM_MONTH_YEAR = wrapInBracket([MONTH.NUMBERS, YEAR.ANY].join(DATES.NUM_DIVIDER));
const NUM_YEAR_MONTH = wrapInBracket([YEAR.ANY, MONTH.NUMBERS].join(DATES.NUM_DIVIDER));
const NUM_MONTH_DAY = wrapInBracket([MONTH.NUMBERS, DAY.NUMBERS].join(DATES.NUM_DIVIDER));
const NUM_DAY_MONTH = wrapInBracket([DAY.NUMBERS, MONTH.NUMBERS].join(DATES.NUM_DIVIDER));
const TXT_MONTH_DAY = wrapInBracket([MONTH.ANY, DAY.ANY].join(DATES.TXT_DIVIDER));
const TXT_DAY_MONTH = wrapInBracket([DAY.ANY, MONTH.ANY].join(DATES.TXT_DIVIDER));
const TXT_MONTH_YEAR = wrapInBracket([MONTH.ANY, YEAR.ANY].join(DATES.TXT_DIVIDER));
const TXT_YEAR_MONTH = wrapInBracket([YEAR.ANY, MONTH.ANY].join(DATES.TXT_DIVIDER));
const ANY = wrapInBracket(
    [
        NUM_MONTH_YEAR,
        NUM_YEAR_MONTH,
        NUM_MONTH_DAY,
        NUM_DAY_MONTH,
        TXT_MONTH_YEAR,
        TXT_MONTH_DAY,
        TXT_YEAR_MONTH,
        TXT_DAY_MONTH,
    ].join('|')
);

const PARTIAL_DATES = {
    WITH_FILTER_WORDS: `(${DATES.FILLER_WORDS})?(${ANY})`,
    ANY,
    NUM_MONTH_YEAR,
    NUM_YEAR_MONTH,
    NUM_MONTH_DAY,
    NUM_DAY_MONTH,
    TXT_MONTH_YEAR,
    TXT_MONTH_DAY,
    TXT_DAY_MONTH,
    TXT_YEAR_MONTH,
};

export default PARTIAL_DATES;
