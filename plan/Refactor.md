# Natural Language Date Parser - TypeScript Library

## System Architecture

┌─────────────────────────────────────────────────────────────┐
│                    Date Parser System                        │
├─────────────────────────────────────────────────────────────┤
│  1. Preprocessing Layer                                     │
│     └── Tokenization, normalization, context extraction     │
├─────────────────────────────────────────────────────────────┤
│  2. Pattern Detection Layer                                 │
│     ├── Regex patterns                                      │
│     ├── Named entity recognition                            │
│     └── Grammar-based parsing                               │
├─────────────────────────────────────────────────────────────┤
│  3. Interpretation Layer                                    │
│     ├── Disambiguation                                      │
│     ├── Relative date resolution                            │
│     └── Locale handling                                     │
├─────────────────────────────────────────────────────────────┤
│  4. Output Layer                                            │
│     └── Normalized datetime objects                         │
└─────────────────────────────────────────────────────────────┘


## Project Structure

```
date-parser/
├── src/
│   ├── index.ts
│   ├── types.ts
│   ├── parser/
│   │   ├── DateParser.ts
│   │   ├── Tokenizer.ts
│   │   └── ParserRegistry.ts
│   ├── parsers/
│   │   ├── PatternParser.ts
│   │   ├── GrammarParser.ts
│   │   ├── RelativeDateParser.ts
│   │   └── FuzzyParser.ts
│   ├── patterns/
│   │   ├── index.ts
│   │   ├── numericPatterns.ts
│   │   └── textPatterns.ts
│   ├── utils/
│   │   ├── dateHelpers.ts
│   │   ├── localeHelpers.ts
│   │   └── validators.ts
│   └── locales/
│       ├── en-US.ts
│       ├── en-GB.ts
│       └── index.ts
└── package.json
```

## Implementation

### types.ts

```typescript
// ==================== TYPES ====================

export interface ParseResult {
  date: Date;
  confidence: number;
  type: DateType;
  originalText: string;
  matchedPattern?: string;
}

export interface ParseOptions {
  locale?: string;
  referenceDate?: Date;
  strict?: boolean;
  allowPartial?: boolean;
  timeZone?: string;
}

export type DateType = 
  | 'absolute'
  | 'relative'
  | 'partial'
  | 'time'
  | 'datetime';

export interface Parser {
  name: string;
  priority: number;
  match: (text: string, options: ParseOptions) => ParseResult | null;
}

export interface DatePattern {
  pattern: RegExp;
  parse: (matches: RegExpMatchArray, options: ParseOptions) => Date | null;
  priority: number;
  name: string;
}
```

### utils/dateHelpers.ts

```typescript
import { ParseOptions } from '../types';

export const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

export const MONTH_ABBREVIATIONS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
];

export const WEEKDAYS = [
  'sunday', 'monday', 'tuesday', 'wednesday', 
  'thursday', 'friday', 'saturday'
];

export const WEEKDAY_ABBREVIATIONS = [
  'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
];

export function getMonthIndex(monthName: string): number | null {
  const name = monthName.toLowerCase();
  return MONTHS.indexOf(name) ?? MONTH_ABBREVIATIONS.indexOf(name);
}

export function getWeekdayIndex(dayName: string): number | null {
  const name = dayName.toLowerCase();
  return WEEKDAYS.indexOf(name) ?? WEEKDAY_ABBREVIATIONS.indexOf(name);
}

export function parse2DigitYear(year: number, referenceDate?: Date): number {
  if (year >= 100) return year;
  
  const refYear = referenceDate?.getFullYear() || new Date().getFullYear();
  const century = Math.floor(refYear / 100) * 100;
  
  // Simple heuristic: if year > 50, assume current century, else next century
  if (year > 50) {
    return century + year;
  } else {
    return century + 100 + year;
  }
}

export function padNumber(num: number, padding: number = 2): string {
  return num.toString().padStart(padding, '0');
}

export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime()) && 
         date.getFullYear() >= 1900 && 
         date.getFullYear() <= 2100;
}
```

### utils/localeHelpers.ts

```typescript
export interface LocaleConfig {
  id: string;
  name: string;
  dateFormat: string;
  dateSeparator: string;
  patterns: Record<string, string[]>;
}

export const LOCALES: Record<string, LocaleConfig> = {
  'en-US': {
    id: 'en-US',
    name: 'US English',
    dateFormat: 'MM/DD/YYYY',
    dateSeparator: '/',
    patterns: {
      'date': ['MM/DD/YYYY', 'MM-DD-YYYY', 'M/D/YYYY', 'MMMM D, YYYY'],
      'time': ['h:mm a', 'h:mm:ss a']
    }
  },
  'en-GB': {
    id: 'en-GB',
    name: 'British English',
    dateFormat: 'DD/MM/YYYY',
    dateSeparator: '/',
    patterns: {
      'date': ['DD/MM/YYYY', 'DD-MM-YYYY', 'D/M/YYYY', 'D MMMM YYYY'],
      'time': ['HH:mm', 'HH:mm:ss']
    }
  },
  'en-CA': {
    id: 'en-CA',
    name: 'Canadian English',
    dateFormat: 'YYYY-MM-DD',
    dateSeparator: '-',
    patterns: {
      'date': ['YYYY-MM-DD', 'YYYY/MM/DD'],
      'time': ['HH:mm', 'HH:mm:ss']
    }
  }
};

export function getLocale(locale?: string): LocaleConfig {
  return LOCALES[locale || 'en-US'] || LOCALES['en-US'];
}

export function resolveLocale(locale?: string): string {
  if (!locale) return 'en-US';
  if (LOCALES[locale]) return locale;
  
  // Try to match base locale
  const baseLocale = locale.split('-')[0];
  for (const key of Object.keys(LOCALES)) {
    if (key.startsWith(baseLocale)) return key;
  }
  
  return 'en-US';
}
```

### patterns/numericPatterns.ts

```typescript
import { DatePattern } from '../types';
import { parse2DigitYear } from '../utils/dateHelpers';

export function createNumericPatterns(): DatePattern[] {
  return [
    // ISO 8601: YYYY-MM-DD
    {
      name: 'iso-date',
      priority: 100,
      pattern: /(\d{4})-(\d{1,2})-(\d{1,2})/,
      parse: (m: RegExpMatchArray) => {
        const year = parseInt(m[1], 10);
        const month = parseInt(m[2], 10);
        const day = parseInt(m[3], 10);
        return year && month && day 
          ? new Date(year, month - 1, day)
          : null;
      }
    },
    
    // US Format: MM/DD/YYYY
    {
      name: 'us-date',
      priority: 90,
      pattern: /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/,
      parse: (m: RegExpMatchArray, options) => {
        const potentialMonth = parseInt(m[1], 10);
        const potentialDay = parseInt(m[2], 10);
        const year = parse2DigitYear(parseInt(m[3], 10), options.referenceDate);
        
        // US format: first number is month
        if (potentialMonth <= 12 && potentialDay > 12) {
          return new Date(year, potentialMonth - 1, potentialDay);
        }
        // Could be ambiguous, try EU interpretation
        if (potentialDay <= 12) {
          return new Date(year, potentialDay - 1, potentialMonth);
        }
        return new Date(year, potentialMonth - 1, potentialDay);
      }
    },
    
    // EU Format: DD/MM/YYYY
    {
      name: 'eu-date',
      priority: 85,
      pattern: /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/,
      parse: (m: RegExpMatchArray, options) => {
        const day = parseInt(m[1], 10);
        const month = parseInt(m[2], 10);
        const year = parse2DigitYear(parseInt(m[3], 10), options.referenceDate);
        return new Date(year, month - 1, day);
      }
    },
    
    // Compact: YYYYMMDD
    {
      name: 'compact-date',
      priority: 80,
      pattern: /(\d{4})(\d{1,2})(\d{1,2})/,
      parse: (m: RegExpMatchArray) => {
        const year = parseInt(m[1], 10);
        const month = parseInt(m[2], 10);
        const day = parseInt(m[3], 10);
        return year && month && day 
          ? new Date(year, month - 1, day)
          : null;
      }
    }
  ];
}
```

### patterns/textPatterns.ts

```typescript
import { DatePattern } from '../types';
import { getMonthIndex } from '../utils/dateHelpers';

export function createTextPatterns(): DatePattern[] {
  return [
    // Full month name with day and year: "January 15, 2024"
    {
      name: 'full-month-date',
      priority: 95,
      pattern: /(?:^|\s)(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:,?\s+(\d{4}))?/i,
      parse: (m: RegExpMatchArray, options) => {
        const monthIndex = getMonthIndex(m[1]);
        const day = parseInt(m[2], 10);
        const year = m[3] 
          ? parseInt(m[3], 10)
          : (options.referenceDate?.getFullYear() || new Date().getFullYear());
        
        if (monthIndex !== null) {
          return new Date(year, monthIndex, day);
        }
        return null;
      }
    },
    
    // Abbreviated month: "Jan 15, 2024"
    {
      name: 'abbrev-month-date',
      priority: 94,
      pattern: /(?:^|\s)(jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:,?\s+(\d{4}))?/i,
      parse: (m: RegExpMatchArray, options) => {
        const monthIndex = getMonthIndex(m[1]);
        const day = parseInt(m[2], 10);
        const year = m[3] 
          ? parseInt(m[3], 10)
          : (options.referenceDate?.getFullYear() || new Date().getFullYear());
        
        if (monthIndex !== null) {
          return new Date(year, monthIndex, day);
        }
        return null;
      }
    },
    
    // Month and year only: "January 2024"
    {
      name: 'month-year',
      priority: 80,
      pattern: /(?:^|\s)(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})(?!\s+\d)/i,
      parse: (m: RegExpMatchArray) => {
        const monthIndex = getMonthIndex(m[1]);
        const year = parseInt(m[2], 10);
        if (monthIndex !== null) {
          return new Date(year, monthIndex, 1);
        }
        return null;
      }
    },
    
    // Ordinal day: "January 15th, 2024"
    {
      name: 'ordinal-date',
      priority: 93,
      pattern: /(?:^|\s)(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th),?\s+(\d{4})/i,
      parse: (m: RegExpMatchArray) => {
        const monthIndex = getMonthIndex(m[1]);
        const day = parseInt(m[2], 10);
        const year = parseInt(m[3], 10);
        if (monthIndex !== null) {
          return new Date(year, monthIndex, day);
        }
        return null;
      }
    }
  ];
}
```

### parsers/RelativeDateParser.ts

```typescript
import { ParseOptions, ParseResult, DateType } from '../types';

export class RelativeDateParser {
  private readonly REFERENCE_DATE = new Date();
  
  parse(text: string, options: ParseOptions): ParseResult | null {
    const referenceDate = options.referenceDate || this.REFERENCE_DATE;
    const lowerText = text.trim().toLowerCase();
    
    // Direct relative terms
    const directMatch = this.parseDirectRelative(lowerText, referenceDate);
    if (directMatch) return directMatch;
    
    // Day of week patterns
    const dayMatch = this.parseDayOfWeek(lowerText, referenceDate);
    if (dayMatch) return dayMatch;
    
    // Week patterns
    const weekMatch = this.parseWeekPatterns(lowerText, referenceDate);
    if (weekMatch) return weekMatch;
    
    // Month patterns
    const monthMatch = this.parseMonthPatterns(lowerText, referenceDate);
    if (monthMatch) return monthMatch;
    
    // "X days ago/from now" patterns
    const durationMatch = this.parseDuration(lowerText, referenceDate);
    if (durationMatch) return durationMatch;
    
    return null;
  }
  
  private parseDirectRelative(text: string, ref: Date): ParseResult | null {
    const today = new Date(ref);
    today.setHours(0, 0, 0, 0);
    
    const relativeMap: Record<string, (date: Date) => Date> = {
      'today': (d) => d,
      'tomorrow': (d) => new Date(d.setDate(d.getDate() + 1)),
      'yesterday': (d) => new Date(d.setDate(d.getDate() - 1)),
      'now': (d) => d,
      'this week': (d) => new Date(d.setDate(d.getDate() - d.getDay())),
      'next week': (d) => new Date(d.setDate(d.getDate() - d.getDay() + 7)),
      'last week': (d) => new Date(d.setDate(d.getDate() - d.getDay() - 7)),
    };
    
    if (relativeMap[text]) {
      const result = relativeMap[text](new Date(today));
      return {
        date: result,
        confidence: 1.0,
        type: 'relative',
        originalText: text
      };
    }
    
    return null;
  }
  
  private parseDayOfWeek(text: string, ref: Date): ParseResult | null {
    const weekdays = [
      'sunday', 'monday', 'tuesday', 'wednesday', 
      'thursday', 'friday', 'saturday'
    ];
    
    const weekdayAbbr = [
      'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
    ];
    
    const today = new Date(ref);
    today.setHours(0, 0, 0, 0);
    const currentDay = today.getDay();
    
    // Find matching weekday
    let targetDay: number | null = null;
    for (let i = 0; i < weekdays.length; i++) {
      if (text === weekdays[i] || text === weekdayAbbr[i]) {
        targetDay = i;
        break;
      }
    }
    
    if (targetDay === null) return null;
    
    let result: Date;
    let confidence = 0.8;
    
    if (text.startsWith('next ')) {
      // Next occurrence of this day
      const daysUntil = (targetDay - currentDay + 7) % 7 || 7;
      result = new Date(today.setDate(today.getDate() + daysUntil));
    } else if (text.startsWith('last ')) {
      // Last occurrence of this day
      const daysAgo = (currentDay - targetDay + 7) % 7 || 7;
      result = new Date(today.setDate(today.getDate() - daysAgo));
    } else if (text.startsWith('this ')) {
      // This week's occurrence
      const daysUntil = (targetDay - currentDay + 7) % 7;
      result = new Date(today.setDate(today.getDate() + daysUntil));
      if (daysUntil === 0 && currentDay !== targetDay) {
        result = new Date(today.setDate(today.getDate() + 7));
      }
    } else {
      // Nearest occurrence (could be past or future)
      const daysUntil = (targetDay - currentDay + 7) % 7;
      result = new Date(today.setDate(today.getDate() + daysUntil));
    }
    
    return {
      date: result,
      confidence,
      type: 'relative',
      originalText: text
    };
  }
  
  private parseWeekPatterns(text: string, ref: Date): ParseResult | null {
    const today = new Date(ref);
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    
    const weekOffsets = {
      'this week': 0,
      'next week': 7,
      'last week': -7,
      'week 1': 0,
      'week 2': 7,
      'week 3': 14,
    };
    
    for (const [pattern, offset] of Object.entries(weekOffsets)) {
      if (text === pattern) {
        const result = new Date(today);
        result.setDate(result.getDate() + offset);
        return {
          date: result,
          confidence: 0.9,
          type: 'relative',
          originalText: text
        };
      }
    }
    
    return null;
  }
  
  private parseMonthPatterns(text: string, ref: Date): ParseResult | null {
    const today = new Date(ref);
    today.setHours(0, 0, 0, 0);
    
    const monthPatterns = {
      'this month': (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1),
      'next month': (d: Date) => {
        const result = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        return result;
      },
      'last month': (d: Date) => {
        const result = new Date(d.getFullYear(), d.getMonth() - 1, 1);
        return result;
      }
    };
    
    for (const [pattern, parser] of Object.entries(monthPatterns)) {
      if (text === pattern) {
        return {
          date: parser(today),
          confidence: 0.9,
          type: 'relative',
          originalText: text
        };
      }
    }
    
    return null;
  }
  
  private parseDuration(text: string, ref: Date): ParseResult | null {
    const today = new Date(ref);
    today.setHours(0, 0, 0, 0);
    
    // Patterns like "5 days ago", "2 weeks from now"
    const durationPattern = /(\d+)\s+(day|days|week|weeks|month|months)\s+(ago|from now|from today)?/i;
    const match = text.match(durationPattern);
    
    if (!match) return null;
    
    const amount = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    const direction = match[3]?.toLowerCase();
    
    let days: number;
    
    switch (unit) {
      case 'day':
      case 'days':
        days = amount;
        break;
      case 'week':
      case 'weeks':
        days = amount * 7;
        break;
      case 'month':
      case 'months':
        // Approximate months as 30 days
        days = amount * 30;
        break;
      default:
        return null;
    }
    
    const offset = direction === 'ago' ? -days : days;
    const result = new Date(today);
    result.setDate(result.getDate() + offset);
    
    return {
      date: result,
      confidence: 0.85,
      type: 'relative',
      originalText: text
    };
  }
}
```

### parsers/PatternParser.ts

```typescript
import { DatePattern, ParseResult, ParseOptions, DateType } from '../types';
import { isValidDate } from '../utils/dateHelpers';

export class PatternParser {
  private patterns: DatePattern[] = [];
  
  constructor(patterns: DatePattern[]) {
    // Sort by priority (highest first)
    this.patterns = [...patterns].sort((a, b) => b.priority - a.priority);
  }
  
  parse(text: string, options: ParseOptions): ParseResult | null {
    for (const pattern of this.patterns) {
      const match = text.match(pattern.pattern);
      if (match) {
        try {
          const date = pattern.parse(match, options);
          if (date && isValidDate(date)) {
            return {
              date,
              confidence: pattern.priority / 100,
              type: 'absolute',
              originalText: text,
              matchedPattern: pattern.name
            };
          }
        } catch (error) {
          continue;
        }
      }
    }
    
    return null;
  }
}
```

### parser/DateParser.ts

```typescript
import { ParseResult, ParseOptions, DateType } from '../types';
import { PatternParser } from '../parsers/PatternParser';
import { RelativeDateParser } from '../parsers/RelativeDateParser';
import { createNumericPatterns } from '../patterns/numericPatterns';
import { createTextPatterns } from '../patterns/textPatterns';
import { getLocale, resolveLocale } from '../utils/localeHelpers';
import { isValidDate } from '../utils/dateHelpers';

export class DateParser {
  private patternParser: PatternParser;
  private relativeParser: RelativeDateParser;
  private locale: string;
  private referenceDate: Date;
  
  constructor(options: ParseOptions = {}) {
    this.locale = resolveLocale(options.locale);
    this.referenceDate = options.referenceDate || new Date();
    
    const numericPatterns = createNumericPatterns();
    const textPatterns = createTextPatterns();
    
    this.patternParser = new PatternParser([...numericPatterns, ...textPatterns]);
    this.relativeParser = new RelativeDateParser();
  }
  
  /**
   * Parse a natural language date string
   */
  parse(text: string, options: ParseOptions = {}): ParseResult | null {
    const mergedOptions: ParseOptions = {
      ...options,
      locale: options.locale || this.locale,
      referenceDate: options.referenceDate || this.referenceDate
    };
    
    // Preprocess the input
    const processed = this.preprocess(text);
    
    // Try pattern-based parsing first
    let result = this.patternParser.parse(processed, mergedOptions);
    if (result) return result;
    
    // Try relative date parsing
    result = this.relativeParser.parse(processed, mergedOptions);
    if (result) return result;
    
    // Try fuzzy matching
    result = this.fuzzyParse(processed, mergedOptions);
    if (result) return result;
    
    return null;
  }
  
  /**
   * Parse and return Date directly, or null if parsing fails
   */
  parseDate(text: string, options?: ParseOptions): Date | null {
    const result = this.parse(text, options);
    return result?.date || null;
  }
  
  /**
   * Parse with strict mode - throws on failure
   */
  parseStrict(text: string, options?: ParseOptions): Date {
    const result = this.parse(text, { ...options, strict: true });
    if (!result) {
      throw new Error(`Unable to parse date: "${text}"`);
    }
    return result.date;
  }
  
  /**
   * Get parsing result with metadata
   */
  parseWithMetadata(text: string, options?: ParseOptions): ParseResult | null {
    return this.parse(text, options);
  }
  
  /**
   * Set reference date for relative parsing
   */
  setReferenceDate(date: Date): void {
    this.referenceDate = date;
  }
  
  /**
   * Set locale
   */
  setLocale(locale: string): void {
    this.locale = resolveLocale(locale);
  }
  
  /**
   * Preprocess input text
   */
  private preprocess(text: string): string {
    return text.trim()
      .replace(/\s+/g, ' ')
      .replace(/\b(a|an|the|on|at|in)\b/gi, '')
      .trim();
  }
  
  /**
   * Fuzzy parsing for complex expressions
   */
  private fuzzyParse(text: string, options: ParseOptions): ParseResult | null {
    const lowerText = text.toLowerCase();
    
    // Handle "around" expressions
    if (lowerText.startsWith('around ')) {
      const result = this.parse(text.substring(7), options);
      if (result) {
        result.confidence *= 0.8;
        return result;
      }
    }
    
    // Handle "approximately" expressions
    if (lowerText.startsWith('approximately ') || lowerText.startsWith('approx ')) {
      const prefixLen = lowerText.startsWith('approximately ') ? 14 : 7;
      const result = this.parse(text.substring(prefixLen), options);
      if (result) {
        result.confidence *= 0.8;
        return result;
      }
    }
    
    return null;
  }
}

// Export singleton instance for convenience
export const parser = new DateParser();

// Convenience function
export function parse(text: string, options?: ParseOptions): Date | null {
  return parser.parseDate(text, options);
}

export function parseStrict(text: string, options?: ParseOptions): Date {
  return parser.parseStrict(text, options);
}
```

### index.ts

```typescript
// ==================== MAIN EXPORTS ====================

export { DateParser } from './parser/DateParser';
export { parser, parse, parseStrict } from './parser/DateParser';

export type { 
  ParseResult, 
  ParseOptions, 
  DateType, 
  Parser, 
  DatePattern 
} from './types';

export { RelativeDateParser } from './parsers/RelativeDateParser';
export { PatternParser } from './parsers/PatternParser';

export { LOCALES } from './utils/localeHelpers';
```

## Usage Examples

```typescript
import { parse, parseStrict, parser, DateParser } from './date-parser';

// Simple usage
const date1 = parse("January 15, 2024");
console.log(date1); // Date: 2024-01-15

const date2 = parse("2024-01-15");
console.log(date2); // Date: 2024-01-15

// Relative dates
const today = new Date();
const date3 = parse("tomorrow", { referenceDate: today });
console.log(date3); // Date: today + 1 day

const date4 = parse("next Monday", { referenceDate: today });
console.log(date4); // Next Monday

// Custom parser with options
const customParser = new DateParser({ 
  locale: 'en-GB',
  referenceDate: new Date('2024-01-15')
});

const date5 = customParser.parse("25th December");
console.log(date5); // 2024-12-25

// Get detailed parse result
const result = parser.parseWithMetadata("the 15th of January, 2024");
console.log(result);
// {
//   date: Date(2024-01-15),
//   confidence: 0.9,
//   type: 'absolute',
//   originalText: 'the 15th of January, 2024',
//   matchedPattern: 'ordinal-date'
// }

// Strict mode (throws on failure)
try {
  const date = parseStrict("invalid date");
} catch (error) {
  console.error(error.message);
}
```

## Summary

This TypeScript library provides:

| Feature | Description |
|---------|-------------|
| **Pattern Matching** | Regex-based parsing for structured dates |
| **Grammar-based** | Ordered priority system for disambiguation |
| **Relative Dates** | Support for "tomorrow", "next week", etc. |
| **Locale Support** | Configurable date formats per locale |
| **Confidence Scores** | Each parse result includes confidence |
| **Type Safety** | Full TypeScript types and interfaces |

The architecture is modular and extensible, allowing you to easily add new patterns, parsers, or locales.
