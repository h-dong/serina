import { dayLite } from 'lib/date/dayLite';
import { monthStringToDateObj, monthStringToNumber } from './month.helpers';

describe('Month Helpers', () => {
    describe('monthStringToNumber()', () => {
        const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const longMonths = [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december',
        ];

        test('should return correct number for each short month string', () => {
            shortMonths.forEach((month, index) => {
                expect(monthStringToNumber(month)).toEqual(index + 1);
            });
        });

        test('should return correct number for each long month string', () => {
            longMonths.forEach((month, index) => {
                expect(monthStringToNumber(month)).toEqual(index + 1);
            });
        });
    });

    describe('monthStringToDateObj', () => {
        // Mock Date Time to Saturday, 19 June 2018 18:06:18 GMT+00:00
        const mockDate = new Date(Date.UTC(2018, 5, 19));

        const generateDate = ({ day, month, year }: { day: number; month: number; year: number }) =>
            dayLite().set({ day, month, year }).start('day').toDate();

        beforeAll(() => {
            vi.useFakeTimers();
            vi.setSystemTime(mockDate);
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { input: 'oct', expected: generateDate({ day: 1, month: 10, year: 2018 }) },
            { input: 'last feb', expected: generateDate({ day: 1, month: 2, year: 2018 }) },
            { input: 'next jan', expected: generateDate({ day: 1, month: 1, year: 2019 }) },
            { input: 'some random text', expected: null },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            expect(monthStringToDateObj(input)).toEqual(expected);
        });
    });
});
