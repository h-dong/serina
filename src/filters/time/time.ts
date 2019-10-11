import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import TIME from './time.constants';
import parseMatches from 'utils/parseMatches';
import convertTimeStringToObj from 'utils/convertTimeStringToObj';
import matchPattern from 'utils/matchPattern';

export default class Time {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${TIME.FILLER_WORDS}( ))?${TIME.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const timeObj = convertTimeStringToObj(matchingText);

        if (!timeObj) return null;

        const { hour, minute } = timeObj;

        const newDateTime = DateTime.utc().set({ hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
