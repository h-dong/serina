import Filter from 'filters/filter';

import RELATIVE_TIME from './relativeTime.constants';
import { convertMatchToDateObj } from './relativeTime.helpers';

export default class RelativeTime extends Filter {
  constructor() {
    super(RELATIVE_TIME.ANY, false);
  }

  parseStringToDateObj(match: string): Date {
    return convertMatchToDateObj(match);
  }
}
