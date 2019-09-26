import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { DATES, DATE_AND_TIME, PARTIAL_DATES } from '../dates.constants';
import TIME from '../../time/time.constants';
import { parseMatches, convertDateStringToObj, remove, matchPattern, convertTimeStringToObj } from 'utils';
import convertPartialDateStringToObj from '../../../utils/convertPartialDateStringToObj';

export default class DateAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `${DATE_AND_TIME.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removeDateFillerWords = remove(matchingText, DATES.FILLER_WORDS);
        const dateStringMatches = matchPattern(removeDateFillerWords, `(${DATES.ANY}|${PARTIAL_DATES.ANY})`);
        if (!dateStringMatches) return null;
        const dateString = dateStringMatches[0];
        const timeString = remove(removeDateFillerWords, dateString);
        const removedTimeFillerWords = remove(timeString, TIME.FILLER_WORDS);

        let dateObj = convertDateStringToObj(dateString);
        dateObj = !dateObj ? convertPartialDateStringToObj(dateString) : dateObj;

        if (!dateObj) return null;

        const { day, month, year } = dateObj;

        const timeObj = convertTimeStringToObj(removedTimeFillerWords);
        if (!timeObj) return null;

        const { hour, minute } =  timeObj;

        const newDateTime = DateTime.utc().set({ day, month, year, hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
