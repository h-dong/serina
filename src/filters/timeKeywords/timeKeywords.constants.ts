const MID_NIGHT = '(midnight|mid night|mid-night)';
const MID_DAY = '(noon|midday|mid day|mid-day)';

const TIME_KEYWORDS = {
    ANY: `(${MID_NIGHT}|${MID_DAY})`,
    FILLER_WORDS: '(at|by|around)',
    MID_NIGHT,
    MID_DAY,
};

export default TIME_KEYWORDS;
