import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import DATES from './dates.constants';
import { parseMatches, convertDateStringToObj, remove, matchPattern } from 'utils';

export default class Dates {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DATES.FILLER_WORDS})?(${DATES.ANY})`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, DATES.FILLER_WORDS);
        const dateObj = convertDateStringToObj(removedFillerWords);

        if (!dateObj) return null;

        const { day, month, year } = dateObj;
        const newDateTime = DateTime.utc().set({ day, month, year });

        if (!newDateTime.isValid) return null;

        return newDateTime.endOf('day').toJSDate();
    }
}
