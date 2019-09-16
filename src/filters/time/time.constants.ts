const PM = `pm|p.m.`;
const AM = `am|a.m.`;
const MERIDIEM = `( )?(${AM}|${PM})`;
const FILLER_WORDS = '(at|by) ';

const TIME = {
    ANY: `(${FILLER_WORDS})?[0-9]{1,2}(((:[0-5][0-9])(${MERIDIEM}))|(:[0-5][0-9])|(${MERIDIEM}))`,
    FILLER_WORDS,
};

const RELATIVE_PREPOSITIONS = '(in|after) ';
const RELATIVE_POSTPOSTIONS = ' (from now|later|after)';
const HOURS = '(hours|hour|hrs|hr)';
const MINUTES = '(minutes|minute|mins|min)';
const SECONDS = '(seconds|second|secs|sec)';
const TIME_UNITS = {
    ANY: `(${HOURS}|${MINUTES}|${SECONDS})`,
    HOURS: `${HOURS}`,
    MINUTES: `${MINUTES}`,
    SECONDS: `${SECONDS}`,
};

const HALF = '(half an|half a)';
const QUARTER = '(a quarter of a|a quarter of an)';
const ONE = '(a|an|one)';

const VERBAL_QUANTIFIERS = {
    ANY: `(${HALF}|${QUARTER}|${ONE})`,
    HALF: `${HALF}`,
    QUARTER: `${QUARTER}`,
    ONE: `${ONE}`,
};

const ARGUMENT = `([0-9]+|${VERBAL_QUANTIFIERS.ANY}) ${TIME_UNITS.ANY}`;
const ARGUMENT_AFTER = `${RELATIVE_PREPOSITIONS}${ARGUMENT}`;
const ARGUMENT_FIRST = `${ARGUMENT}${RELATIVE_POSTPOSTIONS}`;

const RELATIVE_TIME = {
    ANY: `(${ARGUMENT_FIRST}|${ARGUMENT_AFTER})`,
    ARGUMENT_AFTER: `${ARGUMENT_AFTER}`,
    ARGUMENT_FIRST: `${ARGUMENT_FIRST}`,
    FILLER_WORDS: `${RELATIVE_PREPOSITIONS}|${RELATIVE_POSTPOSTIONS}`,
    TIME_UNITS,
    VERBAL_QUANTIFIERS,
};

export {
    TIME,
    MERIDIEM,
    PM,
    RELATIVE_TIME,
    VERBAL_QUANTIFIERS,
};
