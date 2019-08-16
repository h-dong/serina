const day = '((3[0-1])|([1-2][0-9])|(0?[1-9]))';
const ordinalIndicators = '(st|nd|rd|th)';

const DAY = {
    ANY: `${day}${ordinalIndicators}`,
    NUMBERS: day,
    FILLER_WORDS: 'on (the )?',
};

export default DAY;
