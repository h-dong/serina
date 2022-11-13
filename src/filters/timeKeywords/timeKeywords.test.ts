import TimeKeywords from './timeKeywords';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Time Keywords', () => {
    // Mock Date Time to 2018/11/1 23:30:00 GMT+0110
    const mockDate = new Date('2018-11-01T23:30:00');
    jest.useFakeTimers().setSystemTime(mockDate);

    const mockTime = (day, hour, minute) => dayLite(mockDate).set({ day, hour, minute }).startOf('minute').toDate();

    afterAll(() => {
        jest.useRealTimers();
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

        test('should return correct case for matched string', () => {
            const text = 'Hand in paper by noon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockTime(2, 12, 0),
                    text: 'Hand in paper',
                    matched: 'by noon',
                },
            ];

            expect(TimeKeywords.parseText(text)).toEqual(result);
        });
    });
});
