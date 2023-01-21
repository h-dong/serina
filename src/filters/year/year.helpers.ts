import { dayLite } from 'lib/date/dayLite';
import { contains } from 'lib/string/stringUtil';
import { matchPattern } from 'lib/string/stringUtil';
import YEAR from './year.constants';

export function yearStringToDate(matchingText: string): Date {
    let year: number;

    if (contains(matchingText, YEAR.ANY)) {
        const [matchedDay] = matchPattern(matchingText, YEAR.ANY);
        year = parseInt(matchedDay, 10);
    }

    if (!year) return null;

    return dayLite().set({ year }).startOf('year').endOf('day').toDate();
}
