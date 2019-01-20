const RELATIVE = {
    FUTURE_WORDS: 'for|next|this|current|on',
    PAST_WORDS: 'last|prev(ious)?',
};

const FILLER_WORD = {
    DAY: 'on (the )?',
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

export {
    RELATIVE,
    FILLER_WORD,
    DAY,
    WEEKDAY,
};
