import { dayLite } from 'lib/date/dayLite';
import { contains } from 'lib/string/stringUtil';
import MONTH from './month.constants';

export function monthStringToNumber(matchingText: string): number {
    let month = null;

    Object.keys(MONTH.SINGLE).forEach((key, index) => {
        const monthPattern = MONTH.SINGLE[key];
        if (contains(matchingText, monthPattern)) {
            month = index + 1;
        }
    });

    return month;
}

export function monthStringToDateObj(matchingText: string): Date {
    const month = monthStringToNumber(matchingText);

    if (month === null) return null;

    let year = dayLite().year;

    if (month < dayLite().month) year += 1;
    if (contains(matchingText, `${MONTH.PAST_WORDS} ${MONTH.ANY}`)) year -= 1;

    return dayLite().set({ month, year }).startOf('month').start('day').toDate();
}
