import matchPattern from 'utils/matchPattern';
import parseMatches from 'utils/parseMatches';
import contains from 'utils/contains';
import TIME_KEYWORDS from './timeKeywords.constants';
import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';

export default class TimeKeywords {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${TIME_KEYWORDS.FILLER_WORDS}( ))?${TIME_KEYWORDS.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        let day = DateTime.utc().day;
        let hour = null;
        const currentHour = DateTime.utc().hour;

        if (contains(matchingText, `${TIME_KEYWORDS.MID_DAY}`)) {
            hour = 12;
            if (currentHour > 12) day += 1;
        }

        if (contains(matchingText, `${TIME_KEYWORDS.MID_NIGHT}`)) {
            hour = 0;
            day += 1;
        }

        if (hour === null) return null;

        const newDateTime = DateTime.utc().set({ day, hour, minute: 0 });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
