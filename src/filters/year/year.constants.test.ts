import YEAR from './year.constants';

describe('YEAR', () => {
    describe('ANY', () => {
        test.each([
            { text: '1', expected: false },
            { text: '21', expected: false },
            { text: '201', expected: false },
            { text: '0000', expected: true },
            { text: '2023', expected: true },
            { text: '9999', expected: true },
            { text: '10000', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(YEAR.ANY, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('FILLER_WORDS', () => {
        test.each([
            { text: 'in', expected: false },
            { text: 'in ', expected: true },
            { text: 'in year ', expected: true },
            { text: 'in the year ', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(YEAR.FILLER_WORDS, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('ANY YEAR WITH FILLER_WORDS', () => {
        test.each([
            { text: 'in 1', expected: false },
            { text: 'in 21', expected: false },
            { text: 'in 201', expected: false },
            { text: 'in 0000', expected: true },
            { text: 'in 2023', expected: true },
            { text: 'in 9999', expected: true },
            { text: 'in 10000', expected: false },
            { text: 'in year 2023', expected: true },
            { text: 'in the year 2023', expected: true },
            { text: 'not_a_word_in 10000', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(YEAR.WITH_FILLER_WORDS, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });
});
