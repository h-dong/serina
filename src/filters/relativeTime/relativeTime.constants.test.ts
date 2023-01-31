import RELATIVE_TIME from './relativeTime.constants';

describe('RELATIVE_TIME', () => {
    describe('TIME_UNITS', () => {
        test.each([
            ['hour'],
            ['hours'],
            ['hr'],
            ['hrs'],
            ['minute'],
            ['minutes'],
            ['min'],
            ['mins'],
            ['second'],
            ['seconds'],
            ['sec'],
            ['secs'],
        ])('should match %s', input => {
            const regex = new RegExp(RELATIVE_TIME.TIME_UNITS.ANY, 'ig');
            expect(input).toMatch(regex);
        });
    });

    describe('ARGUMENT_AFTER', () => {
        test.each([['in 1 hour'], ['after 1 hour']])('should match %s', input => {
            const regex = new RegExp(RELATIVE_TIME.ARGUMENT_AFTER, 'ig');
            expect(input).toMatch(regex);
        });
    });

    describe('ARGUMENT_FIRST', () => {
        test.each([['1 hour from now'], ['1 hour later'], ['1 hour after']])('should match %s', input => {
            const regex = new RegExp(RELATIVE_TIME.ARGUMENT_FIRST, 'ig');
            expect(input).toMatch(regex);
        });
    });

    describe('FILLER_WORDS', () => {
        test.each([['in '], ['after '], [' from now'], [' later'], [' after']])('should match %s', input => {
            const regex = new RegExp(RELATIVE_TIME.FILLER_WORDS, 'ig');
            expect(input).toMatch(regex);
        });
    });

    describe('VERBAL_QUANTIFIERS', () => {
        describe('HALF', () => {
            test.each([['half an hour'], ['half a hour']])('should match %s', input => {
                const regex = new RegExp(RELATIVE_TIME.VERBAL_QUANTIFIERS.HALF, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('QUARTER', () => {
            test.each([['a quarter of an hour'], ['a quarter of a hour']])('should match %s', input => {
                const regex = new RegExp(RELATIVE_TIME.VERBAL_QUANTIFIERS.QUARTER, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('ONE', () => {
            test.each([['a hour'], ['an hour'], ['one hour']])('should match %s', input => {
                const regex = new RegExp(RELATIVE_TIME.VERBAL_QUANTIFIERS.ONE, 'ig');
                expect(input).toMatch(regex);
            });
        });

        describe('ANY', () => {
            test.each([
                ['half an hour'],
                ['half a hour'],
                ['a quarter of an hour'],
                ['a quarter of a hour'],
                ['a hour'],
                ['an hour'],
                ['one hour'],
            ])('should match %s', input => {
                const regex = new RegExp(RELATIVE_TIME.VERBAL_QUANTIFIERS.ANY, 'ig');
                expect(input).toMatch(regex);
            });
        });
    });

    describe('ANY', () => {
        test.each([['in 1 hour'], ['after 1 hour'], ['1 hour from now'], ['1 hour later']])(
            'should match %s',
            input => {
                const regex = new RegExp(RELATIVE_TIME.ANY, 'ig');
                expect(input).toMatch(regex);
            }
        );
    });
});
