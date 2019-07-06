const WEEKDAY = {
    ALL: '(mon|tue(s)?|wed|wedn(es)?|thu|thur(s)?|fri|sat(ur)?|sun)(day)?',
    SINGLE: {
        MONDAY: '(mon)(day)?',
        TUESDAY: '(tue(s)?)(day)?',
        WEDNESDAY: '(wed|wedn(es)?)(day)?',
        THURSDAY: '(thu(r)?(s)?)(day)?',
        FRIDAY: '(fri)(day)?',
        SATURDAY: '(sat(ur)?)(day)?',
        SUNDAY: '(sun)(day)?',
    },
    FUTURE_WORDS: 'for|next|this|current|on',
    PAST_WORDS: 'last|prev(ious)?',
};

export default WEEKDAY;
