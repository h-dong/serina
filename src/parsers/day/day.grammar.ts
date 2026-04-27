import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import DAY from 'patterns/day/day.constants';

import { dayStringToDateObj } from './day.helpers';

export type DayNode = LegacyPatternNode<'day'>;

export const dayParser = legacyPatternParser('day', DAY.WITH_FILLER_WORDS_AND_ORDINAL);

export const dayGrammar: GrammarParser<DayNode> = {
  name: 'day',
  parser: dayParser,
  evaluate: (node) => dayStringToDateObj(node.raw),
};
