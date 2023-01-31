import { wrapInBracket } from 'utils/wrapInBracket';

const MID_NIGHT = '(midnight|mid night|mid-night)';
const MID_DAY = '(noon|midday|mid day|mid-day)';
const ANY = wrapInBracket([MID_NIGHT, MID_DAY].join('|'));
const FILLER_WORDS = '(at|by|around)';

const TIME_KEYWORDS = {
    WITH_FILLER_WORDS: `(${FILLER_WORDS}( ))?${ANY}`,
    MID_NIGHT,
    MID_DAY,
};

export default TIME_KEYWORDS;
