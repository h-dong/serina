import Filter from 'filters/filter';

import TIME_KEYWORDS from './timeKeywords.constants';
import { timeKeywordsToDateObj } from './timeKeywords.helpers';

export default class TimeKeywords extends Filter {
  constructor() {
    super(TIME_KEYWORDS.WITH_FILLER_WORDS, false);
  }

  parseStringToDateObj(match: string): Date {
    return timeKeywordsToDateObj(match);
  }
}
