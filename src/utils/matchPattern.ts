function matchPattern(haystack: string, pattern: string, wordBoundary = true): string[] {
    const updatedPattern = wordBoundary ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'ig');
    return haystack.toLowerCase().match(regex);
}

export default matchPattern;
