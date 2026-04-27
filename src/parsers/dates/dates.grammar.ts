import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import DATES from 'patterns/dates/dates.constants';

import { dateStringToDateObj } from './dates.helpers';

export type DatesNode = LegacyPatternNode<'dates'>;

export const datesParser = legacyPatternParser('dates', DATES.WITH_FILLER_WORDS, { wordBoundary: false });

export const datesGrammar: GrammarParser<DatesNode> = {
  name: 'dates',
  parser: datesParser,
  evaluate: (node, ctx) => dateStringToDateObj(node.raw, ctx.locale),
};
