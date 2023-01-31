import { dateStringToDateObj, dateStringToDayMonthYear, strToInt } from './dates.helpers';

describe('Dates Helpers', () => {
    describe('strToInt()', () => {
        test('should correctly convert given strings into a date object', () => {
            const dateObj = {
                year: 2019,
                month: 9,
                day: 1,
            };
            const check = strToInt('01', '09', '2019');
            expect(check).toEqual(dateObj);
        });
    });

    describe('dateStringToDayMonthYear()', () => {
        test.each([
            { text: '02/17/2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '17/02/2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '2009/02/17', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '2/17/2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '17/2/2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '2009/2/17', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '2/17/2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '2-17-2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '10-2-2009', expected: new Date('2009-02-10T00:00:00.000Z') },
            { text: 'February 17, 2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '17 February, 2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: 'Feb 17, 2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: '17 Feb, 2009', expected: new Date('2009-02-17T00:00:00.000Z') },
            { text: 'Feb 17, 2014', expected: new Date('2014-02-17T00:00:00.000Z') },
            { text: '17 Feb, 2014', expected: new Date('2014-02-17T00:00:00.000Z') },
            { text: '21st Feb 2019', expected: new Date('2019-02-21T00:00:00.000Z') },
            { text: 'Feb 21st 2019', expected: new Date('2019-02-21T00:00:00.000Z') },
            { text: '22nd Feb 2019', expected: new Date('2019-02-22T00:00:00.000Z') },
            { text: 'Feb 22nd 2019', expected: new Date('2019-02-22T00:00:00.000Z') },
            { text: '22nd Feb 2019', expected: new Date('2019-02-22T00:00:00.000Z') },
            { text: 'Feb 22nd 2019', expected: new Date('2019-02-22T00:00:00.000Z') },
            { text: '17th February 2019', expected: new Date('2019-02-17T00:00:00.000Z') },
            { text: 'February 17th 2019', expected: new Date('2019-02-17T00:00:00.000Z') },
        ])('should convert $text', ({ text, expected }) => {
            const parsedText = dateStringToDayMonthYear(text);
            expect(parsedText).toEqual(expected);
        });
    });

    describe('dateStringToDateObj()', () => {
        test('should return null if no date is found', () => {
            const parsedText = dateStringToDateObj('test');
            expect(parsedText).toBeNull();
        });

        test('should return a date object if a date is found', () => {
            const parsedText = dateStringToDateObj('on the 17 February, 2009');
            expect(parsedText).toEqual(new Date('2009-02-17T00:00:00.000Z'));
        });
    });
});
