import WEEKDAY from './weekday.constants';

describe('WEEKDAY', () => {
    describe('WITH_FUTURE_PAST_WORDS', () => {
        test.each([
            ['for monday'],
            ['next monday'],
            ['this monday'],
            ['current monday'],
            ['on monday'],
            ['last monday'],
            ['prev monday'],
            ['previous monday'],
        ])('should match "$text"', text => {
            const regex = new RegExp(WEEKDAY.WITH_FUTURE_PAST_WORDS, 'ig');
            expect(text).toMatch(regex);
        });
    });
    describe('ANY', () => {
        test.each([
            ['mon'],
            ['monday'],
            ['tue'],
            ['tuesday'],
            ['wed'],
            ['wednesday'],
            ['thu'],
            ['thursday'],
            ['fri'],
            ['friday'],
            ['sat'],
            ['saturday'],
            ['sun'],
            ['sunday'],
        ])('should match "$text"', text => {
            const regex = new RegExp(WEEKDAY.ANY, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('SINGLE', () => {
        test.each([
            ['mon', WEEKDAY.SINGLE.MONDAY],
            ['monday', WEEKDAY.SINGLE.MONDAY],
            ['tue', WEEKDAY.SINGLE.TUESDAY],
            ['tuesday', WEEKDAY.SINGLE.TUESDAY],
            ['wed', WEEKDAY.SINGLE.WEDNESDAY],
            ['wednesday', WEEKDAY.SINGLE.WEDNESDAY],
            ['thu', WEEKDAY.SINGLE.THURSDAY],
            ['thursday', WEEKDAY.SINGLE.THURSDAY],
            ['fri', WEEKDAY.SINGLE.FRIDAY],
            ['friday', WEEKDAY.SINGLE.FRIDAY],
            ['sat', WEEKDAY.SINGLE.SATURDAY],
            ['saturday', WEEKDAY.SINGLE.SATURDAY],
            ['sun', WEEKDAY.SINGLE.SUNDAY],
            ['sunday', WEEKDAY.SINGLE.SUNDAY],
        ])('should match "$text"', (text, weekday) => {
            const regex = new RegExp(weekday, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('PAST_WORDS', () => {
        test.each([['last'], ['previous'], ['prev']])('should match "$text"', text => {
            const regex = new RegExp(WEEKDAY.PAST_WORDS, 'ig');
            expect(text).toMatch(regex);
        });
    });
});
