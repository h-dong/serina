import { wrapInBracket } from 'utils/wrapInBracket';

const MONDAY = '(mon)(day)?';
const TUESDAY = '(tue(s)?)(day)?';
const WEDNESDAY = '(wed|wedn(es)?)(day)?';
const THURSDAY = '(thu(r)?(s)?)(day)?';
const FRIDAY = '(fri)(day)?';
const SATURDAY = '(sat(ur)?)(day)?';
const SUNDAY = '(sun)(day)?';

const ANY = wrapInBracket([MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY].join('|'));
const FUTURE_WORDS = 'for|next|this|current|on';
const PAST_WORDS = 'last|prev(ious)?';

const WEEKDAY = {
    WITH_FUTURE_PAST_WORDS: `((\\b(${FUTURE_WORDS}|${PAST_WORDS})\\b)( ))?${ANY}`,
    ANY,
    SINGLE: {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY,
    },
    PAST_WORDS,
};

export default WEEKDAY;
