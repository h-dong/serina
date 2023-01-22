const ANY = '(\\b[0-9]{4}\\b)';
const FILLER_WORDS = '(in( )((the( ))?year( ))?)';

const YEAR = {
    ANY,
    FILLER_WORDS,
    YEAR_WITH_FILLER_WORDS: `${FILLER_WORDS}?${ANY}`,
};

export default YEAR;
