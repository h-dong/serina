import { DateTime } from 'luxon';
import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from '../weekDay/weekDay.constants';
import { matchPattern, trimWhiteSpaces, convertTimeStringToObj, contains } from 'utils';
import WEEKDAY_AND_TIME from './weekDayAndTime.constants';
import TIME from 'filters/time/time.constants';
import convertWeekdayStringToNumber from 'utils/convertWeekdayStringToNumber';

function getValidMatch(text: string, pattern: string): string {
    const matched = matchPattern(text, pattern);
    if (!matched || matched.length === 0) return null;
    const [ value ] = matched;
    return value;
}

export default class WeekDayAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = WEEKDAY_AND_TIME.ANY;
        const matchForWeekdayAndTime = matchPattern(text, pattern);

        if (!matchForWeekdayAndTime) return null;

        // for each match, get the parsed cases
        return matchForWeekdayAndTime.map(elem => this.parseWeekdayAndTimeMatches(text, elem));
    }

    static parseWeekdayAndTimeMatches(text: string, matchedWeekday: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedWeekday, '');

        return {
            text: trimWhiteSpaces(replaceMatch),
            dateTime: this.convertWeekdayAndTimeToDateObj(matchedWeekday),
            matched: trimWhiteSpaces(matchedWeekday),
        };
    }

    static convertWeekdayAndTimeToDateObj(matchingText) {
        const timeString = getValidMatch(matchingText, TIME.ANY);
        const { hour, minute } = convertTimeStringToObj(timeString);
        const [ weekdayString ] = matchPattern(matchingText, WEEKDAY.ANY);
        const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
        const weekday = convertWeekdayStringToNumber(weekdayString, pastWeekday);

        const newDateTime = DateTime.utc().set({ weekday, hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
