import RELATIVE_DATES from './relativeDates.constants';
import { relativeDateStringToDateObj } from './relativeDates.helpers';
import Filter from 'filters/filter';

export default class RelativeDates extends Filter {
    constructor() {
        super(RELATIVE_DATES.WITH_FILLER_WORDS, false);
    }

    parseStringToDateObj(match: string): Date {
        return relativeDateStringToDateObj(match);
    }
}
