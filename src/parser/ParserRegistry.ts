import { dateAndTimeGrammar } from 'parsers/dateAndTime/dateAndTime.grammar';
import { datesGrammar } from 'parsers/dates/dates.grammar';
import { dayGrammar } from 'parsers/day/day.grammar';
import { defaultContext } from 'parsers/GrammarParser';
import { monthGrammar } from 'parsers/month/month.grammar';
import { partialDatesGrammar } from 'parsers/partialDates/partialDates.grammar';
import { relativeDatesGrammar } from 'parsers/relativeDates/relativeDates.grammar';
import { relativeTimeGrammar } from 'parsers/relativeTime/relativeTime.grammar';
import { timeGrammar } from 'parsers/time/time.grammar';
import { timeKeywordsGrammar } from 'parsers/timeKeywords/timeKeywords.grammar';
import { weekdayGrammar } from 'parsers/weekday/weekday.grammar';
import { weekdayAndTimeGrammar } from 'parsers/weekdayAndTime/weekdayAndTime.grammar';
import { yearGrammar } from 'parsers/year/year.grammar';
import type { ParseOptions, ParsedMatchSchema, ParsedSchema } from 'types';

import { type LegacyFilter, toLegacyFilter } from './adapter';

export class ParserRegistry {
  constructor(private readonly parsers: readonly LegacyFilter[]) {}

  parse(text: string, options: ParseOptions = {}): ParsedSchema {
    const ctx = defaultContext(options);
    const parsedData: ParsedSchema = {
      original: text,
      isValid: false,
      matches: [],
    };

    for (const parser of this.parsers) {
      const results: ParsedMatchSchema[] | null = parser.parseText(text, ctx);
      if (results && results.length) parsedData.matches = parsedData.matches.concat(results);
    }

    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
  }
}

/**
 * Keeps the historical parser order while each entry now lives in the
 * doc-style `parsers/` folder and exposes the GrammarParser interface.
 */
export function createDefaultParserRegistry(): ParserRegistry {
  return new ParserRegistry([
    toLegacyFilter(weekdayGrammar),
    toLegacyFilter(dayGrammar),
    toLegacyFilter(monthGrammar),
    toLegacyFilter(yearGrammar),
    toLegacyFilter(timeGrammar),
    toLegacyFilter(datesGrammar),
    toLegacyFilter(partialDatesGrammar),
    toLegacyFilter(dateAndTimeGrammar),
    toLegacyFilter(relativeTimeGrammar),
    toLegacyFilter(relativeDatesGrammar),
    toLegacyFilter(weekdayAndTimeGrammar),
    toLegacyFilter(timeKeywordsGrammar),
  ]);
}
