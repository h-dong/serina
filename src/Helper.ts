import { DateTime } from 'luxon';
import { ParsedSchema, ParsedMatchSchema } from 'serina.interface';

export default class Helper {
    static patterns = {
        weekdays: /\b((mon|tue(s)?|wed|wedn(es)?|thu|thur(s)?|fri|sat(ur)?|sun)(day)?)\b/g,
        monday: /\b((mon)(day)?)\b/g,
        tuesday: /\b((tue(s)?)(day)?)\b/g,
        wednesday: /\b((wed|wedn(es)?)(day)?)\b/g,
        thursday: /\b((thu(r)?(s)?)(day)?)\b/g,
        friday: /\b((fri)(day)?)\b/g,
        saturday: /\b((sat(ur)?)(day)?)\b/g,
        sunday: /\b((sun)(day)?)\b/g
    };

    static parseWeekdayInText(text: string): ParsedSchema {
        const matchForWeekdays = this.matchWeekdays(text);
        if (matchForWeekdays) {
            // string contains at least one weekday

            const parsed: ParsedSchema = {
                original: text,
                isValid: true,
                matches: []
            };

            // for each match, get the parsed cases
            matchForWeekdays.forEach((elem) => {
                parsed.matches.push(this.parse(text, elem));
            });

            return parsed;
        }

        return null;
    }

    // static parseWeekday(text: string, match: string): ParsedMatchSchema {

    // }

    static matchWeekdays(text: string): string[] {
        const matched = this.matched(text, this.patterns.weekdays);
        return (matched) ? matched : null;
    }

    static parse(text: string, match: string): ParsedMatchSchema {
        if (this.contains(text.toLowerCase(), match)) {
            const replaceMatch = text.toLowerCase().replace(match, '');
            const trimText = this.trimWhiteSpaces(replaceMatch);

            return {
                text: trimText,
                dateTime: this.convertStringToDateDiff(match)
            };
        }

        return null;
    }

    static convertStringToDateDiff(match: string) {
        let date;

        switch (match) {
            case 'tomorrow':
                date = DateTime.local().plus({ days: 1 }).startOf('second').toJSDate();
                break;
            case 'day after':
                date = DateTime.local().plus({ days: 2 }).startOf('second').toJSDate();
                break;
            case 'yesterday':
                date = DateTime.local().minus({ days: 1 }).startOf('second').toJSDate();
                break;
            case 'day before':
                date = DateTime.local().minus({ days: 2 }).startOf('second').toJSDate();
                break;
            case 'mon':
            case 'monday':
            case 'for mon':
            case 'for monday':
            case 'next mon':
            case 'next monday':
                // weekday 8 (next monday) = 1 (last Monday) + 7 (plus 1 week)
                date = DateTime.local().set({ weekday: 8 }).startOf('second').toJSDate();
                break;
            case 'this mon':
            case 'this monday':
            case 'last mon':
            case 'last monday':
                date = DateTime.local().set({ weekday: 1 }).startOf('second').toJSDate();
                break;
                case 'tue':
                case 'tuesday':
                case 'for tue':
                case 'for tuesday':
                case 'next tue':
                case 'next tuesday':
                    // weekday 8 (next tuesday) = 1 (last tuesday) + 7 (plus 1 week)
                    date = DateTime.local().set({ weekday: 9 }).startOf('second').toJSDate();
                    break;
                case 'this tue':
                case 'this tuesday':
                case 'last tue':
                case 'last tuesday':
                    date = DateTime.local().set({ weekday: 2 }).startOf('second').toJSDate();
                    break;
            default:
                date = DateTime.local().startOf('second').toJSDate();
                break;
        }

        return date;
    }

    static trimWhiteSpaces(text: string): string {
        const trimedText = text.replace(/  /g, ' ');
        return trimedText.trim();
    }

    private static contains(haystack: string, needle: string) {
        const regex = new RegExp(needle, 'g');
        return (haystack.match(regex)) ? true : false;
    }

    private static matched(haystack: string, regex: RegExp) {
        return haystack.toLowerCase().match(regex);
    }
}
