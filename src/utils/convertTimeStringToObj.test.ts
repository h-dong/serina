import convertTimeStringToObj from './convertTimeStringToObj';

describe('convertTimeStringToObj()', () => {
    test.each`
        filter                    | expected
        ${'25pm'}                 | ${null}
        ${'at 8:30am'}            | ${{ hour: 8, minute: 30 }}
        ${'09:45'}                | ${{ hour: 9, minute: 45 }}
        ${'24:45'}                | ${null}
        ${'9am'}                  | ${{ hour: 9, minute: 0 }}
        ${'by 7pm'}               | ${{ hour: 19, minute: 0 }}
        ${'12pm'}                 | ${{ hour: 12, minute: 0 }}
        ${'12am'}                 | ${{ hour: 0, minute: 0 }}
        ${'11:00'}                | ${{ hour: 11, minute: 0 }}
        ${'at 4PM'}               | ${{ hour: 16, minute: 0 }}
        ${'at 2 pm'}              | ${{ hour: 14, minute: 0 }}
        ${'at 4 p.M.'}            | ${{ hour: 16, minute: 0 }}
        ${'by 4p.m.'}             | ${{ hour: 16, minute: 0 }}
        ${'0:00'}                 | ${{ hour: 0, minute: 0 }}
        ${'at quarter past 4'}    | ${{ hour: 4, minute: 15 }}
        ${'at quarter to 4'}      | ${{ hour: 3, minute: 45 }}
        ${'at half past 4'}       | ${{ hour: 4, minute: 30 }}
        ${'at quarter to 4pm'}    | ${{ hour: 15, minute: 45 }}
        ${'at 20 past 4'}         | ${{ hour: 4, minute: 20 }}
        ${'at 20 minutes past 4'} | ${{ hour: 4, minute: 20 }}
        ${'at 20 min past 4'}     | ${{ hour: 4, minute: 20 }}
        ${'at 20 min to 19'}      | ${{ hour: 18, minute: 40 }}
        ${'at 20 min to 23'}      | ${{ hour: 22, minute: 40 }}
        ${'at 20 min to 12am'}    | ${{ hour: 23, minute: 40 }}
        ${'at 20 min to 90'}      | ${null}
        ${'at 20 min to 24'}      | ${null}
        ${'8:30am'}               | ${{ hour: 8, minute: 30 }}
        ${'09:45'}                | ${{ hour: 9, minute: 45 }}
        ${'9am'}                  | ${{ hour: 9, minute: 0 }}
        ${'7pm'}                  | ${{ hour: 19, minute: 0 }}
        ${'12pm'}                 | ${{ hour: 12, minute: 0 }}
        ${'12am'}                 | ${{ hour: 0, minute: 0 }}
        ${'0:00'}                 | ${{ hour: 0, minute: 0 }}
        ${'00:00'}                | ${{ hour: 0, minute: 0 }}
        ${'11:00'}                | ${{ hour: 11, minute: 0 }}
        ${'4PM'}                  | ${{ hour: 16, minute: 0 }}
        ${'1:20pm'}               | ${{ hour: 13, minute: 20 }}
        ${'2 pm'}                 | ${{ hour: 14, minute: 0 }}
        ${'5:27 p.m.'}            | ${{ hour: 17, minute: 27 }}
        ${'6:27 A.M.'}            | ${{ hour: 6, minute: 27 }}
        ${'07:27 PM.'}            | ${{ hour: 19, minute: 27 }}
        ${'19:27 PM.'}            | ${{ hour: 19, minute: 27 }}
        ${'2:40a.M.'}             | ${{ hour: 2, minute: 40 }}
        ${'5a.M.'}                | ${{ hour: 5, minute: 0 }}
    `('should be able to parse $filter', ({ filter, expected }) => {
        const results = convertTimeStringToObj(filter);
        expect(results).toEqual(expected);
    });

    // const testCases = [
    // ];

    // test('test this new format', () => {
    //     testCases.forEach(item => {
    //         const parsed = convertTimeStringToObj(item.case);
    //         expect(parsed).toEqual(item.result);
    //     });
    // });
});
