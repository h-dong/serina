import DATES from 'filters/dates/dates.constants';
import { wrapInBracket } from 'utils/wrapInBracket';

const TODAY = 'today';
const TOMORROW = 'tomorrow';
const YESTERDAY = 'yesterday';

const RELATIVE_ADVERB = {
    ANY: wrapInBracket([TODAY, TOMORROW, YESTERDAY].join('|')),
    TODAY,
    TOMORROW,
    YESTERDAY,
};

const RELATIVE_PREPOSITIONS = '((in|after) )?';
const RELATIVE_POSTPOSITIONS = '( (from now|from today|later|after))';

const DAYS = '(days|day)';
const WEEKS = '(weeks|week|wks|wk)';
const MONTHS = '(months|month)';
const YEARS = '(years|year|yrs|yr)';

const TIME_UNITS = {
    DAYS,
    WEEKS,
    MONTHS,
    YEARS,
    ANY: wrapInBracket([DAYS, WEEKS, MONTHS, YEARS].join('|')),
};

const NEXT = '(next|following)';
const ONE = 'a';

const VERBAL_QUANTIFIERS = {
    ANY: [NEXT, ONE].join('|'),
    NEXT,
    ONE,
};

const ARGUMENT = `([0-9]+|${VERBAL_QUANTIFIERS.ANY})( )${TIME_UNITS.ANY}`;
const ARGUMENT_AFTER = `${RELATIVE_PREPOSITIONS}?${ARGUMENT}`;
const ARGUMENT_FIRST = `${ARGUMENT}${RELATIVE_POSTPOSITIONS}`;

const RELATIVE_EXPRESSION = {
    ANY: [ARGUMENT_FIRST, ARGUMENT_AFTER].join('|'),
    ARGUMENT_AFTER,
    ARGUMENT_FIRST,
};
const ANY = wrapInBracket([RELATIVE_ADVERB.ANY, RELATIVE_EXPRESSION.ANY].join('|'));
const FILLER_WORDS = [RELATIVE_PREPOSITIONS, RELATIVE_POSTPOSITIONS].join('|');

const RELATIVE_DATES = {
    WITH_FILLER_WORDS: `(${DATES.FILLER_WORDS})?${ANY}`,
    ANY,
    RELATIVE_ADVERB,
    RELATIVE_EXPRESSION,
    FILLER_WORDS,
    TIME_UNITS,
    VERBAL_QUANTIFIERS,
};

export default RELATIVE_DATES;
