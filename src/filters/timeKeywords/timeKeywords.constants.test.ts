import TIME_KEYWORDS from './timeKeywords.constants';

describe('TIME_KEYWORDS', () => {
    describe('WITH_FILLER_WORDS', () => {
        test.each([
            { input: 'at noon', expected: true },
            { input: 'at midnight', expected: true },
            { input: 'at mid-night', expected: true },
            { input: 'at mid night', expected: true },
            { input: 'at midday', expected: true },
            { input: 'at mid-day', expected: true },
            { input: 'at mid day', expected: true },
            { input: 'by noon', expected: true },
            { input: 'by midnight', expected: true },
            { input: 'by mid-night', expected: true },
            { input: 'by mid night', expected: true },
            { input: 'by midday', expected: true },
            { input: 'by mid-day', expected: true },
            { input: 'by mid day', expected: true },
            { input: 'around noon', expected: true },
            { input: 'around midnight', expected: true },
            { input: 'around mid-night', expected: true },
            { input: 'around mid night', expected: true },
            { input: 'around midday', expected: true },
            { input: 'around mid-day', expected: true },
            { input: 'around mid day', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(TIME_KEYWORDS.WITH_FILLER_WORDS, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('MID_NIGHT', () => {
        test.each([
            { input: 'midnight', expected: true },
            { input: 'mid night', expected: true },
            { input: 'mid-night', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(TIME_KEYWORDS.MID_NIGHT, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('MID_DAY', () => {
        test.each([
            { input: 'noon', expected: true },
            { input: 'midday', expected: true },
            { input: 'mid day', expected: true },
            { input: 'mid-day', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(TIME_KEYWORDS.MID_DAY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
});
