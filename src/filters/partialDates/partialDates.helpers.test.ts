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
            { month: '1', day: '1', expected: '2020' }, // January 1st
            { month: '6', day: '20', expected: '2020' }, // June 20th
            { month: '6', day: '30', expected: '2019' }, // June 30th
            { month: '12', day: '31', expected: '2019' }, // June 20th
        ])('return correct year given month=$month and day=$day', ({ month, day, expected }) => {
            const result = getFutureYearIfDateIsInThePast(month, day);
            expect(result).toBe(expected);
        });
    });

    describe('getNextMonthIfDayIsInThePast()', () => {
        // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
        vi.setSystemTime(new Date('2019-06-29T15:48:12Z'));

        test.each([
            { day: '1', expected: 7 }, // June 1st
            { day: '20', expected: 7 }, // June 20th
            { day: '30', expected: 6 }, // June 30th
            { day: '31', expected: 6 }, // June 20th
        ])('return correct month given day=$day', ({ day, expected }) => {
            const result = getNextMonthIfDayIsInThePast(day);
            expect(result).toBe(expected);
        });
    });

    describe('partialDateStringToDayMonthYear', () => {
        // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
        const mockDate = new Date('2019-06-29T15:48:12Z');
        vi.setSystemTime(mockDate);

        test.each([
            { text: '02/2009', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: 'Feb 2009', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: 'February 2009', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: '2/2009', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: '2009 Feb', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: '2009 February', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: '2009/2', expected: new Date('2009-02-01T00:00:00.000Z') },
            { text: '02/20', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: '02/10', expected: new Date('2019-10-02T00:00:00.000Z') }, // TODO: this could be both formats day/month or month/day
            { text: 'Feb 20', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: 'Feb 20th', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: 'February 20', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: 'February 20th', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: 'Feb 21st', expected: new Date('2020-02-21T00:00:00.000Z') },
            { text: '20/02', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: '20 Feb', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: '20th Feb', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: '20 February', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: '20th February', expected: new Date('2020-02-20T00:00:00.000Z') },
            { text: '22nd Feb', expected: new Date('2020-02-22T00:00:00.000Z') },
            { text: '23rd Feb', expected: new Date('2020-02-23T00:00:00.000Z') },
            { text: '29 Jun', expected: new Date('2019-06-29T00:00:00.000Z') },
            { text: '28 Jun', expected: new Date('2020-06-28T00:00:00.000Z') },
        ])('should convert $text to date object', ({ text, expected }) => {
            const parsedText = partialDateStringToDayMonthYear(text);
            expect(parsedText).toEqual(expected);
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
