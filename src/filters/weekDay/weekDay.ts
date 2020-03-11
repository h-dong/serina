import { DateTime } from 'luxon';
import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from './weekDay.constants';
import contains from 'utils/contains';
import matchPattern from 'utils/matchPattern';
import convertWeekdayStringToNumber from 'utils/convertWeekdayStringToNumber';
import parseMatches from 'utils/parseMatches';

export default class WeekDay {
    /*
     * When parsing day of the week, check for relative words & week day e.g. next friday
     */
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `((${WEEKDAY.FUTURE_WORDS}|${WEEKDAY.PAST_WORDS}) )?${WEEKDAY.ANY}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = this.convertWeekdayMatchToDate(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertWeekdayMatchToDate(matchingText) {
        const [weekdayString] = matchPattern(matchingText, WEEKDAY.ANY);
        const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
        const weekday = convertWeekdayStringToNumber(weekdayString, pastWeekday);

        const newDateTime = DateTime.utc().set({ weekday });

        if (!newDateTime.isValid) return null;

        return newDateTime.endOf('day').toJSDate();
    }
}
