import { convertTime, getValidMatch, timeStringToDateObj } from './time.helpers';

describe('Time Helpers', () => {
    describe('getValidMatch()', () => {
        test('should return null if no match', () => {
            const result = getValidMatch('test string', 'no-match');
            expect(result).toBeNull();
        });

        test('return correct value if matched', () => {
            const result = getValidMatch('test string', 'test');
            expect(result).toBe('test');
        });
    });

    describe('convertTime()', () => {
        test.each([
            { timeString: '', hour: NaN, minute: 30, expected: null },
            { timeString: '', hour: -1, minute: 30, expected: null },
            { timeString: '', hour: 24, minute: 30, expected: null },
            { timeString: '', hour: 1, minute: NaN, expected: null },
            { timeString: '', hour: 1, minute: -1, expected: null },
            { timeString: '', hour: 1, minute: 60, expected: null },
            { timeString: '1:30am', hour: 1, minute: 30, expected: { hour: 1, minute: 30 } },
            { timeString: '1:30pm', hour: 1, minute: 30, expected: { hour: 13, minute: 30 } },
            { timeString: '', hour: 1, minute: 30, expected: { hour: 1, minute: 30 } },
            { timeString: '30 mins to 5am', hour: 5, minute: 30, expected: { hour: 4, minute: 30 } },
            { timeString: '30 mins until 5am', hour: 5, minute: 30, expected: { hour: 4, minute: 30 } },
        ])(
            'should return correct value for "$hour:$minute" with "$timeString" time string',
            ({ timeString, hour, minute, expected }) => {
                const result = convertTime(timeString, hour, minute);
                expect(result).toEqual(expected);
            }
        );
    });

    describe('convertTimeStringToObj()', () => {
        test.only.each([
            { input: '25pm', expected: null },
            { input: 'at 8:30am', expected: { hour: 8, minute: 30 } },
            { input: '09:45', expected: { hour: 9, minute: 45 } },
            { input: '24:45', expected: null },
            { input: '9am', expected: { hour: 9, minute: 0 } },
            { input: 'by 7pm', expected: { hour: 19, minute: 0 } },
            { input: '12pm', expected: { hour: 12, minute: 0 } },
            { input: '12am', expected: { hour: 0, minute: 0 } },
            { input: '11:00', expected: { hour: 11, minute: 0 } },
            { input: 'at 4PM', expected: { hour: 16, minute: 0 } },
            { input: 'at 2 pm', expected: { hour: 14, minute: 0 } },
            { input: 'at 4 p.M.', expected: { hour: 16, minute: 0 } },
            { input: 'by 4p.m.', expected: { hour: 16, minute: 0 } },
            { input: '0:00', expected: { hour: 0, minute: 0 } },
            { input: 'at quarter past 4', expected: { hour: 4, minute: 15 } },
            { input: 'at quarter to 4', expected: { hour: 3, minute: 45 } },
            { input: 'at half past 4', expected: { hour: 4, minute: 30 } },
            { input: 'at quarter to 4pm', expected: { hour: 15, minute: 45 } },
            { input: 'at 20 past 4', expected: { hour: 4, minute: 20 } },
            { input: 'at 20 minutes past 4', expected: { hour: 4, minute: 20 } },
            { input: 'at 20 min past 4', expected: { hour: 4, minute: 20 } },
            { input: 'at 20 min to 19', expected: { hour: 18, minute: 40 } },
            { input: 'at 20 min to 23', expected: { hour: 22, minute: 40 } },
            { input: 'at 20 min to 12am', expected: { hour: 23, minute: 40 } },
            { input: 'at 20 min to 90', expected: null },
            { input: 'at 20 min to 24', expected: null },
            { input: '8:30am', expected: { hour: 8, minute: 30 } },
            { input: '09:45', expected: { hour: 9, minute: 45 } },
            { input: '9am', expected: { hour: 9, minute: 0 } },
            { input: '7pm', expected: { hour: 19, minute: 0 } },
            { input: '12pm', expected: { hour: 12, minute: 0 } },
            { input: '12am', expected: { hour: 0, minute: 0 } },
            { input: '0:00', expected: { hour: 0, minute: 0 } },
            { input: '00:00', expected: { hour: 0, minute: 0 } },
            { input: '11:00', expected: { hour: 11, minute: 0 } },
            { input: '4PM', expected: { hour: 16, minute: 0 } },
            { input: '1:20pm', expected: { hour: 13, minute: 20 } },
            { input: '2 pm', expected: { hour: 14, minute: 0 } },
            { input: '5:27 p.m.', expected: { hour: 17, minute: 27 } },
            { input: '6:27 A.M.', expected: { hour: 6, minute: 27 } },
            { input: '07:27 PM.', expected: { hour: 19, minute: 27 } },
            { input: '19:27 PM.', expected: { hour: 19, minute: 27 } },
            { input: '2:40a.M.', expected: { hour: 2, minute: 40 } },
            { input: '5a.M.', expected: { hour: 5, minute: 0 } },
        ])('should be able to parse $input', ({ input, expected }) => {
            const results = timeStringToDateObj(input);
            expect(results).toEqual(expected);
        });
    });

    describe('timeStringToHourMinute()', () => {
        test('missing hour', () => {
            const results = timeStringToDateObj('some random sting');
            expect(results).toBeNull();
        });

        test('missing minute', () => {
            const results = timeStringToDateObj('some random sting');
            expect(results).toBeNull();
        });

        test('return correct hour and minute', () => {
            const results = timeStringToDateObj('5:30pm');
            expect(results).toEqual({ hour: 17, minute: 30 });
        });
    });
});
