const trimWhiteSpaces = (text: string): string => {
    const trimedText = text.replace(/  /g, ' ');
    return trimedText.trim();
};

const contains = (haystack: string, pattern: string) => {
    const regex = new RegExp(`\\b${pattern}\\b`, 'g');
    return regex.test(haystack.toLowerCase());
};

const matchPattern = (haystack: string, pattern: string): string[] => {
    const regex = new RegExp(`\\b${pattern}\\b`, 'g');
    return haystack.toLowerCase().match(regex);
};

export {
    trimWhiteSpaces,
    contains,
    matchPattern,
};
