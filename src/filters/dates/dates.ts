import Filter from 'filters/filter';

import DATES from './dates.constants';
import { dateStringToDateObj } from './dates.helpers';

export default class Dates extends Filter {
  constructor() {
    super(DATES.WITH_FILLER_WORDS, false);
  }

  parseStringToDateObj(match: string): Date {
    return dateStringToDateObj(match);
  }
}
