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

interface ParseOptions {
  locale?: string;
  referenceDate?: Date;
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

export { DateObjectSchema, ParsedMatchSchema, ParseOptions, ParsedSchema, TestCaseSchema, TimeObjectSchema };
