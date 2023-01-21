import WEEKDAY from 'filters/weekday/weekday.constants';
import TIME from 'filters/time/time.constants';

const anyWeekday = `((\\b(${WEEKDAY.FUTURE_WORDS}|${WEEKDAY.PAST_WORDS})\\b)( ))?${WEEKDAY.ANY}`;
const anyTime = `(${TIME.FILLER_WORDS}( ))?${TIME.FORMAT_NORMAL}`;
const timeFirst = `${anyTime}( )${anyWeekday}`;
const weekdayFirst = `${anyWeekday}( )${anyTime}`;

const WEEKDAY_AND_TIME = {
    ANY: `${timeFirst}|${weekdayFirst}`,
};

export default WEEKDAY_AND_TIME;
