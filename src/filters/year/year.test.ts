import Year from './year';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Year', () => {
    const mockYear = (year: number) => dayLite().set({ year }).startOf('year').endOf('day').toDate();

    test.each([
        { filter: '1000', dateTime: mockYear(1000) },
        { filter: 'in 1000', dateTime: mockYear(1000) },
        { filter: '2019', dateTime: mockYear(2019) },
        { filter: 'in 2019', dateTime: mockYear(2019) },
        { filter: '9999', dateTime: mockYear(9999) },
        { filter: 'in 9999', dateTime: mockYear(9999) },
        { filter: '2020', dateTime: mockYear(2020) },
        { filter: 'in 2020', dateTime: mockYear(2020) },
    ])('should be able to parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const result: ParsedMatchSchema[] = [
            {
                dateTime,
                text,
                matched: filter,
            },
        ];

        expect(Year.parseText(`${text} ${filter}`)).toEqual(result);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper 2020';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockYear(2020),
                text: 'Hand in paper',
                matched: '2020',
            },
        ];

        expect(Year.parseText(text)).toEqual(result);
    });
});
