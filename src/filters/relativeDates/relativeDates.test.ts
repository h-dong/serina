import RelativeDates from 'filters/relativeDates/relativeDates';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';
import { DayLiteUnits } from 'lib/date/types';

describe('RelativeDates', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52'));

    const mockDates = (date: string) => dayLite(new Date(date)).start('day').toDate();
    const mockNext = (period: DayLiteUnits) => dayLite().next(1, period).start(period).toDate();

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { filter: 'next week', dateTime: mockNext('week') },
        { filter: 'next month', dateTime: mockNext('month') },
        { filter: 'next year', dateTime: mockNext('year') },
        { filter: 'today', dateTime: mockDates('2019-06-20T00:00:00') },
        { filter: 'in a day', dateTime: mockDates('2019-06-21T00:00:00') },
        { filter: 'in a week', dateTime: mockDates('2019-06-27T00:00:00') },
        { filter: 'in 5 weeks', dateTime: mockDates('2019-07-25T00:00:00') },
        { filter: 'tomorrow', dateTime: mockDates('2019-06-21T00:00:00') },
        { filter: 'in 5 days', dateTime: mockDates('2019-06-25T00:00:00') },
        { filter: 'in 31 days', dateTime: mockDates('2019-07-21T00:00:00') },
        { filter: 'in a wk', dateTime: mockDates('2019-06-27T00:00:00') },
        { filter: 'in 5 wks', dateTime: mockDates('2019-07-25T00:00:00') },
        { filter: 'in a month', dateTime: mockDates('2019-07-20T00:00:00') },
        { filter: 'in 5 months', dateTime: mockDates('2019-11-20T00:00:00') },
        { filter: 'in 12 months', dateTime: mockDates('2020-06-20T00:00:00') },
        { filter: 'in a year', dateTime: mockDates('2020-06-20T00:00:00') },
        { filter: 'in 5 years', dateTime: mockDates('2024-06-20T00:00:00') },
        { filter: 'in a yr', dateTime: mockDates('2020-06-20T00:00:00') },
        { filter: 'in 5 yrs', dateTime: mockDates('2024-06-20T00:00:00') },
        { filter: '5 years later', dateTime: mockDates('2024-06-20T00:00:00') },
        { filter: '5 years from now', dateTime: mockDates('2024-06-20T00:00:00') },
        { filter: '5 years from now', dateTime: mockDates('2024-06-20T00:00:00') },
    ])('should parse "$filter"', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = RelativeDates.parseText(`${text} ${filter}`);
        const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper 5 years from now';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates('2024-06-20T00:00:00'),
                text: 'Hand in paper',
                matched: '5 years from now',
            },
        ];

        expect(RelativeDates.parseText(text)).toEqual(result);
    });
});
