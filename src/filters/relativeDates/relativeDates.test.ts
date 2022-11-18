import RelativeDates from 'filters/relativeDates/relativeDates';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';
import { DataTimeUnits } from 'lib/date/types';

describe('RelativeDates', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52'));

    const currentYear = dayLite().year;
    const currentMonth = dayLite().month;
    const currentDay = dayLite().day;

    const mockDates = (day, month, year) => dayLite().set({ day, month, year }).endOf('day').toDate();

    const mockNext = (period: DataTimeUnits) => dayLite().next(1, period).startOf(period).endOf('day').toDate();

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { filter: 'next week', dateTime: mockNext('week') },
        { filter: 'next month', dateTime: mockNext('month') },
        { filter: 'next year', dateTime: mockNext('year') },
        { filter: 'today', dateTime: mockDates(currentDay, currentMonth, currentYear) },
        { filter: 'in a day', dateTime: mockDates(currentDay + 1, currentMonth, currentYear) },
        { filter: 'in a week', dateTime: mockDates(currentDay + 7, currentMonth, currentYear) },
        { filter: 'in 5 weeks', dateTime: mockDates(currentDay + 35, currentMonth, currentYear) },
        { filter: 'tomorrow', dateTime: mockDates(currentDay + 1, currentMonth, currentYear) },
        { filter: 'in 5 days', dateTime: mockDates(currentDay + 5, currentMonth, currentYear) },
        { filter: 'in 31 days', dateTime: mockDates(currentDay + 31, currentMonth, currentYear) },
        { filter: 'in a wk', dateTime: mockDates(currentDay + 7, currentMonth, currentYear) },
        { filter: 'in 5 wks', dateTime: mockDates(currentDay + 35, currentMonth, currentYear) },
        { filter: 'in a month', dateTime: mockDates(currentDay, currentMonth + 1, currentYear) },
        { filter: 'in 5 months', dateTime: mockDates(currentDay, currentMonth + 5, currentYear) },
        { filter: 'in 12 months', dateTime: mockDates(currentDay, currentMonth, currentYear + 1) },
        { filter: 'in a year', dateTime: mockDates(currentDay, currentMonth, currentYear + 1) },
        { filter: 'in 5 years', dateTime: mockDates(currentDay, currentMonth, currentYear + 5) },
        { filter: 'in a yr', dateTime: mockDates(currentDay, currentMonth, currentYear + 1) },
        { filter: 'in 5 yrs', dateTime: mockDates(currentDay, currentMonth, currentYear + 5) },
        { filter: '5 years later', dateTime: mockDates(currentDay, currentMonth, currentYear + 5) },
        { filter: '5 years from now', dateTime: mockDates(currentDay, currentMonth, currentYear + 5) },
        { filter: '5 years from now', dateTime: mockDates(currentDay, currentMonth, currentYear + 5) },
    ])('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = RelativeDates.parseText(`${text} ${filter}`);
        const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper 5 years from now';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5),
                text: 'Hand in paper',
                matched: '5 years from now',
            },
        ];

        expect(RelativeDates.parseText(text)).toEqual(result);
    });
});
