import Dates from './dates';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Dates', () => {
    const mockDates = (day, month, year) => dayLite().set({ day, month, year }).start('day').toDate();

    test.each([
        { filter: '20', dateTime: null },
        { filter: 'on 02/17/2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 17/02/2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 2009/02/17', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 2/17/2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 17/2/2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 2009/2/17', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 2/17/2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 2-17-2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on February 17, 2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 17 February, 2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on Feb 17, 2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on 17 Feb, 2009', dateTime: mockDates(17, 2, 2009) },
        { filter: 'on Feb 17, 2014', dateTime: mockDates(17, 2, 2014) },
        { filter: 'on 17 Feb, 2014', dateTime: mockDates(17, 2, 2014) },
        { filter: 'on 21st Feb 2019', dateTime: mockDates(21, 2, 2019) },
        { filter: 'on Feb 21st 2019', dateTime: mockDates(21, 2, 2019) },
        { filter: 'on 22nd Feb 2019', dateTime: mockDates(22, 2, 2019) },
        { filter: 'on Feb 22nd 2019', dateTime: mockDates(22, 2, 2019) },
        { filter: 'on 22nd Feb 2019', dateTime: mockDates(22, 2, 2019) },
        { filter: 'on Feb 22nd 2019', dateTime: mockDates(22, 2, 2019) },
        { filter: 'on 17th February 2019', dateTime: mockDates(17, 2, 2019) },
        { filter: 'by February 17th 2019', dateTime: mockDates(17, 2, 2019) },
    ])('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = Dates.parseText(`${text} ${filter}`);
        const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper on Feb 22nd 2019';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(22, 2, 2019),
                text: 'Hand in paper',
                matched: 'on Feb 22nd 2019',
            },
        ];

        expect(Dates.parseText(text)).toEqual(result);
    });
});
