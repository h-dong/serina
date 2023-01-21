import { parseMatches } from 'lib/string/stringUtil';
import { ParsedMatchSchema } from 'serina.schema';
import YEAR from './year.constants';
import { yearStringToDate } from './year.helpers';
import { matchPattern } from 'lib/string/stringUtil';

// parsing year between 1000 - 9999
export default class Year {
    static parseText(text: string): ParsedMatchSchema[] {
        const matches = matchPattern(text, YEAR.YEAR_WITH_FILLER_WORDS);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = yearStringToDate(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }
}
