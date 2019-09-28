import { DateTime } from 'luxon';
import Time from './time';

describe('Time', () => {
    const mockTime = (hour, minute) => DateTime.utc()
        .set({ hour, minute })
        .startOf('minute')
        .toJSDate();

        describe('parseText', () => {
            test.each`
            filter                    | dateTime
            ${'at 8:30am'}            | ${mockTime(8, 30)}
            ${'09:45'}                | ${mockTime(9, 45)}
            ${'24:45'}                | ${null}
            ${'25pm'}                 | ${null}
            ${'9am'}                  | ${mockTime(9, 0)}
            ${'by 7pm'}               | ${mockTime(19, 0)}
            ${'12pm'}                 | ${mockTime(12, 0)}
            ${'12am'}                 | ${mockTime(0, 0)}
            ${'0:00'}                 | ${mockTime(0, 0)}
            ${'11:00'}                | ${mockTime(11, 0)}
            ${'at 4PM'}               | ${mockTime(16, 0)}
            ${'at 2 pm'}              | ${mockTime(14, 0)}
            ${'at 4 p.M.'}            | ${mockTime(16, 0)}
            ${'by 4p.m.'}             | ${mockTime(16, 0)}
            ${'at quarter to 4'}      | ${mockTime(3, 45)}
            ${'at quarter past 4'}    | ${mockTime(4, 15)}
            ${'at quarter to 4pm'}    | ${mockTime(15, 45)}
            ${'at half past 4'}       | ${mockTime(4, 30)}
            ${'at 20 past 4'}         | ${mockTime(4, 20)}
            ${'at 20 minutes past 4'} | ${mockTime(4, 20)}
            ${'at 20 min past 4'}     | ${mockTime(4, 20)}
            ${'at 20 min to 12am'}    | ${mockTime(23, 40)}
            ${'at 20 min to 90'}      | ${null}
            ${'at 20 min to 23'}      | ${mockTime(22, 40)}
            ${'at 20 min to 24'}      | ${null}
            ${'at 20 min to 19'}      | ${mockTime(18, 40)}
        `('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = Time.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });
});
