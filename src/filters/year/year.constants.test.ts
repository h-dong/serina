import YEAR from './year.constants';

describe('YEAR', () => {
    describe('ANY', () => {
        test.each([
            { input: '1', expected: false },
            { input: '21', expected: false },
            { input: '201', expected: false },
            { input: '0000', expected: true },
            { input: '2023', expected: true },
            { input: '9999', expected: true },
            { input: '10000', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(YEAR.ANY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('FILLER_WORDS', () => {
        test.each([
            { input: 'in', expected: false },
            { input: 'in ', expected: true },
            { input: ' in', expected: false },
            { input: ' in ', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(YEAR.FILLER_WORDS, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('ANY YEAR WITH FILLER_WORDS', () => {
        test.each([
            { input: 'in 1', expected: false },
            { input: 'in 21', expected: false },
            { input: 'in 201', expected: false },
            { input: 'in 0000', expected: true },
            { input: 'in 2023', expected: true },
            { input: 'in 9999', expected: true },
            { input: 'in 10000', expected: false },
            { input: 'not_a_word_in 10000', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(YEAR.YEAR_WITH_FILLER_WORDS, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
});
