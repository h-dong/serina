const MERIDIEM = '((.)?m.|m)';
const ANTE_MERIDIEM = `(a${MERIDIEM})`;
const POST_MERIDIEM = `(p${MERIDIEM})`;
const HOUR_12_FORMAT = '((0)?[0-9]|1[0-2])';
const HOUR_24_FORMAT = `(${HOUR_12_FORMAT}|2[0-4])`;
const MINUTE = '([0-5][0-9])';
const SINGLE = {
    FORMAT_12H_AM_WHOLE_HOUR: `(${HOUR_12_FORMAT}( )?${ANTE_MERIDIEM})`,
    FORMAT_12H_AM_WITH_MIN: `(${HOUR_12_FORMAT}:${MINUTE}( )?${ANTE_MERIDIEM})`,
    FORMAT_12H_PM_WHOLE_HOUR: `(${HOUR_12_FORMAT}( )?${POST_MERIDIEM})`,
    FORMAT_12H_PM_WITH_MIN: `(${HOUR_12_FORMAT}:${MINUTE}( )?${POST_MERIDIEM})`,
    FORMAT_24H_WITH_MIN: `(${HOUR_24_FORMAT}:${MINUTE})`,
};

const TIME = {
    get ALL() {
        return Object.keys(SINGLE).map(key => SINGLE[key]).join('|');
    },
    SINGLE,
    FILLER_WORDS: '(at|by) ',
};

export {
    TIME as default,
    ANTE_MERIDIEM,
    POST_MERIDIEM,
};
