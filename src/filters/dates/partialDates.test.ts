import PartialDates from './partialDates';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLight } from 'lib/date/dayLight';

describe('Partial Dates', () => {
    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    const mockDate = new Date('2019-06-29T15:48:12');
    jest.useFakeTimers().setSystemTime(mockDate);

    const currentYear = dayLight(mockDate).year;
    const currentMonth = dayLight(mockDate).month;

    afterAll(() => {
        jest.useRealTimers();
    });

    const mockDates = (day, month, year) => dayLight().set({ day, month, year }).endOf('day').toDate();

    test.each`
        filter                | dateTime
        ${'20'}               | ${null}
        ${'on 02/2009'}       | ${mockDates(1, 2, 2009)}
        ${'on Feb 2009'}      | ${mockDates(1, 2, 2009)}
        ${'on February 2009'} | ${mockDates(1, 2, 2009)}
        ${'on 2/2009'}        | ${mockDates(1, 2, 2009)}
        ${'on 2009 Feb'}      | ${mockDates(1, 2, 2009)}
        ${'on 2009 February'} | ${mockDates(1, 2, 2009)}
        ${'on 2009/2'}        | ${mockDates(1, 2, 2009)}
        ${'on 02/20'}         | ${mockDates(20, 2, currentYear + 1)}
        ${'on 02/10'}         | ${mockDates(2, 10, currentYear)}
        ${'on 02-20'}         | ${mockDates(20, 2, currentYear + 1)}
        ${'on 02-10'}         | ${mockDates(2, 10, currentYear)}
        ${'on Feb 20'}        | ${mockDates(20, 2, currentYear + 1)}
        ${'on Feb 20th'}      | ${mockDates(20, 2, currentYear + 1)}
        ${'on February 20'}   | ${mockDates(20, 2, currentYear + 1)}
        ${'on February 20th'} | ${mockDates(20, 2, currentYear + 1)}
        ${'on Feb 21st'}      | ${mockDates(21, 2, currentYear + 1)}
        ${'on Feb 22nd'}      | ${mockDates(22, 2, currentYear + 1)}
        ${'on Feb 23rd'}      | ${mockDates(23, 2, currentYear + 1)}
        ${'on 20/02'}         | ${mockDates(20, 2, currentYear + 1)}
        ${'on 20 Feb'}        | ${mockDates(20, 2, currentYear + 1)}
        ${'on 20th Feb'}      | ${mockDates(20, 2, currentYear + 1)}
        ${'on 20 February'}   | ${mockDates(20, 2, currentYear + 1)}
        ${'on 20th February'} | ${mockDates(20, 2, currentYear + 1)}
        ${'on 21st Feb'}      | ${mockDates(21, 2, currentYear + 1)}
        ${'on 22nd Feb'}      | ${mockDates(22, 2, currentYear + 1)}
        ${'on 23rd Feb'}      | ${mockDates(23, 2, currentYear + 1)}
        ${'on 23rd'}          | ${mockDates(23, currentMonth + 1, currentYear)}
        ${'on the 30th'}      | ${mockDates(30, currentMonth, currentYear)}
    `('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = PartialDates.parseText(`${text} ${filter}`);
        const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper on 21st Feb';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(21, 2, currentYear + 1),
                text: 'Hand in paper',
                matched: 'on 21st Feb',
            },
        ];

        expect(PartialDates.parseText(text)).toEqual(result);
    });
});
