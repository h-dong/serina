import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import RELATIVE_TIME from './relativeTime.constants';
import { parseMatches, matchPattern } from 'utils';
import remove from '../../../utils/remove';
import contains from '../../../utils/contains';

export default class RelativeTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = RELATIVE_TIME.ANY;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertRelativeTimeStringToNumericValue(timePeriod: string, timeUnit: string): number {
        let timeValue = 1000;
        // Multiplication is commutative, we are going to take a quarter of whatever time unit we are going to get.
        if (contains(timePeriod, RELATIVE_TIME.VERBAL_QUANTIFIERS.QUARTER)) {
            timeValue *= 0.25;
        } else if (contains(timePeriod, RELATIVE_TIME.VERBAL_QUANTIFIERS.HALF)) {
            timeValue *= 0.5;
        } else if (contains(timePeriod, RELATIVE_TIME.VERBAL_QUANTIFIERS.ONE)) {
            timeValue *= 1;
        } else {
            timeValue *= parseInt(timePeriod, 10);
        }
        if (contains(timeUnit, RELATIVE_TIME.TIME_UNITS.HOURS)) {
            timeValue *= 3600;
        } else if (contains(timeUnit, RELATIVE_TIME.TIME_UNITS.MINUTES)) {
            timeValue *= 60;
        }
        return timeValue;
    }

    static addRelativeTimeToCurrentTime(timeString: string): DateTime {
        const timeUnit = matchPattern(timeString, RELATIVE_TIME.TIME_UNITS.ANY)[0];
        const timePeriod = remove(timeString, timeUnit);
        const timeValue = this.convertRelativeTimeStringToNumericValue(timePeriod, timeUnit);
        return DateTime.utc().plus(timeValue);
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, RELATIVE_TIME.FILLER_WORDS);
        const newDateTime = this.addRelativeTimeToCurrentTime(removedFillerWords);
        if (!newDateTime.isValid) return null;
        return newDateTime.startOf('second').toJSDate();
    }
}
