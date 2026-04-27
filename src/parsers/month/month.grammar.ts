import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import MONTH from 'patterns/month/month.constants';

import { monthStringToDateObj } from './month.helpers';

export type MonthNode = LegacyPatternNode<'month'>;

export const monthParser = legacyPatternParser('month', MONTH.WITH_FUTURE_PAST_WORDS);

export const monthGrammar: GrammarParser<MonthNode> = {
  name: 'month',
  parser: monthParser,
  evaluate: (node) => monthStringToDateObj(node.raw),
};
