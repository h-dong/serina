import { getDaysInMonth, getStartOfWeek, nextMonths, nextYears, prevMonths, prevYears } from './helper';

describe('DayLite Helpers', () => {
    describe('getStartOfWeek()', () => {
        test.each([
            { name: 'Mon', operation: getStartOfWeek(1, 9), output: 9 },
            { name: 'Tue', operation: getStartOfWeek(2, 9), output: 8 },
            { name: 'Sat', operation: getStartOfWeek(6, 9), output: 4 },
            { name: 'Sun', operation: getStartOfWeek(0, 9), output: 3 },
        ])('should return correct value for $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('getDaysInMonth()', () => {
        test.each([
            { name: 'Feb', operation: getDaysInMonth(2022, 1), output: 28 },
            { name: 'Apr', operation: getDaysInMonth(2022, 3), output: 30 },
            { name: 'Oct', operation: getDaysInMonth(2022, 9), output: 31 },
        ])('should return correct value for $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('nextMonths()', () => {
        test.each([
            {
                name: 'at the start of month',
                date: new Date('2000-01-01T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-02-01T12:00:00.000Z'),
            },
            {
                name: 'at the middle of month',
                date: new Date('2000-01-15T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-02-15T12:00:00.000Z'),
            },
            {
                name: 'at the end of 30 day month',
                date: new Date('2000-03-30T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-04-30T12:00:00.000Z'),
            },
            {
                name: 'skip to find next month with 31 days',
                date: new Date('2000-03-31T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-05-31T12:00:00.000Z'),
            },
            {
                name: 'skip Feb to Mar',
                date: new Date('2000-01-30T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-03-30T12:00:00.000Z'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(nextMonths(date, value)).toEqual(output);
        });
    });

    describe('nextYears()', () => {
        test.each([
            {
                name: 'normal case',
                date: new Date('2000-02-01T12:00:00.000Z'),
                value: 1,
                output: new Date('2001-02-01T12:00:00.000Z'),
            },
            {
                name: 'day does not exist in next year',
                date: new Date('2004-02-29T12:00:00.000Z'),
                value: 1,
                output: new Date('2008-02-29T12:00:00.000Z'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(nextYears(date, value)).toEqual(output);
        });
    });

    describe('prevMonths()', () => {
        test.each([
            {
                name: 'go to prev year Dec',
                date: new Date('2000-01-01T12:00:00.000Z'),
                value: 1,
                output: new Date('1999-12-01T12:00:00.000Z'),
            },
            {
                name: 'at the start of month',
                date: new Date('2000-02-01T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-01-01T12:00:00.000Z'),
            },
            {
                name: 'at the middle of month',
                date: new Date('2000-03-15T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-02-15T12:00:00.000Z'),
            },
            {
                name: 'at the end of 30 day month',
                date: new Date('2000-05-30T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-04-30T12:00:00.000Z'),
            },
            {
                name: 'skip to find prev month with 31 days',
                date: new Date('2000-05-31T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-03-31T12:00:00.000Z'),
            },
            {
                name: 'skip Feb to Mar',
                date: new Date('2000-03-30T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-01-30T12:00:00.000Z'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(prevMonths(date, value)).toEqual(output);
        });
    });

    describe('prevYears()', () => {
        test.each([
            {
                name: 'normal case',
                date: new Date('2000-02-01T12:00:00.000Z'),
                value: 1,
                output: new Date('1999-02-01T12:00:00.000Z'),
            },
            {
                name: 'day does not exist in prev year',
                date: new Date('2004-02-29T12:00:00.000Z'),
                value: 1,
                output: new Date('2000-02-29T12:00:00.000Z'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(prevYears(date, value)).toEqual(output);
        });
    });
});
