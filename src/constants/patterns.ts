const relative = {
    RELATIVE_FUTURE_WORDS: 'for|next|this|current|on',
    RELATIVE_PAST_WORDS: 'last|prev(ious)?',
};

const weekdays = {
    WEEKDAYS: '(mon|tue(s)?|wed|wedn(es)?|thu|thur(s)?|fri|sat(ur)?|sun)(day)?',
    MONDAY: '(mon)(day)?',
    TUESDAY: '(tue(s)?)(day)?',
    WEDNESDAY: '(wed|wedn(es)?)(day)?',
    THURSDAY: '(thu(r)?(s)?)(day)?',
    FRIDAY: '(fri)(day)?',
    SATURDAY: '(sat(ur)?)(day)?',
    SUNDAY: '(sun)(day)?'
};

export {
    relative,
    weekdays,
}
