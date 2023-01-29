import { ParsedMatchSchema } from 'serina.schema';

export function matchPattern(haystack: string, pattern: string, wordBoundary = true): string[] {
    const updatedPattern = wordBoundary ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'ig');
    return haystack.toLowerCase().match(regex);
}

export function contains(haystack: string, pattern: string, wordBoundary = true) {
    const updatedPattern = wordBoundary ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'i');
    return regex.test(haystack.toLowerCase());
}

export function trimWhiteSpaces(text: string): string {
    const trimmedText = text.replace(/ {2}/g, ' ');
    return trimmedText.trim();
}

export function parseMatches(text: string, pattern: string, dateTimeObj: Date): ParsedMatchSchema {
    const regex = new RegExp(pattern, 'ig');
    const textRemain = text.replace(regex, '');

    // get the original capitalisation
    const [matched] = text.match(regex);

    return {
        text: trimWhiteSpaces(textRemain),
        dateTime: dateTimeObj,
        matched: trimWhiteSpaces(matched),
    };
}

export function remove(text: string, pattern: string, wordBoundary = true) {
    const updatedPattern = wordBoundary ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'ig');
    const replacedText = text.replace(regex, '');
    return trimWhiteSpaces(replacedText);
}
