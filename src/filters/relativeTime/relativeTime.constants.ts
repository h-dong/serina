import { wrapInBracket } from 'utils/wrapInBracket';

const RELATIVE_PREPOSITIONS = '(in|after) ';
const RELATIVE_POSTPOSTIONS = ' (from now|later|after)';
const HOURS = '(hours|hour|hrs|hr)';
const MINUTES = '(minutes|minute|mins|min)';
const SECONDS = '(seconds|second|secs|sec)';
const TIME_UNITS = {
    ANY: wrapInBracket([HOURS, MINUTES, SECONDS].join('|')),
    HOURS,
    MINUTES,
    SECONDS,
};

const HALF = '(half (an|a))';
const QUARTER = '(a quarter of (a|an))';
const ONE = '(a|an|one)';

const VERBAL_QUANTIFIERS = {
    ANY: wrapInBracket([HALF, QUARTER, ONE].join('|')),
    HALF,
    QUARTER,
    ONE,
};

const ARGUMENT = `([0-9]+|${VERBAL_QUANTIFIERS.ANY}) ${TIME_UNITS.ANY}`;
const ARGUMENT_AFTER = `${RELATIVE_PREPOSITIONS}${ARGUMENT}`;
const ARGUMENT_FIRST = `${ARGUMENT}${RELATIVE_POSTPOSTIONS}`;

const RELATIVE_TIME = {
    ANY: wrapInBracket([ARGUMENT_FIRST, ARGUMENT_AFTER].join('|')),
    ARGUMENT_AFTER,
    ARGUMENT_FIRST,
    FILLER_WORDS: [RELATIVE_PREPOSITIONS, RELATIVE_POSTPOSTIONS].join('|'),
    TIME_UNITS,
    VERBAL_QUANTIFIERS,
};

export default RELATIVE_TIME;
