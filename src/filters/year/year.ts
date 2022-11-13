import parseMatches from 'utils/parseMatches';
import contains from 'utils/contains';
import matchPattern from 'utils/matchPattern';
import { ParsedMatchSchema } from 'serina.schema';
import YEAR from './year.constants';
import { dayLight } from 'lib/date/dayLight';

// parsing year between 1000 - 9999
export default class Year {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${YEAR.FILLER_WORDS})?${YEAR.ANY}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        let year: number = dayLight().year;

        if (contains(matchingText, YEAR.ANY)) {
            const [matchedDay] = matchPattern(matchingText, YEAR.ANY);
            year = parseInt(matchedDay, 10);
        }

        if (!year) return null;

        return dayLight().set({ year }).startOf('year').endOf('day').toDate();
    }
}
