import DATE_AND_TIME from './dateAndTime.constants';

describe('DATE_AND_TIME', () => {
    describe('ANY', () => {
        describe('should parse the correct date and time when dates are full and time is before date', () => {
            test.each([
                ['4pm on 02/17/2009'],
                ['at 8:30am on 17/02/2009'],
                ['09:45 on 2009/02/17'],
                ['9am 2/17/2009'],
                ['by 12pm on 17/2/2009'],
                ['12am on 2009/2/17'],
                ['0:00 on 2/17/2009'],
                ['at 11:00 on 2-17-2009'],
                ['at 4PM on February 17, 2009'],
                ['at 2 pm on 17 February, 2009'],
                ['at 4 p.M. on Feb 17, 2009'],
                ['by 4 p.m. on 17 Feb, 2009'],
                ['by 4p.m. on Feb 17, 2014'],
                ['at 8:30am on 17 Feb, 2014'],
                ['at 8:30am on 21st Feb 2019'],
                ['at 8:30am on Feb 21st 2019'],
                ['at 8:30am on 22nd Feb 2019'],
                ['at 8:30am on Feb 23rd 2019'],
                ['at 8:30am on 23rd Feb 2019'],
                ['at 8:30am on 17th February 2019'],
                ['at 8:30am by February 17th 2019'],
            ])('should match "%s"', text => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(text).toMatch(regex);
            });
        });

        describe('should parse the correct date and time when dates are partial', () => {
            test.each([
                ['on 02/2009 at 8:30 am'],
                ['on Feb 2009 at 09:45'],
                ['on February 2009 at 9am'],
                ['on 2/2009 by 7pm'],
                ['on 2009 Feb at 12pm'],
                ['on 2009 February at 12am'],
                ['on 2009/2 at 0:00'],
                ['on 02/20 at 11:00'],
                ['on 02/10 at 4PM'],
                ['on 02-20 at 2 pm'],
                ['on 02-10 at 4 p.M.'],
                ['on Feb 20 by 4p.m.'],
                ['on Feb 20th at 8:30am'],
                ['on February 20 at 8:30am'],
                ['on February 20th at 8:30am'],
                ['on Feb 21st at 8:30am'],
                ['on Feb 22nd at 8:30am'],
                ['on Feb 23rd at 8:30am'],
                ['on 20/02 at 8:30am'],
                ['on 20 Feb at 8:30am'],
                ['on 20th Feb at 8:30am'],
                ['on 20 February at 8:30am'],
                ['on 20th February at 8:30am'],
                ['on 21st Feb at 8:30am'],
                ['on 22nd Feb at 8:30am'],
                ['on 23rd Feb at 8:30am'],
            ])('should match "%s"', text => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(text).toMatch(regex);
            });
        });

        describe('should parse the correct date and time when dates are partial and time is before date', () => {
            test.each([
                ['at 8:30 am on 02/2009'],
                ['at 09:45 on Feb 2009'],
                ['at 9am on February 2009'],
                ['by 7pm on 2/2009'],
                ['at 12pm on 2009 Feb'],
                ['at 12am on 2009 February'],
                ['at 0:00 on 2009/2'],
                ['at 11:00 on 02/20'],
                ['at 4PM on 02/10'],
                ['at 2 pm on 02-20'],
                ['at 4 p.M. on 02-10'],
                ['by 4p.m. on Feb 20'],
                ['at 8:30am on Feb 20th'],
                ['at 8:30am on February 20'],
                ['at 8:30am on February 20th'],
                ['at 8:30am on Feb 21st'],
                ['at 8:30am on Feb 22nd'],
                ['at 8:30am on Feb 23rd'],
                ['at 8:30am on 20/02'],
                ['at 8:30am on 20 Feb'],
                ['at 8:30am on 20th Feb'],
                ['at 8:30am on 20 February'],
                ['at 8:30am on 20th February'],
                ['at 8:30am on 21st Feb'],
                ['at 8:30am on 22nd Feb'],
                ['at 8:30am on 23rd Feb'],
            ])('should match "%s"', text => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(text).toMatch(regex);
            });
        });

        describe('should parse relative date and time (date first)', () => {
            test.each([
                ['today 5pm'],
                ['tomorrow at 8:30am'],
                ['in 5 days at 09:45'],
                ['in 31 days at 9am'],
                ['in a day by 7pm'],
                ['in a week 12pm'],
                ['in 5 weeks 12am'],
                ['in a wk 0:00'],
                ['in 5 wks at 4PM'],
                ['in a month at 2 pm'],
                ['in 5 months at 4 p.M.'],
                ['in 12 months by 4p.m.'],
                ['in a year at quarter past 4'],
                ['in 5 years at quarter to 4'],
                ['in a yr at quarter to 4pm'],
                ['in 5 yrs at half past 4'],
                ['5 years later at 20 min to 4'],
                ['5 years from now at 20 past 4'],
            ])('should match "%s"', text => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(text).toMatch(regex);
            });
        });

        describe('should parse relative date and time (time first)', () => {
            test.each([
                ['5pm today'],
                ['at 8:30am tomorrow'],
                ['at 09:45 in 5 days'],
                ['at 9am in 31 days'],
                ['by 7pm in a day'],
                ['12pm in a week'],
                ['12am in 5 weeks'],
                ['0:00 in a wk'],
                ['at 4PM in 5 wks'],
                ['at 2 pm in a month'],
                ['at 4 p.M. in 5 months'],
                ['by 4p.m. in 12 months'],
                ['at quarter past 4 in a year'],
                ['at quarter to 4 in 5 years'],
                ['at quarter to 4pm in a yr'],
                ['at half past 4 in 5 yrs'],
                ['at 20 min to 4 5 years later'],
                ['at 20 past 4 5 years from now'],
            ])('should match "%s"', text => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(text).toMatch(regex);
            });
        });

        describe('should not parse relative date and time without units', () => {
            test.each([['in 5 at 4 pm'], ['in 5 mins at 4'], ['in 5 at 4'], ['20']])('should not parse $text', text => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(text).not.toMatch(regex);
            });
        });
    });
});
