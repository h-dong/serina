import { DateTime } from 'luxon';
import Dates from './dates';

describe('Dates', () => {
    const mockDates = (day, month, year) => DateTime.utc()
        .set({ day, month, year })
        .endOf('day')
        .toJSDate();

    test.each`
        filter                     | dateTime
        ${'20'}                    | ${null}
        ${'on 02/17/2009'}         | ${mockDates(17, 2, 2009)}
        ${'on 17/02/2009'}         | ${mockDates(17, 2, 2009)}
        ${'on 2009/02/17'}         | ${mockDates(17, 2, 2009)}
        ${'on 2/17/2009'}          | ${mockDates(17, 2, 2009)}
        ${'on 17/2/2009'}          | ${mockDates(17, 2, 2009)}
        ${'on 2009/2/17'}          | ${mockDates(17, 2, 2009)}
        ${'on 2/17/2009'}          | ${mockDates(17, 2, 2009)}
        ${'on 2-17-2009'}          | ${mockDates(17, 2, 2009)}
        ${'on February 17, 2009'}  | ${mockDates(17, 2, 2009)}
        ${'on 17 February, 2009'}  | ${mockDates(17, 2, 2009)}
        ${'on Feb 17, 2009'}       | ${mockDates(17, 2, 2009)}
        ${'on 17 Feb, 2009'}       | ${mockDates(17, 2, 2009)}
        ${'on Feb 17, 2014'}       | ${mockDates(17, 2, 2014)}
        ${'on 17 Feb, 2014'}       | ${mockDates(17, 2, 2014)}
        ${'on 21st Feb 2019'}      | ${mockDates(21, 2, 2019)}
        ${'on Feb 21st 2019'}      | ${mockDates(21, 2, 2019)}
        ${'on 22nd Feb 2019'}      | ${mockDates(22, 2, 2019)}
        ${'on Feb 22nd 2019'}      | ${mockDates(22, 2, 2019)}
        ${'on 22nd Feb 2019'}      | ${mockDates(22, 2, 2019)}
        ${'on Feb 22nd 2019'}      | ${mockDates(22, 2, 2019)}
        ${'on 17th February 2019'} | ${mockDates(17, 2, 2019)}
        ${'by February 17th 2019'} | ${mockDates(17, 2, 2019)}
    `('should not parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = Dates.parseText(`${text} ${filter}`);
        const output = (dateTime) ? [{ dateTime, matched: filter, text }] : null;
        expect(results).toEqual(output);
    });
});
