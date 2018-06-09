import { DateTime } from 'luxon';
import { ParsedSchema, ParsedMatchSchema } from 'serina.schema';

export default class Helper {
    static patterns = {
        weekdays: '(mon|tue(s)?|wed|wedn(es)?|thu|thur(s)?|fri|sat(ur)?|sun)(day)?',
        relativeFutureWords: 'for|next|this|current|on',
        relativePastWords: 'last|prev(ious)?',
        monday: '(mon)(day)?',
        tuesday: '(tue(s)?)(day)?',
        wednesday: '(wed|wedn(es)?)(day)?',
        thursday: '(thu(r)?(s)?)(day)?',
        friday: '(fri)(day)?',
        saturday: '(sat(ur)?)(day)?',
        sunday: '(sun)(day)?'
    };

    static parseWeekdayInText(text: string): ParsedSchema {
        const pattern = `((${this.patterns.relativeFutureWords}|${this.patterns.relativePastWords}) )?${
            this.patterns.weekdays
        }`;
        const matchForWeekdays = this.matchPattern(text, pattern);

        const parsed: ParsedSchema = {
            original: text,
            isValid: false,
            matches: []
        };

        if (!matchForWeekdays) {
            return null;
        } // string doesn't contains weekday

        parsed.isValid = true;

        // for each match, get the parsed cases
        matchForWeekdays.forEach(elem => {
            parsed.matches.push(this.parseWeekdayMatches(text, elem));
        });

        return parsed;
    }

    static parseWeekdayMatches(text: string, matchedWeekday: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedWeekday, '');

        const parsedData = {
            text: this.trimWhiteSpaces(replaceMatch),
            dateTime: this.convertWeekdayMatchToDate(matchedWeekday),
            matched: this.trimWhiteSpaces(matchedWeekday)
        };

        return parsedData;
    }

    static matchWeekdays(text: string): string[] {
        const matched = this.matchPattern(text, this.patterns.weekdays);
        return matched ? matched : null;
    }

    static convertWeekdayMatchToDate(matchingText) {
        let weekday = null;

        if (this.contains(matchingText, this.patterns.monday)) {
            weekday = 8;
        }
        if (this.contains(matchingText, this.patterns.tuesday)) {
            weekday = 9;
        }
        if (this.contains(matchingText, this.patterns.wednesday)) {
            weekday = 10;
        }
        if (this.contains(matchingText, this.patterns.thursday)) {
            weekday = 11;
        }
        if (this.contains(matchingText, this.patterns.friday)) {
            weekday = 12;
        }
        if (this.contains(matchingText, this.patterns.saturday)) {
            weekday = 13;
        }
        if (this.contains(matchingText, this.patterns.sunday)) {
            weekday = 14;
        }

        if (!weekday) {
            return null;
        }

        if (this.contains(matchingText, `last|(prev(ious)?) ${this.patterns.weekdays}`)) {
            weekday -= 7;
        }

        return DateTime.local()
            .set({ weekday })
            .startOf('second')
            .toJSDate();
    }

    static trimWhiteSpaces(text: string): string {
        const trimedText = text.replace(/  /g, ' ');
        return trimedText.trim();
    }

    private static contains(haystack: string, pattern: string) {
        const regex = new RegExp(`\\b${pattern}\\b`, 'g');
        return regex.test(haystack.toLowerCase());
    }

    private static matchPattern(haystack: string, pattern: string): string[] {
        const regex = new RegExp(`\\b${pattern}\\b`, 'g');
        return haystack.toLowerCase().match(regex);
    }
}
