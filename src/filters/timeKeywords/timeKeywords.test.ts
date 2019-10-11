import { DateTime, Settings } from 'luxon';
import TimeKeywords from './timeKeywords';


describe('Time Keywords', () => {
    // Mock Date Time to 2018/11/1 23:30:00 GMT+0110
    Settings.now = () => 1541115000000;

    const mockTime = (day, hour, minute) => DateTime.utc()
        .set({ day, hour, minute })
        .startOf('minute')
        .toJSDate();

    afterAll(() => {
        // Restore Date Time Mock
        Settings.now = () => Date.now();
    });

    describe('parseText', () => {
        test.each`
            filter                | dateTime
            ${'noon'}             | ${mockTime(2, 12, 0)}
            ${'by noon'}          | ${mockTime(2, 12, 0)}
            ${'mid-day'}          | ${mockTime(2, 12, 0)}
            ${'midday'}           | ${mockTime(2, 12, 0)}
            ${'around mid day'}   | ${mockTime(2, 12, 0)}
            ${'at mid-night'}     | ${mockTime(2, 0, 0)}
            ${'by midnight'}      | ${mockTime(2, 0, 0)}
            ${'around mid night'} | ${mockTime(2, 0, 0)}
        `('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = TimeKeywords.parseText(`${text} ${filter}`);
            const output = [{ dateTime, matched: filter, text }];
            expect(results).toEqual(output);
        });
    });
});
