import Filter from 'filters/filter';
import YEAR from './year.constants';
import { yearStringToDate } from './year.helpers';

// parsing year between 1000 - 9999
export default class Year extends Filter {
    constructor() {
        super(YEAR.WITH_FILLER_WORDS);
    }

    parseStringToDateObj(match: string): Date {
        return yearStringToDate(match);
    }
}
