import { ParsedMatchSchema } from 'serina.schema';
import TIME from './time.constants';
import { parseMatches } from 'lib/string/stringUtil';
import convertTimeStringToObj from 'utils/convertTimeStringToObj';
import { matchPattern } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';

export default class Time {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${TIME.FILLER_WORDS}( ))?${TIME.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    private static convertMatchToDateObj(matchingText: string): Date {
        const timeObj = convertTimeStringToObj(matchingText);

        if (!timeObj) return null;

        const { hour, minute } = timeObj;

        return dayLite().set({ hour, minute }).startOf('minute').toDate();
    }
}
