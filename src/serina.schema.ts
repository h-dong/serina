export interface ParsedMatchSchema {
    dateTime: Date;
    text: string;
    matched: string;
}

export interface ParsedSchema {
    original: string;
    isValid: boolean;
    matches: ParsedMatchSchema[];
}
