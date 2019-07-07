import { matchPattern, contains } from 'utils/Helper';
import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import TIME from './time.constants';
import { parseMatches } from 'utils';

export default class Time {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${TIME.FILLER_WORDS})?${TIME.ALL}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMatchToDateObj(matchingText: string): Date {
        let hour = null;
        let minute = null;

        Object.keys(TIME.SINGLE).forEach(key => {
            const timePattern = TIME.SINGLE[key];
            if (contains(matchingText, timePattern)) {
                // match again without filler words
                // then take the first and only matched string
                const time = matchPattern(matchingText, TIME.ALL)[0];

                let replaceAm;
                let replacePm;
                let timeSplit;

                switch (timePattern) {
                    case TIME.SINGLE.FORMAT_12H_AM_WHOLE_HOUR:
                        replaceAm = time.replace('am', '');
                        hour = parseInt(replaceAm, 10);
                        minute = 0;
                        if (hour === 12) hour = 0;
                        break;
                    case TIME.SINGLE.FORMAT_12H_AM_WITH_MIN:
                        replaceAm = time.replace('am', '');
                        timeSplit = replaceAm.split(':');
                        hour = parseInt(timeSplit[0], 10);
                        minute = parseInt(timeSplit[1], 10);
                        if (hour === 12) hour = 0;
                        break;
                    case TIME.SINGLE.FORMAT_12H_PM_WHOLE_HOUR:
                        replacePm = time.replace('pm', '');
                        hour = parseInt(replacePm, 10);
                        minute = 0;
                        if (hour !== 12) hour += 12;
                        break;
                    case TIME.SINGLE.FORMAT_12H_PM_WITH_MIN:
                        replacePm = time.replace('pm', '');
                        timeSplit = replaceAm.split(':');
                        hour = parseInt(timeSplit[0], 10);
                        minute = parseInt(timeSplit[1], 10);
                        if (hour !== 12) hour += 12;
                        break;
                    case TIME.SINGLE.FORMAT_24H_WITH_MIN:
                        timeSplit = time.split(':');
                        hour = parseInt(timeSplit[0], 10);
                        minute = parseInt(timeSplit[1], 10);
                        break;
                    default:
                        break;
                }
            }
        });

        if (hour >= 0 || minute >= 0) {
            return DateTime.utc()
                .set({ hour, minute })
                .startOf('minute')
                .toJSDate();
        }

        return null;
    }
}
