import { partialDateStringToDateObj } from './partialDates.helpers';
import PARTIAL_DATES from './partialDates.constants';
import Filter from 'filters/filter';

export default class PartialDates extends Filter {
    constructor() {
        super(PARTIAL_DATES.WITH_FILTER_WORDS, false);
    }

    parseStringToDateObj(match: string): Date {
        return partialDateStringToDateObj(match);
    }
}
