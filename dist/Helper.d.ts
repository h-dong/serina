import { ParsedSchema, ParsedMatchSchema } from 'serina.schema';
export default class Helper {
    static patterns: {
        weekdays: string;
        relativeFutureWords: string;
        relativePastWords: string;
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    static parseWeekdayInText(text: string): ParsedSchema;
    static parseWeekdayMatches(text: string, matchedWeekday: string): ParsedMatchSchema;
    static matchWeekdays(text: string): string[];
    static convertWeekdayMatchToDate(matchingText: any): Date;
    static trimWhiteSpaces(text: string): string;
    private static contains;
    private static matchPattern;
}
