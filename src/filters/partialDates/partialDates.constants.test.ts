import PARTIAL_DATES from './partialDates.constants';

describe('PARTIAL_DATES', () => {
    describe('NUM_MONTH_YEAR', () => {
        test.each([
            { input: '1/2020', expected: true },
            { input: '1-2020', expected: true },
            { input: '01/2020', expected: true },
            { input: '01-2020', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_MONTH_YEAR, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('NUM_YEAR_MONTH', () => {
        test.each([
            { input: '2020/1', expected: true },
            { input: '2020-1', expected: true },
            { input: '2020/01', expected: true },
            { input: '2020-01', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_YEAR_MONTH, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('NUM_MONTH_DAY', () => {
        test.each([
            { input: '1/1', expected: true },
            { input: '1-1', expected: true },
            { input: '01/1', expected: true },
            { input: '01-1', expected: true },
            { input: '1/01', expected: true },
            { input: '1-01', expected: true },
            { input: '01/01', expected: true },
            { input: '01-01', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_MONTH_DAY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('NUM_DAY_MONTH', () => {
        test.each([
            { input: '1/1', expected: true },
            { input: '1-1', expected: true },
            { input: '01/1', expected: true },
            { input: '01-1', expected: true },
            { input: '1/01', expected: true },
            { input: '1-01', expected: true },
            { input: '01/01', expected: true },
            { input: '01-01', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.NUM_DAY_MONTH, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('TXT_MONTH_YEAR', () => {
        test.each([
            { input: 'January 2020', expected: true },
            { input: 'Jan 2020', expected: true },
            { input: 'february 3000', expected: true },
            { input: 'feb 3000', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_MONTH_YEAR, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('TXT_MONTH_DAY', () => {
        test.each([
            { input: 'January 1', expected: true },
            { input: 'Jan 1', expected: true },
            { input: 'february 1', expected: true },
            { input: 'feb 1', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_MONTH_DAY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('TXT_DAY_MONTH', () => {
        test.each([
            { input: '1 January', expected: true },
            { input: '1 Jan', expected: true },
            { input: '1 february', expected: true },
            { input: '1 feb', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_DAY_MONTH, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
    describe('TXT_YEAR_MONTH', () => {
        test.each([
            { input: '2020 January', expected: true },
            { input: '2020 Jan', expected: true },
            { input: '3000 february', expected: true },
            { input: '3000 feb', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.TXT_YEAR_MONTH, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
    describe('DAY', () => {
        test.each([
            { input: '1', expected: false },
            { input: '01', expected: false },
            { input: '31', expected: false },
            { input: '1st', expected: true },
            { input: '2nd', expected: true },
            { input: '3rd', expected: true },
            { input: '4th', expected: true },
            { input: '31st', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.DAY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('ANY', () => {
        test.each([
            { input: '01-31', expected: true },
            { input: '31-01', expected: true },
            { input: 'January 2020', expected: true },
            { input: '2000 January', expected: true },
            { input: 'January 1', expected: true },
            { input: '1 January', expected: true },
            { input: '1st', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(PARTIAL_DATES.ANY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
});
