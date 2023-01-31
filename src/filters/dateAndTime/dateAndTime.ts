import { dateAndTimeToDateObj } from './dateAndTime.helpers';
import DATE_AND_TIME from './dateAndTime.constants';
import Filter from 'filters/filter';

export default class DateAndTime extends Filter {
    constructor() {
        super(DATE_AND_TIME.ANY, false);
    }

    parseStringToDateObj(match: string): Date {
        return dateAndTimeToDateObj(match);
    }
}
