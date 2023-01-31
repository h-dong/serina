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
        test.each([
            { text: '25pm', expected: null },
            { text: 'at 8:30am', expected: { hour: 8, minute: 30 } },
            { text: '09:45', expected: { hour: 9, minute: 45 } },
            { text: '24:45', expected: null },
            { text: '9am', expected: { hour: 9, minute: 0 } },
            { text: 'by 7pm', expected: { hour: 19, minute: 0 } },
            { text: '12pm', expected: { hour: 12, minute: 0 } },
            { text: '12am', expected: { hour: 0, minute: 0 } },
            { text: '11:00', expected: { hour: 11, minute: 0 } },
            { text: 'at 4PM', expected: { hour: 16, minute: 0 } },
            { text: 'at 2 pm', expected: { hour: 14, minute: 0 } },
            { text: 'at 4 p.M.', expected: { hour: 16, minute: 0 } },
            { text: 'by 4p.m.', expected: { hour: 16, minute: 0 } },
            { text: '0:00', expected: { hour: 0, minute: 0 } },
            { text: 'at quarter past 4', expected: { hour: 4, minute: 15 } },
            { text: 'at quarter to 4', expected: { hour: 3, minute: 45 } },
            { text: 'at half past 4', expected: { hour: 4, minute: 30 } },
            { text: 'at quarter to 4pm', expected: { hour: 15, minute: 45 } },
            { text: 'at 20 past 4', expected: { hour: 4, minute: 20 } },
            { text: 'at 20 minutes past 4', expected: { hour: 4, minute: 20 } },
            { text: 'at 20 min past 4', expected: { hour: 4, minute: 20 } },
            { text: 'at 20 min to 19', expected: { hour: 18, minute: 40 } },
            { text: 'at 20 min to 23', expected: { hour: 22, minute: 40 } },
            { text: 'at 20 min to 12am', expected: { hour: 23, minute: 40 } },
            { text: 'at 20 min to 90', expected: null },
            { text: 'at 20 min to 24', expected: null },
            { text: '8:30am', expected: { hour: 8, minute: 30 } },
            { text: '09:45', expected: { hour: 9, minute: 45 } },
            { text: '9am', expected: { hour: 9, minute: 0 } },
            { text: '7pm', expected: { hour: 19, minute: 0 } },
            { text: '12pm', expected: { hour: 12, minute: 0 } },
            { text: '12am', expected: { hour: 0, minute: 0 } },
            { text: '0:00', expected: { hour: 0, minute: 0 } },
            { text: '00:00', expected: { hour: 0, minute: 0 } },
            { text: '11:00', expected: { hour: 11, minute: 0 } },
            { text: '4PM', expected: { hour: 16, minute: 0 } },
            { text: '1:20pm', expected: { hour: 13, minute: 20 } },
            { text: '2 pm', expected: { hour: 14, minute: 0 } },
            { text: '5:27 p.m.', expected: { hour: 17, minute: 27 } },
            { text: '6:27 A.M.', expected: { hour: 6, minute: 27 } },
            { text: '07:27 PM.', expected: { hour: 19, minute: 27 } },
            { text: '19:27 PM.', expected: { hour: 19, minute: 27 } },
            { text: '2:40a.M.', expected: { hour: 2, minute: 40 } },
            { text: '5a.M.', expected: { hour: 5, minute: 0 } },
        ])('should be able to parse $text', ({ text, expected }) => {
            const results = timeStringToDateObj(text);
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
