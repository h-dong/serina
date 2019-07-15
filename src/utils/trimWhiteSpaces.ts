function trimWhiteSpaces(text: string): string {
    const trimmedText = text.replace(/  /g, ' ');
    return trimmedText.trim();
}

export default trimWhiteSpaces;
