import { matchPattern } from 'lib/string/stringUtil';
import { parseMatches } from 'lib/string/stringUtil';
import TIME_KEYWORDS from './timeKeywords.constants';
import { ParsedMatchSchema } from 'serina.schema';
import { timeKeywordsToDateObj } from './timeKeywords.helpers';

export default class TimeKeywords {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = TIME_KEYWORDS.WITH_FILLER_WORDS;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = timeKeywordsToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }
}
