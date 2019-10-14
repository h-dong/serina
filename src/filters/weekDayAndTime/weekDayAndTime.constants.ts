import WEEKDAY from 'filters/weekDay/weekDay.constants';
import TIME from 'filters/time/time.constants';

const anyWeekday = `((${WEEKDAY.FUTURE_WORDS}|${WEEKDAY.PAST_WORDS})( ))?${WEEKDAY.ANY}`;
const anyTime = `(${TIME.FILLER_WORDS}( ))?${TIME.FORMAT_NORMAL}`;
const timeFirst = `${anyTime}( )${anyWeekday}`;
const weekdayFirst = `${anyWeekday}( )${anyTime}`;

const WEEKDAY_AND_TIME = {
    ANY: `${timeFirst}|${weekdayFirst}`,
};

export default WEEKDAY_AND_TIME;
