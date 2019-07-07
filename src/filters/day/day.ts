import { trimWhiteSpaces, matchPattern, contains } from 'utils/Helper';
import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import DAY from './day.constants';

export default class Day {
    /*
    * When parsing dates e.g. 2nd, 11th
    */
   static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DAY.FILLER_WORDS})?${DAY.ALL}`;
        const matchForDates = matchPattern(text, pattern);

        if (!matchForDates) return null;

        // for each match, get the parsed cases
        return matchForDates.map(elem => this.parseDateMatches(text, elem));
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
        const today: DateTime = DateTime.utc();
        let day: number = null;
        let month: number = DateTime.utc().month;

        if(contains(matchingText, DAY.ALL)) {
            const [matchedDay] = matchPattern(matchingText, DAY.ALL);
            day = parseInt(matchedDay, 10);

            // if day is in past then try future month
            if (day < today.day) month += 1;
        }

        if (!day) return null;

        return DateTime.utc()
            .set({ day, month })
            .startOf('day')
            .toJSDate();
    }
}
