import TIME from './time.constants';

describe('TIME', () => {
    describe('FORMAT_NORMAL', () => {
        test.each([['4am'], ['4 am'], ['04:30'], ['04:30am'], ['04:30 am']])('should match %s', text => {
            const regex = new RegExp(TIME.FORMAT_NORMAL, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('FORMAT_RELATIVE', () => {
        test.each([
            ['half past 3pm'],
            ['half past 3 pm'],
            ['20 mins to 11'],
            ['20 minutes to 11'],
            ['20 min to 11'],
            ['20 mins past 11'],
            ['20 minutes past 11'],
            ['20 min past 11'],
        ])('should match %s', text => {
            const regex = new RegExp(TIME.FORMAT_RELATIVE, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('RELATIVE_TIME_FILLER_WORDS', () => {
        test.each([['to'], ['until'], ['after'], ['past']])('should match %s', text => {
            const regex = new RegExp(TIME.RELATIVE_TIME_FILLER_WORDS, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('HOUR_PART', () => {
        test.each([[0], ['00'], ['4'], ['04'], ['12'], ['23']])('should match %s', text => {
            const regex = new RegExp(TIME.HOUR_PART, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('MINUTE_PART', () => {
        test.each([['00'], ['01'], ['59']])('should match %s', text => {
            const regex = new RegExp(TIME.MINUTE_PART, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('DIVIDER', () => {
        test.each([[':']])('should match %s', text => {
            const regex = new RegExp(TIME.DIVIDER, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('MERIDIEM', () => {
        test.each([['am'], ['pm']])('should match %s', text => {
            const regex = new RegExp(TIME.MERIDIEM, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('AM', () => {
        test.each([['am']])('should match %s', text => {
            const regex = new RegExp(TIME.AM, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('PM', () => {
        test.each([['pm']])('should match %s', text => {
            const regex = new RegExp(TIME.PM, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('TO', () => {
        test.each([['to'], ['until']])('should match %s', text => {
            const regex = new RegExp(TIME.TO, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('PAST', () => {
        test.each([['past', ['after']]])('should match %s', text => {
            const regex = new RegExp(TIME.PAST, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('HALF', () => {
        test.each([['half']])('should match %s', text => {
            const regex = new RegExp(TIME.HALF, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('QUARTER', () => {
        test.each([['quarter']])('should match %s', text => {
            const regex = new RegExp(TIME.QUARTER, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('VERBAL_QUANTIFIERS', () => {
        test.each([['half'], ['quarter']])('should match %s', text => {
            const regex = new RegExp(TIME.VERBAL_QUANTIFIERS, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('MINUTE_IDENTIFIER', () => {
        test.each([['min'], ['mins'], ['minute'], ['minutes']])('should match %s', text => {
            const regex = new RegExp(TIME.MINUTE_IDENTIFIER, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('FILLER_WORDS', () => {
        test.each([['at'], ['by']])('should match %s', text => {
            const regex = new RegExp(TIME.FILLER_WORDS, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('ANY', () => {
        test.each([['4am'], ['4 am'], ['04:30'], ['04:30am'], ['04:30 am']])('should match %s', text => {
            const regex = new RegExp(TIME.ANY, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('WITH_FILLER_WORDS', () => {
        test.each([['by 4am'], ['at 4 am']])('should match %s', text => {
            const regex = new RegExp(TIME.WITH_FILLER_WORDS, 'ig');
            expect(text).toMatch(regex);
        });
    });
});
