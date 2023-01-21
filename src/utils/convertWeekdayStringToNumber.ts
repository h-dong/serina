import WEEKDAY from 'filters/weekday/weekday.constants';
import contains from 'utils/contains';
import { dayLite } from 'lib/date/dayLite';

function convertWeekdayStringToNumber(weekdayString: string, pastWeekday: boolean): number {
    let weekday = null;
    const todayInWeekday = dayLite().weekday;

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
