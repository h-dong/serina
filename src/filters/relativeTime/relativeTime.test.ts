import { DateTime, Settings } from 'luxon';
import RelativeTime from './relativeTime';
import { ParsedMatchSchema } from 'serina.schema';

describe('RelativeTime', () => {
    // Mock Date Time to 2018/11/1 23:30:00 GMT+0110
    Settings.now = () => 1541115000000;

    const mockDates = (day, month, year, hour, minute, second) =>
        DateTime.utc()
            .set({ day, month, year, hour, minute, second })
            .startOf('second')
            .toJSDate();

    afterAll(() => {
        // Restore Mock
        Settings.now = () => Date.now();
    });

    test.each`
        filter                        | dateTime
        ${'in half an hour'}          | ${mockDates(2, 11, 2018, 0, 0, 0)}
        ${'in a quarter of a minute'} | ${mockDates(1, 11, 2018, 23, 30, 15)}
        ${'in 15 minutes'}            | ${mockDates(1, 11, 2018, 23, 45, 0)}
        ${'in 15 mins'}               | ${mockDates(1, 11, 2018, 23, 45, 0)}
        ${'in 15 min'}                | ${mockDates(1, 11, 2018, 23, 45, 0)}
        ${'in an hour'}               | ${mockDates(2, 11, 2018, 0, 30, 0)}
        ${'in 1 hour'}                | ${mockDates(2, 11, 2018, 0, 30, 0)}
        ${'in 1 hr'}                  | ${mockDates(2, 11, 2018, 0, 30, 0)}
        ${'in 2 hours'}               | ${mockDates(2, 11, 2018, 1, 30, 0)}
        ${'in 2 hrs'}                 | ${mockDates(2, 11, 2018, 1, 30, 0)}
        ${'2 hrs from now'}           | ${mockDates(2, 11, 2018, 1, 30, 0)}
        ${'2 hrs after'}              | ${mockDates(2, 11, 2018, 1, 30, 0)}
        ${'2 hrs later'}              | ${mockDates(2, 11, 2018, 1, 30, 0)}
        ${'after 2 hrs'}              | ${mockDates(2, 11, 2018, 1, 30, 0)}
        ${'after 30 secs'}            | ${mockDates(1, 11, 2018, 23, 30, 30)}
        ${'after 60 seconds'}         | ${mockDates(1, 11, 2018, 23, 31, 0)}
    `('should not parse $filter', ({ filter, dateTime }) => {
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
