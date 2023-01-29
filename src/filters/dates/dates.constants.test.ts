import DATES from './dates.constants';

describe('DATES', () => {
    describe('FILLER_WORDS', () => {
        test.each([
            { input: 'on', expected: false },
            { input: 'by', expected: false },
            { input: 'on ', expected: true },
            { input: 'by ', expected: true },
            { input: 'on the', expected: true },
            { input: 'by the', expected: true },
            { input: 'on the ', expected: true },
            { input: 'by the ', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.FILLER_WORDS, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('NUM_DIVIDER', () => {
        test.each([
            { input: '-', expected: true },
            { input: '/', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.NUM_DIVIDER, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('TXT_DIVIDER', () => {
        test.each([
            { input: ',', expected: false },
            { input: ' ', expected: true },
            { input: ', ', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.TXT_DIVIDER, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('NUM_DAY_MONTH_YEAR', () => {
        test.each([
            { input: '25-01-2023', expected: true },
            { input: '25/01/2023', expected: true },
            { input: '25-01-23', expected: false },
            { input: '25/01/23', expected: false },
            { input: '25-01/2023', expected: false },
            { input: '25-01/2023', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.NUM_DAY_MONTH_YEAR, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('NUM_MONTH_DAY_YEAR', () => {
        test.each([
            { input: '01-25-2023', expected: true },
            { input: '01/25/2023', expected: true },
            { input: '01-25-23', expected: false },
            { input: '01/25/23', expected: false },
            { input: '01-25/2023', expected: false },
            { input: '01-25/2023', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.NUM_MONTH_DAY_YEAR, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('NUM_YEAR_MONTH_DAY', () => {
        test.each([
            { input: '2023-01-25', expected: true },
            { input: '2023/01/25', expected: true },
            { input: '23-01-25', expected: false },
            { input: '23/01/25', expected: false },
            { input: '2023-01/25', expected: false },
            { input: '2023-01/25', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.NUM_YEAR_MONTH_DAY, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('TXT_DAY_MONTH_YEAR', () => {
        test.each([
            { input: '25 January 2023', expected: true },
            { input: '25 January 23', expected: false },
            { input: '25th Jan 2023', expected: true },
            { input: '25 Jan 23', expected: false },
            { input: '25 Jan, 2023', expected: true },
            { input: '25 Jan, 23', expected: false },
            { input: '25 Jan, 2023', expected: true },
            { input: '25 Jan, 23', expected: false },
            { input: '25th, Jan 2023', expected: true },
            { input: '25, Jan, 2023', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.TXT_DAY_MONTH_YEAR, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('TXT_MONTH_DAY_YEAR', () => {
        test.each([
            { input: 'January 25 2023', expected: true },
            { input: 'January 25 23', expected: false },
            { input: 'Jan 25th 2023', expected: true },
            { input: 'Jan 25 23', expected: false },
            { input: 'Jan 25, 2023', expected: true },
            { input: 'Jan 25, 23', expected: false },
            { input: 'Jan 25th, 2023', expected: true },
            { input: 'Jan 25, 2023', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.TXT_MONTH_DAY_YEAR, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('ANY', () => {
        test.each([
            { input: '25-01-2023', expected: true },
            { input: '01-25-2023', expected: true },
            { input: '2023-01-25', expected: true },
            { input: '25 January 2023', expected: true },
            { input: 'January 25 2023', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.ANY, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });

    describe('WITH_FILLER_WORDS', () => {
        test.each([
            { input: 'on 25/01/2023', expected: true },
            { input: 'by 25/01/2023', expected: true },
            { input: 'on 25/01/2023', expected: true },
            { input: 'by 25/01/2023', expected: true },
            { input: 'on the 25/01/2023', expected: true },
            { input: 'by the 25/01/2023', expected: true },
            { input: 'on the 25/01/2023', expected: true },
            { input: 'by the 25/01/2023', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(DATES.WITH_FILLER_WORDS, 'ig');
            expect(regex.test(input)).toBe(expected);
        });
    });
});
