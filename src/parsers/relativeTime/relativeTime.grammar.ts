import { type GrammarParser, type LegacyPatternNode, legacyPatternParser } from 'parser';
import RELATIVE_TIME from 'patterns/relativeTime/relativeTime.constants';

import { convertMatchToDateObj } from './relativeTime.helpers';

export type RelativeTimeNode = LegacyPatternNode<'relativeTime'>;

export const relativeTimeParser = legacyPatternParser('relativeTime', RELATIVE_TIME.ANY, { wordBoundary: false });

export const relativeTimeGrammar: GrammarParser<RelativeTimeNode> = {
  name: 'relativeTime',
  parser: relativeTimeParser,
  evaluate: (node) => convertMatchToDateObj(node.raw),
};
