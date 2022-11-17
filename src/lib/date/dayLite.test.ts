import { dayLite } from './dayLite';
import { vi } from 'vitest';

describe('dayLight', () => {
    describe('Constructor', () => {
        beforeEach(() => {
            vi.useFakeTimers().setSystemTime(new Date('2020-06-10T11:22:33'));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        test('should return passed date object', () => {
            const date = new Date(2021, 10, 20);
            expect(dayLite(date).year).toBe(2021);
        });

        test('should use current date if nothing has been passed', () => {
            expect(dayLite().year).toBe(2020);
        });
    });

    describe('Basic Getters', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().second, output: 35 },
            { name: 'minute', operation: dayLite().minute, output: 55 },
            { name: 'hour', operation: dayLite().hour, output: 14 },
            { name: 'day', operation: dayLite().day, output: 20 },
            { name: 'weekday', operation: dayLite().weekday, output: 4 },
            { name: 'weekday name', operation: dayLite().weekdayName, output: 'Thursday' },
            { name: 'month', operation: dayLite().month, output: 10 },
            { name: 'month name', operation: dayLite().monthName, output: 'October' },
            { name: 'year', operation: dayLite().year, output: 2022 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('plus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().plus(1, 'second').second, output: 36 },
            { name: 'minute', operation: dayLite().plus(1, 'minute').minute, output: 56 },
            { name: 'hour', operation: dayLite().plus(1, 'hour').hour, output: 15 },
            { name: 'day', operation: dayLite().plus(1, 'day').day, output: 21 },
            { name: 'month', operation: dayLite().plus(1, 'month').month, output: 11 },
            { name: 'year', operation: dayLite().plus(1, 'year').year, output: 2023 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('minus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().minus(1, 'second').second, output: 34 },
            { name: 'minute', operation: dayLite().minus(1, 'minute').minute, output: 54 },
            { name: 'hour', operation: dayLite().minus(1, 'hour').hour, output: 13 },
            { name: 'day', operation: dayLite().minus(1, 'day').day, output: 19 },
            { name: 'month', operation: dayLite().minus(1, 'month').month, output: 9 },
            { name: 'year', operation: dayLite().minus(1, 'year').year, output: 2021 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('set() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().set({ second: 1 }).second, output: 1 },
            { name: 'minute', operation: dayLite().set({ minute: 1 }).minute, output: 1 },
            { name: 'hour', operation: dayLite().set({ hour: 1 }).hour, output: 1 },
            { name: 'day', operation: dayLite().set({ day: 1 }).day, output: 1 },
            {
                name: 'month -1',
                operation: dayLite().set({ month: -1 }).toISOString(),
                output: '2021-12-20T14:55:35.000Z',
            },
            {
                name: 'month 0',
                operation: dayLite().set({ month: 0 }).toISOString(),
                output: '2022-01-20T14:55:35.000Z',
            },
            {
                name: 'month 1',
                operation: dayLite().set({ month: 1 }).toISOString(),
                output: '2022-01-20T14:55:35.000Z',
            },
            {
                name: 'month 12',
                operation: dayLite().set({ month: 12 }).toISOString(),
                output: '2022-12-20T14:55:35.000Z',
            },
            {
                name: 'month 13',
                operation: dayLite().set({ month: 13 }).toISOString(),
                output: '2023-01-20T14:55:35.000Z',
            },
            { name: 'year', operation: dayLite().set({ year: 1 }).year, output: 1 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });

        test('should return correct combination of set day, month and year', () => {
            vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));
            expect(dayLite().set({ day: 2, month: 11, year: 2018 }).toISOString()).toEqual('2018-11-02T14:55:35.000Z');
        });
    });

    describe('startOf()', () => {
        beforeAll(() => {
            vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            {
                name: 'second',
                operation: dayLite().start('second').toString(),
                output: '2022-10-20T13:55:35.000Z',
            },
            {
                name: 'minute',
                operation: dayLite().start('minute').toString(),
                output: '2022-10-20T13:55:00.000Z',
            },
            { name: 'hour', operation: dayLite().start('hour').toString(), output: '2022-10-20T13:00:00.000Z' },
            { name: 'day', operation: dayLite().start('day').toString(), output: '2022-10-19T23:00:00.000Z' },
            { name: 'week', operation: dayLite().start('week').toString(), output: '2022-10-17T23:00:00.000Z' },
            { name: 'month', operation: dayLite().start('month').toString(), output: '2022-09-30T23:00:00.000Z' },
            { name: 'year', operation: dayLite().start('year').toString(), output: '2022-01-01T00:00:00.000Z' },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('endOf()', () => {
        beforeAll(() => {
            vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            {
                name: 'second',
                operation: dayLite().end('second').toString(),
                output: '2022-10-20T13:55:35.999Z',
            },
            {
                name: 'minute',
                operation: dayLite().end('minute').toString(),
                output: '2022-10-20T13:55:59.999Z',
            },
            { name: 'hour', operation: dayLite().end('hour').toString(), output: '2022-10-20T13:59:59.999Z' },
            { name: 'day', operation: dayLite().end('day').toString(), output: '2022-10-20T22:59:59.999Z' },
            // { name: 'week', operation: dayLite().end('week').toString(), output: 1 },
            { name: 'month', operation: dayLite().end('month').toString(), output: '2022-10-31T23:59:59.999Z' },
            { name: 'year', operation: dayLite().end('year').toString(), output: '2022-12-31T23:59:59.999Z' },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });
});
