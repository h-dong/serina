import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { trimWhiteSpaces, matchPattern, contains } from 'utils/Helper';
import MONTH from './constants';

export default class Month {

    static parseText(text: string): ParsedMatchSchema[] {

        const pattern = `((${MONTH.FUTURE_WORDS}|${MONTH.PAST_WORDS}) )?${MONTH.ANY}`;
        const matchForDates = matchPattern(text, pattern);

        if (!matchForDates) return null;

        // for each match, get the parsed cases
        return matchForDates.map(elem => this.parseDateMatches(text, elem));
    }

    static parseDateMatches(text: string, matchedDate: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedDate, '');

        return {
            text: trimWhiteSpaces(replaceMatch),
            dateTime: this.convertMatchToDateObj(matchedDate),
            matched: trimWhiteSpaces(matchedDate),
        };
    }

    static convertMonthStringToNumber(matchingText: string): number {
        let month = null;

        Object.keys(MONTH.SINGLE).forEach((key, index) => {
            const monthPattern = MONTH.SINGLE[key];
            if (contains(matchingText, monthPattern)) {
                month = index + 1;
            }
        });

        return month;
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const month = Month.convertMonthStringToNumber(matchingText);
        if (month === null) return null;

        let year = DateTime.local().year;
        if (month < DateTime.local().month) {
            year += 1;
        }
        if (contains(matchingText, `${MONTH.PAST_WORDS} ${MONTH.ANY}`)) {
            year -= 1;
        }
        return DateTime.local()
            .set({ month, year })
            .startOf('month')
            .toJSDate();
    }
}
