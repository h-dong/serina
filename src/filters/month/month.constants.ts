const MONTH = {
    ANY: '(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?)',
    SINGLE: {
        JANUARY: 'jan(uary)?',
        FEBRUARY: 'feb(ruary)?',
        MARCH: 'mar(ch)?',
        APRIL: 'apr(il)?',
        MAY: 'may',
        JUNE: 'jun(e)?',
        JULY: 'jul(y)?',
        AUGUST: 'aug(ust)?',
        SEPTEMBER: 'sep(tember)?',
        OCTOBER: 'oct(ober)?',
        NOVEMBER: 'nov(ember)?',
        DECEMBER: 'dec(ember)?',
    },
    NUMBERS: '(1[0-2]|0?[1-9])',
    FUTURE_WORDS: 'for|next|this|current|in',
    PAST_WORDS: 'last|prev(ious)?',
};

export default MONTH;
