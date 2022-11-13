import RelativeDates from 'filters/relativeDates/relativeDates';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('RelativeDates', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    jest.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52'));

    const currentYear = dayLite().year;
    const currentMonth = dayLite().month;
    const currentDay = dayLite().day;

    const mockDates = (day, month, year) => dayLite().set({ day, month, year }).endOf('day').toDate();

    const mockNext = period =>
        dayLite()
            .plus({ [period]: 1 })
            .startOf(period)
            .endOf('day')
            .toDate();

    afterAll(() => {
        jest.useRealTimers();
    });

    test.each`
        filter                | dateTime
        ${'next week'}        | ${mockNext('week')}
        ${'next month'}       | ${mockNext('month')}
        ${'next year'}        | ${mockNext('year')}
        ${'today'}            | ${mockDates(currentDay, currentMonth, currentYear)}
        ${'in a day'}         | ${mockDates(currentDay + 1, currentMonth, currentYear)}
        ${'in a week'}        | ${mockDates(currentDay + 7, currentMonth, currentYear)}
        ${'in 5 weeks'}       | ${mockDates(currentDay + 35, currentMonth, currentYear)}
        ${'tomorrow'}         | ${mockDates(currentDay + 1, currentMonth, currentYear)}
        ${'in 5 days'}        | ${mockDates(currentDay + 5, currentMonth, currentYear)}
        ${'in 31 days'}       | ${mockDates(currentDay + 31, currentMonth, currentYear)}
        ${'in a wk'}          | ${mockDates(currentDay + 7, currentMonth, currentYear)}
        ${'in 5 wks'}         | ${mockDates(currentDay + 35, currentMonth, currentYear)}
        ${'in a month'}       | ${mockDates(currentDay, currentMonth + 1, currentYear)}
        ${'in 5 months'}      | ${mockDates(currentDay, currentMonth + 5, currentYear)}
        ${'in 12 months'}     | ${mockDates(currentDay, currentMonth, currentYear + 1)}
        ${'in a year'}        | ${mockDates(currentDay, currentMonth, currentYear + 1)}
        ${'in 5 years'}       | ${mockDates(currentDay, currentMonth, currentYear + 5)}
        ${'in a yr'}          | ${mockDates(currentDay, currentMonth, currentYear + 1)}
        ${'in 5 yrs'}         | ${mockDates(currentDay, currentMonth, currentYear + 5)}
        ${'5 years later'}    | ${mockDates(currentDay, currentMonth, currentYear + 5)}
        ${'5 years from now'} | ${mockDates(currentDay, currentMonth, currentYear + 5)}
        ${'5 years from now'} | ${mockDates(currentDay, currentMonth, currentYear + 5)}
    `('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = RelativeDates.parseText(`${text} ${filter}`);
        const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper 5 years from now';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockDates(currentDay, currentMonth, currentYear + 5),
                text: 'Hand in paper',
                matched: '5 years from now',
            },
        ];

        expect(RelativeDates.parseText(text)).toEqual(result);
    });
});
