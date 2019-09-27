const PM = 'pm|p.m.';
const AM = 'am|a.m.';
const MERIDIEM = `( )?(${AM}|${PM})`;
const FILLER_WORDS = '(at|by) ';
const HOUR_PART = '([0-1]?[0-9]|2[0-3])';
const MINUTE_PART = '(:[0-5][0-9])';

const HALF = 'half';
const QUARTER = 'quarter';

const VERBAL_QUANTIFIERS = {
    ANY: `(${HALF}|${QUARTER})`,
    HALF,
    QUARTER,
};

const TO = '(to)';
const PAST = '(after|past)';
const MINUTE_IDENTIFIER = '( (min|mins|minutes))';

const DIGITS_ONLY = `\\b${HOUR_PART}((${MINUTE_PART}${MERIDIEM})|${MINUTE_PART}|${MERIDIEM})`;

const VERBAL_EXPRESSION_MINUTES = `(${VERBAL_QUANTIFIERS.ANY}|[0-5][0-9])${MINUTE_IDENTIFIER}?`;
const VERBAL_EXPRESSION_HOURS = `\\b${HOUR_PART}(${MERIDIEM})?\\b`;
const VERBAL_EXPRESSION_DETERMINANT = ` ((${TO}|${PAST})( )?)`;

const VERBAL_EXPRESSION = {
    FULL_EXPRESSION: `${VERBAL_EXPRESSION_MINUTES}${VERBAL_EXPRESSION_DETERMINANT}${VERBAL_EXPRESSION_HOURS}`,
    MINUTES: `${VERBAL_EXPRESSION_MINUTES}`,
    HOURS: `${VERBAL_EXPRESSION_HOURS}`,
    DETERMINANT: `${VERBAL_EXPRESSION_DETERMINANT}`,
};

const TIME = {
    ANY: `[0-9]{1,2}(((:[0-5][0-9])(${MERIDIEM}))|(:[0-5][0-9])|(${MERIDIEM}))`,
    DIGITS_ONLY,
    VERBAL_QUANTIFIERS,
    VERBAL_EXPRESSION,
    TO,
    PAST,
    MINUTE_IDENTIFIER,
    FILLER_WORDS,
};

export {
    TIME as default,
    MERIDIEM,
    PM,
};
