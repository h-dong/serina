import { DateTime } from 'luxon';
import { relative, weekdays } from '../../constants/patterns';
import { matchPattern, trimWhiteSpaces, contains } from 'utils/Helper';
import { ParsedMatchSchema } from '../../serina.schema';


export default class DayOfTheWeek {

    /*
    * When parsing day of the week, check for relative words & week day e.g. next friday
    */
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `((${relative.RELATIVE_FUTURE_WORDS}|${relative.RELATIVE_PAST_WORDS}) )?${weekdays.WEEKDAYS}`;
        const matchForWeekdays = matchPattern(text, pattern);

        if (!matchForWeekdays) return null;

        // for each match, get the parsed cases
        return matchForWeekdays.map(elem => this.parseWeekdayMatches(text, elem));
    }

    static matchWeekdays(text: string): string[] {
        const matched = matchPattern(text, weekdays.WEEKDAYS);
        return matched ? matched : null;
    }

    static parseWeekdayMatches(text: string, matchedWeekday: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedWeekday, '');

        return {
            text: trimWhiteSpaces(replaceMatch),
            dateTime: this.convertWeekdayMatchToDate(matchedWeekday),
            matched: trimWhiteSpaces(matchedWeekday)
        };
    }

    static convertWeekdayMatchToDate(matchingText) {
        let weekday = null;

        if (contains(matchingText, weekdays.MONDAY)) {
            weekday = 8;
        }
        if (contains(matchingText, weekdays.TUESDAY)) {
            weekday = 9;
        }
        if (contains(matchingText, weekdays.WEDNESDAY)) {
            weekday = 10;
        }
        if (contains(matchingText, weekdays.THURSDAY)) {
            weekday = 11;
        }
        if (contains(matchingText, weekdays.FRIDAY)) {
            weekday = 12;
        }
        if (contains(matchingText, weekdays.SATURDAY)) {
            weekday = 13;
        }
        if (contains(matchingText, weekdays.SUNDAY)) {
            weekday = 14;
        }

        if (!weekday) {
            return null;
        }

        if (contains(matchingText, `${relative.RELATIVE_PAST_WORDS} ${weekdays.WEEKDAYS}`)) {
            weekday -= 7;
        }

        return DateTime.local()
            .set({ weekday })
            .startOf('second')
            .toJSDate();
    }
} 
