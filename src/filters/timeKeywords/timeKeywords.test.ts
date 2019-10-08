import { DateTime } from 'luxon';
import TimeKeywords from './timeKeywords';

describe('Time Keywords', () => {
    const mockTime = (hour, minute) => DateTime.utc()
        .set({ hour, minute })
        .startOf('minute')
        .toJSDate();

    describe('parseText', () => {
        test.each`
            filter                | dateTime
            ${'noon'}             | ${mockTime(12, 0)}
            ${'by noon'}          | ${mockTime(12, 0)}
            ${'mid-day'}          | ${mockTime(12, 0)}
            ${'midday'}           | ${mockTime(12, 0)}
            ${'around mid day'}   | ${mockTime(12, 0)}
            ${'at mid-night'}     | ${mockTime(0, 0)}
            ${'by midnight'}      | ${mockTime(0, 0)}
            ${'around mid night'} | ${mockTime(0, 0)}
        `('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = TimeKeywords.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });
});
