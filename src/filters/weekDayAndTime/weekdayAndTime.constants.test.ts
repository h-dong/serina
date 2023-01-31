import WEEKDAY_AND_TIME from './weekdayAndTime.constants';

describe('WEEKDAY_AND_TIME', () => {
    describe('ANY', () => {
        test.each([
            ['mon 10am'],
            ['monday 10am'],
            ['mon 10 am'],
            ['monday 10 am'],
            ['mon 10:00am'],
            ['monday 10:00am'],
            ['mon 10:00 am'],
            ['monday 10:00 am'],
            ['mon 10:00:00am'],
            ['monday 10:00:00am'],
            ['mon 10:00:00 am'],
            ['monday 10:00:00 am'],
            ['mon 10:00:00:00am'],
            ['monday 10:00:00:00am'],
            ['mon 10:00:00:00 am'],
            ['monday 10:00:00:00 am'],
            ['10am mon'],
            ['10am monday'],
            ['10 am mon'],
            ['10 am monday'],
            ['10:00am mon'],
            ['10:00am monday'],
            ['10:00 am mon'],
            ['10:00 am monday'],
            ['10:00:00am mon'],
            ['10:00:00am monday'],
            ['10:00:00 am mon'],
            ['10:00:00 am monday'],
            ['10:00:00:00am mon'],
            ['10:00:00:00am monday'],
            ['10:00:00:00 am mon'],
            ['10:00:00:00 am monday'],
        ])('should match %s', text => {
            const regex = new RegExp(WEEKDAY_AND_TIME.ANY, 'ig');
            expect(text).toMatch(regex);
        });
    });
});
