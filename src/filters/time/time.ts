import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { TIME } from './time.constants';
import { parseMatches, convertTimeStringToObj, remove, matchPattern } from 'utils';

export default class Time {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${TIME.FILLER_WORDS})?(${TIME.ANY})`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, TIME.FILLER_WORDS);
        const { hour, minute } = convertTimeStringToObj(removedFillerWords);
        const newDateTime = DateTime.utc().set({ hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
