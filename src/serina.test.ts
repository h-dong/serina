import serina from './serina';

describe('Serina', () => {

    test.each`
        filter            | text                        | expected
        ${'WeekDay'}      | ${'go to work on Monday'}   | ${1}
        ${'Day'}          | ${'go to work on 21st'}     | ${2}
        ${'Month'}        | ${'go to work June'}        | ${1}
        ${'Year'}         | ${'go to work 2011'}        | ${1}
        ${'Time'}         | ${'go to work 5pm'}         | ${1}
        ${'Dates'}        | ${'go to work 15/12/2019'}  | ${3}
        ${'PartialDates'} | ${'go to work 15th Dec'}    | ${3}
        ${'DateAndTime'}  | ${'go to work 5am 12/2019'} | ${4}
        ${'RelativeTime'} | ${'go to work in 15 mins'}  | ${1}
    `('should be able to parse $filter', ({ text, expected }) => {
        const results = serina(text);
        expect(results.matches.length).toEqual(expected);
    });
});
