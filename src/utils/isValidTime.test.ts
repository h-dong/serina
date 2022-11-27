import isValidTime from './isValidTime';

describe('isValidTime()', () => {
    test.each([
        { input: isValidTime(0, 0), output: true },
        { input: isValidTime(12, 38), output: true },
        { input: isValidTime(23, 59), output: true },
        { input: isValidTime(24, 0), output: false },
        { input: isValidTime(25, 0), output: false },
        { input: isValidTime(23, 60), output: false },
        { input: isValidTime(12, 60), output: false },
        { input: isValidTime(7, 80), output: false },
        { input: isValidTime(-7, 30), output: false },
        { input: isValidTime(12, -45), output: false },
    ])('should be able to check $input', ({ input, output }) => {
        expect(input).toBe(output);
    });
});
