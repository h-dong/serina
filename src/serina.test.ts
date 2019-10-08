import serina from './serina';

describe('Serina', () => {

    test.each`
        filter              | text              | expected
        ${'WeekDay'}        | ${'on Monday'}    | ${1}
        ${'Day'}            | ${'on 21st'}      | ${2}
        ${'Month'}          | ${'June'}         | ${1}
        ${'Year'}           | ${'2011'}         | ${1}
        ${'Time'}           | ${'5pm'}          | ${1}
        ${'Dates'}          | ${'15/12/2019'}   | ${3}
        ${'PartialDates'}   | ${'15th Dec'}     | ${3}
        ${'DateAndTime'}    | ${'5am in 2 yrs'} | ${3}
        ${'DateAndTime'}    | ${'5am 12/2019'}  | ${4}
        ${'RelativeTime'}   | ${'in 15 mins'}   | ${1}
        ${'RelativeDates'}  | ${'in 2 days'}    | ${1}
        ${'WeekDayAndTime'} | ${'5am Mon'}      | ${3}
        ${'TimeKeywords'}   | ${'at noon'}      | ${1}
    `('should be able to parse $filter', ({ text, expected }) => {
        const results = serina(`go to work ${text}`);
        expect(results.matches.length).toEqual(expected);
    });
});
