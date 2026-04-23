import Filter from 'filters/filter';

import DAY from './day.constants';
import { dayStringToDateObj } from './day.helpers';

export default class Day extends Filter {
  constructor() {
    super(DAY.WITH_FILLER_WORDS_AND_ORDINAL);
  }

  parseStringToDateObj(match: string): Date {
    return dayStringToDateObj(match);
  }
}
