import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import RELATIVE_DATES from 'patterns/relativeDates/relativeDates.constants';

import { relativeDateStringToDateObj } from './relativeDates.helpers';

export type RelativeDatesNode = LegacyPatternNode<'relativeDates'>;

export const relativeDatesParser = legacyPatternParser('relativeDates', RELATIVE_DATES.WITH_FILLER_WORDS, {
  wordBoundary: false,
});

export const relativeDatesGrammar: GrammarParser<RelativeDatesNode> = {
  name: 'relativeDates',
  parser: relativeDatesParser,
  evaluate: (node) => relativeDateStringToDateObj(node.raw),
};
