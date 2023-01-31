import {
    convertRelativeAdverbToObj,
    convertRelativeExpressionToObj,
    RegexTimeUnit,
    regexTimeUnitToDayLiteTimeUnit,
    relativeDateStringToDateObj,
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
            { text: 'DAYS', expected: 'day' },
            { text: 'WEEKS', expected: 'week' },
            { text: 'MONTHS', expected: 'month' },
            { text: 'YEARS', expected: 'year' },
            { text: 'ANY', expected: null },
        ])('returns correct unit given $text', ({ text, expected }) => {
            const result = regexTimeUnitToDayLiteTimeUnit(text as RegexTimeUnit);
            expect(result).toBe(expected);
        });
    });

    describe('convertRelativeAdverbToObj()', () => {
        test.each([
            { text: 'do something yesterday', expected: new Date('2019-06-19T00:00:00.000Z') },
            { text: 'do something today', expected: new Date('2019-06-20T00:00:00.000Z') },
            { text: 'do something tomorrow', expected: new Date('2019-06-21T00:00:00.000Z') },
        ])('returns correct date given $text', ({ text, expected }) => {
            const result = convertRelativeAdverbToObj(text);
            expect(result).toEqual(expected);
        });
    });

    describe('convertRelativeExpressionToObj()', () => {
        test('return null if no match', () => {
            const result = convertRelativeExpressionToObj('do something');
            expect(result).toBeNull();
        });

        test.each([
            { text: '1 day', expected: new Date('2019-06-21T00:00:00.000Z') },
            { text: '2 days', expected: new Date('2019-06-22T00:00:00.000Z') },
            { text: '1 week', expected: new Date('2019-06-27T00:00:00.000Z') },
            { text: '2 weeks', expected: new Date('2019-07-04T00:00:00.000Z') },
            { text: '1 month', expected: new Date('2019-07-20T00:00:00.000Z') },
            { text: '2 months', expected: new Date('2019-08-20T00:00:00.000Z') },
            { text: '1 year', expected: new Date('2020-06-20T00:00:00.000Z') },
            { text: '2 years', expected: new Date('2021-06-20T00:00:00.000Z') },
        ])('returns correct date for "$text"', ({ text, expected }) => {
            const result = convertRelativeExpressionToObj(text);
            expect(result).toEqual(expected);
        });

        test.each([
            { text: 'next week', expected: new Date('2019-06-24T00:00:00.000Z') },
            { text: 'next month', expected: new Date('2019-07-01T00:00:00.000Z') },
            { text: 'next year', expected: new Date('2020-01-01T00:00:00.000Z') },
        ])('parse "$text" to be at the start of the week/month/year', ({ text, expected }) => {
            const result = convertRelativeExpressionToObj(text);
            expect(result).toEqual(expected);
        });
    });

    describe('relativeDateStringToDayMonthYear()', () => {
        test('should remove filler words', () => {
            const result = relativeDateStringToDayMonthYear('after 1 week');
            expect(result).toEqual(new Date('2019-06-27T00:00:00.000Z'));
        });

        test('should be able to parse relative adverb', () => {
            const result = relativeDateStringToDayMonthYear('by today');
            expect(result).toEqual(new Date('2019-06-20T00:00:00.000Z'));
        });

        test('should be able to parse relative expression', () => {
            const result = relativeDateStringToDayMonthYear('in 1 week');
            expect(result).toEqual(new Date('2019-06-27T00:00:00.000Z'));
        });
    });

    describe('relativeDateStringToDateObj()', () => {
        test('should return null if no match', () => {
            const result = relativeDateStringToDateObj('do something');
            expect(result).toBeNull();
        });

        test.each([
            { text: 'today', expected: new Date('2019-06-20T00:00:00.000Z') },
            { text: 'in a day', expected: new Date('2019-06-21T00:00:00.000Z') },
            { text: 'in a week', expected: new Date('2019-06-27T00:00:00.000Z') },
            { text: 'in 5 weeks', expected: new Date('2019-07-25T00:00:00.000Z') },
            { text: 'tomorrow', expected: new Date('2019-06-21T00:00:00.000Z') },
            { text: 'in 5 days', expected: new Date('2019-06-25T00:00:00.000Z') },
            { text: 'in 31 days', expected: new Date('2019-07-21T00:00:00.000Z') },
            { text: 'in a wk', expected: new Date('2019-06-27T00:00:00.000Z') },
            { text: 'in 5 wks', expected: new Date('2019-07-25T00:00:00.000Z') },
            { text: 'in a month', expected: new Date('2019-07-20T00:00:00.000Z') },
            { text: 'in 5 months', expected: new Date('2019-11-20T00:00:00.000Z') },
            { text: 'in 12 months', expected: new Date('2020-06-20T00:00:00.000Z') },
            { text: 'in a year', expected: new Date('2020-06-20T00:00:00.000Z') },
            { text: 'in 5 years', expected: new Date('2024-06-20T00:00:00.000Z') },
            { text: 'in a yr', expected: new Date('2020-06-20T00:00:00.000Z') },
            { text: 'in 5 yrs', expected: new Date('2024-06-20T00:00:00.000Z') },
            { text: '5 years later', expected: new Date('2024-06-20T00:00:00.000Z') },
            { text: '5 years from now', expected: new Date('2024-06-20T00:00:00.000Z') },
            { text: '5 years from now', expected: new Date('2024-06-20T00:00:00.000Z') },
        ])('should be able to parse "$text"', ({ text, expected }) => {
            const result = relativeDateStringToDateObj(text);
            expect(result).toEqual(expected);
        });
    });
});
