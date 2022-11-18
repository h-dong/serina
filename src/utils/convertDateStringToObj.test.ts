import convertDateStringToObj from './convertDateStringToObj';

describe('convertDateStringToObj', () => {
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
        const parsedText = convertDateStringToObj(input);
        expect(parsedText).toEqual(output);
    });
});
