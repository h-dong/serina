import findMatchingKey from './findMatchingKey';

describe('findMatchingKey()', () => {
    const testObject = {
        first: '1',
        second: '2',
        third: '3',
    };

    test('should return null when no match is found', () => {
        const check = findMatchingKey(testObject, '[4]');
        expect(check).toBe(null);
    });

    test('should return a matching key when a match is found', () => {
        const check = findMatchingKey(testObject, '[3]');
        expect(check).toBe('third');
    });

    test('should return the first match when multiple are found', () => {
        const check = findMatchingKey(testObject, '[1-3]');
        expect(check).toBe('first');
    });
});
