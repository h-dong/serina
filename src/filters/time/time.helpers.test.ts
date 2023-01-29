import { timeStringToDateObj } from './time.helpers';

describe('Time Helpers', () => {
    describe('convertTimeStringToObj()', () => {
        test.each([
            { filter: '25pm', output: null },
            { filter: 'at 8:30am', output: { hour: 8, minute: 30 } },
            { filter: '09:45', output: { hour: 9, minute: 45 } },
            { filter: '24:45', output: null },
            { filter: '9am', output: { hour: 9, minute: 0 } },
            { filter: 'by 7pm', output: { hour: 19, minute: 0 } },
            { filter: '12pm', output: { hour: 12, minute: 0 } },
            { filter: '12am', output: { hour: 0, minute: 0 } },
            { filter: '11:00', output: { hour: 11, minute: 0 } },
            { filter: 'at 4PM', output: { hour: 16, minute: 0 } },
            { filter: 'at 2 pm', output: { hour: 14, minute: 0 } },
            { filter: 'at 4 p.M.', output: { hour: 16, minute: 0 } },
            { filter: 'by 4p.m.', output: { hour: 16, minute: 0 } },
            { filter: '0:00', output: { hour: 0, minute: 0 } },
            { filter: 'at quarter past 4', output: { hour: 4, minute: 15 } },
            { filter: 'at quarter to 4', output: { hour: 3, minute: 45 } },
            { filter: 'at half past 4', output: { hour: 4, minute: 30 } },
            { filter: 'at quarter to 4pm', output: { hour: 15, minute: 45 } },
            { filter: 'at 20 past 4', output: { hour: 4, minute: 20 } },
            { filter: 'at 20 minutes past 4', output: { hour: 4, minute: 20 } },
            { filter: 'at 20 min past 4', output: { hour: 4, minute: 20 } },
            { filter: 'at 20 min to 19', output: { hour: 18, minute: 40 } },
            { filter: 'at 20 min to 23', output: { hour: 22, minute: 40 } },
            { filter: 'at 20 min to 12am', output: { hour: 23, minute: 40 } },
            { filter: 'at 20 min to 90', output: null },
            { filter: 'at 20 min to 24', output: null },
            { filter: '8:30am', output: { hour: 8, minute: 30 } },
            { filter: '09:45', output: { hour: 9, minute: 45 } },
            { filter: '9am', output: { hour: 9, minute: 0 } },
            { filter: '7pm', output: { hour: 19, minute: 0 } },
            { filter: '12pm', output: { hour: 12, minute: 0 } },
            { filter: '12am', output: { hour: 0, minute: 0 } },
            { filter: '0:00', output: { hour: 0, minute: 0 } },
            { filter: '00:00', output: { hour: 0, minute: 0 } },
            { filter: '11:00', output: { hour: 11, minute: 0 } },
            { filter: '4PM', output: { hour: 16, minute: 0 } },
            { filter: '1:20pm', output: { hour: 13, minute: 20 } },
            { filter: '2 pm', output: { hour: 14, minute: 0 } },
            { filter: '5:27 p.m.', output: { hour: 17, minute: 27 } },
            { filter: '6:27 A.M.', output: { hour: 6, minute: 27 } },
            { filter: '07:27 PM.', output: { hour: 19, minute: 27 } },
            { filter: '19:27 PM.', output: { hour: 19, minute: 27 } },
            { filter: '2:40a.M.', output: { hour: 2, minute: 40 } },
            { filter: '5a.M.', output: { hour: 5, minute: 0 } },
        ])('should be able to parse $filter', ({ filter, output }) => {
            const results = timeStringToDateObj(filter);
            expect(results).toEqual(output);
        });

        // TODO: decide what to do about these test cases
        // test.each([
        //     { filter: 'at 8:30am', dateTime: mockTime(8, 30) },
        //     { filter: '09:45', dateTime: mockTime(9, 45) },
        //     { filter: '24:45', dateTime: null },
        //     { filter: '25pm', dateTime: null },
        //     { filter: '9am', dateTime: mockTime(9, 0) },
        //     { filter: 'by 7pm', dateTime: mockTime(19, 0) },
        //     { filter: '12pm', dateTime: mockTime(12, 0) },
        //     { filter: '12am', dateTime: mockTime(0, 0) },
        //     { filter: '0:00', dateTime: mockTime(0, 0) },
        //     { filter: '09:61', dateTime: null },
        //     { filter: '11:00', dateTime: mockTime(11, 0) },
        //     { filter: 'at 4PM', dateTime: mockTime(16, 0) },
        //     { filter: 'at 2 pm', dateTime: mockTime(14, 0) },
        //     { filter: 'at 4 p.M.', dateTime: mockTime(16, 0) },
        //     { filter: 'by 4p.m.', dateTime: mockTime(16, 0) },
        //     { filter: 'at quarter to 4', dateTime: mockTime(3, 45) },
        //     { filter: 'at quarter past 4', dateTime: mockTime(4, 15) },
        //     { filter: 'at quarter to 4pm', dateTime: mockTime(15, 45) },
        //     { filter: 'at half past 4', dateTime: mockTime(4, 30) },
        //     { filter: 'at 20 past 4', dateTime: mockTime(4, 20) },
        //     { filter: 'at 20 minutes past 4', dateTime: mockTime(4, 20) },
        //     { filter: 'at 20 min past 4', dateTime: mockTime(4, 20) },
        //     { filter: 'at 20 min to 12am', dateTime: mockTime(23, 40) },
        //     { filter: 'at 20 min to 90', dateTime: null },
        //     { filter: 'at 20 min to 23', dateTime: mockTime(22, 40) },
        //     { filter: 'at 20 min to 24', dateTime: null },
        //     { filter: 'at 20 min to 19', dateTime: mockTime(18, 40) },
        // ])('should be able to parse $filter', ({ filter, dateTime }) => {
        //     const text = 'go to work';
        //     const results = Time.parseText(`${text} ${filter}`);
        //     const output = [{ dateTime, matched: filter, text }];
        //     expect(results).toEqual(output);
        // });

        // test('should return correct case for matched string', () => {
        //     const text = 'Hand in paper 11:00';
        //     const result: ParsedMatchSchema[] = [
        //         {
        //             dateTime: mockTime(11, 0),
        //             text: 'Hand in paper',
        //             matched: '11:00',
        //         },
        //     ];

        //     expect(Time.parseText(text)).toEqual(result);
        // });
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

    // TODO: remove this unused function tests
    // describe('isValidTime()', () => {
    //     test.each([
    //         { input: isValidTime(0, 0), output: true },
    //         { input: isValidTime(12, 38), output: true },
    //         { input: isValidTime(23, 59), output: true },
    //         { input: isValidTime(24, 0), output: false },
    //         { input: isValidTime(25, 0), output: false },
    //         { input: isValidTime(23, 60), output: false },
    //         { input: isValidTime(12, 60), output: false },
    //         { input: isValidTime(7, 80), output: false },
    //         { input: isValidTime(-7, 30), output: false },
    //         { input: isValidTime(12, -45), output: false },
    //     ])('should be able to check $input', ({ input, output }) => {
    //         expect(input).toBe(output);
    //     });
    // });
});
