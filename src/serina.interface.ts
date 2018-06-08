export interface ParsedMatchSchema {
    dateTime: Date;
    text: string;
}

export interface ParsedSchema {
    original: string;
    isValid: boolean;
    matches: ParsedMatchSchema[];
}
