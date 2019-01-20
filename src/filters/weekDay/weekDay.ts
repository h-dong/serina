import { DateTime } from 'luxon';
import { RELATIVE, WEEKDAY } from '../../constants/patterns';
import { matchPattern, trimWhiteSpaces, contains } from 'utils/Helper';
import { ParsedMatchSchema } from '../../serina.schema';

export default class WeekDay {

    /*
    * When parsing day of the week, check for relative words & week day e.g. next friday
    */
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `((${RELATIVE.FUTURE_WORDS}|${RELATIVE.PAST_WORDS}) )?${WEEKDAY.ALL}`;
        const matchForWeekdays = matchPattern(text, pattern);

        if (!matchForWeekdays) return null;

        // for each match, get the parsed cases
        return matchForWeekdays.map(elem => this.parseWeekdayMatches(text, elem));
    }

    static matchWeekdays(text: string): string[] {
        const matched = matchPattern(text, WEEKDAY.ALL);
        return matched ? matched : null;
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
        let weekday = null;

        if (contains(matchingText, WEEKDAY.MONDAY)) weekday = 8;
        if (contains(matchingText, WEEKDAY.TUESDAY)) weekday = 9;
        if (contains(matchingText, WEEKDAY.WEDNESDAY)) weekday = 10;
        if (contains(matchingText, WEEKDAY.THURSDAY)) weekday = 11;
        if (contains(matchingText, WEEKDAY.FRIDAY)) weekday = 12;
        if (contains(matchingText, WEEKDAY.SATURDAY)) weekday = 13;
        if (contains(matchingText, WEEKDAY.SUNDAY)) weekday = 14;

        if (!weekday) return null;

        if (contains(matchingText, `${RELATIVE.PAST_WORDS} ${WEEKDAY.ALL}`)) weekday -= 7;

        return DateTime.local()
            .set({ weekday })
            .startOf('minutes')
            .toJSDate();
    }
}
