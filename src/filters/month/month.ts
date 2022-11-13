import { ParsedMatchSchema } from 'serina.schema';
import parseMatches from 'utils/parseMatches';
import contains from 'utils/contains';
import matchPattern from 'utils/matchPattern';
import monthStringToNumber from 'utils/monthStringToNumber';
import MONTH from './month.constants';
import { dayLight } from 'lib/date/dayLight';

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

    static convertMatchToDateObj(matchingText: string): Date {
        const month = monthStringToNumber(matchingText);
        if (month === null) return null;

        let year = dayLight().year;
        if (month < dayLight().month) {
            year += 1;
        }
        if (contains(matchingText, `${MONTH.PAST_WORDS} ${MONTH.ANY}`)) {
            year -= 1;
        }
        return dayLight().set({ month, year }).startOf('month').endOf('day').toDate();
    }
}
