import DATES from './dates.constants';

describe('DATES', () => {
    describe('FILLER_WORDS', () => {
        test.each([
            { text: 'on', expected: false },
            { text: 'by', expected: false },
            { text: 'on ', expected: true },
            { text: 'by ', expected: true },
            { text: 'on the', expected: true },
            { text: 'by the', expected: true },
            { text: 'on the ', expected: true },
            { text: 'by the ', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.FILLER_WORDS, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('NUM_DIVIDER', () => {
        test.each([
            { text: '-', expected: true },
            { text: '/', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.NUM_DIVIDER, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('TXT_DIVIDER', () => {
        test.each([
            { text: ',', expected: false },
            { text: ' ', expected: true },
            { text: ', ', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.TXT_DIVIDER, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('NUM_DAY_MONTH_YEAR', () => {
        test.each([
            { text: '25-01-2023', expected: true },
            { text: '25/01/2023', expected: true },
            { text: '25-01-23', expected: false },
            { text: '25/01/23', expected: false },
            { text: '25-01/2023', expected: false },
            { text: '25-01/2023', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.NUM_DAY_MONTH_YEAR, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('NUM_MONTH_DAY_YEAR', () => {
        test.each([
            { text: '01-25-2023', expected: true },
            { text: '01/25/2023', expected: true },
            { text: '01-25-23', expected: false },
            { text: '01/25/23', expected: false },
            { text: '01-25/2023', expected: false },
            { text: '01-25/2023', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.NUM_MONTH_DAY_YEAR, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('NUM_YEAR_MONTH_DAY', () => {
        test.each([
            { text: '2023-01-25', expected: true },
            { text: '2023/01/25', expected: true },
            { text: '23-01-25', expected: false },
            { text: '23/01/25', expected: false },
            { text: '2023-01/25', expected: false },
            { text: '2023-01/25', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.NUM_YEAR_MONTH_DAY, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('TXT_DAY_MONTH_YEAR', () => {
        test.each([
            { text: '25 January 2023', expected: true },
            { text: '25 January 23', expected: false },
            { text: '25th Jan 2023', expected: true },
            { text: '25 Jan 23', expected: false },
            { text: '25 Jan, 2023', expected: true },
            { text: '25 Jan, 23', expected: false },
            { text: '25 Jan, 2023', expected: true },
            { text: '25 Jan, 23', expected: false },
            { text: '25th, Jan 2023', expected: true },
            { text: '25, Jan, 2023', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.TXT_DAY_MONTH_YEAR, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('TXT_MONTH_DAY_YEAR', () => {
        test.each([
            { text: 'January 25 2023', expected: true },
            { text: 'January 25 23', expected: false },
            { text: 'Jan 25th 2023', expected: true },
            { text: 'Jan 25 23', expected: false },
            { text: 'Jan 25, 2023', expected: true },
            { text: 'Jan 25, 23', expected: false },
            { text: 'Jan 25th, 2023', expected: true },
            { text: 'Jan 25, 2023', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.TXT_MONTH_DAY_YEAR, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('ANY', () => {
        test.each([
            { text: '25-01-2023', expected: true },
            { text: '01-25-2023', expected: true },
            { text: '2023-01-25', expected: true },
            { text: '25 January 2023', expected: true },
            { text: 'January 25 2023', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.ANY, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });

    describe('WITH_FILLER_WORDS', () => {
        test.each([
            { text: 'on 25/01/2023', expected: true },
            { text: 'by 25/01/2023', expected: true },
            { text: 'on 25/01/2023', expected: true },
            { text: 'by 25/01/2023', expected: true },
            { text: 'on the 25/01/2023', expected: true },
            { text: 'by the 25/01/2023', expected: true },
            { text: 'on the 25/01/2023', expected: true },
            { text: 'by the 25/01/2023', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(DATES.WITH_FILLER_WORDS, 'ig');
            expect(regex.test(text)).toBe(expected);
        });
    });
});
