import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import TIME_KEYWORDS from 'patterns/timeKeywords/timeKeywords.constants';

import { timeKeywordsToDateObj } from './timeKeywords.helpers';

export type TimeKeywordsNode = LegacyPatternNode<'timeKeywords'>;

export const timeKeywordsParser = legacyPatternParser('timeKeywords', TIME_KEYWORDS.WITH_FILLER_WORDS, {
  wordBoundary: false,
});

export const timeKeywordsGrammar: GrammarParser<TimeKeywordsNode> = {
  name: 'timeKeywords',
  parser: timeKeywordsParser,
  evaluate: (node) => timeKeywordsToDateObj(node.raw),
};
