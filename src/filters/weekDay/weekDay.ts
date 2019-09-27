import { DateTime } from 'luxon';
import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from './weekDay.constants';
import { contains, matchPattern, trimWhiteSpaces } from 'utils';
import convertWeekdayStringToNumber from 'utils/convertWeekdayStringToNumber';

export default class WeekDay {

    /*
    * When parsing day of the week, check for relative words & week day e.g. next friday
    */
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `((${WEEKDAY.FUTURE_WORDS}|${WEEKDAY.PAST_WORDS}) )?${WEEKDAY.ANY}`;
        const matchForWeekdays = matchPattern(text, pattern);

        if (!matchForWeekdays) return null;

        // for each match, get the parsed cases
        return matchForWeekdays.map(elem => this.parseWeekdayMatches(text, elem));
    }

    static parseWeekdayMatches(text: string, matchedWeekday: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedWeekday, '');

        return {
            text: trimWhiteSpaces(replaceMatch),
            dateTime: this.convertWeekdayMatchToDate(matchedWeekday),
            matched: trimWhiteSpaces(matchedWeekday),
        };
    }

    static convertWeekdayMatchToDate(matchingText) {
        const [ weekdayString ] = matchPattern(matchingText, WEEKDAY.ANY);
        const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
        const weekday = convertWeekdayStringToNumber(weekdayString, pastWeekday);

        const newDateTime = DateTime.utc().set({ weekday });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('day').toJSDate();
    }
}
