import { wrapInBracket } from 'utils/wrapInBracket';

const AM = 'am|a.m.|am.';
const PM = 'pm|p.m.|pm.';
const MERIDIEM = `(${AM}|${PM})`;
const FILLER_WORDS = '(at|by)';
const HOUR_PART = '([0-9]{1,2})';
const DIVIDER = '(:)';
const MINUTE_PART = '([0-5][0-9])';
const TO = '(to|until)';
const PAST = '(after|past)';
const RELATIVE_TIME_FILLER_WORDS = wrapInBracket([TO, PAST].join('|'));
const HALF = 'half';
const QUARTER = 'quarter';
const VERBAL_QUANTIFIERS = wrapInBracket([HALF, QUARTER].join('|'));
const MINUTE_IDENTIFIER = '(min|mins|minute|minutes)';

const FORMAT_JUST_HOUR = `${HOUR_PART}( )?${MERIDIEM}`; // 4am or 4 am
const FORMAT_HOUR_WITH_MINS = [HOUR_PART, MINUTE_PART].join(DIVIDER); // 04:30
const FORMAT_HOUR_WITH_MINS_AND_MERIDIEM = `${FORMAT_HOUR_WITH_MINS}( )?${MERIDIEM}`; // 04:30am or 04:30 am
const FORMAT_VERBAL_QUANTIFIERS = `${VERBAL_QUANTIFIERS}( )${RELATIVE_TIME_FILLER_WORDS}( )(${FORMAT_JUST_HOUR}|${HOUR_PART})`; // half past 3pm
const FORMAT_DIGIT_RELATIVE = `${MINUTE_PART}( )(${MINUTE_IDENTIFIER}( ))?${RELATIVE_TIME_FILLER_WORDS}( )(${FORMAT_JUST_HOUR}|${HOUR_PART})`; // 20 mins to 11
const FORMAT_NORMAL = wrapInBracket(
    [FORMAT_JUST_HOUR, FORMAT_HOUR_WITH_MINS_AND_MERIDIEM, FORMAT_HOUR_WITH_MINS].join('|')
);
const FORMAT_RELATIVE = wrapInBracket([FORMAT_VERBAL_QUANTIFIERS, FORMAT_DIGIT_RELATIVE].join('|'));
const ANY = wrapInBracket([FORMAT_NORMAL, FORMAT_RELATIVE].join('|'));

const TIME = {
    WITH_FILLER_WORDS: `(${FILLER_WORDS}( ))?${ANY}`,
    ANY,
    FORMAT_NORMAL,
    FORMAT_RELATIVE,
    RELATIVE_TIME_FILLER_WORDS,
    HOUR_PART,
    MINUTE_PART,
    DIVIDER,
    MERIDIEM,
    AM,
    PM,
    TO,
    PAST,
    HALF,
    QUARTER,
    VERBAL_QUANTIFIERS,
    MINUTE_IDENTIFIER,
    FILLER_WORDS,
};

export default TIME;
