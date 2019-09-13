const PM = `pm|p.m.`;
const AM = `am|a.m.`;
const MERIDIEM = `( )?(${AM}|${PM})`;
const FILLER_WORDS = '(at|by) ';

const TIME = {
    ANY: `(${FILLER_WORDS})?[0-9]{1,2}(((:[0-5][0-9])(${MERIDIEM}?))|(:[0-5][0-9])|(${MERIDIEM}?))`,
    FILLER_WORDS,
};

export {
    TIME as default,
    MERIDIEM,
    PM,
};
