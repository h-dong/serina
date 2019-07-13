import trimWhiteSpaces from './trimWhiteSpaces';

describe('trimWhiteSpaces()', () => {
    let text: string;

    beforeEach(() => {
        text = 'this is my string';
    });

    test('should not trip anything extra', () => {
        const check = trimWhiteSpaces(text);
        expect(check).toBe('this is my string');
    });

    test('should trip white space in between the string', () => {
        text = 'this is my  string';
        const check = trimWhiteSpaces(text);
        expect(check).toBe('this is my string');
    });

    test('should trip white space at the start of the string', () => {
        text = '  this is my string';
        const check = trimWhiteSpaces(text);
        expect(check).toBe('this is my string');
    });

    test('should trip white space at the end of the string', () => {
        text = 'this is my string  ';
        const check = trimWhiteSpaces(text);
        expect(check).toBe('this is my string');
    });
});
