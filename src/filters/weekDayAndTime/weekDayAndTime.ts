import { DateTime } from 'luxon';
import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from '../weekDay/weekDay.constants';
import { matchPattern, trimWhiteSpaces, convertTimeStringToObj, contains } from 'utils';
import WEEKDAY_AND_TIME from './weekDayAndTime.constants';
import TIME from 'filters/time/time.constants';
import convertWeekdayStringToNumber from 'utils/convertWeekdayStringToNumber';

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
            dateTime: this.convertWeekdayMatchAndTimeToDate(matchedWeekday),
            matched: trimWhiteSpaces(matchedWeekday),
        };
    }

    static convertWeekdayMatchAndTimeToDate(matchingText) {
        const [ timeString ] = matchPattern(matchingText, TIME.ANY);
        const { hour, minute } = convertTimeStringToObj(timeString);
        const [ weekdayString ] = matchPattern(matchingText, WEEKDAY.ANY);
        const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
        const weekday = convertWeekdayStringToNumber(weekdayString, pastWeekday);

        const newDateTime = DateTime.utc().set({ weekday, hour, minute});

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
