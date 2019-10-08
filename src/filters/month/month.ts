import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import parseMatches from 'utils/parseMatches';
import contains from 'utils/contains';
import matchPattern from 'utils/matchPattern';
import monthStringToNumber from 'utils/monthStringToNumber'; 
import MONTH from './month.constants';

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

        let year = DateTime.utc().year;
        if (month < DateTime.utc().month) {
            year += 1;
        }
        if (contains(matchingText, `${MONTH.PAST_WORDS} ${MONTH.ANY}`)) {
            year -= 1;
        }
        return DateTime.utc()
            .set({ month, year })
            .startOf('month')
            .toJSDate();
    }
}
