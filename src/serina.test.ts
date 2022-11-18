import serina from 'serina';

describe('Serina', () => {
    test.each([
        { filter: 'WeekDay', text: 'on Monday', output: 1 },
        { filter: 'Day', text: 'on 21st', output: 2 },
        { filter: 'Month', text: 'June', output: 1 },
        { filter: 'Year', text: '2011', output: 1 },
        { filter: 'Time', text: '5pm', output: 1 },
        { filter: 'Dates', text: '15/12/2019', output: 3 },
        { filter: 'PartialDates', text: '15th Dec', output: 3 },
        { filter: 'DateAndTime', text: '5am in 2 yrs', output: 3 },
        { filter: 'DateAndTime', text: '5am 12/2019', output: 4 },
        { filter: 'RelativeTime', text: 'in 15 mins', output: 1 },
        { filter: 'RelativeDates', text: 'in 2 days', output: 1 },
        { filter: 'WeekDayAndTime', text: '5am Mon', output: 3 },
        { filter: 'TimeKeywords', text: 'at noon', output: 1 },
    ])('should be able to parse $filter', ({ text, output }) => {
        const results = serina(`go to work ${text}`);
        expect(results.matches.length).toEqual(output);
    });
});
