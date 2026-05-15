export interface Token {
  readonly value: string;
  readonly start: number;
  readonly end: number;
}

export class Tokenizer {
  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    const pattern = /\S+/g;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
      tokens.push({
        value: match[0],
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    return tokens;
  }
}
