function trimWhiteSpaces(text: string): string {
    const trimedText = text.replace(/  /g, ' ');
    return trimedText.trim();
}

export default trimWhiteSpaces;
