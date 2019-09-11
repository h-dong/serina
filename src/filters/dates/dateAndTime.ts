import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { DATES, PARTIAL_DATES } from './dates.constants';
import TIME from '../time/time.constants';
import { parseMatches, convertDateStringToObj, remove, matchPattern, convertTimeStringToObj } from 'utils';
import convertPartialDateStringToObj from '../../utils/convertPartialDateStringToObj';

export default class DateAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DATES.FILLER_WORDS})?(${DATES.ANY}|${PARTIAL_DATES.ANY})( )?(${TIME.FILLER_WORDS})?(${TIME.ANY})`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removedDateFillerWords = remove(matchingText, DATES.FILLER_WORDS);
        let dateObj = convertDateStringToObj(removedDateFillerWords);
        dateObj = !dateObj ? convertPartialDateStringToObj(removedDateFillerWords) : dateObj;

        if (!dateObj) return null;

        const { day, month, year } = dateObj;

        const removedDateString = remove(removedDateFillerWords, `(${DATES.ANY}|${PARTIAL_DATES.ANY})`);
        const removedTimeFillerWords = remove(removedDateString, TIME.FILLER_WORDS);
        const { hour, minute } = convertTimeStringToObj(removedTimeFillerWords);

        const newDateTime = DateTime.utc().set({ day, month, year, hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
