import serina from 'serina';

describe('Serina', () => {
    test.each([
        { filter: 'WeekDay', text: 'on Monday', expected: 1 },
        { filter: 'Day', text: 'on 21st', expected: 2 },
        { filter: 'Month', text: 'June', expected: 1 },
        { filter: 'Year', text: '2011', expected: 1 },
        { filter: 'Time', text: '5pm', expected: 1 },
        { filter: 'Dates', text: '15/12/2019', expected: 3 },
        { filter: 'PartialDates', text: '15th Dec', expected: 3 },
        { filter: 'DateAndTime', text: '5am in 2 yrs', expected: 3 },
        { filter: 'DateAndTime', text: '5am 12/2019', expected: 4 },
        { filter: 'RelativeTime', text: 'in 15 mins', expected: 1 },
        { filter: 'RelativeDates', text: 'in 2 days', expected: 1 },
        { filter: 'WeekDayAndTime', text: '5am Mon', expected: 3 },
        { filter: 'TimeKeywords', text: 'at noon', expected: 1 },
    ])('should be able to parse $filter', ({ text, expected }) => {
        const results = serina(`go to work ${text}`);
        expect(results.matches.length).toEqual(expected);
    });
});
