import TIME from './time.constants';
import Filter from 'filters/filter';
import { timeStringToHourMinute } from './time.helpers';

export default class Time extends Filter {
    constructor() {
        super(`(${TIME.FILLER_WORDS}( ))?${TIME.ANY}`);
    }

    parseStringToDateObj(match: string): Date {
        return timeStringToHourMinute(match);
    }
}
