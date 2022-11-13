import WeekDayAndTime from './weekDayAndTime';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

// Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
const mockDate = new Date(2019, 1, 19);
jest.useFakeTimers().setSystemTime(mockDate);

describe('Week Day and Time', () => {
    const mockWeekdayAndTime = (day, month, year, hour, min) =>
        dayLite(mockDate).set({ year, month, day, hour, minute: min }).startOf('minute').toDate();
    const text = 'go to work';

    afterAll(() => {
        jest.useRealTimers();
    });

    test.each`
        filter                     | input                              | dateTime
        ${'on Monday 9am'}         | ${`${text} on Monday 9am`}         | ${mockWeekdayAndTime(21, 1, 2019, 9, 0)}
        ${'on Tue 10pm'}           | ${`${text} on Tue 10pm`}           | ${mockWeekdayAndTime(22, 1, 2019, 22, 0)}
        ${'9am Mon'}               | ${`${text} 9am Mon`}               | ${mockWeekdayAndTime(21, 1, 2019, 9, 0)}
        ${'12pm Wed'}              | ${`${text} 12pm Wed`}              | ${mockWeekdayAndTime(23, 1, 2019, 12, 0)}
        ${'12:20 Sunday'}          | ${`${text} 12:20 Sunday`}          | ${mockWeekdayAndTime(20, 1, 2019, 12, 20)}
        ${'at 1:20pm last Monday'} | ${`${text} at 1:20pm last Monday`} | ${mockWeekdayAndTime(14, 1, 2019, 13, 20)}
    `('should be able to parse $filter', ({ filter, input, dateTime }) => {
        const results = WeekDayAndTime.parseText(input);
        const output = [{ dateTime, matched: filter, text }];
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const mockText = 'Hand in paper on monday 9am';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockWeekdayAndTime(21, 1, 2019, 9, 0),
                text: 'Hand in paper',
                matched: 'on monday 9am',
            },
        ];

        expect(WeekDayAndTime.parseText(mockText)).toEqual(result);
    });

    test('should not match filler word in string', () => {
        const mockText = 'Gym session monday 9am';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockWeekdayAndTime(21, 1, 2019, 9, 0),
                text: 'Gym session',
                matched: 'monday 9am',
            },
        ];

        expect(WeekDayAndTime.parseText(mockText)).toEqual(result);
    });
});
