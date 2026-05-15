import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import WEEKDAY from 'patterns/weekday/weekday.constants';

import { weekdayStringToDateObj } from './weekday.helpers';

export type WeekdayNode = LegacyPatternNode<'weekday'>;

export const weekdayParser = legacyPatternParser('weekday', WEEKDAY.WITH_FUTURE_PAST_WORDS);

export const weekdayGrammar: GrammarParser<WeekdayNode> = {
  name: 'weekday',
  parser: weekdayParser,
  evaluate: (node) => weekdayStringToDateObj(node.raw),
};
