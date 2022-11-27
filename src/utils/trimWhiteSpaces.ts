function trimWhiteSpaces(text: string): string {
    const trimmedText = text.replace(/ {2}/g, ' ');
    return trimmedText.trim();
}

export default trimWhiteSpaces;
