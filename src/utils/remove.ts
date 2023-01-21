import { trimWhiteSpaces } from 'lib/string/stringUtil';

function remove(text: string, pattern: string, wordBoundary = true) {
    const updatedPattern = wordBoundary ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'ig');
    const replacedText = text.replace(regex, '');
    return trimWhiteSpaces(replacedText);
}

export default remove;
