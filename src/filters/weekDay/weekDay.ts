import { DateTime } from 'luxon';
import { matchPattern, trimWhiteSpaces, contains } from 'utils/Helper';
import { ParsedMatchSchema } from '../../serina.schema';
import WEEKDAY from './weekDay.constants';

export default class WeekDay {

    /*
    * When parsing day of the week, check for relative words & week day e.g. next friday
    */
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `((${WEEKDAY.FUTURE_WORDS}|${WEEKDAY.PAST_WORDS}) )?${WEEKDAY.ALL}`;
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

        const todayInWeekday = DateTime.local().weekday;

        Object.keys(WEEKDAY.SINGLE).forEach((key, index) => {
            const weekdayPattern = WEEKDAY.SINGLE[key];
            if (contains(matchingText, weekdayPattern)) {
                weekday = index + 1;
            }
        });

        if (weekday <= todayInWeekday) weekday += 7;

        if (!weekday) return null;

        if (contains(matchingText, `${WEEKDAY.PAST_WORDS} ${WEEKDAY.ALL}`)) weekday -= 7;

        return DateTime.local()
            .set({ weekday })
            .startOf('day')
            .toJSDate();
    }
}
