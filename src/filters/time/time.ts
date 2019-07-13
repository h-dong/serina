import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import TIME from './time.constants';
import { parseMatches, convertTimeStringToObj, remove, matchPattern } from 'utils';

export default class Time {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${TIME.FILLER_WORDS})?(${TIME.ALL})`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removeFillerWords = remove(matchingText, TIME.FILLER_WORDS);
        const { hour, minute } = convertTimeStringToObj(removeFillerWords);
        const newDateTime = DateTime.utc().set({ hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
