import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import YEAR from 'patterns/year/year.constants';

import { yearStringToDate } from './year.helpers';

export type YearNode = LegacyPatternNode<'year'>;

export const yearParser = legacyPatternParser('year', YEAR.WITH_FILLER_WORDS);

export const yearGrammar: GrammarParser<YearNode> = {
  name: 'year',
  parser: yearParser,
  evaluate: (node) => yearStringToDate(node.raw),
};
