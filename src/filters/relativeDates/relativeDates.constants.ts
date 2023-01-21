import { wrapInBracket } from 'utils/wrapInBracket';

const TODAY = 'today';
const TOMORROW = 'tomorrow';

const RELATIVE_ADVERB = {
    ANY: [TODAY, TOMORROW].join('|'),
    TODAY,
    TOMORROW,
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

const RELATIVE_DATES = {
    ANY: wrapInBracket([RELATIVE_ADVERB.ANY, RELATIVE_EXPRESSION.ANY].join('|')),
    RELATIVE_ADVERB: RELATIVE_ADVERB.ANY,
    RELATIVE_EXPRESSION,
    FILLER_WORDS: [RELATIVE_PREPOSITIONS, RELATIVE_POSTPOSITIONS].join('|'),
    TIME_UNITS,
    VERBAL_QUANTIFIERS,
};

export { RELATIVE_DATES as default, RELATIVE_ADVERB };
