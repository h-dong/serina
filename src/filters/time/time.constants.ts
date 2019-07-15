const MERIDIEM = '(\\.)?m(\\.)?';
const ANTE_MERIDIEM = `(a${MERIDIEM})`;
const POST_MERIDIEM = `(p${MERIDIEM})`;
const ALL_MERIDIEM = `((a|p)${MERIDIEM})`;

const TIME = {
    ALL: `[0-9]{1,2}(((:[0-5][0-9])(( )?${ALL_MERIDIEM}))|(:[0-5][0-9])|(( )?${ALL_MERIDIEM}))`,
    FILLER_WORDS: '(at|by) ',
};

export {
    TIME as default,
    ANTE_MERIDIEM,
    POST_MERIDIEM,
    ALL_MERIDIEM,
};
