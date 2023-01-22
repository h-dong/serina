import { ParsedMatchSchema } from 'serina.schema';
import { parseMatches } from 'lib/string/stringUtil';
import { matchPattern } from 'lib/string/stringUtil';
import DAY from './day.constants';
import { dayStringToDateObj } from './day.helpers';

export default class Day {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = DAY.WITH_FILLER_WORDS_AND_ORDINAL;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = dayStringToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }
}
