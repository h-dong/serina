import RelativeDates from 'filters/relativeDates/relativeDates';
import { ParsedMatchSchema } from 'serina.schema';

describe('RelativeDates', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52.123Z'));

    const mockDates = (date: string) => {
        const d = new Date(date);
        d.setUTCMilliseconds(0);
        d.setUTCSeconds(0);
        d.setUTCHours(0);
        return d;
    };

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { filter: 'next week', dateTime: mockDates('2019-06-24T00:00:00.000Z') },
        { filter: 'next month', dateTime: mockDates('2019-07-01T00:00:00.000Z') },
        { filter: 'next year', dateTime: mockDates('2020-01-01T00:00:00.000Z') },
        { filter: 'today', dateTime: mockDates('2019-06-20T00:00:00.000Z') },
        { filter: 'in a day', dateTime: mockDates('2019-06-21T00:00:00.000Z') },
        { filter: 'in a week', dateTime: mockDates('2019-06-27T00:00:00.000Z') },
        { filter: 'in 5 weeks', dateTime: mockDates('2019-07-25T00:00:00.000Z') },
        { filter: 'tomorrow', dateTime: mockDates('2019-06-21T00:00:00.000Z') },
        { filter: 'in 5 days', dateTime: mockDates('2019-06-25T00:00:00.000Z') },
        { filter: 'in 31 days', dateTime: mockDates('2019-07-21T00:00:00.000Z') },
        { filter: 'in a wk', dateTime: mockDates('2019-06-27T00:00:00.000Z') },
        { filter: 'in 5 wks', dateTime: mockDates('2019-07-25T00:00:00.000Z') },
        { filter: 'in a month', dateTime: mockDates('2019-07-20T00:00:00.000Z') },
        { filter: 'in 5 months', dateTime: mockDates('2019-11-20T00:00:00.000Z') },
        { filter: 'in 12 months', dateTime: mockDates('2020-06-20T00:00:00.000Z') },
        { filter: 'in a year', dateTime: mockDates('2020-06-20T00:00:00.000Z') },
        { filter: 'in 5 years', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        { filter: 'in a yr', dateTime: mockDates('2020-06-20T00:00:00.000Z') },
        { filter: 'in 5 yrs', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        { filter: '5 years later', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        { filter: '5 years from now', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        { filter: '5 years from now', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
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
                dateTime: mockDates('2024-06-20T00:00:00.000Z'),
                text: 'Hand in paper',
                matched: '5 years from now',
            },
        ];

        expect(RelativeDates.parseText(text)).toEqual(result);
    });
});
