import { wrapInBracket } from 'utils/wrapInBracket';

const MID_NIGHT = '(midnight|mid night|mid-night)';
const MID_DAY = '(noon|midday|mid day|mid-day)';

const TIME_KEYWORDS = {
    ANY: wrapInBracket([MID_NIGHT, MID_DAY].join('|')),
    FILLER_WORDS: '(at|by|around)',
    MID_NIGHT,
    MID_DAY,
};

export default TIME_KEYWORDS;
