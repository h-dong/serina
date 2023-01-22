const NUM_DAY = '((3[0-1])|([1-2][0-9])|(0?[1-9]))';
const ORDINAL_INDICATORS = '(st|nd|rd|th)';
const FILLER_WORDS = 'on (the )?';
const WITH_ORDINAL = `${NUM_DAY}${ORDINAL_INDICATORS}`;

const DAY = {
    ANY: `${NUM_DAY}${ORDINAL_INDICATORS}?`,
    WITH_ORDINAL: WITH_ORDINAL,
    NUMBERS: NUM_DAY,
    FILLER_WORDS,
    WITH_FILLER_WORDS_AND_ORDINAL: `(${FILLER_WORDS})?${WITH_ORDINAL}`,
};

export default DAY;
