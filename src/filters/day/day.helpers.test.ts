import { dayLite } from 'lib/date/dayLite';
import { dayStringToDateObj } from './day.helpers';

describe('Day Helpers', () => {
    describe('dayStringToDateObj()', () => {
        // Mock Date Time to Saturday, 19 January 2018 18:06:18 GMT+00:00
        const mockDate = new Date(Date.UTC(2018, 0, 19));

        const generateDate = ({ day, month, year }: { day: number; month: number; year: number }) =>
            dayLite().set({ day, month, year }).start('day').toDate();

        beforeAll(() => {
            vi.useFakeTimers();
            vi.setSystemTime(mockDate);
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each([
            { text: '0', dateTime: null },
            { text: '07', dateTime: generateDate({ day: 7, month: 2, year: 2018 }) },
            { text: '20', dateTime: generateDate({ day: 20, month: 1, year: 2018 }) },
            { text: '35', dateTime: null },
            { text: 'no match', dateTime: null },
        ])('should be able to parse $text', ({ text, dateTime }) => {
            expect(dayStringToDateObj(text)).toEqual(dateTime);
        });
    });
});
