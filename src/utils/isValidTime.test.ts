import isValidTime from './isValidTime';

describe('isValidTime()', () => {
    test.each`
        input                   | output
        ${isValidTime(0, 0)}    | ${true}
        ${isValidTime(12, 38)}  | ${true}
        ${isValidTime(23, 59)}  | ${true}
        ${isValidTime(24, 0)}   | ${false}
        ${isValidTime(25, 0)}   | ${false}
        ${isValidTime(23, 60)}  | ${false}
        ${isValidTime(12, 60)}  | ${false}
        ${isValidTime(7, 80)}   | ${false}
        ${isValidTime(-7, 30)}  | ${false}
        ${isValidTime(12, -45)} | ${false}
    `('should be able to check $input', ({ input, output }) => {
        expect(input).toBe(output);
    });
});
