import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from 'filters/weekday/weekday.constants';
import { matchPattern } from 'lib/string/stringUtil';
import timeStringToDateObj from 'utils/convertTimeStringToObj';
import { contains } from 'lib/string/stringUtil';
import WEEKDAY_AND_TIME from './weekdayAndTime.constants';
import { parseMatches } from 'lib/string/stringUtil';
import { weekdayAndTimeToDateObj } from './weekdayAndTime.helpers';

export default class WeekdayAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = WEEKDAY_AND_TIME.ANY;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = weekdayAndTimeToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }
}
