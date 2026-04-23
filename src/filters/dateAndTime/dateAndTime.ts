import Filter from 'filters/filter';

import DATE_AND_TIME from './dateAndTime.constants';
import { dateAndTimeToDateObj } from './dateAndTime.helpers';

export default class DateAndTime extends Filter {
  constructor() {
    super(DATE_AND_TIME.ANY, false);
  }

  parseStringToDateObj(match: string): Date {
    return dateAndTimeToDateObj(match);
  }
}
