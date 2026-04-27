import type { LegacyFilter } from 'parser/adapter';
import { ParserRegistry, createDefaultParserRegistry } from 'parser/ParserRegistry';

describe('ParserRegistry', () => {
  test('returns an invalid result when no registered parser matches', () => {
    const registry = new ParserRegistry([]);
    expect(registry.parse('no date here')).toEqual({
      original: 'no date here',
      isValid: false,
      matches: [],
    });
  });

  test('combines matches from registered parsers', () => {
    const dateTime = new Date('2024-01-01T00:00:00.000Z');
    const parser: LegacyFilter = {
      parseText: () => [
        {
          dateTime,
          matched: 'today',
          text: 'book',
        },
      ],
    };

    expect(new ParserRegistry([parser]).parse('book today')).toEqual({
      original: 'book today',
      isValid: true,
      matches: [
        {
          dateTime,
          matched: 'today',
          text: 'book',
        },
      ],
    });
  });

  test.each<[ReturnType<LegacyFilter['parseText']>]>([[null], [[]]])('ignores non-matching parser result %s', (result) => {
    const parser: LegacyFilter = {
      parseText: () => result,
    };

    expect(new ParserRegistry([parser]).parse('no date here')).toEqual({
      original: 'no date here',
      isValid: false,
      matches: [],
    });
  });

  test('creates the default parser registry', () => {
    expect(createDefaultParserRegistry()).toBeInstanceOf(ParserRegistry);
  });
});
