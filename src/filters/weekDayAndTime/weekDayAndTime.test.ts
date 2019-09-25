import { DateTime, Settings } from 'luxon';
import WeekDayAndTime from './weekDayAndTime';

const mockWeekdayAndTime = (weekday, hour, min) => DateTime.utc()
    .set({ weekday, hour, minute: min })
    .startOf('minute')
    .toJSDate();

describe('Week Day and Time', () => {

    beforeAll(() => {
        // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
        Settings.now = () => new Date(2019, 0, 19).valueOf();
    });

    test.each`
        filter             | text                          | dateTime
        ${'on Monday 9am'} | ${'go to work on Monday 9am'} | ${mockWeekdayAndTime(8, 9, 0)}
        ${'on Tue 10pm'}   | ${'go to work on Tue 10pm'}   | ${mockWeekdayAndTime(8, 22, 0)}
        ${'9am Mon'}       | ${'go to work 9am Mon'}       | ${mockWeekdayAndTime(8, 9, 0)}
        ${'12pm Wed'}      | ${'go to work 12pm Wed'}      | ${mockWeekdayAndTime(8, 12, 0)}
        ${'12:20 Sunday'}  | ${'go to work 12:20 Sunday'}  | ${mockWeekdayAndTime(8, 12, 20)}
    `('should be able to parse $filter', ({ filter, text, dateTime }) => {
        const results = WeekDayAndTime.parseText(text);
        const output = [
            { dateTime, matched: filter, text: 'go to work' }
        ];
        expect(results).toEqual(output);
    });
});
