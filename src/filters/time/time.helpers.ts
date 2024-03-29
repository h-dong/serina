import { TimeObjectSchema } from 'serina.schema';
import TIME from 'filters/time/time.constants';
import { contains } from 'lib/string/stringUtil';
import { matchPattern } from 'lib/string/stringUtil';
import { dayLite } from 'lib/date/dayLite';

export function getValidMatch(text: string, pattern: string): string {
    const matched = matchPattern(text, pattern, false);
    if (!matched || matched.length === 0) return null;
    const [value] = matched;
    return value;
}

export function convertTime(timeString: string, hour: number, minute: number): TimeObjectSchema {
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    if (contains(timeString, TIME.AM, false) && hour === 12) hour = 24;
    if (contains(timeString, TIME.TO) && hour > 0) hour -= 1;
    if (contains(timeString, TIME.TO)) minute = 60 - minute;
    if (contains(timeString, TIME.PM, false) && hour < 12) hour += 12;
    if (hour === 24) hour = 0;

    // TODO: need to move this logic some where else
    // if (hour < dayLite().hour || (hour === dayLite().hour && minute < dayLite().minute)) hour += 24;

    return { hour, minute };
}

export function timeStringToDateObj(timeString: string): TimeObjectSchema {
    let hour: string;
    let minute: string;
    const isRelativeTime = contains(timeString, TIME.RELATIVE_TIME_FILLER_WORDS);

    if (isRelativeTime) {
        if (contains(timeString, TIME.VERBAL_QUANTIFIERS)) {
            // half or quarter
            try {
                hour = getValidMatch(timeString, `(?<=${TIME.RELATIVE_TIME_FILLER_WORDS}( ))${TIME.HOUR_PART}`);
            } catch {
                // workaround for browsers that doesn't support regex lookbehind
                const hourWithFillerWords = getValidMatch(
                    timeString,
                    `(${TIME.RELATIVE_TIME_FILLER_WORDS}( ))${TIME.HOUR_PART}`
                );
                hour = getValidMatch(hourWithFillerWords, TIME.HOUR_PART);
            }

            if (contains(timeString, TIME.HALF)) minute = '30';
            if (contains(timeString, TIME.QUARTER)) minute = '15';
        } else {
            // 20 min to 7pm
            try {
                hour = getValidMatch(
                    timeString,
                    `(?<=${TIME.RELATIVE_TIME_FILLER_WORDS}( ))${TIME.HOUR_PART}(?=((( )${TIME.MERIDIEM}))?)`
                );
            } catch {
                // workaround for browsers that doesn't support regex lookbehind
                const hourWithFillerWords = getValidMatch(
                    timeString,
                    `(${TIME.RELATIVE_TIME_FILLER_WORDS}( ))${TIME.HOUR_PART}(?=((( )${TIME.MERIDIEM}))?)`
                );
                hour = getValidMatch(hourWithFillerWords, TIME.HOUR_PART);
            }
            minute = getValidMatch(
                timeString,
                `\\b${TIME.MINUTE_PART}(?=(( )(${TIME.MINUTE_IDENTIFIER}( ))?${TIME.RELATIVE_TIME_FILLER_WORDS}))`
            );
        }
    } else {
        if (contains(timeString, TIME.DIVIDER)) {
            // 19:09
            hour = getValidMatch(timeString, `\\b${TIME.HOUR_PART}(?=${TIME.DIVIDER})`);
            try {
                minute = getValidMatch(timeString, `(?<=${TIME.DIVIDER})${TIME.MINUTE_PART}`);
            } catch {
                // workaround for browsers that doesn't support regex lookbehind
                const minWithDivider = getValidMatch(timeString, `(${TIME.DIVIDER})${TIME.MINUTE_PART}`);
                minute = getValidMatch(minWithDivider, TIME.MINUTE_PART);
            }
        } else {
            // 6pm
            hour = getValidMatch(timeString, `\\b${TIME.HOUR_PART}(?=(( )?${TIME.MERIDIEM}))`);
            minute = '0';
        }
    }

    return convertTime(timeString, parseInt(hour, 10), parseInt(minute, 10));
}

export function timeStringToHourMinute(matchingText: string): Date {
    const timeObj = timeStringToDateObj(matchingText);

    if (!timeObj) return null;

    const { hour, minute } = timeObj;

    return dayLite().set({ hour, minute }).startOf('minute').toDate();
}
