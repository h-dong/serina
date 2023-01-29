import RELATIVE_DATES from './relativeDates.constants';
import { relativeDateStringToDateObj } from './relativeDates.helpers';
import Filter from 'filters/filter';
import DATES from 'filters/dates/dates.constants';

export default class RelativeDates extends Filter {
    constructor() {
        // TODO: change this template literal
        super(`(${DATES.FILLER_WORDS})?${RELATIVE_DATES.ANY}`);
    }

    parseStringToDateObj(match: string): Date {
        return relativeDateStringToDateObj(match);
    }
}
