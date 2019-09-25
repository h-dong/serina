import { DateTime } from 'luxon';
import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from '../weekDay/weekDay.constants';
import { contains, matchPattern, trimWhiteSpaces } from 'utils';
import WEEKDAY_AND_TIME from './weekDayAndTime.constants';
import TIME from 'filters/time/time.constants';

export default class WeekDayAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = WEEKDAY_AND_TIME.ANY;
        const matchForWeekdayAndTime = matchPattern(text, pattern);

        if (!matchForWeekdayAndTime) return null;

        // for each match, get the parsed cases
        return matchForWeekdayAndTime.map(elem => this.parseWeekdayAndTimeMatches(text, elem));
    }

    static parseWeekdayAndTimeMatches(text: string, matchedWeekday: string): ParsedMatchSchema {
        const replaceMatch = text.toLowerCase().replace(matchedWeekday, '');

        return {
            text: trimWhiteSpaces(replaceMatch),
            dateTime: this.convertWeekdayMatchAndTimeToDate(matchedWeekday),
            matched: trimWhiteSpaces(matchedWeekday),
        };
    }

    static convertWeekdayMatchAndTimeToDate(matchingText) {
        console.log('matchingText', matchingText);
        // const pattern = `(${TIME.FILLER_WORDS})?(${TIME.ANY})`;
        // const time = matchPattern(text, pattern, false);

        // 12:20 sunday

        const time = matchPattern(matchingText, TIME.ANY);
        console.log('time', time);
        const weekDay = matchPattern(matchingText, WEEKDAY.ANY);
        console.log('weekDay', weekDay);


        let weekday = null;

        const todayInWeekday = DateTime.utc().weekday;

        Object.keys(WEEKDAY.SINGLE).forEach((key, index) => {
            const weekdayPattern = WEEKDAY.SINGLE[key];
            if (contains(matchingText, weekdayPattern)) {
                weekday = index + 1;
            }
        });

        if (weekday <= todayInWeekday) weekday += 7;

        if (!weekday) return null;

        if (contains(matchingText, `${WEEKDAY.PAST_WORDS} ${WEEKDAY.ANY}`)) weekday -= 7;

        return DateTime.utc()
            .set({ weekday })
            .startOf('day')
            .toJSDate();
    }
}
