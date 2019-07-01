const RELATIVE = {
    FUTURE_WORDS: 'for|next|this|current|on|in',
    PAST_WORDS: 'last|prev(ious)?',
};

const FILLER_WORD = {
    DAY: 'on (the )?',
    YEAR: 'in ',
};

const DAY = {
    ALL: '((0?)[1-9]|[1-2][0-9]|3[0-1])(st|nd|rd|th)',
    SINGLE: '(3[0-1]|[1-2][0-9]|[1-9])(st|nd|rd|th)',
};

const WEEKDAY = {
    ALL: '(mon|tue(s)?|wed|wedn(es)?|thu|thur(s)?|fri|sat(ur)?|sun)(day)?',
    MONDAY: '(mon)(day)?',
    TUESDAY: '(tue(s)?)(day)?',
    WEDNESDAY: '(wed|wedn(es)?)(day)?',
    THURSDAY: '(thu(r)?(s)?)(day)?',
    FRIDAY: '(fri)(day)?',
    SATURDAY: '(sat(ur)?)(day)?',
    SUNDAY: '(sun)(day)?',
};

const MONTH = {
    ALL: '(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)',
    JANUARY: 'jan(?:uary)?',
    FEBRUARY: 'feb(?:ruary)?',
    MARCH: 'mar(?:ch)?',
    APRIL: 'apr(?:il)?',
    MAY: 'may',
    JUNE: 'jun(?:e)?',
    JULY: 'jul(?:y)?',
    AUGUST: 'aug(?:ust)?',
    SEPTEMBER: 'sep(?:tember)?',
    OCTOBER: 'oct(?:ober)?',
    NOVEMBER: 'nov(?:ember)?',
    DECEMBER: 'dec(?:ember)?',
}
const YEAR = {
    ALL: '(\\b\\d{4}\\b)',
};

export {
    RELATIVE,
    FILLER_WORD,
    DAY,
    WEEKDAY,
    MONTH,
    YEAR,
};
