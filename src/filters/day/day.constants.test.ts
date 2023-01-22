import DAY from './day.constants';

describe('DAY', () => {
    describe('FILLER_WORDS', () => {
        test.each([
            { input: 'on', expected: false },
            { input: 'on ', expected: true },
            { input: ' on', expected: false },
            { input: ' on ', expected: true },
            { input: ' on the', expected: true },
            { input: ' on the ', expected: true },
            { input: 'on the ', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DAY.FILLER_WORDS, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('NUMBERS', () => {
        test.each([
            { input: '0', expected: false },
            { input: '1', expected: true },
            { input: '2', expected: true },
            { input: '3', expected: true },
            { input: '4', expected: true },
            { input: '5', expected: true },
            { input: '6', expected: true },
            { input: '7', expected: true },
            { input: '8', expected: true },
            { input: '9', expected: true },
            { input: '01', expected: true },
            { input: '02', expected: true },
            { input: '03', expected: true },
            { input: '04', expected: true },
            { input: '05', expected: true },
            { input: '06', expected: true },
            { input: '07', expected: true },
            { input: '08', expected: true },
            { input: '09', expected: true },
            { input: '10', expected: true },
            { input: '11', expected: true },
            { input: '12', expected: true },
            { input: '13', expected: true },
            { input: '14', expected: true },
            { input: '15', expected: true },
            { input: '16', expected: true },
            { input: '17', expected: true },
            { input: '18', expected: true },
            { input: '19', expected: true },
            { input: '20', expected: true },
            { input: '21', expected: true },
            { input: '22', expected: true },
            { input: '23', expected: true },
            { input: '24', expected: true },
            { input: '25', expected: true },
            { input: '26', expected: true },
            { input: '27', expected: true },
            { input: '28', expected: true },
            { input: '29', expected: true },
            { input: '30', expected: true },
            { input: '31', expected: true },
            { input: '32', expected: false },
            { input: '100', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.NUMBERS}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('ANY', () => {
        test.each([
            { input: '0', expected: false },
            { input: '7', expected: true },
            { input: '07', expected: true },
            { input: '22', expected: true },
            { input: '30', expected: true },
            { input: '31', expected: true },
            { input: '32', expected: false },
            { input: '100', expected: false },
            { input: '0th', expected: false },
            { input: '1st', expected: true },
            { input: '1nd', expected: true },
            { input: '1rd', expected: true },
            { input: '7th', expected: true },
            { input: '07th', expected: true },
            { input: '22nd', expected: true },
            { input: '30th', expected: true },
            { input: '31st', expected: true },
            { input: '32nd', expected: false },
            { input: '100th', expected: false },
        ])('should return $expected for "$input" (allow any day with any ordinal indicator)', ({ input, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.ANY}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('WITH_ORDINAL', () => {
        test.each([
            { input: '0', expected: false },
            { input: '7', expected: false },
            { input: '07', expected: false },
            { input: '22', expected: false },
            { input: '30', expected: false },
            { input: '31', expected: false },
            { input: '32', expected: false },
            { input: '100', expected: false },
            { input: '0th', expected: false },
            { input: '1st', expected: true },
            { input: '1nd', expected: true },
            { input: '1rd', expected: true },
            { input: '7th', expected: true },
            { input: '07th', expected: true },
            { input: '22nd', expected: true },
            { input: '30th', expected: true },
            { input: '31st', expected: true },
            { input: '32nd', expected: false },
            { input: '100th', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.WITH_ORDINAL}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('WITH_FILLER_WORDS_AND_ORDINAL', () => {
        test.each([
            { input: 'on', expected: false },
            { input: 'on the ', expected: false },
            { input: '0', expected: false },
            { input: '7', expected: false },
            { input: '07', expected: false },
            { input: '22', expected: false },
            { input: '30', expected: false },
            { input: '31', expected: false },
            { input: '32', expected: false },
            { input: '100', expected: false },
            { input: '0th', expected: false },
            { input: '1st', expected: true },
            { input: '1nd', expected: true },
            { input: '1rd', expected: true },
            { input: '7th', expected: true },
            { input: '07th', expected: true },
            { input: '22nd', expected: true },
            { input: '30th', expected: true },
            { input: '31st', expected: true },
            { input: '32nd', expected: false },
            { input: '100th', expected: false },
            { input: 'on 21st', expected: true },
            { input: 'on the 20th', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.WITH_FILLER_WORDS_AND_ORDINAL}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
});
