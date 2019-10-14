import Year from './year';
import { DateTime } from 'luxon';

describe('Year', () => {
    const mockYear = year => DateTime.utc()
        .set({ year })
        .startOf('year')
        .toJSDate();

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
});
