import { ParsedMatchSchema } from 'serina.schema';
import { trimWhiteSpaces } from './Helper';

function parseMatches(text: string, matchedDate: string, dateTimeObj: Date): ParsedMatchSchema {
    const replaceMatch = text.toLowerCase().replace(matchedDate, '');

    return {
        text: trimWhiteSpaces(replaceMatch),
        dateTime: dateTimeObj,
        matched: trimWhiteSpaces(matchedDate),
    };
}

export default parseMatches;
