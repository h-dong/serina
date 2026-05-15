import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import WEEKDAY_AND_TIME from 'patterns/weekdayAndTime/weekdayAndTime.constants';

import { weekdayAndTimeToDateObj } from './weekdayAndTime.helpers';

export type WeekdayAndTimeNode = LegacyPatternNode<'weekdayAndTime'>;

export const weekdayAndTimeParser = legacyPatternParser('weekdayAndTime', WEEKDAY_AND_TIME.ANY);

export const weekdayAndTimeGrammar: GrammarParser<WeekdayAndTimeNode> = {
  name: 'weekdayAndTime',
  parser: weekdayAndTimeParser,
  evaluate: (node) => weekdayAndTimeToDateObj(node.raw),
};
