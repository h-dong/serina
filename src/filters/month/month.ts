import Filter from 'filters/filter';
import MONTH from './month.constants';
import { monthStringToDateObj } from './month.helpers';

export default class Month extends Filter {
    constructor() {
        super(MONTH.WITH_FUTURE_PAST_WORDS);
    }

    parseStringToDateObj(match: string): Date {
        return monthStringToDateObj(match);
    }
}
