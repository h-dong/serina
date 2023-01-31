import { dayLite } from 'lib/date/dayLite';
import { contains, matchPattern, remove } from 'lib/string/stringUtil';
import RELATIVE_TIME from './relativeTime.constants';

export function convertRelativeTimeStringToNumericValue(timePeriod: string, timeUnit: string): number {
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

export function addRelativeTimeToCurrentTime(timeString: string): Date {
    const timeUnit = matchPattern(timeString, RELATIVE_TIME.TIME_UNITS.ANY)[0];
    const timePeriod = remove(timeString, timeUnit);
    const timeValue = this.convertRelativeTimeStringToNumericValue(timePeriod, timeUnit);
    return dayLite().plus(timeValue, 'millisecond').toDate();
}

export function convertMatchToDateObj(matchingText: string): Date {
    const removedFillerWords = remove(matchingText, RELATIVE_TIME.FILLER_WORDS);
    const newDateTime = this.addRelativeTimeToCurrentTime(removedFillerWords);
    return dayLite(newDateTime).startOf('millisecond').toDate();
}
