import { dayLite } from 'lib/date/dayLite';
import { yearStringToDate } from './year.helpers';

describe('Year Helpers', () => {
    describe('yearStringToDate()', () => {
        const mockYear = (year: number) => dayLite().set({ year }).startOf('year').start('day').toDate();

        test.each([
            { text: '2020', dateTime: mockYear(2020) },
            { text: 'in 2020', dateTime: mockYear(2020) },
            { text: 'no match', dateTime: null },
        ])('should be able to parse $text', ({ text, dateTime }) => {
            expect(yearStringToDate(text)).toEqual(dateTime);
        });
    });
});
