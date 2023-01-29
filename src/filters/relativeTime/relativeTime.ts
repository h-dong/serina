import RELATIVE_TIME from './relativeTime.constants';
import { convertMatchToDateObj } from './relativeTime.helpers';
import Filter from 'filters/filter';

export default class RelativeTime extends Filter {
    constructor() {
        super(RELATIVE_TIME.ANY);
    }

    parseStringToDateObj(match: string): Date {
        return convertMatchToDateObj(match);
    }
}
