import convertWeekdayStringToNumber from './convertWeekdayStringToNumber';

describe('convertWeekdayStringToNumber', () => {
    // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
    vi.useFakeTimers().setSystemTime(new Date('2019-01-19T18:06:18Z'));

    afterAll(() => {
        vi.useRealTimers();
    });

    test.each([
        { text: 'monday', pastWeekday: false, output: 8 },
        { text: 'tuesday', pastWeekday: false, output: 9 },
        { text: 'wednesday', pastWeekday: false, output: 10 },
        { text: 'thursday', pastWeekday: false, output: 11 },
        { text: 'friday', pastWeekday: false, output: 12 },
        { text: 'saturday', pastWeekday: false, output: 13 },
        { text: 'sunday', pastWeekday: false, output: 7 },
        { text: 'mon', pastWeekday: false, output: 8 },
        { text: 'tue', pastWeekday: false, output: 9 },
        { text: 'wed', pastWeekday: false, output: 10 },
        { text: 'thu', pastWeekday: false, output: 11 },
        { text: 'fri', pastWeekday: false, output: 12 },
        { text: 'sat', pastWeekday: false, output: 13 },
        { text: 'sun', pastWeekday: false, output: 7 },
        { text: 'monday', pastWeekday: true, output: 1 },
        { text: 'tuesday', pastWeekday: true, output: 2 },
        { text: 'wednesday', pastWeekday: true, output: 3 },
        { text: 'thursday', pastWeekday: true, output: 4 },
        { text: 'friday', pastWeekday: true, output: 5 },
        { text: 'saturday', pastWeekday: true, output: 6 },
        { text: 'sunday', pastWeekday: true, output: 0 },
        { text: 'mon', pastWeekday: true, output: 1 },
        { text: 'tue', pastWeekday: true, output: 2 },
        { text: 'wed', pastWeekday: true, output: 3 },
        { text: 'thu', pastWeekday: true, output: 4 },
        { text: 'fri', pastWeekday: true, output: 5 },
        { text: 'sat', pastWeekday: true, output: 6 },
        { text: 'sun', pastWeekday: true, output: 0 },
    ])('should be able to parse $filter', ({ text, pastWeekday, output }) => {
        const results = convertWeekdayStringToNumber(text, pastWeekday);
        expect(results).toEqual(output);
    });
});
