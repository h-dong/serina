import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from 'filters/weekday/weekday.constants';
import { matchPattern } from 'lib/string/stringUtil';
import convertTimeStringToObj from 'utils/convertTimeStringToObj';
import { contains } from 'lib/string/stringUtil';
import WEEKDAY_AND_TIME from './weekdayAndTime.constants';
import TIME from 'filters/time/time.constants';
import { parseMatches } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';
import { weekdayStringToNumber } from 'filters/weekday/weekday.helpers';

function getValidMatch(text: string, pattern: string): string {
    const matched = matchPattern(text, pattern);
    if (!matched || matched.length === 0) return null;
    const [value] = matched;
    return value;
}

export default class WeekDayAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = WEEKDAY_AND_TIME.ANY;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertWeekdayAndTimeToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertWeekdayAndTimeToDateObj(matchingText) {
        const timeString = getValidMatch(matchingText, TIME.ANY);
        const { hour, minute } = convertTimeStringToObj(timeString);
        const [weekdayString] = matchPattern(matchingText, WEEKDAY.ANY);
        const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
        const weekday = weekdayStringToNumber(weekdayString, pastWeekday);

        return dayLite().set({ weekday, hour, minute }).startOf('minute').toDate();
    }
}
