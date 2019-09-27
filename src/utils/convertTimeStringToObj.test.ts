import convertTimeStringToObj from './convertTimeStringToObj';

describe('convertTimeStringToObj()', () => {
    const testCases = [
        { case: '8:30am', result: { hour: 8, minute: 30 } },
        { case: '09:45', result: { hour: 9, minute: 45 } },
        { case: '9am', result: { hour: 9, minute: 0 } },
        { case: '7pm', result: { hour: 19, minute: 0 } },
        { case: '12pm', result: { hour: 12, minute: 0 } },
        { case: '12am', result: { hour: 0, minute: 0 } },
        { case: '0:00', result: { hour: 0, minute: 0 } },
        { case: '00:00', result: { hour: 0, minute: 0 } },
        { case: '11:00', result: { hour: 11, minute: 0 } },
        { case: '4PM', result: { hour: 16, minute: 0 } },
        { case: '1:20pm', result: { hour: 13, minute: 20 } },
        { case: '2 pm', result: { hour: 14, minute: 0 } },
        { case: '5:27 p.m.', result: { hour: 17, minute: 27 } },
        { case: '6:27 A.M.', result: { hour: 6, minute: 27 } },
        { case: '07:27 PM.', result: { hour: 19, minute: 27 } },
        { case: '19:27 PM.', result: { hour: 19, minute: 27 } },
        { case: '2:40a.M.', result: { hour: 2, minute: 40 } },
        { case: '5a.M.', result: { hour: 5, minute: 0 } },
    ];

    test('test this new format', () => {
        testCases.forEach(item => {
            const parsed = convertTimeStringToObj(item.case);
            expect(parsed).toEqual(item.result);
        });
    });
});
