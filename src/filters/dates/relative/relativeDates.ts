import { ParsedMatchSchema } from 'serina.schema';
import { DATES } from '../dates.constants';
import RELATIVE_DATES from './relativeDates.constants';
import { parseMatches, matchPattern, convertRelativeDateStringToObj} from 'utils';

export default class RelativeDates {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DATES.FILLER_WORDS})?${RELATIVE_DATES.ANY}`;
        const matches = matchPattern(text, pattern, false);
        if (!matches) return null;
        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const dateObj = convertRelativeDateStringToObj(matchingText);
        if (!dateObj) return null;
        return dateObj.endOf('day').toJSDate();
    }
}
