function remove(text: string, pattern: string, wordBoundary: boolean = true) {
    const updatedPattern = (wordBoundary) ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'ig');
    return text.replace(regex, '');
}

export default remove;
