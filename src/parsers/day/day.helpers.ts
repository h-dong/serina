import DAY from 'patterns/day/day.constants';
import { dayLite } from 'utils/date/dayLite';
import { contains, matchPattern } from 'utils/string/stringUtil';

export function dayStringToDateObj(matchingText: string): Date {
  const today = dayLite();
  let day: number = null;
  let month: number = today.month;

  if (contains(matchingText, DAY.ANY)) {
    const [matchedDay] = matchPattern(matchingText, DAY.ANY);
    day = parseInt(matchedDay, 10);

    // if day is in past then try future month
    if (day < today.day) month += 1;
  }

  if (!day) return null;

  return dayLite().set({ day, month }).start('day').toDate();
}
