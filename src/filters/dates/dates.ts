import { ParsedMatchSchema } from 'serina.schema';
import { DATES } from './dates.constants';
import { parseMatches } from 'lib/string/stringUtil';
import convertDateStringToObj from 'utils/convertDateStringToObj';
import remove from 'utils/remove';
import { matchPattern } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';

export default class Dates {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DATES.FILLER_WORDS})?(${DATES.ANY})`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    private static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
        const dateObj = convertDateStringToObj(removedFillerWords);

        if (!dateObj) return null;

        const { day, month, year } = dateObj;
        return dayLite().set({ day, month, year }).endOf('day').toDate();
    }
}
