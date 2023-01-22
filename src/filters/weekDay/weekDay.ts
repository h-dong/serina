import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from './weekday.constants';
import { matchPattern } from 'lib/string/stringUtil';
import { parseMatches } from 'lib/string/stringUtil';
import { weekdayStringToDateObj } from './weekday.helpers';

export default class Weekday {
    static parseText(text: string): ParsedMatchSchema[] {
        // When parsing day of the week, check for relative words & week day e.g. next friday
        const pattern = WEEKDAY.WITH_FUTURE_PAST_WORDS;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = weekdayStringToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }
}
