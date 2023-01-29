import DATE_AND_TIME from './dateAndTime.constants';

describe('DATE_AND_TIME', () => {
    describe('ANY', () => {
        describe('should parse the correct date and time when dates are full and time is before date', () => {
            test.each([
                { text: '4pm on 02/17/2009', expected: true },
                { text: 'at 8:30am on 17/02/2009', expected: true },
                { text: '09:45 on 2009/02/17', expected: true },
                { text: '9am 2/17/2009', expected: true },
                { text: 'by 12pm on 17/2/2009', expected: true },
                { text: '12am on 2009/2/17', expected: true },
                { text: '0:00 on 2/17/2009', expected: true },
                { text: 'at 11:00 on 2-17-2009', expected: true },
                { text: 'at 4PM on February 17, 2009', expected: true },
                { text: 'at 2 pm on 17 February, 2009', expected: true },
                { text: 'at 4 p.M. on Feb 17, 2009', expected: true },
                { text: 'by 4 p.m. on 17 Feb, 2009', expected: true },
                { text: 'by 4p.m. on Feb 17, 2014', expected: true },
                { text: 'at 8:30am on 17 Feb, 2014', expected: true },
                { text: 'at 8:30am on 21st Feb 2019', expected: true },
                { text: 'at 8:30am on Feb 21st 2019', expected: true },
                { text: 'at 8:30am on 22nd Feb 2019', expected: true },
                { text: 'at 8:30am on Feb 23rd 2019', expected: true },
                { text: 'at 8:30am on 23rd Feb 2019', expected: true },
                { text: 'at 8:30am on 17th February 2019', expected: true },
                { text: 'at 8:30am by February 17th 2019', expected: true },
            ])('should return $expected for "$input"', ({ text, expected }) => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(regex.test(text)).toBe(expected);
            });
        });

        describe('should parse the correct date and time when dates are partial', () => {
            test.each([
                { text: 'on 30th 8:30am', expected: true },
                { text: 'on 02/2009 at 8:30 am', expected: true },
                { text: 'on Feb 2009 at 09:45', expected: true },
                { text: 'on February 2009 at 9am', expected: true },
                { text: 'on 2/2009 by 7pm', expected: true },
                { text: 'on 2009 Feb at 12pm', expected: true },
                { text: 'on 2009 February at 12am', expected: true },
                { text: 'on 2009/2 at 0:00', expected: true },
                { text: 'on 02/20 at 11:00', expected: true },
                { text: 'on 02/10 at 4PM', expected: true },
                { text: 'on 02-20 at 2 pm', expected: true },
                { text: 'on 02-10 at 4 p.M.', expected: true },
                { text: 'on Feb 20 by 4p.m.', expected: true },
                { text: 'on Feb 20th at 8:30am', expected: true },
                { text: 'on February 20 at 8:30am', expected: true },
                { text: 'on February 20th at 8:30am', expected: true },
                { text: 'on Feb 21st at 8:30am', expected: true },
                { text: 'on Feb 22nd at 8:30am', expected: true },
                { text: 'on Feb 23rd at 8:30am', expected: true },
                { text: 'on 20/02 at 8:30am', expected: true },
                { text: 'on 20 Feb at 8:30am', expected: true },
                { text: 'on 20th Feb at 8:30am', expected: true },
                { text: 'on 20 February at 8:30am', expected: true },
                { text: 'on 20th February at 8:30am', expected: true },
                { text: 'on 21st Feb at 8:30am', expected: true },
                { text: 'on 22nd Feb at 8:30am', expected: true },
                { text: 'on 23rd Feb at 8:30am', expected: true },
                { text: 'on 3rd at 8:30am', expected: true },
                { text: 'on the 30th at 8:30am', expected: true },
                { text: 'on 30th at 8:30am', expected: true },
            ])('should return $expected for "$input"', ({ text, expected }) => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(regex.test(text)).toBe(expected);
            });
        });

        describe('should parse the correct date and time when dates are partial and time is before date', () => {
            test.each([
                { text: '8:30am on 30th', expected: true },
                { text: 'at 8:30 am on 02/2009', expected: true },
                { text: 'at 09:45 on Feb 2009', expected: true },
                { text: 'at 9am on February 2009', expected: true },
                { text: 'by 7pm on 2/2009', expected: true },
                { text: 'at 12pm on 2009 Feb', expected: true },
                { text: 'at 12am on 2009 February', expected: true },
                { text: 'at 0:00 on 2009/2', expected: true },
                { text: 'at 11:00 on 02/20', expected: true },
                { text: 'at 4PM on 02/10', expected: true },
                { text: 'at 2 pm on 02-20', expected: true },
                { text: 'at 4 p.M. on 02-10', expected: true },
                { text: 'by 4p.m. on Feb 20', expected: true },
                { text: 'at 8:30am on Feb 20th', expected: true },
                { text: 'at 8:30am on February 20', expected: true },
                { text: 'at 8:30am on February 20th', expected: true },
                { text: 'at 8:30am on Feb 21st', expected: true },
                { text: 'at 8:30am on Feb 22nd', expected: true },
                { text: 'at 8:30am on Feb 23rd', expected: true },
                { text: 'at 8:30am on 20/02', expected: true },
                { text: 'at 8:30am on 20 Feb', expected: true },
                { text: 'at 8:30am on 20th Feb', expected: true },
                { text: 'at 8:30am on 20 February', expected: true },
                { text: 'at 8:30am on 20th February', expected: true },
                { text: 'at 8:30am on 21st Feb', expected: true },
                { text: 'at 8:30am on 22nd Feb', expected: true },
                { text: 'at 8:30am on 23rd Feb', expected: true },
                { text: 'at 8:30am on 3rd', expected: true },
                { text: 'at 8:30am on the 30th', expected: true },
                { text: 'at 8:30am on 30th', expected: true },
            ])('should return $expected for "$input"', ({ text, expected }) => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(regex.test(text)).toBe(expected);
            });
        });

        describe('should parse relative date and time (date first)', () => {
            test.each([
                { text: 'today 5pm', expected: true },
                { text: 'tomorrow at 8:30am', expected: true },
                { text: 'in 5 days at 09:45', expected: true },
                { text: 'in 31 days at 9am', expected: true },
                { text: 'in a day by 7pm', expected: true },
                { text: 'in a week 12pm', expected: true },
                { text: 'in 5 weeks 12am', expected: true },
                { text: 'in a wk 0:00', expected: true },
                { text: 'in 5 wks at 4PM', expected: true },
                { text: 'in a month at 2 pm', expected: true },
                { text: 'in 5 months at 4 p.M.', expected: true },
                { text: 'in 12 months by 4p.m.', expected: true },
                { text: 'in a year at quarter past 4', expected: true },
                { text: 'in 5 years at quarter to 4', expected: true },
                { text: 'in a yr at quarter to 4pm', expected: true },
                { text: 'in 5 yrs at half past 4', expected: true },
                { text: '5 years later at 20 min to 4', expected: true },
                { text: '5 years from now at 20 past 4', expected: true },
            ])('should return $expected for "$input"', ({ text, expected }) => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(regex.test(text)).toBe(expected);
            });
        });

        describe('should parse relative date and time (time first)', () => {
            test.each([
                { text: '5pm today', expected: true },
                { text: 'at 8:30am tomorrow', expected: true },
                { text: 'at 09:45 in 5 days', expected: true },
                { text: 'at 9am in 31 days', expected: true },
                { text: 'by 7pm in a day', expected: true },
                { text: '12pm in a week', expected: true },
                { text: '12am in 5 weeks', expected: true },
                { text: '0:00 in a wk', expected: true },
                { text: 'at 4PM in 5 wks', expected: true },
                { text: 'at 2 pm in a month', expected: true },
                { text: 'at 4 p.M. in 5 months', expected: true },
                { text: 'by 4p.m. in 12 months', expected: true },
                { text: 'at quarter past 4 in a year', expected: true },
                { text: 'at quarter to 4 in 5 years', expected: true },
                { text: 'at quarter to 4pm in a yr', expected: true },
                { text: 'at half past 4 in 5 yrs', expected: true },
                { text: 'at 20 min to 4 5 years later', expected: true },
                { text: 'at 20 past 4 5 years from now', expected: true },
            ])('should return $expected for "$input"', ({ text, expected }) => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(regex.test(text)).toBe(expected);
            });
        });

        describe('should not parse relative date and time without units', () => {
            test.each([
                { text: 'in 5 at 4 pm', expected: false },
                { text: 'in 5 mins at 4', expected: false },
                { text: 'in 5 at 4', expected: false },
                { text: '20', expected: false },
            ])('should not parse $text', ({ text, expected }) => {
                const regex = new RegExp(DATE_AND_TIME.ANY, 'ig');
                expect(regex.test(text)).toBe(expected);
            });
        });
    });
});
