import WeekDayAndTime from './weekdayAndTime';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

// Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
const mockDate = new Date('2019-01-19T18:06:18Z');
vi.useFakeTimers().setSystemTime(mockDate);

describe('Week Day and Time', () => {
    const mockWeekdayAndTime = (day, month, year, hour, min) =>
        dayLite(mockDate).set({ year, month, day, hour, minute: min }).startOf('minute').toDate();
    const text = 'go to work';

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { filter: 'on Monday 9am', input: `${text} on Monday 9am`, dateTime: mockWeekdayAndTime(21, 1, 2019, 9, 0) },
        { filter: 'on Tue 10pm', input: `${text} on Tue 10pm`, dateTime: mockWeekdayAndTime(22, 1, 2019, 22, 0) },
        { filter: '9am Mon', input: `${text} 9am Mon`, dateTime: mockWeekdayAndTime(21, 1, 2019, 9, 0) },
        { filter: '12pm Wed', input: `${text} 12pm Wed`, dateTime: mockWeekdayAndTime(23, 1, 2019, 12, 0) },
        { filter: '12:20 Sunday', input: `${text} 12:20 Sunday`, dateTime: mockWeekdayAndTime(20, 1, 2019, 12, 20) },
        {
            filter: 'at 1:20pm last Monday',
            input: `${text} at 1:20pm last Monday`,
            dateTime: mockWeekdayAndTime(14, 1, 2019, 13, 20),
        },
    ])('should be able to parse $filter', ({ filter, input, dateTime }) => {
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
