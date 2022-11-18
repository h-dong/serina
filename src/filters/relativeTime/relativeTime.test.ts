import RelativeTime from './relativeTime';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('RelativeTime', () => {
    // Mock Date Time to 2018/11/1 23:30:00 GMT+0110
    const mockDate = new Date('2018-11-01T23:30:00');
    vi.useFakeTimers().setSystemTime(mockDate);

    const mockDates = (day, month, year, hour, minute, second) =>
        dayLite(mockDate).set({ day, month, year, hour, minute, second }).startOf('second').toDate();

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { filter: 'in half an hour', dateTime: mockDates(2, 11, 2018, 0, 0, 0) },
        { filter: 'in a quarter of a minute', dateTime: mockDates(1, 11, 2018, 23, 30, 15) },
        { filter: 'in 15 minutes', dateTime: mockDates(1, 11, 2018, 23, 45, 0) },
        { filter: 'in 15 mins', dateTime: mockDates(1, 11, 2018, 23, 45, 0) },
        { filter: 'in 15 min', dateTime: mockDates(1, 11, 2018, 23, 45, 0) },
        { filter: 'in an hour', dateTime: mockDates(2, 11, 2018, 0, 30, 0) },
        { filter: 'in 1 hour', dateTime: mockDates(2, 11, 2018, 0, 30, 0) },
        { filter: 'in 1 hr', dateTime: mockDates(2, 11, 2018, 0, 30, 0) },
        { filter: 'in 2 hours', dateTime: mockDates(2, 11, 2018, 1, 30, 0) },
        { filter: 'in 2 hrs', dateTime: mockDates(2, 11, 2018, 1, 30, 0) },
        { filter: '2 hrs from now', dateTime: mockDates(2, 11, 2018, 1, 30, 0) },
        { filter: '2 hrs after', dateTime: mockDates(2, 11, 2018, 1, 30, 0) },
        { filter: '2 hrs later', dateTime: mockDates(2, 11, 2018, 1, 30, 0) },
        { filter: 'after 2 hrs', dateTime: mockDates(2, 11, 2018, 1, 30, 0) },
        { filter: 'after 30 secs', dateTime: mockDates(1, 11, 2018, 23, 30, 30) },
        { filter: 'after 60 seconds', dateTime: mockDates(1, 11, 2018, 23, 31, 0) },
    ])('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = RelativeTime.parseText(`${text} ${filter}`);
        const output = [{ dateTime, matched: filter, text }];
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper in 2 hrs';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(2, 11, 2018, 1, 30, 0),
                text: 'Hand in paper',
                matched: 'in 2 hrs',
            },
        ];

        expect(RelativeTime.parseText(text)).toEqual(result);
    });
});
