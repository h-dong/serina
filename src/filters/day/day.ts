import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import parseMatches from 'utils/parseMatches';
import contains from 'utils/contains';
import matchPattern from 'utils/matchPattern';
import DAY from './day.constants';

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

    static convertMatchToDateObj(matchingText: string): Date {
        const today: DateTime = DateTime.utc();
        let day: number = null;
        let month: number = DateTime.utc().month;

        if (contains(matchingText, DAY.ANY)) {
            const [matchedDay] = matchPattern(matchingText, DAY.ANY);
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
