import { getNext } from './relativeDates.helpers';

describe('Relative Dates Helpers', () => {
    describe('getNext', () => {
        afterAll(() => {
            vi.useRealTimers();
        });

        test('correctly gets start of next week', () => {
            const testDate = new Date('2019-01-12T12:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('week');
            expect(parsedNext).toEqual(new Date('2019-01-14T00:00:00.000Z'));
        });

        test('correctly gets start of next month', () => {
            const testDate = new Date('2019-06-20T12:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2019-07-01T00:00:00.000Z'));
        });

        test('correctly gets start of next month when the date is near the end of a longer month', () => {
            const testDate = new Date('2019-01-31T00:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2019-02-01T00:00:00.000Z'));
        });

        test('correctly gets start of next month when the date is near the beginning of a shorter month', () => {
            const testDate = new Date('2019-02-19T12:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2019-03-01T00:00:00.000Z'));
        });

        test('correctly gets start of next month when the date is near the end of the year', () => {
            const testDate = new Date('2019-12-02T12:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext).toEqual(new Date('2020-01-01T00:00:00.000Z'));
        });

        test('correctly gets start of next year', () => {
            const testDate = new Date(new Date('2019-05-19T12:00:00.000Z'));
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('year');
            expect(parsedNext).toEqual(new Date('2020-01-01T00:00:00.000Z'));
        });

        test('correctly gets start of next year when the date is near the start of a leap year', () => {
            const testDate = new Date('2020-01-01T12:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('year');
            expect(parsedNext).toEqual(new Date('2021-01-01T00:00:00.000Z'));
        });

        test('correctly fails when the date is illegal', () => {
            const testDate = new Date('2019-02-31T12:00:00.000Z');
            vi.useFakeTimers().setSystemTime(testDate);
            const parsedNext = getNext('month');
            expect(parsedNext === null);
        });
    });

    describe('relativeDateStringToDayMonthYear()', () => {
        test('missing test', () => {
            expect(true).toBe(false);
        });
    });

    describe('relativeDateStringToDateObj()', () => {
        test('missing test', () => {
            expect(true).toBe(false);
        });

        //         // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
        // vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52.123Z'));

        // const mockDates = (date: string) => {
        //     const d = new Date(date);
        //     d.setUTCMilliseconds(0);
        //     d.setUTCSeconds(0);
        //     d.setUTCHours(0);
        //     return d;
        // };

        // afterAll(() => {
        //     vi.useRealTimers();
        // });

        // test.each([
        //     { filter: 'next week', dateTime: mockDates('2019-06-24T00:00:00.000Z') },
        //     { filter: 'next month', dateTime: mockDates('2019-07-01T00:00:00.000Z') },
        //     { filter: 'next year', dateTime: mockDates('2020-01-01T00:00:00.000Z') },
        //     { filter: 'today', dateTime: mockDates('2019-06-20T00:00:00.000Z') },
        //     { filter: 'in a day', dateTime: mockDates('2019-06-21T00:00:00.000Z') },
        //     { filter: 'in a week', dateTime: mockDates('2019-06-27T00:00:00.000Z') },
        //     { filter: 'in 5 weeks', dateTime: mockDates('2019-07-25T00:00:00.000Z') },
        //     { filter: 'tomorrow', dateTime: mockDates('2019-06-21T00:00:00.000Z') },
        //     { filter: 'in 5 days', dateTime: mockDates('2019-06-25T00:00:00.000Z') },
        //     { filter: 'in 31 days', dateTime: mockDates('2019-07-21T00:00:00.000Z') },
        //     { filter: 'in a wk', dateTime: mockDates('2019-06-27T00:00:00.000Z') },
        //     { filter: 'in 5 wks', dateTime: mockDates('2019-07-25T00:00:00.000Z') },
        //     { filter: 'in a month', dateTime: mockDates('2019-07-20T00:00:00.000Z') },
        //     { filter: 'in 5 months', dateTime: mockDates('2019-11-20T00:00:00.000Z') },
        //     { filter: 'in 12 months', dateTime: mockDates('2020-06-20T00:00:00.000Z') },
        //     { filter: 'in a year', dateTime: mockDates('2020-06-20T00:00:00.000Z') },
        //     { filter: 'in 5 years', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        //     { filter: 'in a yr', dateTime: mockDates('2020-06-20T00:00:00.000Z') },
        //     { filter: 'in 5 yrs', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        //     { filter: '5 years later', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        //     { filter: '5 years from now', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        //     { filter: '5 years from now', dateTime: mockDates('2024-06-20T00:00:00.000Z') },
        // ])('should parse "$filter"', ({ filter, dateTime }) => {
        //     const text = 'go to work';
        //     const results = RelativeDates.parseText(`${text} ${filter}`);
        //     const output = dateTime ? [{ dateTime, matched: filter, text }] : null;
        //     expect(results).toEqual(output);
        // });

        // test('should return correct case for matched string', () => {
        //     const text = 'Hand in paper 5 years from now';
        //     const result: ParsedMatchSchema[] = [
        //         {
        //             dateTime: mockDates('2024-06-20T00:00:00.000Z'),
        //             text: 'Hand in paper',
        //             matched: '5 years from now',
        //         },
        //     ];

        //     expect(RelativeDates.parseText(text)).toEqual(result);
        // });
    });
});
