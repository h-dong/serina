import convertDateStringToObj from './convertDateStringToObj';

describe('convertDateStringToObj', () => {
    test.each`
        input                   | output
        ${'02/17/2009'}         | ${{ day: 17, month: 2, year: 2009 }}
        ${'17/02/2009'}         | ${{ day: 17, month: 2, year: 2009 }}
        ${'2009/02/17'}         | ${{ day: 17, month: 2, year: 2009 }}
        ${'2/17/2009'}          | ${{ day: 17, month: 2, year: 2009 }}
        ${'17/2/2009'}          | ${{ day: 17, month: 2, year: 2009 }}
        ${'2009/2/17'}          | ${{ day: 17, month: 2, year: 2009 }}
        ${'2/17/2009'}          | ${{ day: 17, month: 2, year: 2009 }}
        ${'2-17-2009'}          | ${{ day: 17, month: 2, year: 2009 }}
        ${'10-2-2009'}          | ${{ day: 10, month: 2, year: 2009 }}
        ${'February 17, 2009'}  | ${{ day: 17, month: 2, year: 2009 }}
        ${'17 February, 2009'}  | ${{ day: 17, month: 2, year: 2009 }}
        ${'Feb 17, 2009'}       | ${{ day: 17, month: 2, year: 2009 }}
        ${'17 Feb, 2009'}       | ${{ day: 17, month: 2, year: 2009 }}
        ${'Feb 17, 2014'}       | ${{ day: 17, month: 2, year: 2014 }}
        ${'17 Feb, 2014'}       | ${{ day: 17, month: 2, year: 2014 }}
        ${'21st Feb 2019'}      | ${{ day: 21, month: 2, year: 2019 }}
        ${'Feb 21st 2019'}      | ${{ day: 21, month: 2, year: 2019 }}
        ${'22nd Feb 2019'}      | ${{ day: 22, month: 2, year: 2019 }}
        ${'Feb 22nd 2019'}      | ${{ day: 22, month: 2, year: 2019 }}
        ${'22nd Feb 2019'}      | ${{ day: 22, month: 2, year: 2019 }}
        ${'Feb 22nd 2019'}      | ${{ day: 22, month: 2, year: 2019 }}
        ${'17th February 2019'} | ${{ day: 17, month: 2, year: 2019 }}
        ${'February 17th 2019'} | ${{ day: 17, month: 2, year: 2019 }}
    `('should convert $input', ({ input, output }) => {
        const parsedText = convertDateStringToObj(input);
        expect(parsedText).toEqual(output);
    });
});
