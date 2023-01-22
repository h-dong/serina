import { ParsedMatchSchema } from 'serina.schema';
import { DATES, PARTIAL_DATES } from './dates.constants';
import { parseMatches } from 'lib/string/stringUtil';
import convertPartialDateStringToObj from 'utils/convertPartialDateStringToObj';
import remove from 'utils/remove';
import { matchPattern } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';

export default class PartialDates {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DATES.FILLER_WORDS})?(${PARTIAL_DATES.ANY})`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    private static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
        const dateObj = convertPartialDateStringToObj(removedFillerWords);

        if (!dateObj) return null;

        const { day, month, year } = dateObj;
        return dayLite().set({ day, month, year }).start('day').toDate();
    }
}
