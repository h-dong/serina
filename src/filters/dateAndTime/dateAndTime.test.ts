import DateAndTime from './dateAndTime';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('DateAndTime', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52'));

    const currentYear = dayLite().year;
    const currentMonth = dayLite().month;
    const currentDay = dayLite().day;

    afterAll(() => {
        vi.useRealTimers();
    });

    const mockDates = (day, month, year, hour, minute) =>
        dayLite().set({ day, month, year, hour, minute }).startOf('minute').toDate();

    describe('should parse the correct date and time when dates are full', () => {
        test.each([
            { filter: 'on 02/17/2009 4pm', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'on 17/02/2009 at 8:30am', dateTime: mockDates(17, 2, 2009, 8, 30) },
            { filter: 'on 2009/02/17 09:45', dateTime: mockDates(17, 2, 2009, 9, 45) },
            { filter: '2/17/2009 9am', dateTime: mockDates(17, 2, 2009, 9, 0) },
            { filter: 'on 17/2/2009 by 12pm', dateTime: mockDates(17, 2, 2009, 12, 0) },
            { filter: 'on 2009/2/17 12am', dateTime: mockDates(17, 2, 2009, 0, 0) },
            { filter: 'on 2/17/2009 0:00', dateTime: mockDates(17, 2, 2009, 0, 0) },
            { filter: 'on 2-17-2009 at 11:00', dateTime: mockDates(17, 2, 2009, 11, 0) },
            { filter: 'on February 17, 2009 at 4PM', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'on 17 February, 2009 at 2 pm', dateTime: mockDates(17, 2, 2009, 14, 0) },
            { filter: 'on Feb 17, 2009 at 4 p.M.', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'on 17 Feb, 2009 by 4 p.m.', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'on Feb 17, 2014 by 4p.m.', dateTime: mockDates(17, 2, 2014, 16, 0) },
            { filter: 'on 17 Feb, 2014 at 8:30am', dateTime: mockDates(17, 2, 2014, 8, 30) },
            { filter: 'on 21st Feb 2019 at 8:30am', dateTime: mockDates(21, 2, 2019, 8, 30) },
            { filter: 'on Feb 21st 2019 at 8:30am', dateTime: mockDates(21, 2, 2019, 8, 30) },
            { filter: 'on 22nd Feb 2019 at 8:30am', dateTime: mockDates(22, 2, 2019, 8, 30) },
            { filter: 'on Feb 23rd 2019 at 8:30am', dateTime: mockDates(23, 2, 2019, 8, 30) },
            { filter: 'on 23rd Feb 2019 at 8:30am', dateTime: mockDates(23, 2, 2019, 8, 30) },
            { filter: 'on 17th February 2019 at 8:30am', dateTime: mockDates(17, 2, 2019, 8, 30) },
            { filter: 'by February 17th 2019 at 8:30am', dateTime: mockDates(17, 2, 2019, 8, 30) },
        ])('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });

    describe('should parse the correct date and time when dates are full and time is before date', () => {
        test.each([
            { filter: '4pm on 02/17/2009', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'at 8:30am on 17/02/2009', dateTime: mockDates(17, 2, 2009, 8, 30) },
            { filter: '09:45 on 2009/02/17', dateTime: mockDates(17, 2, 2009, 9, 45) },
            { filter: '9am 2/17/2009', dateTime: mockDates(17, 2, 2009, 9, 0) },
            { filter: 'by 12pm on 17/2/2009', dateTime: mockDates(17, 2, 2009, 12, 0) },
            { filter: '12am on 2009/2/17', dateTime: mockDates(17, 2, 2009, 0, 0) },
            { filter: '0:00 on 2/17/2009', dateTime: mockDates(17, 2, 2009, 0, 0) },
            { filter: 'at 11:00 on 2-17-2009', dateTime: mockDates(17, 2, 2009, 11, 0) },
            { filter: 'at 4PM on February 17, 2009', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'at 2 pm on 17 February, 2009', dateTime: mockDates(17, 2, 2009, 14, 0) },
            { filter: 'at 4 p.M. on Feb 17, 2009', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'by 4 p.m. on 17 Feb, 2009', dateTime: mockDates(17, 2, 2009, 16, 0) },
            { filter: 'by 4p.m. on Feb 17, 2014', dateTime: mockDates(17, 2, 2014, 16, 0) },
            { filter: 'at 8:30am on 17 Feb, 2014', dateTime: mockDates(17, 2, 2014, 8, 30) },
            { filter: 'at 8:30am on 21st Feb 2019', dateTime: mockDates(21, 2, 2019, 8, 30) },
            { filter: 'at 8:30am on Feb 21st 2019', dateTime: mockDates(21, 2, 2019, 8, 30) },
            { filter: 'at 8:30am on 22nd Feb 2019', dateTime: mockDates(22, 2, 2019, 8, 30) },
            { filter: 'at 8:30am on Feb 23rd 2019', dateTime: mockDates(23, 2, 2019, 8, 30) },
            { filter: 'at 8:30am on 23rd Feb 2019', dateTime: mockDates(23, 2, 2019, 8, 30) },
            { filter: 'at 8:30am on 17th February 2019', dateTime: mockDates(17, 2, 2019, 8, 30) },
            { filter: 'at 8:30am by February 17th 2019', dateTime: mockDates(17, 2, 2019, 8, 30) },
        ])('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });

    describe('should parse the correct date and time when dates are partial', () => {
        test.each([
            { filter: 'on 30th 8:30am', dateTime: mockDates(30, currentMonth, currentYear, 8, 30) },
            { filter: 'on 02/2009 at 8:30 am', dateTime: mockDates(1, 2, 2009, 8, 30) },
            { filter: 'on Feb 2009 at 09:45', dateTime: mockDates(1, 2, 2009, 9, 45) },
            { filter: 'on February 2009 at 9am', dateTime: mockDates(1, 2, 2009, 9, 0) },
            { filter: 'on 2/2009 by 7pm', dateTime: mockDates(1, 2, 2009, 19, 0) },
            { filter: 'on 2009 Feb at 12pm', dateTime: mockDates(1, 2, 2009, 12, 0) },
            { filter: 'on 2009 February at 12am', dateTime: mockDates(1, 2, 2009, 0, 0) },
            { filter: 'on 2009/2 at 0:00', dateTime: mockDates(1, 2, 2009, 0, 0) },
            { filter: 'on 02/20 at 11:00', dateTime: mockDates(20, 2, currentYear + 1, 11, 0) },
            { filter: 'on 02/10 at 4PM', dateTime: mockDates(2, 10, currentYear, 16, 0) },
            { filter: 'on 02-20 at 2 pm', dateTime: mockDates(20, 2, currentYear + 1, 14, 0) },
            { filter: 'on 02-10 at 4 p.M.', dateTime: mockDates(2, 10, currentYear, 16, 0) },
            { filter: 'on Feb 20 by 4p.m.', dateTime: mockDates(20, 2, currentYear + 1, 16, 0) },
            { filter: 'on Feb 20th at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on February 20 at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on February 20th at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on Feb 21st at 8:30am', dateTime: mockDates(21, 2, currentYear + 1, 8, 30) },
            { filter: 'on Feb 22nd at 8:30am', dateTime: mockDates(22, 2, currentYear + 1, 8, 30) },
            { filter: 'on Feb 23rd at 8:30am', dateTime: mockDates(23, 2, currentYear + 1, 8, 30) },
            { filter: 'on 20/02 at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on 20 Feb at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on 20th Feb at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on 20 February at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on 20th February at 8:30am', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'on 21st Feb at 8:30am', dateTime: mockDates(21, 2, currentYear + 1, 8, 30) },
            { filter: 'on 22nd Feb at 8:30am', dateTime: mockDates(22, 2, currentYear + 1, 8, 30) },
            { filter: 'on 23rd Feb at 8:30am', dateTime: mockDates(23, 2, currentYear + 1, 8, 30) },
            { filter: 'on 3rd at 8:30am', dateTime: mockDates(3, currentMonth + 1, currentYear, 8, 30) },
            { filter: 'on the 30th at 8:30am', dateTime: mockDates(30, currentMonth, currentYear, 8, 30) },
            { filter: 'on 30th at 8:30am', dateTime: mockDates(30, currentMonth, currentYear, 8, 30) },
        ])('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });

    describe('should parse the correct date and time when dates are partial and time is before date', () => {
        test.each([
            { filter: '8:30am on 30th', dateTime: mockDates(30, currentMonth, currentYear, 8, 30) },
            { filter: 'at 8:30 am on 02/2009', dateTime: mockDates(1, 2, 2009, 8, 30) },
            { filter: 'at 09:45 on Feb 2009', dateTime: mockDates(1, 2, 2009, 9, 45) },
            { filter: 'at 9am on February 2009', dateTime: mockDates(1, 2, 2009, 9, 0) },
            { filter: 'by 7pm on 2/2009', dateTime: mockDates(1, 2, 2009, 19, 0) },
            { filter: 'at 12pm on 2009 Feb', dateTime: mockDates(1, 2, 2009, 12, 0) },
            { filter: 'at 12am on 2009 February', dateTime: mockDates(1, 2, 2009, 0, 0) },
            { filter: 'at 0:00 on 2009/2', dateTime: mockDates(1, 2, 2009, 0, 0) },
            { filter: 'at 11:00 on 02/20', dateTime: mockDates(20, 2, currentYear + 1, 11, 0) },
            { filter: 'at 4PM on 02/10', dateTime: mockDates(2, 10, currentYear, 16, 0) },
            { filter: 'at 2 pm on 02-20', dateTime: mockDates(20, 2, currentYear + 1, 14, 0) },
            { filter: 'at 4 p.M. on 02-10', dateTime: mockDates(2, 10, currentYear, 16, 0) },
            { filter: 'by 4p.m. on Feb 20', dateTime: mockDates(20, 2, currentYear + 1, 16, 0) },
            { filter: 'at 8:30am on Feb 20th', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on February 20', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on February 20th', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on Feb 21st', dateTime: mockDates(21, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on Feb 22nd', dateTime: mockDates(22, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on Feb 23rd', dateTime: mockDates(23, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 20/02', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 20 Feb', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 20th Feb', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 20 February', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 20th February', dateTime: mockDates(20, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 21st Feb', dateTime: mockDates(21, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 22nd Feb', dateTime: mockDates(22, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 23rd Feb', dateTime: mockDates(23, 2, currentYear + 1, 8, 30) },
            { filter: 'at 8:30am on 3rd', dateTime: mockDates(3, currentMonth + 1, currentYear, 8, 30) },
            { filter: 'at 8:30am on the 30th', dateTime: mockDates(30, currentMonth, currentYear, 8, 30) },
            { filter: 'at 8:30am on 30th', dateTime: mockDates(30, currentMonth, currentYear, 8, 30) },
        ])('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });

    describe('should parse relative date and time (date first)', () => {
        test.each([
            { filter: 'today 5pm', dateTime: mockDates(currentDay, currentMonth, currentYear, 17, 0) },
            { filter: 'tomorrow at 8:30am', dateTime: mockDates(currentDay + 1, currentMonth, currentYear, 8, 30) },
            { filter: 'in 5 days at 09:45', dateTime: mockDates(currentDay + 5, currentMonth, currentYear, 9, 45) },
            { filter: 'in 31 days at 9am', dateTime: new Date('2019-07-21T08:00:00.000Z') },
            { filter: 'in a day by 7pm', dateTime: mockDates(currentDay + 1, currentMonth, currentYear, 19, 0) },
            { filter: 'in a week 12pm', dateTime: mockDates(currentDay + 7, currentMonth, currentYear, 12, 0) },
            { filter: 'in 5 weeks 12am', dateTime: new Date('2019-07-24T23:00:00.000Z') },
            { filter: 'in a wk 0:00', dateTime: mockDates(currentDay + 7, currentMonth, currentYear, 0, 0) },
            { filter: 'in 5 wks at 4PM', dateTime: new Date('2019-07-25T15:00:00.000Z') },
            { filter: 'in a month at 2 pm', dateTime: mockDates(currentDay, currentMonth + 1, currentYear, 14, 0) },
            { filter: 'in 5 months at 4 p.M.', dateTime: mockDates(currentDay, currentMonth + 5, currentYear, 16, 0) },
            { filter: 'in 12 months by 4p.m.', dateTime: mockDates(currentDay, currentMonth, currentYear + 1, 16, 0) },
            {
                filter: 'in a year at quarter past 4',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 1, 4, 15),
            },
            {
                filter: 'in 5 years at quarter to 4',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 3, 45),
            },
            {
                filter: 'in a yr at quarter to 4pm',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 1, 15, 45),
            },
            {
                filter: 'in 5 yrs at half past 4',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 4, 30),
            },
            {
                filter: '5 years later at 20 min to 4',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 3, 40),
            },
            {
                filter: '5 years from now at 20 past 4',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 4, 20),
            },
        ])('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });

    describe('should parse relative date and time (time first)', () => {
        test.each([
            { filter: '5pm today', dateTime: mockDates(currentDay, currentMonth, currentYear, 17, 0) },
            { filter: 'at 8:30am tomorrow', dateTime: mockDates(currentDay + 1, currentMonth, currentYear, 8, 30) },
            { filter: 'at 09:45 in 5 days', dateTime: mockDates(currentDay + 5, currentMonth, currentYear, 9, 45) },
            { filter: 'at 9am in 31 days', dateTime: new Date('2019-07-21T08:00:00.000Z') },
            { filter: 'by 7pm in a day', dateTime: mockDates(currentDay + 1, currentMonth, currentYear, 19, 0) },
            { filter: '12pm in a week', dateTime: mockDates(currentDay + 7, currentMonth, currentYear, 12, 0) },
            { filter: '12am in 5 weeks', dateTime: new Date('2019-07-24T23:00:00.000Z') },
            { filter: '0:00 in a wk', dateTime: mockDates(currentDay + 7, currentMonth, currentYear, 0, 0) },
            { filter: 'at 4PM in 5 wks', dateTime: new Date('2019-07-25T15:00:00.000Z') },
            { filter: 'at 2 pm in a month', dateTime: mockDates(currentDay, currentMonth + 1, currentYear, 14, 0) },
            { filter: 'at 4 p.M. in 5 months', dateTime: mockDates(currentDay, currentMonth + 5, currentYear, 16, 0) },
            { filter: 'by 4p.m. in 12 months', dateTime: mockDates(currentDay, currentMonth, currentYear + 1, 16, 0) },
            {
                filter: 'at quarter past 4 in a year',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 1, 4, 15),
            },
            {
                filter: 'at quarter to 4 in 5 years',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 3, 45),
            },
            {
                filter: 'at quarter to 4pm in a yr',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 1, 15, 45),
            },
            {
                filter: 'at half past 4 in 5 yrs',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 4, 30),
            },
            {
                filter: 'at 20 min to 4 5 years later',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 3, 40),
            },
            {
                filter: 'at 20 past 4 5 years from now',
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5, 4, 20),
            },
        ])('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });

    describe('should not parse relative date and time without units', () => {
        test.each([
            { filter: 'in 5 at 4 pm', dateTime: null },
            { filter: 'in 5 mins at 4', dateTime: null },
            { filter: 'in 5 at 4', dateTime: null },
            { filter: '20', dateTime: null },
        ])('should not parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(`${text} ${filter}`);
            expect(results).toEqual(dateTime);
        });
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper on 02/2009 at 8:30 am';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(1, 2, 2009, 8, 30),
                text: 'Hand in paper',
                matched: 'on 02/2009 at 8:30 am',
            },
        ];

        expect(DateAndTime.parseText(text)).toEqual(result);
    });
});
