const TIME = {
    ALL: '((([1-9]|(0|1)[0-2])(:[0-5][0-9])?(a|p)m)\\b|\\b((((0|1)?[0-9])|(2[0-3]))(:[0-5][0-9])))',
    SINGLE: {
        FORMAT_12H_AM_WHOLE_HOUR: '\\b([1-9]|(0|1)[0-2])am\\b',
        FORMAT_12H_AM_WITH_MIN: '\\b([1-9]|(0|1)[0-2])(:[0-5][0-9])am\\b',
        FORMAT_12H_PM_WHOLE_HOUR: '\\b([1-9]|(0|1)[0-2])pm\\b',
        FORMAT_12H_PM_WITH_MIN: '\\b([1-9]|(0|1)[0-2])(:[0-5][0-9])pm\\b',
        FORMAT_24H_WITH_MIN: '\\b(((0|1)?[0-9])|(2[0-3]))(:[0-5][0-9])\\b',
    },
    FILLER_WORDS: '(at|by) ',
};

export default TIME;
