import { weekdayStringToDateObj, weekdayStringToNumber } from './weekday.helpers';

describe('Weekday Helpers', () => {
    describe('convertWeekdayStringToNumber()', () => {
        beforeAll(() => {
            // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
            vi.useFakeTimers().setSystemTime(new Date('2019-01-19T18:06:18Z'));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'monday', pastWeekday: false, expected: 8 },
            { text: 'tuesday', pastWeekday: false, expected: 9 },
            { text: 'wednesday', pastWeekday: false, expected: 10 },
            { text: 'thursday', pastWeekday: false, expected: 11 },
            { text: 'friday', pastWeekday: false, expected: 12 },
            { text: 'saturday', pastWeekday: false, expected: 13 },
            { text: 'sunday', pastWeekday: false, expected: 7 },
            { text: 'mon', pastWeekday: false, expected: 8 },
            { text: 'tue', pastWeekday: false, expected: 9 },
            { text: 'wed', pastWeekday: false, expected: 10 },
            { text: 'thu', pastWeekday: false, expected: 11 },
            { text: 'fri', pastWeekday: false, expected: 12 },
            { text: 'sat', pastWeekday: false, expected: 13 },
            { text: 'sun', pastWeekday: false, expected: 7 },
            { text: 'monday', pastWeekday: true, expected: 1 },
            { text: 'tuesday', pastWeekday: true, expected: 2 },
            { text: 'wednesday', pastWeekday: true, expected: 3 },
            { text: 'thursday', pastWeekday: true, expected: 4 },
            { text: 'friday', pastWeekday: true, expected: 5 },
            { text: 'saturday', pastWeekday: true, expected: 6 },
            { text: 'sunday', pastWeekday: true, expected: 0 },
            { text: 'mon', pastWeekday: true, expected: 1 },
            { text: 'tue', pastWeekday: true, expected: 2 },
            { text: 'wed', pastWeekday: true, expected: 3 },
            { text: 'thu', pastWeekday: true, expected: 4 },
            { text: 'fri', pastWeekday: true, expected: 5 },
            { text: 'sat', pastWeekday: true, expected: 6 },
            { text: 'sun', pastWeekday: true, expected: 0 },
        ])('should be able to parse $text', ({ text, pastWeekday, expected }) => {
            const results = weekdayStringToNumber(text, pastWeekday);
            expect(results).toEqual(expected);
        });
    });

    describe('weekdayStringToDateObj()', () => {
        beforeAll(() => {
            // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
            vi.useFakeTimers().setSystemTime(new Date('2019-01-19T18:06:18Z'));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: 'monday', expected: '2019-01-21T00:00:00.000Z' },
            { text: 'tuesday', expected: '2019-01-22T00:00:00.000Z' },
            { text: 'wednesday', expected: '2019-01-23T00:00:00.000Z' },
            { text: 'thursday', expected: '2019-01-24T00:00:00.000Z' },
            { text: 'friday', expected: '2019-01-25T00:00:00.000Z' },
            { text: 'saturday', expected: '2019-01-26T00:00:00.000Z' },
            { text: 'sunday', expected: '2019-01-20T00:00:00.000Z' },
            { text: 'mon', expected: '2019-01-21T00:00:00.000Z' },
            { text: 'tue', expected: '2019-01-22T00:00:00.000Z' },
            { text: 'wed', expected: '2019-01-23T00:00:00.000Z' },
            { text: 'thu', expected: '2019-01-24T00:00:00.000Z' },
            { text: 'fri', expected: '2019-01-25T00:00:00.000Z' },
        ])('return correct date for "$text"', ({ text, expected }) => {
            const results = weekdayStringToDateObj(text);
            expect(results).toEqual(new Date(expected));
        });
    });
});
