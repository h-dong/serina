import { wrapInBracket } from './wrapInBracket';

describe('wrapInBracket()', () => {
    test.each([
        { value: 'hello', expected: '(hello)' },
        { value: '', expected: '()' },
        { value: ' ', expected: '( )' },
    ])('should parse $value correctly', ({ value, expected }) => {
        const results = wrapInBracket(value);
        expect(results).toEqual(expected);
    });
});
