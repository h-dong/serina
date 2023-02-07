import PARTIAL_DATES from './partialDates.constants';

describe('PARTIAL_DATES', () => {
    describe('NUM_MONTH_YEAR', () => {
        test.each([
            { text: '1/2020', expected: true },
            { text: '1-2020', expected: true },
            { text: '01/2020', expected: true },
            { text: '01-2020', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_MONTH_YEAR, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('NUM_YEAR_MONTH', () => {
        test.each([
            { text: '2020/1', expected: true },
            { text: '2020-1', expected: true },
            { text: '2020/01', expected: true },
            { text: '2020-01', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_YEAR_MONTH, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('NUM_MONTH_DAY', () => {
        test.each([
            { text: '1/1', expected: true },
            { text: '1-1', expected: true },
            { text: '01/1', expected: true },
            { text: '01-1', expected: true },
            { text: '1/01', expected: true },
            { text: '1-01', expected: true },
            { text: '01/01', expected: true },
            { text: '01-01', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_MONTH_DAY, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('NUM_DAY_MONTH', () => {
        test.each([
            { text: '1/1', expected: true },
            { text: '1-1', expected: true },
            { text: '01/1', expected: true },
            { text: '01-1', expected: true },
            { text: '1/01', expected: true },
            { text: '1-01', expected: true },
            { text: '01/01', expected: true },
            { text: '01-01', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_DAY_MONTH, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('TXT_MONTH_YEAR', () => {
        test.each([
            { text: 'January 2020', expected: true },
            { text: 'Jan 2020', expected: true },
            { text: 'february 3000', expected: true },
            { text: 'feb 3000', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_MONTH_YEAR, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('TXT_MONTH_DAY', () => {
        test.each([
            { text: 'January 1', expected: true },
            { text: 'Jan 1', expected: true },
            { text: 'february 1', expected: true },
            { text: 'feb 1', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_MONTH_DAY, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('TXT_DAY_MONTH', () => {
        test.each([
            { text: '1 January', expected: true },
            { text: '1 Jan', expected: true },
            { text: '1 february', expected: true },
            { text: '1 feb', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_DAY_MONTH, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });
    describe('TXT_YEAR_MONTH', () => {
        test.each([
            { text: '2020 January', expected: true },
            { text: '2020 Jan', expected: true },
            { text: '3000 february', expected: true },
            { text: '3000 feb', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_YEAR_MONTH, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('ANY', () => {
        test.each([
            { text: '01-31', expected: true },
            { text: '31-01', expected: true },
            { text: 'January 2020', expected: true },
            { text: '2000 January', expected: true },
            { text: 'January 1', expected: true },
            { text: '1 January', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.ANY, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('WITH_FILTER_WORDS', () => {
        test.each([
            { text: 'on 01-31', expected: true },
            { text: 'on the 01-31', expected: true },
            { text: 'by 01-31', expected: true },
            { text: 'by the 01-31', expected: true },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.WITH_FILTER_WORDS, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });
});
