import MONTH from './month.constants';

describe('MONTH', () => {
    describe('ANY', () => {
        test.each([
            { text: 'jan', expected: true },
            { text: 'january', expected: true },
            { text: 'feb', expected: true },
            { text: 'february', expected: true },
            { text: 'mar', expected: true },
            { text: 'march', expected: true },
            { text: 'apr', expected: true },
            { text: 'april', expected: true },
            { text: 'may', expected: true },
            { text: 'jun', expected: true },
            { text: 'june', expected: true },
            { text: 'jul', expected: true },
            { text: 'july', expected: true },
            { text: 'aug', expected: true },
            { text: 'august', expected: true },
            { text: 'sep', expected: true },
            { text: 'september', expected: true },
            { text: 'oct', expected: true },
            { text: 'october', expected: true },
            { text: 'nov', expected: true },
            { text: 'november', expected: true },
            { text: 'dec', expected: true },
            { text: 'december', expected: true },
            { text: 'januarys', expected: false },
            { text: 'februarys', expected: false },
            { text: 'marchs', expected: false },
            { text: 'aprils', expected: false },
            { text: 'mays', expected: false },
            { text: 'junes', expected: false },
            { text: 'julys', expected: false },
            { text: 'augusts', expected: false },
            { text: 'septembers', expected: false },
            { text: 'octobers', expected: false },
            { text: 'novembers', expected: false },
            { text: 'decembers', expected: false },
            { text: 'some random', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(`\\b${MONTH.ANY}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('SINGLE', () => {
        test.each([
            { text: 'jan', month: MONTH.SINGLE.JANUARY, expected: true },
            { text: 'january', month: MONTH.SINGLE.JANUARY, expected: true },
            { text: 'feb', month: MONTH.SINGLE.FEBRUARY, expected: true },
            { text: 'february', month: MONTH.SINGLE.FEBRUARY, expected: true },
            { text: 'mar', month: MONTH.SINGLE.MARCH, expected: true },
            { text: 'march', month: MONTH.SINGLE.MARCH, expected: true },
            { text: 'apr', month: MONTH.SINGLE.APRIL, expected: true },
            { text: 'april', month: MONTH.SINGLE.APRIL, expected: true },
            { text: 'may', month: MONTH.SINGLE.MAY, expected: true },
            { text: 'jun', month: MONTH.SINGLE.JUNE, expected: true },
            { text: 'june', month: MONTH.SINGLE.JUNE, expected: true },
            { text: 'jul', month: MONTH.SINGLE.JULY, expected: true },
            { text: 'july', month: MONTH.SINGLE.JULY, expected: true },
            { text: 'aug', month: MONTH.SINGLE.AUGUST, expected: true },
            { text: 'august', month: MONTH.SINGLE.AUGUST, expected: true },
            { text: 'sep', month: MONTH.SINGLE.SEPTEMBER, expected: true },
            { text: 'september', month: MONTH.SINGLE.SEPTEMBER, expected: true },
            { text: 'oct', month: MONTH.SINGLE.OCTOBER, expected: true },
            { text: 'october', month: MONTH.SINGLE.OCTOBER, expected: true },
            { text: 'nov', month: MONTH.SINGLE.NOVEMBER, expected: true },
            { text: 'november', month: MONTH.SINGLE.NOVEMBER, expected: true },
            { text: 'dec', month: MONTH.SINGLE.DECEMBER, expected: true },
            { text: 'december', month: MONTH.SINGLE.DECEMBER, expected: true },
        ])('should return $expected for "$text"', ({ text, month, expected }) => {
            const regex = new RegExp(`\\b${month}\\b`, 'ig');
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
            { text: '10', expected: true },
            { text: '11', expected: true },
            { text: '12', expected: true },
            { text: '01', expected: true },
            { text: '02', expected: true },
            { text: '03', expected: true },
            { text: '04', expected: true },
            { text: '05', expected: true },
            { text: '06', expected: true },
            { text: '07', expected: true },
            { text: '08', expected: true },
            { text: '09', expected: true },
            { text: '13', expected: false },
            { text: 'some random', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(`\\b${MONTH.NUMBERS}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('WITH_FUTURE_PAST_WORDS', () => {
        test.each([
            { text: 'for Jan', expected: true },
            { text: 'next mar', expected: true },
            { text: 'this december', expected: true },
            { text: 'current jan', expected: true },
            { text: 'in nov', expected: true },
            { text: 'last may', expected: true },
            { text: 'prev oct', expected: true },
            { text: 'previous oct', expected: true },
            { text: 'some random text', expected: false },
            { text: 'last sept', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(`\\b${MONTH.WITH_FUTURE_PAST_WORDS}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });

    describe('PAST_WORDS', () => {
        test.each([
            { text: 'last', expected: true },
            { text: 'prev', expected: true },
            { text: 'previous', expected: true },
            { text: 'prevent', expected: false },
            { text: 'some random text', expected: false },
        ])('should return $expected for "$text"', ({ text, expected }) => {
            const regex = new RegExp(`\\b${MONTH.PAST_WORDS}\\b`, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });
});
