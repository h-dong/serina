import { DateParser, parse, parser } from 'parser/DateParser';
import type { ParseOptions, ParsedSchema } from 'types';

export { ParserRegistry, createDefaultParserRegistry } from 'parser/ParserRegistry';
export { Tokenizer, type Token } from 'parser/Tokenizer';

const serina = (text: string, options?: ParseOptions): ParsedSchema => {
  return parser.parse(text, options);
};

export { DateParser, parse, parser };
export type {
  DateObjectSchema,
  ParseOptions,
  ParsedMatchSchema,
  ParsedSchema,
  TestCaseSchema,
  TimeObjectSchema,
} from 'types';
export default serina;
