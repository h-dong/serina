import { dateStringToDayMonthYear, strToInt } from './dates.helpers';

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
            { input: '02/17/2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '17/02/2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '2009/02/17', output: { day: 17, month: 2, year: 2009 } },
            { input: '2/17/2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '17/2/2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '2009/2/17', output: { day: 17, month: 2, year: 2009 } },
            { input: '2/17/2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '2-17-2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '10-2-2009', output: { day: 10, month: 2, year: 2009 } },
            { input: 'February 17, 2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '17 February, 2009', output: { day: 17, month: 2, year: 2009 } },
            { input: 'Feb 17, 2009', output: { day: 17, month: 2, year: 2009 } },
            { input: '17 Feb, 2009', output: { day: 17, month: 2, year: 2009 } },
            { input: 'Feb 17, 2014', output: { day: 17, month: 2, year: 2014 } },
            { input: '17 Feb, 2014', output: { day: 17, month: 2, year: 2014 } },
            { input: '21st Feb 2019', output: { day: 21, month: 2, year: 2019 } },
            { input: 'Feb 21st 2019', output: { day: 21, month: 2, year: 2019 } },
            { input: '22nd Feb 2019', output: { day: 22, month: 2, year: 2019 } },
            { input: 'Feb 22nd 2019', output: { day: 22, month: 2, year: 2019 } },
            { input: '22nd Feb 2019', output: { day: 22, month: 2, year: 2019 } },
            { input: 'Feb 22nd 2019', output: { day: 22, month: 2, year: 2019 } },
            { input: '17th February 2019', output: { day: 17, month: 2, year: 2019 } },
            { input: 'February 17th 2019', output: { day: 17, month: 2, year: 2019 } },
        ])('should convert $input', ({ input, output }) => {
            const parsedText = dateStringToDayMonthYear(input);
            expect(parsedText).toEqual(output);
        });
    });

    describe('dateStringToDateObj()', () => {
        test('should return null if no date is found', () => {
            const parsedText = dateStringToDayMonthYear('test');
            expect(parsedText).toBeNull();
        });

        test('should return a date object if a date is found', () => {
            const parsedText = dateStringToDayMonthYear('17 February, 2009');
            expect(parsedText).toEqual({
                day: 17,
                month: 2,
                year: 2009,
            });
        });
    });
});
