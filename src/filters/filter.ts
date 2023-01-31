import { matchPattern, parseMatches } from 'lib/string/stringUtil';
import { ParsedMatchSchema } from 'serina.schema';

export default class Filter {
    _pattern: string;
    _wordBoundary: boolean;

    constructor(pattern = '', wordBoundary?: boolean) {
        this._pattern = pattern;
        this._wordBoundary = wordBoundary;
    }

    parseText(text: string): ParsedMatchSchema[] {
        const matches = matchPattern(text, this._pattern, this._wordBoundary);

        if (!matches) return null;

        return matches.map(match => {
            const dateObj = this.parseStringToDateObj(match);
            return parseMatches(text, match, dateObj);
        });
    }

    parseStringToDateObj(match: string): Date {
        return isNaN(Date.parse(match)) ? new Date('2000-01-01T00:00:00Z') : new Date(match);
    }
}
