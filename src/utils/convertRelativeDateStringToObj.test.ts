import { getNext } from './convertRelativeDateStringToObj';
import { vi } from 'vitest';

describe('Relative Dates', () => {
    afterAll(() => {
        vi.useRealTimers();
    });

    describe('getNext', () => {
        test('correctly gets start of next week', () => {
            const testDate = new Date('2019-01-12T12:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('week');
            expect(parsedNext).toEqual(new Date('2019-01-14T00:00:00.000'));
        });

        test('correctly gets start of next month', () => {
            const testDate = new Date('2019-06-20T12:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2019-07-01T00:00:00.000'));
        });

        test('correctly gets start of next month when the date is near the end of a longer month', () => {
            const testDate = new Date('2019-01-31T00:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2019-02-01T00:00:00.000'));
        });

        test('correctly gets start of next month when the date is near the beginning of a shorter month', () => {
            const testDate = new Date('2019-02-19T12:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2019-03-01T00:00:00.000'));
        });

        test('correctly gets start of next month when the date is near the end of the year', () => {
            const testDate = new Date('2019-12-02T12:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2020-01-01T00:00:00.000'));
        });

        test('correctly gets start of next year', () => {
            const testDate = new Date(new Date('2019-05-19T12:00:00.000'));
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('year');
            expect(parsedNext).toEqual(new Date('2020-01-01T00:00:00.000'));
        });

        test('correctly gets start of next year when the date is near the start of a leap year', () => {
            const testDate = new Date('2020-01-01T12:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('year');
            expect(parsedNext).toEqual(new Date('2021-01-01T00:00:00.000'));
        });

        test('correctly fails when the date is illegal', () => {
            const testDate = new Date('2019-02-31T12:00:00.000');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext === null);
        });
    });
});
