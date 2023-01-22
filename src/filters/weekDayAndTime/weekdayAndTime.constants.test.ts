import WEEKDAY_AND_TIME from './weekdayAndTime.constants';

describe('WEEKDAY_AND_TIME', () => {
    describe('ANY', () => {
        test.each([
            ['mon 10am', true],
            ['monday 10am', true],
            ['mon 10 am', true],
            ['monday 10 am', true],
            ['mon 10:00am', true],
            ['monday 10:00am', true],
            ['mon 10:00 am', true],
            ['monday 10:00 am', true],
            ['mon 10:00:00am', true],
            ['monday 10:00:00am', true],
            ['mon 10:00:00 am', true],
            ['monday 10:00:00 am', true],
            ['mon 10:00:00:00am', true],
            ['monday 10:00:00:00am', true],
            ['mon 10:00:00:00 am', true],
            ['monday 10:00:00:00 am', true],
            ['10am mon', true],
            ['10am monday', true],
            ['10 am mon', true],
            ['10 am monday', true],
            ['10:00am mon', true],
            ['10:00am monday', true],
            ['10:00 am mon', true],
            ['10:00 am monday', true],
            ['10:00:00am mon', true],
            ['10:00:00am monday', true],
            ['10:00:00 am mon', true],
            ['10:00:00 am monday', true],
            ['10:00:00:00am mon', true],
            ['10:00:00:00am monday', true],
            ['10:00:00:00 am mon', true],
            ['10:00:00:00 am monday', true],
        ])('should match %s', (text, expected) => {
            const regex = new RegExp(WEEKDAY_AND_TIME.ANY, 'ig');
            expect(regex.test(text)).toEqual(expected);
        });
    });
});
