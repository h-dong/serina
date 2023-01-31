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

    describe('expected', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'toDate()', operation: dayLite().toDate(), expected: new Date('2022-10-20T14:55:35Z') },
            { text: 'toString()', operation: dayLite().toString(), expected: '2022-10-20T14:55:35.000Z' },
            { text: 'toISOString()', operation: dayLite().toISOString(), expected: '2022-10-20T14:55:35.000Z' },
            { text: 'now()', operation: dayLite().now(), expected: new Date().valueOf() },
        ])('should return correct $text', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('Basic Getters', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-11-20T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'second', operation: dayLite().second, expected: 35 },
            { text: 'minute', operation: dayLite().minute, expected: 55 },
            { text: 'hour', operation: dayLite().hour, expected: 14 },
            { text: 'day', operation: dayLite().day, expected: 20 },
            { text: 'weekday', operation: dayLite().weekday, expected: 0 },
            { text: 'weekday name', operation: dayLite().weekdayName, expected: 'Sunday' },
            { text: 'month', operation: dayLite().month, expected: 11 },
            { text: 'month name', operation: dayLite().monthName, expected: 'November' },
            { text: 'month native', operation: dayLite().nativeMonth, expected: 10 },
            { text: 'year', operation: dayLite().year, expected: 2022 },
        ])('should return correct $name', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('Advanced Getters', () => {
        test.each([
            {
                text: 'not leap year -100000',
                operation: dayLite(new Date(Date.UTC(-100000, 1, 1))).leapYear,
                expected: true,
            },
            { text: 'not leap year -1', operation: dayLite(new Date(Date.UTC(-1, 1, 1))).leapYear, expected: false },
            { text: 'not leap year 0', operation: dayLite(new Date(Date.UTC(0, 1, 1))).leapYear, expected: false },
            { text: 'leap year', operation: dayLite(new Date(Date.UTC(2000, 1, 1))).leapYear, expected: true },
            {
                text: 'not leap year 2001',
                operation: dayLite(new Date(Date.UTC(2001, 1, 1))).leapYear,
                expected: false,
            },
            {
                text: 'days in Feb 2000',
                operation: dayLite(new Date('2000-02-01T12:00:00.000')).daysInMonth,
                expected: 29,
            },
            {
                text: 'days in Mar 2000',
                operation: dayLite(new Date('2000-03-01T12:00:00.000')).daysInMonth,
                expected: 31,
            },
            {
                text: 'days in Feb 2001',
                operation: dayLite(new Date('2001-02-01T12:00:00.000')).daysInMonth,
                expected: 28,
            },
            {
                text: 'days in Apr 2001',
                operation: dayLite(new Date('2001-04-01T12:00:00.000')).daysInMonth,
                expected: 30,
            },
        ])('should return correct $name', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('plus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-21T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'second', operation: dayLite().plus(1, 'second').second, expected: 36 },
            { text: 'minute', operation: dayLite().plus(1, 'minute').minute, expected: 56 },
            { text: 'hour', operation: dayLite().plus(1, 'hour').hour, expected: 15 },
            { text: 'day', operation: dayLite().plus(1, 'day').day, expected: 22 },
            { text: 'month', operation: dayLite().plus(1, 'month').month, expected: 11 },
            { text: 'year', operation: dayLite().plus(1, 'year').year, expected: 2023 },
        ])('should return correct $name', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('minus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-09-20T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'second', operation: dayLite().minus(1, 'second').second, expected: 34 },
            { text: 'minute', operation: dayLite().minus(1, 'minute').minute, expected: 54 },
            { text: 'hour', operation: dayLite().minus(1, 'hour').hour, expected: 13 },
            { text: 'day', operation: dayLite().minus(1, 'day').day, expected: 19 },
            { text: 'month', operation: dayLite().minus(1, 'month').month, expected: 8 },
            { text: 'year', operation: dayLite().minus(1, 'year').year, expected: 2021 },
        ])('should return correct $name', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('set() operation', () => {
        vi.useFakeTimers();

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'second', operation: dayLite().set({ second: 1 }).second, expected: 1 },
            { text: 'minute', operation: dayLite().set({ minute: 1 }).minute, expected: 1 },
            {
                text: 'hour',
                operation: dayLite().set({ hour: 1 }).hour,
                expected: new Date(new Date().setHours(1)).getHours(),
            },
            { text: 'day', operation: dayLite().set({ day: 1 }).day, expected: 1 },
            {
                text: 'month -1 should default to Jan',
                operation: dayLite().set({ month: -1 }).toString(),
                expected: '2022-01-20T14:55:35.000Z',
            },
            {
                text: 'month 0',
                operation: dayLite().set({ month: 0 }).toString(),
                expected: '2022-01-20T14:55:35.000Z',
            },
            {
                text: 'month 1',
                operation: dayLite().set({ month: 1 }).toString(),
                expected: '2022-01-20T14:55:35.000Z',
            },
            {
                text: 'month 2',
                operation: dayLite().set({ month: 2 }).toString(),
                expected: '2022-02-20T14:55:35.000Z',
            },
            {
                text: 'month 12',
                operation: dayLite().set({ month: 12 }).toString(),
                expected: '2022-12-20T14:55:35.000Z',
            },
            {
                text: 'month 13 should default to Dec',
                operation: dayLite().set({ month: 13 }).toString(),
                expected: '2022-12-20T14:55:35.000Z',
            },
            { text: 'year', operation: dayLite().set({ year: 1 }).year, expected: 1 },
        ])('should return correct $name', ({ operation, expected }) => {
            vi.setSystemTime(new Date('2022-10-10T14:55:35Z'));
            expect(operation).toEqual(expected);
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
                text: 'second',
                operation: dayLite().start('second').toString(),
                expected: '2022-02-20T14:55:35.000Z',
            },
            {
                text: 'minute',
                operation: dayLite().start('minute').toString(),
                expected: '2022-02-20T14:55:00.000Z',
            },
            {
                text: 'hour',
                operation: dayLite().start('hour').toString(),
                expected: '2022-02-20T14:00:00.000Z',
            },
            {
                text: 'day',
                operation: dayLite().start('day').toString(),
                expected: '2022-02-20T00:00:00.000Z',
            },
            {
                text: 'week',
                operation: dayLite().start('week').toString(),
                expected: '2022-02-14T00:00:00.000Z',
            },
            {
                text: 'month',
                operation: dayLite().start('month').toString(),
                expected: '2022-02-01T00:00:00.000Z',
            },
            {
                text: 'year',
                operation: dayLite().start('year').toString(),
                expected: '2022-01-01T00:00:00.000Z',
            },
        ])('should return correct $name', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('end()', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-15T14:55:35Z'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            {
                text: 'second',
                operation: dayLite().end('second').toString(),
                expected: '2022-10-15T14:55:35.999Z',
            },
            {
                text: 'minute',
                operation: dayLite().end('minute').toString(),
                expected: '2022-10-15T14:55:59.999Z',
            },
            { text: 'hour', operation: dayLite().end('hour').toString(), expected: '2022-10-15T14:59:59.999Z' },
            { text: 'day', operation: dayLite().end('day').toString(), expected: '2022-10-15T23:59:59.999Z' },
            // { text: 'week', operation: dayLite().end('week').toString(), expected: 1 },
            { text: 'month', operation: dayLite().end('month').toString(), expected: '2022-10-31T23:59:59.999Z' },
            { text: 'year', operation: dayLite().end('year').toString(), expected: '2022-12-31T23:59:59.999Z' },
        ])('should return correct $name', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });
});
