import isValidTime from './isValidTime';

describe('isValidTime()', () => {
    test('should allow 00:00', () => {
        expect(isValidTime(0, 0)).toBe(true);
    });

    test('should allow 12:38', () => {
        expect(isValidTime(12, 38)).toBe(true);
    });

    test('should allow 23:59', () => {
        expect(isValidTime(23, 59)).toBe(true);
    });

    test('should not allow 24:00', () => {
        expect(isValidTime(24, 0)).toBe(false);
    });

    test('should not allow 25:00', () => {
        expect(isValidTime(25, 0)).toBe(false);
    });

    test('should not allow 23:60', () => {
        expect(isValidTime(25, 0)).toBe(false);
    });

    test('should not allow 12:60', () => {
        expect(isValidTime(12, 60)).toBe(false);
    });

    test('should not allow 07:80', () => {
        expect(isValidTime(7, 80)).toBe(false);
    });

    test('should not allow -07:30', () => {
        expect(isValidTime(-7, 30)).toBe(false);
    });

    test('should not allow 12:-45', () => {
        expect(isValidTime(12, -45)).toBe(false);
    });
});
