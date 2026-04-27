import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import PARTIAL_DATES from 'patterns/partialDates/partialDates.constants';

import { partialDateStringToDateObj } from './partialDates.helpers';

export type PartialDatesNode = LegacyPatternNode<'partialDates'>;

export const partialDatesParser = legacyPatternParser('partialDates', PARTIAL_DATES.WITH_FILTER_WORDS, {
  wordBoundary: false,
});

export const partialDatesGrammar: GrammarParser<PartialDatesNode> = {
  name: 'partialDates',
  parser: partialDatesParser,
  evaluate: (node, ctx) => partialDateStringToDateObj(node.raw, ctx.locale),
};
