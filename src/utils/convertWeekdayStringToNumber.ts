import { DateTime } from 'luxon';
import WEEKDAY from 'filters/weekDay/weekDay.constants';
import contains from 'utils/contains';

function convertWeekdayStringToNumber(weekdayString: string, pastWeekday: boolean): number {
    let weekday = null;
    const todayInWeekday = DateTime.utc().weekday;

    Object.keys(WEEKDAY.SINGLE).forEach((key, index) => {
        const weekdayPattern = WEEKDAY.SINGLE[key];
        if (contains(weekdayString, weekdayPattern)) {
            weekday = index + 1;
        }
    });
    if (!weekday) return null;
    if (weekday <= todayInWeekday) weekday += 7;
    if (pastWeekday) weekday -= 7;

    return weekday;
}

export default convertWeekdayStringToNumber;
