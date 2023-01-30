import { dayLite } from './dayLite';

describe('dayLight', () => {
    describe('Constructor', () => {
        vi.useFakeTimers().setSystemTime(new Date('2020-06-10T11:22:33Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test('should return passed date object', () => {
            vi.setSystemTime(new Date('2020-06-10T11:22:33Z'));
            const date = new Date(Date.UTC(2021, 10, 20));
            expect(dayLite(date).day).toBe(20);
            expect(dayLite(date).month).toBe(11);
            expect(dayLite(date).monthName).toBe('November');
            expect(dayLite(date).year).toBe(2021);
        });

        test('should return passed parsed date', () => {
            vi.setSystemTime(new Date('2020-06-10T11:22:33Z'));
            const date = new Date('2021-10-20T12:00:00.000');
            expect(dayLite(date).day).toBe(20);
            expect(dayLite(date).month).toBe(10);
            expect(dayLite(date).monthName).toBe('October');
            expect(dayLite(date).year).toBe(2021);
        });

        test('should use current date if nothing has been passed', () => {
            vi.setSystemTime(new Date());
            expect(dayLite().year).toBe(2020);
        });
    });

    describe('Output', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'toDate()', operation: dayLite().toDate(), output: new Date('2022-10-20T14:55:35Z') },
            { name: 'toString()', operation: dayLite().toString(), output: '2022-10-20T14:55:35.000Z' },
            { name: 'toISOString()', operation: dayLite().toISOString(), output: '2022-10-20T14:55:35.000Z' },
            { name: 'now()', operation: dayLite().now(), output: new Date().valueOf() },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('Basic Getters', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-11-20T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().second, output: 35 },
            { name: 'minute', operation: dayLite().minute, output: 55 },
            { name: 'hour', operation: dayLite().hour, output: 14 },
            { name: 'day', operation: dayLite().day, output: 20 },
            { name: 'weekday', operation: dayLite().weekday, output: 0 },
            { name: 'weekday name', operation: dayLite().weekdayName, output: 'Sunday' },
            { name: 'month', operation: dayLite().month, output: 11 },
            { name: 'month name', operation: dayLite().monthName, output: 'November' },
            { name: 'month native', operation: dayLite().nativeMonth, output: 10 },
            { name: 'year', operation: dayLite().year, output: 2022 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('Advanced Getters', () => {
        test.each([
            {
                name: 'not leap year -100000',
                operation: dayLite(new Date(Date.UTC(-100000, 1, 1))).leapYear,
                output: true,
            },
            { name: 'not leap year -1', operation: dayLite(new Date(Date.UTC(-1, 1, 1))).leapYear, output: false },
            { name: 'not leap year 0', operation: dayLite(new Date(Date.UTC(0, 1, 1))).leapYear, output: false },
            { name: 'leap year', operation: dayLite(new Date(Date.UTC(2000, 1, 1))).leapYear, output: true },
            { name: 'not leap year 2001', operation: dayLite(new Date(Date.UTC(2001, 1, 1))).leapYear, output: false },
            {
                name: 'days in Feb 2000',
                operation: dayLite(new Date('2000-02-01T12:00:00.000')).daysInMonth,
                output: 29,
            },
            {
                name: 'days in Mar 2000',
                operation: dayLite(new Date('2000-03-01T12:00:00.000')).daysInMonth,
                output: 31,
            },
            {
                name: 'days in Feb 2001',
                operation: dayLite(new Date('2001-02-01T12:00:00.000')).daysInMonth,
                output: 28,
            },
            {
                name: 'days in Apr 2001',
                operation: dayLite(new Date('2001-04-01T12:00:00.000')).daysInMonth,
                output: 30,
            },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('plus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-21T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().plus(1, 'second').second, output: 36 },
            { name: 'minute', operation: dayLite().plus(1, 'minute').minute, output: 56 },
            { name: 'hour', operation: dayLite().plus(1, 'hour').hour, output: 15 },
            { name: 'day', operation: dayLite().plus(1, 'day').day, output: 22 },
            { name: 'month', operation: dayLite().plus(1, 'month').month, output: 11 },
            { name: 'year', operation: dayLite().plus(1, 'year').year, output: 2023 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('minus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-09-20T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().minus(1, 'second').second, output: 34 },
            { name: 'minute', operation: dayLite().minus(1, 'minute').minute, output: 54 },
            { name: 'hour', operation: dayLite().minus(1, 'hour').hour, output: 13 },
            { name: 'day', operation: dayLite().minus(1, 'day').day, output: 19 },
            { name: 'month', operation: dayLite().minus(1, 'month').month, output: 8 },
            { name: 'year', operation: dayLite().minus(1, 'year').year, output: 2021 },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('set() operation', () => {
        vi.useFakeTimers();

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { name: 'second', operation: dayLite().set({ second: 1 }).second, output: 1 },
            { name: 'minute', operation: dayLite().set({ minute: 1 }).minute, output: 1 },
            {
                name: 'hour',
                operation: dayLite().set({ hour: 1 }).hour,
                output: new Date(new Date().setHours(1)).getHours(),
            },
            { name: 'day', operation: dayLite().set({ day: 1 }).day, output: 1 },
            {
                name: 'month -1 should default to Jan',
                operation: dayLite().set({ month: -1 }).toString(),
                output: '2022-01-20T14:55:35.000Z',
            },
            {
                name: 'month 0',
                operation: dayLite().set({ month: 0 }).toString(),
                output: '2022-01-20T14:55:35.000Z',
            },
            {
                name: 'month 1',
                operation: dayLite().set({ month: 1 }).toString(),
                output: '2022-01-20T14:55:35.000Z',
            },
            {
                name: 'month 2',
                operation: dayLite().set({ month: 2 }).toString(),
                output: '2022-02-20T14:55:35.000Z',
            },
            {
                name: 'month 12',
                operation: dayLite().set({ month: 12 }).toString(),
                output: '2022-12-20T14:55:35.000Z',
            },
            {
                name: 'month 13 should default to Dec',
                operation: dayLite().set({ month: 13 }).toString(),
                output: '2022-12-20T14:55:35.000Z',
            },
            { name: 'year', operation: dayLite().set({ year: 1 }).year, output: 1 },
        ])('should return correct $name', ({ operation, output }) => {
            vi.setSystemTime(new Date('2022-10-10T14:55:35Z'));
            expect(operation).toEqual(output);
        });

        test('should return correct combination of set day, month and year', () => {
            vi.setSystemTime(new Date('2022-10-20T14:55:35Z'));
            expect(dayLite().set({ day: 2, month: 11, year: 2018 }).toString()).toEqual('2018-11-02T14:55:35.000Z');
        });

        test('should return correct combination of set minute, hour, day, month and year', () => {
            vi.setSystemTime(new Date('2023-01-30T14:55:35Z'));
            expect(dayLite().set({ day: 17, month: 2, year: 2009, hour: 16, minute: 0 }).toString()).toEqual(
                '2009-02-17T16:00:35.000Z'
            );
        });
    });

    describe('start()', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2022-02-20T14:55:35.123Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            {
                name: 'second',
                operation: dayLite().start('second').toString(),
                output: '2022-02-20T14:55:35.000Z',
            },
            {
                name: 'minute',
                operation: dayLite().start('minute').toString(),
                output: '2022-02-20T14:55:00.000Z',
            },
            {
                name: 'hour',
                operation: dayLite().start('hour').toString(),
                output: '2022-02-20T14:00:00.000Z',
            },
            {
                name: 'day',
                operation: dayLite().start('day').toString(),
                output: '2022-02-20T00:00:00.000Z',
            },
            {
                name: 'week',
                operation: dayLite().start('week').toString(),
                output: '2022-02-14T00:00:00.000Z',
            },
            {
                name: 'month',
                operation: dayLite().start('month').toString(),
                output: '2022-02-01T00:00:00.000Z',
            },
            {
                name: 'year',
                operation: dayLite().start('year').toString(),
                output: '2022-01-01T00:00:00.000Z',
            },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('end()', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-15T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            {
                name: 'second',
                operation: dayLite().end('second').toString(),
                output: '2022-10-15T14:55:35.999Z',
            },
            {
                name: 'minute',
                operation: dayLite().end('minute').toString(),
                output: '2022-10-15T14:55:59.999Z',
            },
            { name: 'hour', operation: dayLite().end('hour').toString(), output: '2022-10-15T14:59:59.999Z' },
            { name: 'day', operation: dayLite().end('day').toString(), output: '2022-10-15T23:59:59.999Z' },
            // { name: 'week', operation: dayLite().end('week').toString(), output: 1 },
            { name: 'month', operation: dayLite().end('month').toString(), output: '2022-10-31T23:59:59.999Z' },
            { name: 'year', operation: dayLite().end('year').toString(), output: '2022-12-31T23:59:59.999Z' },
        ])('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });
});
