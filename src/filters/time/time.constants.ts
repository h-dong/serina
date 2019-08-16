const MERIDIEM = '(\\.)?m(\\.)?';
const ANTE_MERIDIEM = `(a${MERIDIEM})`;
const POST_MERIDIEM = `(p${MERIDIEM})`;
const ANY_MERIDIEM = `((a|p)${MERIDIEM})`;

const TIME = {
    ANY: `[0-9]{1,2}(((:[0-5][0-9])(( )?${ANY_MERIDIEM}))|(:[0-5][0-9])|(( )?${ANY_MERIDIEM}))`,
    FILLER_WORDS: '(at|by) ',
};

export {
    TIME as default,
    ANTE_MERIDIEM,
    POST_MERIDIEM,
    ANY_MERIDIEM,
};
