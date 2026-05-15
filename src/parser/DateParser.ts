import type { ParseOptions, ParsedSchema } from 'types';

import { type ParserRegistry, createDefaultParserRegistry } from './ParserRegistry';

export class DateParser {
  constructor(
    private readonly options: ParseOptions = {},
    private readonly registry: ParserRegistry = createDefaultParserRegistry(),
  ) {}

  parse(text: string, options: ParseOptions = {}): ParsedSchema {
    return this.registry.parse(text, { ...this.options, ...options });
  }
}

export const parser = new DateParser();

export function parse(text: string, options?: ParseOptions): ParsedSchema {
  return parser.parse(text, options);
}
