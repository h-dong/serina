import TIME_KEYWORDS from './timeKeywords.constants';
import { timeKeywordsToDateObj } from './timeKeywords.helpers';
import Filter from 'filters/filter';

export default class TimeKeywords extends Filter {
    constructor() {
        super(TIME_KEYWORDS.WITH_FILLER_WORDS);
    }

    parseStringToDateObj(match: string): Date {
        return timeKeywordsToDateObj(match);
    }
}
