import { dateStringToDateObj } from './dates.helpers';
import DATES from './dates.constants';
import Filter from 'filters/filter';

export default class Dates extends Filter {
    constructor() {
        super(DATES.WITH_FILLER_WORDS);
    }

    parseStringToDateObj(match: string): Date {
        return dateStringToDateObj(match);
    }
}
