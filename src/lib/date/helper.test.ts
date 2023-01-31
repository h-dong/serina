import { getDaysInMonth, getStartOfWeek, nextMonths, nextYears, prevMonths, prevYears } from './helper';

describe('DayLite Helpers', () => {
    describe('getStartOfWeek()', () => {
        test.each([
            { text: 'Mon', operation: getStartOfWeek(1, 9), expected: 9 },
            { text: 'Tue', operation: getStartOfWeek(2, 9), expected: 8 },
            { text: 'Sat', operation: getStartOfWeek(6, 9), expected: 4 },
            { text: 'Sun', operation: getStartOfWeek(0, 9), expected: 3 },
        ])('should return correct value for $text', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('getDaysInMonth()', () => {
        test.each([
            { text: 'Feb', operation: getDaysInMonth(2022, 1), expected: 28 },
            { text: 'Apr', operation: getDaysInMonth(2022, 3), expected: 30 },
            { text: 'Oct', operation: getDaysInMonth(2022, 9), expected: 31 },
        ])('should return correct value for $text', ({ operation, expected }) => {
            expect(operation).toEqual(expected);
        });
    });

    describe('nextMonths()', () => {
        test.each([
            {
                text: 'at the start of month',
                date: new Date('2000-01-01T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-02-01T12:00:00.000Z'),
            },
            {
                text: 'at the middle of month',
                date: new Date('2000-01-15T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-02-15T12:00:00.000Z'),
            },
            {
                text: 'at the end of 30 day month',
                date: new Date('2000-03-30T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-04-30T12:00:00.000Z'),
            },
            {
                text: 'skip to find next month with 31 days',
                date: new Date('2000-03-31T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-05-31T12:00:00.000Z'),
            },
            {
                text: 'skip Feb to Mar',
                date: new Date('2000-01-30T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-03-30T12:00:00.000Z'),
            },
        ])('should return correct value for $text', ({ date, value, expected }) => {
            expect(nextMonths(date, value)).toEqual(expected);
        });
    });

    describe('nextYears()', () => {
        test.each([
            {
                text: 'normal case',
                date: new Date('2000-02-01T12:00:00.000Z'),
                value: 1,
                expected: new Date('2001-02-01T12:00:00.000Z'),
            },
            {
                text: 'day does not exist in next year',
                date: new Date('2004-02-29T12:00:00.000Z'),
                value: 1,
                expected: new Date('2008-02-29T12:00:00.000Z'),
            },
        ])('should return correct value for $text', ({ date, value, expected }) => {
            expect(nextYears(date, value)).toEqual(expected);
        });
    });

    describe('prevMonths()', () => {
        test.each([
            {
                text: 'go to prev year Dec',
                date: new Date('2000-01-01T12:00:00.000Z'),
                value: 1,
                expected: new Date('1999-12-01T12:00:00.000Z'),
            },
            {
                text: 'at the start of month',
                date: new Date('2000-02-01T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-01-01T12:00:00.000Z'),
            },
            {
                text: 'at the middle of month',
                date: new Date('2000-03-15T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-02-15T12:00:00.000Z'),
            },
            {
                text: 'at the end of 30 day month',
                date: new Date('2000-05-30T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-04-30T12:00:00.000Z'),
            },
            {
                text: 'skip to find prev month with 31 days',
                date: new Date('2000-05-31T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-03-31T12:00:00.000Z'),
            },
            {
                text: 'skip Feb to Mar',
                date: new Date('2000-03-30T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-01-30T12:00:00.000Z'),
            },
        ])('should return correct value for $text', ({ date, value, expected }) => {
            expect(prevMonths(date, value)).toEqual(expected);
        });
    });

    describe('prevYears()', () => {
        test.each([
            {
                text: 'normal case',
                date: new Date('2000-02-01T12:00:00.000Z'),
                value: 1,
                expected: new Date('1999-02-01T12:00:00.000Z'),
            },
            {
                text: 'day does not exist in prev year',
                date: new Date('2004-02-29T12:00:00.000Z'),
                value: 1,
                expected: new Date('2000-02-29T12:00:00.000Z'),
            },
        ])('should return correct value for $text', ({ date, value, expected }) => {
            expect(prevYears(date, value)).toEqual(expected);
        });
    });
});
