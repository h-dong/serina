interface ParsedMatchSchema {
    dateTime: Date;
    text: string;
    matched: string;
}

interface ParsedSchema {
    original: string;
    isValid: boolean;
    matches: ParsedMatchSchema[];
}

interface TestCaseSchema {
    case: string;
    description?: string;
    result: ParsedMatchSchema[];
}

interface TimeObjectSchema {
    hour: number;
    minute: number;
}

interface DateObjectSchema {
    day: number;
    month: number;
    year: number;
}

export { ParsedMatchSchema, ParsedSchema, TestCaseSchema, TimeObjectSchema, DateObjectSchema };
