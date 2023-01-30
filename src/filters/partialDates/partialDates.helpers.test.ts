import {
    getFutureYearIfDateIsInThePast,
    getNextMonthIfDayIsInThePast,
    partialDateStringToDateObj,
    partialDateStringToDayMonthYear,
} from './partialDates.helpers';

describe('Partial Dates Helpers', () => {
    vi.useFakeTimers();

    afterAll(() => {
        vi.useRealTimers();
    });

    describe('getFutureYearIfDateIsInThePast()', () => {
        // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
        vi.setSystemTime(new Date('2019-06-29T15:48:12Z'));

        test.each([
            { month: '1', day: '1', output: '2020' }, // January 1st
            { month: '6', day: '20', output: '2020' }, // June 20th
            { month: '6', day: '30', output: '2019' }, // June 30th
            { month: '12', day: '31', output: '2019' }, // June 20th
        ])('return correct year given month=$month and day=$day', ({ month, day, output }) => {
            const result = getFutureYearIfDateIsInThePast(month, day);
            expect(result).toBe(output);
        });
    });

    describe('getNextMonthIfDayIsInThePast()', () => {
        // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
        vi.setSystemTime(new Date('2019-06-29T15:48:12Z'));

        test.each([
            { day: '1', output: 7 }, // June 1st
            { day: '20', output: 7 }, // June 20th
            { day: '30', output: 6 }, // June 30th
            { day: '31', output: 6 }, // June 20th
        ])('return correct month given day=$day', ({ day, output }) => {
            const result = getNextMonthIfDayIsInThePast(day);
            expect(result).toBe(output);
        });
    });

    describe('partialDateStringToDayMonthYear', () => {
        // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
        const mockDate = new Date('2019-06-29T15:48:12Z');
        vi.setSystemTime(mockDate);

        test.each([
            { input: '02/2009', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: 'Feb 2009', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: 'February 2009', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: '2/2009', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: '2009 Feb', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: '2009 February', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: '2009/2', output: new Date('2009-02-01T00:00:00.000Z') },
            { input: '02/20', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: '02/10', output: new Date('2019-10-02T00:00:00.000Z') }, // TODO: this could be both formats day/month or month/day
            { input: 'Feb 20', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: 'Feb 20th', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: 'February 20', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: 'February 20th', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: 'Feb 21st', output: new Date('2020-02-21T00:00:00.000Z') },
            { input: '20/02', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: '20 Feb', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: '20th Feb', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: '20 February', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: '20th February', output: new Date('2020-02-20T00:00:00.000Z') },
            { input: '22nd Feb', output: new Date('2020-02-22T00:00:00.000Z') },
            { input: '23rd Feb', output: new Date('2020-02-23T00:00:00.000Z') },
            { input: '29 Jun', output: new Date('2019-06-29T00:00:00.000Z') },
            { input: '28 Jun', output: new Date('2020-06-28T00:00:00.000Z') },
        ])('should convert $input to date object', ({ input, output }) => {
            const parsedText = partialDateStringToDayMonthYear(input);
            expect(parsedText).toEqual(output);
        });
    });

    describe('partialDateStringToDateObj()', () => {
        test('should return null if no date is found', () => {
            const parsedText = partialDateStringToDateObj('no date');
            expect(parsedText).toBeNull();
        });

        test('should remove filler words and return date object ', () => {
            const parsedText = partialDateStringToDateObj('on 02/2009');
            expect(parsedText).toEqual(new Date('2009-02-01T00:00:00.000Z'));
        });
    });
});
