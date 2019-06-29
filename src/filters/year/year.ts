import { YEAR, FILLER_WORD } from 'constants/patterns';
import { trimWhiteSpaces, matchPattern, contains } from 'utils/Helper';
import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';

export default class Year {
    /*
    * When parsing year between 1000 - 9999
    */
   static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${FILLER_WORD.YEAR})?${YEAR.ALL}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => this.parseDateMatches(text, match));
    }

    static parseDateMatches(text: string, matchedDate: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedDate, '');

        return {
            text: trimWhiteSpaces(replaceMatch),
            dateTime: this.convertMatchToDateObj(matchedDate),
            matched: trimWhiteSpaces(matchedDate),
        };
    }

    static convertMatchToDateObj(matchingText: string): Date {
        let year: number = DateTime.local().year;

        if(contains(matchingText, YEAR.ALL)) {
            const [matchedDay] = matchPattern(matchingText, YEAR.ALL);
            year = parseInt(matchedDay, 10);
        }

        if (!year) return null;

        return DateTime.local()
            .set({ year })
            .startOf('year')
            .toJSDate();
    }
}
