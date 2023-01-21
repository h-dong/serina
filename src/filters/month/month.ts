import { ParsedMatchSchema } from 'serina.schema';
import { parseMatches } from 'lib/string/stringUtil';
import { contains } from 'lib/string/stringUtil';
import { matchPattern } from 'lib/string/stringUtil';
import monthStringToNumber from 'utils/monthStringToNumber';
import MONTH from './month.constants';
import { dayLite } from 'lib/date/dayLite';

export default class Month {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `((${MONTH.FUTURE_WORDS}|${MONTH.PAST_WORDS}) )?${MONTH.ANY}`;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    private static convertMatchToDateObj(matchingText: string): Date {
        const month = monthStringToNumber(matchingText);
        if (month === null) return null;

        let year = dayLite().year;
        if (month < dayLite().month) {
            year += 1;
        }
        if (contains(matchingText, `${MONTH.PAST_WORDS} ${MONTH.ANY}`)) {
            year -= 1;
        }
        return dayLite().set({ month, year }).startOf('month').endOf('day').toDate();
    }
}
