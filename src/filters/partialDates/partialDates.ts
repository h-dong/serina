import Filter from 'filters/filter';

import PARTIAL_DATES from './partialDates.constants';
import { partialDateStringToDateObj } from './partialDates.helpers';

export default class PartialDates extends Filter {
  constructor() {
    super(PARTIAL_DATES.WITH_FILTER_WORDS, false);
  }

  parseStringToDateObj(match: string): Date {
    return partialDateStringToDateObj(match);
  }
}
