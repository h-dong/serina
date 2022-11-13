import { getNext } from './convertRelativeDateStringToObj';
import { dayLite } from 'lib/date/dayLite';

describe('Relative Dates', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    const mockDate = new Date('2019-06-20T08:34:52 ');

    const mockDates = (day, month, year) => dayLite(mockDate).set({ day, month, year }).endOf('day').toDate();

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('getNext', () => {
        test('correctly gets start of next week', () => {
            const testDate = new Date(2019, 2, 6);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('week');
            expect(parsedNext).toEqual(mockDates(11, 2, 2019));
        });

        test('correctly gets start of next month', () => {
            const testDate = new Date(2019, 5, 20);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(mockDates(1, 6, 2019));
        });

        test('correctly gets start of next month when the date is near the end of a longer month', () => {
            const testDate = new Date(2019, 1, 31);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(mockDates(1, 2, 2019));
        });

        test('correctly gets start of next month when the date is near the beginning of a shorter month', () => {
            const testDate = new Date(2019, 2, 1);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(mockDates(1, 3, 2019));
        });

        test('correctly gets start of next month when the date is near the end of the year', () => {
            const testDate = new Date(2019, 12, 2);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(mockDates(1, 1, 2020));
        });

        test('correctly gets start of next year', () => {
            const testDate = new Date(2019, 5, 20);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('year');
            expect(parsedNext).toEqual(mockDates(1, 1, 2020));
        });

        test('correctly gets start of next year when the date is near the start of a leap year', () => {
            const testDate = new Date(2020, 1, 1);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('year');
            expect(parsedNext).toEqual(mockDates(1, 1, 2021));
        });

        test('correctly fails when the date is illegal', () => {
            const testDate = new Date(2019, 2, 31);
            jest.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext === null);
        });
    });
});
