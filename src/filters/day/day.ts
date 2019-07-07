import { DAY, FILLER_WORD } from 'constants/patterns';
import { matchPattern, contains } from 'utils/Helper';
import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { parseMatches } from 'utils';

export default class Day {
    /*
    * When parsing dates e.g. 2nd, 11th
    */
   static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${FILLER_WORD.DAY})?${DAY.ALL}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const today: DateTime = DateTime.local();
        let day: number = null;
        let month: number = DateTime.local().month;

        if(contains(matchingText, DAY.ALL)) {
            const [matchedDay] = matchPattern(matchingText, DAY.ALL);
            day = parseInt(matchedDay, 10);

            // if day is in past then try future month
            if (day < today.day) month += 1;
        }

        if (!day) return null;

        return DateTime.local()
            .set({ day, month })
            .startOf('day')
            .toJSDate();
    }
}
