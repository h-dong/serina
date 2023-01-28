import { dayLite } from 'lib/date/dayLite';
import { contains } from 'lib/string/stringUtil';
import TIME_KEYWORDS from './timeKeywords.constants';

export function timeKeywordsToDateObj(matchingText: string): Date {
    let day = dayLite().day;
    let hour = null;
    const currentHour = dayLite().hour;

    if (contains(matchingText, `${TIME_KEYWORDS.MID_DAY}`)) {
        hour = 12;
        if (currentHour > 12) day += 1;
    }

    if (contains(matchingText, `${TIME_KEYWORDS.MID_NIGHT}`)) {
        hour = 0;
        day += 1;
    }

    if (hour === null) return null;

    return dayLite()
        .startOf('minute')
        .set({
            day,
            hour,
            minute: 0,
        })
        .toDate();
}
