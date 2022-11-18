import convertPartialDateStringToObj from './convertPartialDateStringToObj';
import { dayLite } from 'lib/date/dayLite';

describe('convertDateStringToObj', () => {
    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    const mockDate = new Date('2019-06-29T15:48:12');
    vi.useFakeTimers().setSystemTime(mockDate);

    const currentYear = dayLite(mockDate).year;

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { input: '02/2009', output: { day: 1, month: 2, year: 2009 } },
        { input: 'Feb 2009', output: { day: 1, month: 2, year: 2009 } },
        { input: 'February 2009', output: { day: 1, month: 2, year: 2009 } },
        { input: '2/2009', output: { day: 1, month: 2, year: 2009 } },
        { input: '2009 Feb', output: { day: 1, month: 2, year: 2009 } },
        { input: '2009 February', output: { day: 1, month: 2, year: 2009 } },
        { input: '2009/2', output: { day: 1, month: 2, year: 2009 } },
        { input: '02/20', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: '02/10', output: { day: 2, month: 10, year: currentYear } },
        { input: 'Feb 20', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: 'Feb 20th', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: 'February 20', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: 'February 20th', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: 'Feb 21st', output: { day: 21, month: 2, year: currentYear + 1 } },
        { input: '20/02', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: '20 Feb', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: '20th Feb', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: '20 February', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: '20th February', output: { day: 20, month: 2, year: currentYear + 1 } },
        { input: '22nd Feb', output: { day: 22, month: 2, year: currentYear + 1 } },
        { input: '23rd Feb', output: { day: 23, month: 2, year: currentYear + 1 } },
        { input: '29 Jun', output: { day: 29, month: 6, year: currentYear } },
        { input: '28 Jun', output: { day: 28, month: 6, year: currentYear + 1 } },
    ])('should convert $input', ({ input, output }) => {
        const parsedText = convertPartialDateStringToObj(input);
        expect(parsedText).toEqual(output);
    });
});
