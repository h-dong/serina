import { TimeObjectSchema } from 'serina.schema';
import TIME from 'filters/time/time.constants';
import contains from './contains';
import { matchPattern } from 'utils';

function getValidMatch(text: string, pattern: string): string {
    const matched = matchPattern(text, pattern, false);
    if (!matched || matched.length === 0) return null;
    const [ value ] = matched;
    return value;
}

function convertTimeStringToObj(timeString: string): TimeObjectSchema {
    let hour;
    let minute;
    const isRelativeTime = contains(timeString, TIME.RELATIVE_TIME_FILLER_WORDS);

    if (isRelativeTime) {
        if (contains(timeString, TIME.VERBAL_QUANTIFIERS)) { // half or quarter
            hour = getValidMatch(timeString, `(?<=${TIME.RELATIVE_TIME_FILLER_WORDS}( ))${TIME.HOUR_PART}`);
            if (contains(timeString, TIME.HALF)) minute = '30';
            if (contains(timeString, TIME.QUARTER)) minute = '15';
        } else { // 20 min to 7pm
            hour = getValidMatch(timeString, `(?<=${TIME.RELATIVE_TIME_FILLER_WORDS}( ))${TIME.HOUR_PART}(?=((( )${TIME.MERIDIEM}))?)`);
            minute = getValidMatch(timeString, `\\b${TIME.MINUTE_PART}(?=(( )(${TIME.MINUTE_IDENTIFIER}( ))?${TIME.RELATIVE_TIME_FILLER_WORDS}))`);
        }
    } else {
        if (contains(timeString, TIME.DIVIDER)) { // 19:09
            hour = getValidMatch(timeString, `\\b${TIME.HOUR_PART}(?=${TIME.DIVIDER})`);
            minute = getValidMatch(timeString, `(?<=${TIME.DIVIDER})${TIME.MINUTE_PART}`);
        } else { // 6pm
            hour = getValidMatch(timeString, `\\b${TIME.HOUR_PART}(?=(( )?${TIME.MERIDIEM}))`);
            minute = 0;
        }
    }

    hour = parseInt(hour, 10);
    minute = parseInt(minute, 10);
    if (isNaN(hour) || isNaN(minute) || hour > 23 || minute > 59) return null;
    if (contains(timeString, TIME.AM, false) && hour === 12) hour = 24;
    if (contains(timeString, TIME.TO) && hour > 0) hour -= 1;
    if (contains(timeString, TIME.TO)) minute = 60 - minute;
    if (contains(timeString, TIME.PM, false) && hour < 12) hour += 12;
    if (hour === 24) hour = 0;

    return { hour, minute };
}

export default convertTimeStringToObj;
