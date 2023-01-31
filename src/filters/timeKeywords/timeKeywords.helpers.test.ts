import { timeKeywordsToDateObj } from './timeKeywords.helpers';

describe('Time Keywords Helpers', () => {
    describe('timeKeywordsToDateObj()', () => {
        afterAll(() => {
            vi.useRealTimers();
        });

        test('should return null if no matching text', () => {
            const results = timeKeywordsToDateObj('no matching text');
            expect(results).toBeNull();
        });

        test.each([
            { text: 'midnight', expected: new Date('2019-01-20T00:00:00.000Z') },
            { text: 'mid-day', expected: new Date('2019-01-19T12:00:00.000Z') },
        ])('should be able to parse $text during morning time', ({ text, expected }) => {
            // Mock Date Time to Saturday, 19 January 2019 10:06:18 GMT+00:00
            vi.useFakeTimers().setSystemTime(new Date('2019-01-19T10:06:18Z'));

            const results = timeKeywordsToDateObj(text);
            expect(results).toEqual(expected);
        });

        test.each([
            { text: 'midnight', expected: new Date('2019-01-20T00:00:00.000Z') },
            { text: 'mid-day', expected: new Date('2019-01-20T12:00:00.000Z') },
        ])('should be able to parse $text during evening time', ({ text, expected }) => {
            // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
            vi.useFakeTimers().setSystemTime(new Date('2019-01-19T18:06:18Z'));

            const results = timeKeywordsToDateObj(text);
            expect(results).toEqual(expected);
        });
    });
});
