import { partialDateStringToDateObj } from './partialDates.helpers';
import DATES from 'filters/dates/dates.constants';
import PARTIAL_DATES from './partialDates.constants';
import Filter from 'filters/filter';

export default class PartialDates extends Filter {
    constructor() {
        // TODO: change this template literal
        super(`(${DATES.FILLER_WORDS})?(${PARTIAL_DATES.ANY})`);
    }

    parseStringToDateObj(match: string): Date {
        return partialDateStringToDateObj(match);
    }
}
