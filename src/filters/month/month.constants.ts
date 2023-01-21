import { wrapInBracket } from 'utils/wrapInBracket';

const JANUARY = 'jan(uary)?';
const FEBRUARY = 'feb(ruary)?';
const MARCH = 'mar(ch)?';
const APRIL = 'apr(il)?';
const MAY = 'may';
const JUNE = 'jun(e)?';
const JULY = 'jul(y)?';
const AUGUST = 'aug(ust)?';
const SEPTEMBER = 'sep(tember)?';
const OCTOBER = 'oct(ober)?';
const NOVEMBER = 'nov(ember)?';
const DECEMBER = 'dec(ember)?';

const MONTH = {
    ANY: wrapInBracket(
        [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER].join('|')
    ),
    SINGLE: {
        JANUARY,
        FEBRUARY,
        MARCH,
        APRIL,
        MAY,
        JUNE,
        JULY,
        AUGUST,
        SEPTEMBER,
        OCTOBER,
        NOVEMBER,
        DECEMBER,
    },
    NUMBERS: '(1[0-2]|0?[1-9])',
    FUTURE_WORDS: 'for|next|this|current|in',
    PAST_WORDS: 'last|prev(ious)?',
};

export default MONTH;
