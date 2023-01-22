import { ParsedMatchSchema } from 'serina.schema';
import { parseMatches } from 'lib/string/stringUtil';
import { matchPattern } from 'lib/string/stringUtil';
import MONTH from './month.constants';
import { monthStringToDateObj } from './month.helpers';

export default class Month {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = MONTH.WITH_FUTURE_PAST_WORDS;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = monthStringToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }
}
