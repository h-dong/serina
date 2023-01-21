import { wrapInBracket } from 'utils/wrapInBracket';

const MONDAY = '(mon)(day)?';
const TUESDAY = '(tue(s)?)(day)?';
const WEDNESDAY = '(wed|wedn(es)?)(day)?';
const THURSDAY = '(thu(r)?(s)?)(day)?';
const FRIDAY = '(fri)(day)?';
const SATURDAY = '(sat(ur)?)(day)?';
const SUNDAY = '(sun)(day)?';

const WEEKDAY = {
    ANY: wrapInBracket([MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY].join('|')),
    SINGLE: {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY,
    },
    FUTURE_WORDS: 'for|next|this|current|on',
    PAST_WORDS: 'last|prev(ious)?',
};

export default WEEKDAY;
