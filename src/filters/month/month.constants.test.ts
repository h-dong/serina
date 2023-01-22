import MONTH from './month.constants';

describe('MONTH', () => {
    describe('ANY', () => {
        test.each([
            { input: 'jan', expected: true },
            { input: 'january', expected: true },
            { input: 'feb', expected: true },
            { input: 'february', expected: true },
            { input: 'mar', expected: true },
            { input: 'march', expected: true },
            { input: 'apr', expected: true },
            { input: 'april', expected: true },
            { input: 'may', expected: true },
            { input: 'jun', expected: true },
            { input: 'june', expected: true },
            { input: 'jul', expected: true },
            { input: 'july', expected: true },
            { input: 'aug', expected: true },
            { input: 'august', expected: true },
            { input: 'sep', expected: true },
            { input: 'september', expected: true },
            { input: 'oct', expected: true },
            { input: 'october', expected: true },
            { input: 'nov', expected: true },
            { input: 'november', expected: true },
            { input: 'dec', expected: true },
            { input: 'december', expected: true },
            { input: 'januarys', expected: false },
            { input: 'februarys', expected: false },
            { input: 'marchs', expected: false },
            { input: 'aprils', expected: false },
            { input: 'mays', expected: false },
            { input: 'junes', expected: false },
            { input: 'julys', expected: false },
            { input: 'augusts', expected: false },
            { input: 'septembers', expected: false },
            { input: 'octobers', expected: false },
            { input: 'novembers', expected: false },
            { input: 'decembers', expected: false },
            { input: 'some random', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(`\\b${MONTH.ANY}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('SINGLE', () => {
        test.each([
            { input: 'jan', month: MONTH.SINGLE.JANUARY, expected: true },
            { input: 'january', month: MONTH.SINGLE.JANUARY, expected: true },
            { input: 'feb', month: MONTH.SINGLE.FEBRUARY, expected: true },
            { input: 'february', month: MONTH.SINGLE.FEBRUARY, expected: true },
            { input: 'mar', month: MONTH.SINGLE.MARCH, expected: true },
            { input: 'march', month: MONTH.SINGLE.MARCH, expected: true },
            { input: 'apr', month: MONTH.SINGLE.APRIL, expected: true },
            { input: 'april', month: MONTH.SINGLE.APRIL, expected: true },
            { input: 'may', month: MONTH.SINGLE.MAY, expected: true },
            { input: 'jun', month: MONTH.SINGLE.JUNE, expected: true },
            { input: 'june', month: MONTH.SINGLE.JUNE, expected: true },
            { input: 'jul', month: MONTH.SINGLE.JULY, expected: true },
            { input: 'july', month: MONTH.SINGLE.JULY, expected: true },
            { input: 'aug', month: MONTH.SINGLE.AUGUST, expected: true },
            { input: 'august', month: MONTH.SINGLE.AUGUST, expected: true },
            { input: 'sep', month: MONTH.SINGLE.SEPTEMBER, expected: true },
            { input: 'september', month: MONTH.SINGLE.SEPTEMBER, expected: true },
            { input: 'oct', month: MONTH.SINGLE.OCTOBER, expected: true },
            { input: 'october', month: MONTH.SINGLE.OCTOBER, expected: true },
            { input: 'nov', month: MONTH.SINGLE.NOVEMBER, expected: true },
            { input: 'november', month: MONTH.SINGLE.NOVEMBER, expected: true },
            { input: 'dec', month: MONTH.SINGLE.DECEMBER, expected: true },
            { input: 'december', month: MONTH.SINGLE.DECEMBER, expected: true },
        ])('should return $expected for "$input"', ({ input, month, expected }) => {
            const regex = new RegExp(`\\b${month}\\b`, 'ig');
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
            { input: '10', expected: true },
            { input: '11', expected: true },
            { input: '12', expected: true },
            { input: '01', expected: true },
            { input: '02', expected: true },
            { input: '03', expected: true },
            { input: '04', expected: true },
            { input: '05', expected: true },
            { input: '06', expected: true },
            { input: '07', expected: true },
            { input: '08', expected: true },
            { input: '09', expected: true },
            { input: '13', expected: false },
            { input: 'some random', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(`\\b${MONTH.NUMBERS}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('WITH_FUTURE_PAST_WORDS', () => {
        test.each([
            { input: 'for Jan', expected: true },
            { input: 'next mar', expected: true },
            { input: 'this december', expected: true },
            { input: 'current jan', expected: true },
            { input: 'in nov', expected: true },
            { input: 'last may', expected: true },
            { input: 'prev oct', expected: true },
            { input: 'previous oct', expected: true },
            { input: 'some random text', expected: false },
            { input: 'last sept', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(`\\b${MONTH.WITH_FUTURE_PAST_WORDS}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('PAST_WORDS', () => {
        test.each([
            { input: 'last', expected: true },
            { input: 'prev', expected: true },
            { input: 'previous', expected: true },
            { input: 'prevent', expected: false },
            { input: 'some random text', expected: false },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(`\\b${MONTH.PAST_WORDS}\\b`, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
});
