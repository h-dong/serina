import WEEKDAY from 'filters/weekday/weekday.constants';
import { contains, matchPattern } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';

export function weekdayStringToNumber(weekdayString: string, pastWeekday: boolean): number {
    let weekday = null;
    const todayInWeekday = dayLite().weekday;

    // Logic here assumes Monday is the first day of the week
    // TODO: Make this logic more robust
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

export function weekdayStringToDateObj(matchingText: string) {
    const [weekdayString] = matchPattern(matchingText, WEEKDAY.ANY);
    const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
    const weekday = weekdayStringToNumber(weekdayString, pastWeekday);

    return dayLite().set({ weekday }).startOf('day').toDate();
}
