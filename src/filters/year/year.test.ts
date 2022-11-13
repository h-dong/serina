import Year from './year';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Year', () => {
    const mockYear = year => dayLite().set({ year }).startOf('year').endOf('day').toDate();

    test.each`
        filter       | dateTime
        ${'1000'}    | ${mockYear(1000)}
        ${'in 1000'} | ${mockYear(1000)}
        ${'2019'}    | ${mockYear(2019)}
        ${'in 2019'} | ${mockYear(2019)}
        ${'9999'}    | ${mockYear(9999)}
        ${'in 9999'} | ${mockYear(9999)}
        ${'in 2019'} | ${mockYear(2019)}
        ${'2020'}    | ${mockYear(2020)}
    `('should be able to parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = Year.parseText(`${text} ${filter}`);
        const output = [{ dateTime, matched: filter, text }];
        expect(results).toEqual(output);
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
