import {
    convertRelativeAdverbToObj,
    convertRelativeExpressionToObj,
    RegexTimeUnit,
    regexTimeUnitToDayLiteTimeUnit,
    relativeDateStringToDayMonthYear,
} from './relativeDates.helpers';

describe('Relative Dates Helpers', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52.123Z'));

    afterAll(() => {
        vi.useRealTimers();
    });

    describe('regexTimeUnitToDayLiteTimeUnit()', () => {
        test.each([
            { input: 'DAYS', output: 'day' },
            { input: 'WEEKS', output: 'week' },
            { input: 'MONTHS', output: 'month' },
            { input: 'YEARS', output: 'year' },
            { input: 'ANY', output: null },
        ])('returns correct unit given $input', ({ input, output }) => {
            const result = regexTimeUnitToDayLiteTimeUnit(input as RegexTimeUnit);
            expect(result).toBe(output);
        });
    });

    describe('convertRelativeAdverbToObj()', () => {
        test.each([
            { input: 'do something today', output: new Date('2019-06-20T00:00:00.000Z') },
            { input: 'do something tomorrow', output: new Date('2019-06-21T00:00:00.000Z') },
        ])('returns correct date given $input', ({ input, output }) => {
            const result = convertRelativeAdverbToObj(input);
            expect(result).toEqual(output);
        });
    });

    describe.only('convertRelativeExpressionToObj()', () => {
        test('return null if no match', () => {
            const result = convertRelativeExpressionToObj('do something');
            expect(result).toBeNull();
        });

        test.each([
            { input: '1 day', output: new Date('2019-06-21T00:00:00.000Z') },
            { input: '2 days', output: new Date('2019-06-22T00:00:00.000Z') },
            { input: '1 week', output: new Date('2019-06-24T00:00:00.000Z') },
            { input: '2 weeks', output: new Date('2019-07-01T00:00:00.000Z') },
            { input: '1 month', output: new Date('2019-07-01T00:00:00.000Z') },
            { input: '2 months', output: new Date('2019-08-01T00:00:00.000Z') },
            { input: '1 year', output: new Date('2020-01-01T00:00:00.000Z') },
            { input: '2 years', output: new Date('2021-01-01T00:00:00.000Z') },
        ])('returns correct date for "$input"', ({ input, output }) => {
            const result = convertRelativeExpressionToObj(input);
            expect(result).toEqual(output);
        });
    });

    describe('relativeDateStringToDayMonthYear()', () => {
        test('should remove filler words', () => {
            const result = relativeDateStringToDayMonthYear('after 1 week');
            expect(result).toBe(new Date('2019-06-24T00:00:00.000Z'));
        });

        test('should be able to parse relative adverb', () => {
            const result = relativeDateStringToDayMonthYear('by today');
            expect(result).toBe(new Date('2019-06-20T00:00:00.000Z'));
        });

        test('should be able to parse relative expression', () => {
            const result = relativeDateStringToDayMonthYear('in 1 week');
            expect(result).toBe(new Date('2019-06-24T00:00:00.000Z'));
        });
    });

    describe('relativeDateStringToDateObj()', () => {
        test('should return null if no match', () => {
            const result = relativeDateStringToDayMonthYear('do something');
            expect(result).toBeNull();
        });

        test.each([
            { input: 'next week', output: new Date('2019-06-24T00:00:00.000Z') },
            { input: 'next month', output: new Date('2019-07-01T00:00:00.000Z') },
            { input: 'next year', output: new Date('2020-01-01T00:00:00.000Z') },
            { input: 'today', output: new Date('2019-06-20T00:00:00.000Z') },
            { input: 'in a day', output: new Date('2019-06-21T00:00:00.000Z') },
            { input: 'in a week', output: new Date('2019-06-27T00:00:00.000Z') },
            { input: 'in 5 weeks', output: new Date('2019-07-25T00:00:00.000Z') },
            { input: 'tomorrow', output: new Date('2019-06-21T00:00:00.000Z') },
            { input: 'in 5 days', output: new Date('2019-06-25T00:00:00.000Z') },
            { input: 'in 31 days', output: new Date('2019-07-21T00:00:00.000Z') },
            { input: 'in a wk', output: new Date('2019-06-27T00:00:00.000Z') },
            { input: 'in 5 wks', output: new Date('2019-07-25T00:00:00.000Z') },
            { input: 'in a month', output: new Date('2019-07-20T00:00:00.000Z') },
            { input: 'in 5 months', output: new Date('2019-11-20T00:00:00.000Z') },
            { input: 'in 12 months', output: new Date('2020-06-20T00:00:00.000Z') },
            { input: 'in a year', output: new Date('2020-06-20T00:00:00.000Z') },
            { input: 'in 5 years', output: new Date('2024-06-20T00:00:00.000Z') },
            { input: 'in a yr', output: new Date('2020-06-20T00:00:00.000Z') },
            { input: 'in 5 yrs', output: new Date('2024-06-20T00:00:00.000Z') },
            { input: '5 years later', output: new Date('2024-06-20T00:00:00.000Z') },
            { input: '5 years from now', output: new Date('2024-06-20T00:00:00.000Z') },
            { input: '5 years from now', output: new Date('2024-06-20T00:00:00.000Z') },
            { input: '5 years ago', output: new Date('2014-06-20T00:00:00.000Z') },
        ])('should be able to parse "$input"', ({ input, output }) => {
            const result = relativeDateStringToDayMonthYear(input);
            expect(result).toBe(output);
        });
    });
});
