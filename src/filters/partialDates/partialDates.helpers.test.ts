import { dayLite } from 'lib/date/dayLite';
import { partialDateStringToDayMonthYear } from './partialDates.helpers';

describe('partialDateStringToDayMonthYear', () => {
    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    const mockDate = new Date('2019-06-29T15:48:12Z');
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
        const parsedText = partialDateStringToDayMonthYear(input);
        expect(parsedText).toEqual(output);
    });

    //  // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    //  const mockDate = new Date('2019-06-29T15:48:12Z');
    //  vi.useFakeTimers().setSystemTime(mockDate);

    //  const currentYear = dayLite(mockDate).year;
    //  const currentMonth = dayLite(mockDate).month;

    //  afterAll(() => {
    //      vi.useRealTimers();
    //  });

    //  const mockDates = (day: number, month: number, year: number) =>
    //      dayLite().set({ day, month, year }).start('day').toDate();

    //  test.each([
    //      { filter: '20', dateTime: null },
    //      { filter: 'on 02/2009', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on Feb 2009', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on February 2009', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on 2/2009', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on 2009 Feb', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on 2009 February', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on 2009/2', dateTime: mockDates(1, 2, 2009) },
    //      { filter: 'on 02/20', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 02/10', dateTime: mockDates(2, 10, currentYear) },
    //      { filter: 'on 02-20', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 02-10', dateTime: mockDates(2, 10, currentYear) },
    //      { filter: 'on Feb 20', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on Feb 20th', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on February 20', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on February 20th', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on Feb 21st', dateTime: mockDates(21, 2, currentYear + 1) },
    //      { filter: 'on Feb 22nd', dateTime: mockDates(22, 2, currentYear + 1) },
    //      { filter: 'on Feb 23rd', dateTime: mockDates(23, 2, currentYear + 1) },
    //      { filter: 'on 20/02', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 20 Feb', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 20th Feb', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 20 February', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 20th February', dateTime: mockDates(20, 2, currentYear + 1) },
    //      { filter: 'on 21st Feb', dateTime: mockDates(21, 2, currentYear + 1) },
    //      { filter: 'on 22nd Feb', dateTime: mockDates(22, 2, currentYear + 1) },
    //      { filter: 'on 23rd Feb', dateTime: mockDates(23, 2, currentYear + 1) },
    //      { filter: 'on 23rd', dateTime: mockDates(23, currentMonth + 1, currentYear) },
    //      { filter: 'on the 30th', dateTime: mockDates(30, currentMonth, currentYear) },
    //  ])('should not parse $filter', ({ filter, dateTime }) => {
    //      const text = 'go to work';
    //      const results = PartialDates.parseText(`${text} ${filter}`);
    //      const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
    //      expect(results).toEqual(output);
    //  });

    //  test('should return correct case for matched string', () => {
    //      const text = 'Hand in paper on 21st Feb';
    //      const result: ParsedMatchSchema[] = [
    //          {
    //              dateTime: mockDates(21, 2, currentYear + 1),
    //              text: 'Hand in paper',
    //              matched: 'on 21st Feb',
    //          },
    //      ];

    //      expect(PartialDates.parseText(text)).toEqual(result);
    //  });
});
