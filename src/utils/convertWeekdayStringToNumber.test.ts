import { Settings } from 'luxon';
import convertWeekdayStringToNumber from './convertWeekdayStringToNumber';

// Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
Settings.now = () => new Date(2019, 0, 19).valueOf();

describe('convertWeekdayStringToNumber', () => {
    afterAll(() => {
        // Restore Mock
        Settings.now = () => Date.now();
    });

    test.each`
        text           | pastWeekday | expected
        ${'monday'}    | ${false}    | ${8}
        ${'tuesday'}   | ${false}    | ${9}
        ${'wednesday'} | ${false}    | ${10}
        ${'thursday'}  | ${false}    | ${11}
        ${'friday'}    | ${false}    | ${12}
        ${'saturday'}  | ${false}    | ${13}
        ${'sunday'}    | ${false}    | ${7}
        ${'mon'}       | ${false}    | ${8}
        ${'tue'}       | ${false}    | ${9}
        ${'wed'}       | ${false}    | ${10}
        ${'thu'}       | ${false}    | ${11}
        ${'fri'}       | ${false}    | ${12}
        ${'sat'}       | ${false}    | ${13}
        ${'sun'}       | ${false}    | ${7}
        ${'monday'}    | ${true}    | ${1}
        ${'tuesday'}   | ${true}    | ${2}
        ${'wednesday'} | ${true}    | ${3}
        ${'thursday'}  | ${true}    | ${4}
        ${'friday'}    | ${true}    | ${5}
        ${'saturday'}  | ${true}    | ${6}
        ${'sunday'}    | ${true}    | ${0}
        ${'mon'}       | ${true}    | ${1}
        ${'tue'}       | ${true}    | ${2}
        ${'wed'}       | ${true}    | ${3}
        ${'thu'}       | ${true}    | ${4}
        ${'fri'}       | ${true}    | ${5}
        ${'sat'}       | ${true}    | ${6}
        ${'sun'}       | ${true}    | ${0}
    `('should be able to parse $filter', ({ text, pastWeekday, expected }) => {
        const results = convertWeekdayStringToNumber(text, pastWeekday);
        expect(results).toEqual(expected);
    });
});
