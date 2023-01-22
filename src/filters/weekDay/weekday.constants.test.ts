import WEEKDAY from './weekday.constants';

describe('WEEKDAY', () => {
    describe('WITH_FUTURE_PAST_WORDS', () => {
        test.each([
            { input: 'for monday', expected: true },
            { input: 'next monday', expected: true },
            { input: 'this monday', expected: true },
            { input: 'current monday', expected: true },
            { input: 'on monday', expected: true },
            { input: 'last monday', expected: true },
            { input: 'prev monday', expected: true },
            { input: 'previous monday', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(WEEKDAY.WITH_FUTURE_PAST_WORDS, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
    describe('ANY', () => {
        test.each([
            { input: 'mon', expected: true },
            { input: 'monday', expected: true },
            { input: 'tue', expected: true },
            { input: 'tuesday', expected: true },
            { input: 'wed', expected: true },
            { input: 'wednesday', expected: true },
            { input: 'thu', expected: true },
            { input: 'thursday', expected: true },
            { input: 'fri', expected: true },
            { input: 'friday', expected: true },
            { input: 'sat', expected: true },
            { input: 'saturday', expected: true },
            { input: 'sun', expected: true },
            { input: 'sunday', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(WEEKDAY.ANY, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('SINGLE', () => {
        test.each([
            { input: 'mon', weekday: WEEKDAY.SINGLE.MONDAY, expected: true },
            { input: 'monday', weekday: WEEKDAY.SINGLE.MONDAY, expected: true },
            { input: 'tue', weekday: WEEKDAY.SINGLE.TUESDAY, expected: true },
            { input: 'tuesday', weekday: WEEKDAY.SINGLE.TUESDAY, expected: true },
            { input: 'wed', weekday: WEEKDAY.SINGLE.WEDNESDAY, expected: true },
            { input: 'wednesday', weekday: WEEKDAY.SINGLE.WEDNESDAY, expected: true },
            { input: 'thu', weekday: WEEKDAY.SINGLE.THURSDAY, expected: true },
            { input: 'thursday', weekday: WEEKDAY.SINGLE.THURSDAY, expected: true },
            { input: 'fri', weekday: WEEKDAY.SINGLE.FRIDAY, expected: true },
            { input: 'friday', weekday: WEEKDAY.SINGLE.FRIDAY, expected: true },
            { input: 'sat', weekday: WEEKDAY.SINGLE.SATURDAY, expected: true },
            { input: 'saturday', weekday: WEEKDAY.SINGLE.SATURDAY, expected: true },
            { input: 'sun', weekday: WEEKDAY.SINGLE.SUNDAY, expected: true },
            { input: 'sunday', weekday: WEEKDAY.SINGLE.SUNDAY, expected: true },
        ])('should return $expected for "$input"', ({ input, weekday, expected }) => {
            const regex = new RegExp(weekday, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });

    describe('PAST_WORDS', () => {
        test.each([
            { input: 'last', expected: true },
            { input: 'previous', expected: true },
            { input: 'prev', expected: true },
        ])('should return $expected for "$input"', ({ input, expected }) => {
            const regex = new RegExp(WEEKDAY.PAST_WORDS, 'ig');
            expect(regex.test(input)).toEqual(expected);
        });
    });
});
