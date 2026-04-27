import { vi } from 'vitest';

import serina, {
  DateParser,
  ParserRegistry,
  Tokenizer,
  createDefaultParserRegistry,
  parse,
  parser,
} from 'serina';

const mocks = vi.hoisted(() => {
  const parsedResult = {
    original: 'meet tomorrow',
    isValid: true,
    matches: [],
  };

  return {
    DateParser: vi.fn(),
    ParserRegistry: vi.fn(),
    Tokenizer: vi.fn(),
    createDefaultParserRegistry: vi.fn(),
    parse: vi.fn(),
    parsedResult,
    parser: {
      parse: vi.fn(() => parsedResult),
    },
  };
});

vi.mock('parser/DateParser', () => ({
  DateParser: mocks.DateParser,
  parse: mocks.parse,
  parser: mocks.parser,
}));

vi.mock('parser/ParserRegistry', () => ({
  ParserRegistry: mocks.ParserRegistry,
  createDefaultParserRegistry: mocks.createDefaultParserRegistry,
}));

vi.mock('parser/Tokenizer', () => ({
  Tokenizer: mocks.Tokenizer,
}));

describe('Serina entrypoint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('default export delegates to the singleton parser', () => {
    const options = { locale: 'en-GB' } as const;

    const results = serina('meet tomorrow', options);

    expect(parser.parse).toHaveBeenCalledWith('meet tomorrow', options);
    expect(results).toBe(mocks.parsedResult);
  });

  test('re-exports parser API from DateParser', () => {
    expect(DateParser).toBe(mocks.DateParser);
    expect(parse).toBe(mocks.parse);
    expect(parser).toBe(mocks.parser);
  });

  test('re-exports parser infrastructure', () => {
    expect(ParserRegistry).toBe(mocks.ParserRegistry);
    expect(createDefaultParserRegistry).toBe(mocks.createDefaultParserRegistry);
    expect(Tokenizer).toBe(mocks.Tokenizer);
  });
});
