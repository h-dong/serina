import { nextMonths, nextYears, prevMonths, prevYears } from './helper';

describe('DayLite Helpers', () => {
    describe('nextMonths()', () => {
        test.each([
            {
                name: 'at the start of month',
                date: new Date('2000-01-01T12:00:00.000'),
                value: 1,
                output: new Date('2000-02-01T12:00:00.000'),
            },
            {
                name: 'at the middle of month',
                date: new Date('2000-01-15T12:00:00.000'),
                value: 1,
                output: new Date('2000-02-15T12:00:00.000'),
            },
            {
                name: 'at the end of 30 day month',
                date: new Date('2000-03-30T12:00:00.000'),
                value: 1,
                output: new Date('2000-04-30T12:00:00.000'),
            },
            {
                name: 'skip to find next month with 31 days',
                date: new Date('2000-03-31T12:00:00.000'),
                value: 1,
                output: new Date('2000-05-31T12:00:00.000'),
            },
            {
                name: 'skip Feb to Mar',
                date: new Date('2000-01-30T12:00:00.000'),
                value: 1,
                output: new Date('2000-03-30T12:00:00.000'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(nextMonths(date, value)).toEqual(output);
        });
    });

    describe('nextYears()', () => {
        test.each([
            {
                name: 'normal case',
                date: new Date('2000-02-01T12:00:00.000'),
                value: 1,
                output: new Date('2001-02-01T12:00:00.000'),
            },
            {
                name: 'day does not exist in next year',
                date: new Date('2004-02-29T12:00:00.000'),
                value: 1,
                output: new Date('2008-02-29T12:00:00.000'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(nextYears(date, value)).toEqual(output);
        });
    });

    describe('prevMonths()', () => {
        test.each([
            {
                name: 'go to prev year Dec',
                date: new Date('2000-01-01T12:00:00.000'),
                value: 1,
                output: new Date('1999-12-01T12:00:00.000'),
            },
            {
                name: 'at the start of month',
                date: new Date('2000-02-01T12:00:00.000'),
                value: 1,
                output: new Date('2000-01-01T12:00:00.000'),
            },
            {
                name: 'at the middle of month',
                date: new Date('2000-03-15T12:00:00.000'),
                value: 1,
                output: new Date('2000-02-15T12:00:00.000'),
            },
            {
                name: 'at the end of 30 day month',
                date: new Date('2000-05-30T12:00:00.000'),
                value: 1,
                output: new Date('2000-04-30T12:00:00.000'),
            },
            {
                name: 'skip to find prev month with 31 days',
                date: new Date('2000-05-31T12:00:00.000'),
                value: 1,
                output: new Date('2000-03-31T12:00:00.000'),
            },
            {
                name: 'skip Feb to Mar',
                date: new Date('2000-03-30T12:00:00.000'),
                value: 1,
                output: new Date('2000-01-30T12:00:00.000'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(prevMonths(date, value)).toEqual(output);
        });
    });

    describe('prevYears()', () => {
        test.each([
            {
                name: 'normal case',
                date: new Date('2000-02-01T12:00:00.000'),
                value: 1,
                output: new Date('1999-02-01T12:00:00.000'),
            },
            {
                name: 'day does not exist in prev year',
                date: new Date('2004-02-29T12:00:00.000'),
                value: 1,
                output: new Date('2000-02-29T12:00:00.000'),
            },
        ])('should return correct value for $name', ({ date, value, output }) => {
            expect(prevYears(date, value)).toEqual(output);
        });
    });
});
