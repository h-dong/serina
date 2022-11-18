import PartialDates from './partialDates';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Partial Dates', () => {
    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    const mockDate = new Date('2019-06-29T15:48:12');
    vi.useFakeTimers().setSystemTime(mockDate);

    const currentYear = dayLite(mockDate).year;
    const currentMonth = dayLite(mockDate).month;

    afterAll(() => {
        vi.useRealTimers();
    });

    const mockDates = (day: number, month: number, year: number) =>
        dayLite().set({ day, month, year }).endOf('day').toDate();

    test.each([
        { filter: '20', dateTime: null },
        { filter: 'on 02/2009', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on Feb 2009', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on February 2009', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on 2/2009', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on 2009 Feb', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on 2009 February', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on 2009/2', dateTime: mockDates(1, 2, 2009) },
        { filter: 'on 02/20', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 02/10', dateTime: mockDates(2, 10, currentYear) },
        { filter: 'on 02-20', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 02-10', dateTime: mockDates(2, 10, currentYear) },
        { filter: 'on Feb 20', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on Feb 20th', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on February 20', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on February 20th', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on Feb 21st', dateTime: mockDates(21, 2, currentYear + 1) },
        { filter: 'on Feb 22nd', dateTime: mockDates(22, 2, currentYear + 1) },
        { filter: 'on Feb 23rd', dateTime: mockDates(23, 2, currentYear + 1) },
        { filter: 'on 20/02', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 20 Feb', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 20th Feb', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 20 February', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 20th February', dateTime: mockDates(20, 2, currentYear + 1) },
        { filter: 'on 21st Feb', dateTime: mockDates(21, 2, currentYear + 1) },
        { filter: 'on 22nd Feb', dateTime: mockDates(22, 2, currentYear + 1) },
        { filter: 'on 23rd Feb', dateTime: mockDates(23, 2, currentYear + 1) },
        { filter: 'on 23rd', dateTime: mockDates(23, currentMonth + 1, currentYear) },
        { filter: 'on the 30th', dateTime: mockDates(30, currentMonth, currentYear) },
    ])('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = PartialDates.parseText(`${text} ${filter}`);
        const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper on 21st Feb';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(21, 2, currentYear + 1),
                text: 'Hand in paper',
                matched: 'on 21st Feb',
            },
        ];

        expect(PartialDates.parseText(text)).toEqual(result);
    });
});
