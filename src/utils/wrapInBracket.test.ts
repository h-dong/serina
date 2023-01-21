import { wrapInBracket } from './wrapInBracket';

describe('wrapInBracket()', () => {
    test.each([
        { value: 'hello', output: '(hello)' },
        { value: '', output: '()' },
        { value: ' ', output: '( )' },
    ])('should parse $value correctly', ({ value, output }) => {
        const results = wrapInBracket(value);
        expect(results).toEqual(output);
    });
});
