import Filter from 'filters/filter';
import WEEKDAY_AND_TIME from './weekdayAndTime2.constants';
import { weekdayAndTimeToDateObj } from './weekdayAndTime2.helpers';

export default class WeekdayAndTime extends Filter {
    constructor() {
        super(WEEKDAY_AND_TIME.ANY);
    }

    parseStringToDateObj(match: string): Date {
        return weekdayAndTimeToDateObj(match);
    }
}
