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

export interface TestCaseSchema {
    case: string;
    result: ParsedMatchSchema[];
}

export interface TimeObjectSchema {
    hour: number;
    minute: number;
}
