import DAY from 'filters/day/day.constants';
import MONTH from 'filters/month/month.constants';
import YEAR from 'filters/year/year.constants';
import { wrapInBracket } from 'utils/wrapInBracket';

const FILLER_WORDS = '((on|by) (the )?)';
const NUM_DIVIDER = '(/|(-))';
const NUM_DAY_MONTH_YEAR = wrapInBracket(
    [
        wrapInBracket([DAY.NUMBERS, MONTH.NUMBERS, YEAR.ANY].join('-')), // 30-01-2023
        wrapInBracket([DAY.NUMBERS, MONTH.NUMBERS, YEAR.ANY].join('/')), // 30/01/2023
    ].join('|')
);
const NUM_MONTH_DAY_YEAR = wrapInBracket(
    [
        wrapInBracket([MONTH.NUMBERS, DAY.NUMBERS, YEAR.ANY].join('-')), // 01-30-2023
        wrapInBracket([MONTH.NUMBERS, DAY.NUMBERS, YEAR.ANY].join('/')), // 01/30/2023
    ].join('|')
);
const NUM_YEAR_MONTH_DAY = wrapInBracket(
    [
        wrapInBracket([YEAR.ANY, MONTH.NUMBERS, DAY.NUMBERS].join('-')), // 2023-01-30
        wrapInBracket([YEAR.ANY, MONTH.NUMBERS, DAY.NUMBERS].join('/')), // 2023/01/30
    ].join('|')
);
const TXT_DIVIDER = '((,)? )';
const TXT_DAY_MONTH_YEAR = wrapInBracket([DAY.ANY, MONTH.ANY, YEAR.ANY].join(TXT_DIVIDER));
const TXT_MONTH_DAY_YEAR = wrapInBracket([MONTH.ANY, DAY.ANY, YEAR.ANY].join(TXT_DIVIDER));
const ANY = [NUM_DAY_MONTH_YEAR, NUM_MONTH_DAY_YEAR, NUM_YEAR_MONTH_DAY, TXT_DAY_MONTH_YEAR, TXT_MONTH_DAY_YEAR].join(
    '|'
);

const DATES = {
    WITH_FILLER_WORDS: `(${FILLER_WORDS})?(${ANY})`,
    ANY,
    NUM_DAY_MONTH_YEAR,
    NUM_MONTH_DAY_YEAR,
    NUM_YEAR_MONTH_DAY,
    TXT_DAY_MONTH_YEAR,
    TXT_MONTH_DAY_YEAR,
    FILLER_WORDS,
    NUM_DIVIDER,
    TXT_DIVIDER,
};

export default DATES;
