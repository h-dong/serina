function matchPattern(haystack: string, pattern: string): string[] {
    const regex = new RegExp(`\\b${pattern}\\b`, 'ig');
    return haystack.toLowerCase().match(regex);
}

export default matchPattern;
