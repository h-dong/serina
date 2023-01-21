import { ParsedMatchSchema } from 'serina.schema';
import { parseMatches } from 'lib/string/stringUtil';
import { contains } from 'lib/string/stringUtil';
import { matchPattern } from 'lib/string/stringUtil';
import DAY from './day.constants';
import { dayLite } from 'lib/date/dayLite';

export default class Day {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DAY.FILLER_WORDS})?${DAY.ORDINAL_ONLY}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    private static convertMatchToDateObj(matchingText: string): Date {
        const today = dayLite();
        let day: number = null;
        let month: number = today.month;

        if (contains(matchingText, DAY.ANY)) {
            const [matchedDay] = matchPattern(matchingText, DAY.ANY);
            day = parseInt(matchedDay, 10);

            // if day is in past then try future month
            if (day < today.day) month += 1;
        }

        if (!day) return null;

        return dayLite().set({ day, month }).endOf('day').toDate();
    }
}
