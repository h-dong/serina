import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { MONTH, RELATIVE } from 'constants/patterns';
import { trimWhiteSpaces, matchPattern, contains } from 'utils/Helper';

export default class Month {

    static parseText(text: string): ParsedMatchSchema[] {

        const pattern = `((${RELATIVE.FUTURE_WORDS}|${RELATIVE.PAST_WORDS}) )?${MONTH.ALL}`;
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

        if (contains(matchingText, MONTH.JANUARY)) month = 1;
        if (contains(matchingText, MONTH.FEBRUARY)) month = 2;
        if (contains(matchingText, MONTH.MARCH)) month = 3;
        if (contains(matchingText, MONTH.APRIL)) month = 4;
        if (contains(matchingText, MONTH.MAY)) month = 5;
        if (contains(matchingText, MONTH.JUNE)) month = 6;
        if (contains(matchingText, MONTH.JULY)) month = 7;
        if (contains(matchingText, MONTH.AUGUST)) month = 8;
        if (contains(matchingText, MONTH.SEPTEMBER)) month = 9;
        if (contains(matchingText, MONTH.OCTOBER)) month = 10;
        if (contains(matchingText, MONTH.NOVEMBER)) month = 11;
        if (contains(matchingText, MONTH.DECEMBER)) month = 12;

        return month;
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const month = Month.convertMonthStringToNumber(matchingText);
        if (month == null) return null;

        let year = DateTime.local().year
        if (month < DateTime.local().month) {
            year += 1;
        }
        if (contains(matchingText, `${RELATIVE.PAST_WORDS} ${MONTH.ALL}`)) {
            year -= 1;
        }
        return DateTime.local()
            .set({ month, year })
            .startOf('minute')
            .toJSDate();
    }
}
