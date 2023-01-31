import { dayLite } from 'lib/date/dayLite';
import {
    addRelativeTimeToCurrentTime,
    convertMatchToDateObj,
    convertRelativeTimeStringToNumericValue,
} from './relativeTime.helpers';

describe('Relative Time Helpers', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52.123Z'));

    afterAll(() => {
        vi.useRealTimers();
    });

    describe('convertRelativeTimeStringToNumericValue()', () => {
        test.each([
            { timePeriod: 'half a', timeUnit: 'hours', expected: 1800000 },
            { timePeriod: 'half an', timeUnit: 'hours', expected: 1800000 },
            { timePeriod: 'a quarter of a', timeUnit: 'hours', expected: 900000 },
            { timePeriod: 'a quarter of an', timeUnit: 'hours', expected: 900000 },
            { timePeriod: 'a', timeUnit: 'hours', expected: 3600000 },
            { timePeriod: 'an', timeUnit: 'hours', expected: 3600000 },
            { timePeriod: 'one', timeUnit: 'hours', expected: 3600000 },
            { timePeriod: '2', timeUnit: 'hours', expected: 7200000 },
            { timePeriod: '2', timeUnit: 'minutes', expected: 120000 },
        ])('should return correct value in secs for "$timePeriod $timeUnit"', ({ timePeriod, timeUnit, expected }) => {
            const result = convertRelativeTimeStringToNumericValue(timePeriod, timeUnit);
            expect(result).toBe(expected);
        });
    });

    describe('addRelativeTimeToCurrentTime()', () => {
        test('should return a date object', () => {
            const result = addRelativeTimeToCurrentTime('2 hours');
            expect(result).toBeInstanceOf(Date);
        });

        test('should return a date object after removing time unit', () => {
            const result = addRelativeTimeToCurrentTime('2 hours');
            expect(dayLite(result).hour).toBe(10);
        });
    });

    describe('convertMatchToDateObj()', () => {
        test('should return a date object', () => {
            const result = convertMatchToDateObj('in 2 hours');
            expect(result).toBeInstanceOf(Date);
        });

        test('should return a date object after removing filler words', () => {
            const result = convertMatchToDateObj('in 2 hours');
            expect(dayLite(result).hour).toBe(10);
        });
    });
});
