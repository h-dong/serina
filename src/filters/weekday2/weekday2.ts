import Filter from 'filters/filter';
import WEEKDAY from './weekday2.constants';
import { weekdayStringToDateObj } from './weekday2.helpers';

export default class Weekday extends Filter {
    constructor() {
        // When parsing day of the week, check for relative words & week day e.g. next friday
        super(WEEKDAY.WITH_FUTURE_PAST_WORDS);
    }

    parseStringToDateObj(match: string): Date {
        return weekdayStringToDateObj(match);
    }
}
