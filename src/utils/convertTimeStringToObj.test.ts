import timeStringToDateObj from './convertTimeStringToObj';

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
});
