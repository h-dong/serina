import DAY from './day.constants';

describe('DAY', () => {
    describe('FILLER_WORDS', () => {
        test.each([
            { text: 'on', expected: false },
            { text: 'on ', expected: true },
            { text: ' on', expected: false },
            { text: ' on ', expected: true },
            { text: ' on the', expected: true },
            { text: ' on the ', expected: true },
            { text: 'on the ', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DAY.FILLER_WORDS, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('NUMBERS', () => {
        test.each([
            { text: '0', expected: false },
            { text: '1', expected: true },
            { text: '2', expected: true },
            { text: '3', expected: true },
            { text: '4', expected: true },
            { text: '5', expected: true },
            { text: '6', expected: true },
            { text: '7', expected: true },
            { text: '8', expected: true },
            { text: '9', expected: true },
            { text: '01', expected: true },
            { text: '02', expected: true },
            { text: '03', expected: true },
            { text: '04', expected: true },
            { text: '05', expected: true },
            { text: '06', expected: true },
            { text: '07', expected: true },
            { text: '08', expected: true },
            { text: '09', expected: true },
            { text: '10', expected: true },
            { text: '11', expected: true },
            { text: '12', expected: true },
            { text: '13', expected: true },
            { text: '14', expected: true },
            { text: '15', expected: true },
            { text: '16', expected: true },
            { text: '17', expected: true },
            { text: '18', expected: true },
            { text: '19', expected: true },
            { text: '20', expected: true },
            { text: '21', expected: true },
            { text: '22', expected: true },
            { text: '23', expected: true },
            { text: '24', expected: true },
            { text: '25', expected: true },
            { text: '26', expected: true },
            { text: '27', expected: true },
            { text: '28', expected: true },
            { text: '29', expected: true },
            { text: '30', expected: true },
            { text: '31', expected: true },
            { text: '32', expected: false },
            { text: '100', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.NUMBERS}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('ANY', () => {
        test.each([
            { text: '0', expected: false },
            { text: '7', expected: true },
            { text: '07', expected: true },
            { text: '22', expected: true },
            { text: '30', expected: true },
            { text: '31', expected: true },
            { text: '32', expected: false },
            { text: '100', expected: false },
            { text: '0th', expected: false },
            { text: '1st', expected: true },
            { text: '1nd', expected: true },
            { text: '1rd', expected: true },
            { text: '7th', expected: true },
            { text: '07th', expected: true },
            { text: '22nd', expected: true },
            { text: '30th', expected: true },
            { text: '31st', expected: true },
            { text: '32nd', expected: false },
            { text: '100th', expected: false },
        ])('should return $expected for "$text" (allow any day with any ordinal indicator)', ({ text, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.ANY}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('WITH_ORDINAL', () => {
        test.each([
            { text: '0', expected: false },
            { text: '7', expected: false },
            { text: '07', expected: false },
            { text: '22', expected: false },
            { text: '30', expected: false },
            { text: '31', expected: false },
            { text: '32', expected: false },
            { text: '100', expected: false },
            { text: '0th', expected: false },
            { text: '1st', expected: true },
            { text: '1nd', expected: true },
            { text: '1rd', expected: true },
            { text: '7th', expected: true },
            { text: '07th', expected: true },
            { text: '22nd', expected: true },
            { text: '30th', expected: true },
            { text: '31st', expected: true },
            { text: '32nd', expected: false },
            { text: '100th', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.WITH_ORDINAL}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('WITH_FILLER_WORDS_AND_ORDINAL', () => {
        test.each([
            { text: 'on', expected: false },
            { text: 'on the ', expected: false },
            { text: '0', expected: false },
            { text: '7', expected: false },
            { text: '07', expected: false },
            { text: '22', expected: false },
            { text: '30', expected: false },
            { text: '31', expected: false },
            { text: '32', expected: false },
            { text: '100', expected: false },
            { text: '0th', expected: false },
            { text: '1st', expected: true },
            { text: '1nd', expected: true },
            { text: '1rd', expected: true },
            { text: '7th', expected: true },
            { text: '07th', expected: true },
            { text: '22nd', expected: true },
            { text: '30th', expected: true },
            { text: '31st', expected: true },
            { text: '32nd', expected: false },
            { text: '100th', expected: false },
            { text: 'on 21st', expected: true },
            { text: 'on the 20th', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            // Add word boundary to test regex properly
            const regex = new RegExp(`\\b${DAY.WITH_FILLER_WORDS_AND_ORDINAL}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });
});
