import YEAR from 'patterns/year/year.constants';
import { dayLite } from 'utils/date/dayLite';
import { contains, matchPattern } from 'utils/string/stringUtil';

export function yearStringToDate(matchingText: string): Date {
  let year: number;

  if (contains(matchingText, YEAR.ANY)) {
    const [matchedDay] = matchPattern(matchingText, YEAR.ANY);
    year = parseInt(matchedDay, 10);
  }

  if (!year) return null;

  return dayLite().set({ year }).startOf('year').toDate();
}
