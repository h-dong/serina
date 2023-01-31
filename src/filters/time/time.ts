import TIME from './time.constants';
import Filter from 'filters/filter';
import { timeStringToHourMinute } from './time.helpers';

export default class Time extends Filter {
    constructor() {
        super(TIME.WITH_FILLER_WORDS, false);
    }

    parseStringToDateObj(match: string): Date {
        return timeStringToHourMinute(match);
    }
}
