import remove from './remove';

describe('remove()', () => {
    let text: string;
    let pattern: string;

    beforeEach(() => {
        text = 'this is my test string';
        pattern = 'test';
    });

    test('should remove pattern from text', () => {
        const check = remove(text, pattern);
        expect(check).toBe('this is my string');
    });

    test('should be case insensitive', () => {
        text = 'this is my TEST string';
        const check = remove(text, pattern);
        expect(check).toBe('this is my string');
    });

    test('should only match whole words', () => {
        text = 'this is my teststring';
        const check = remove(text, pattern);
        expect(check).toBe('this is my teststring');
    });

    test('should be able to find partial matches', () => {
        text = 'this is my teststring';
        const check = remove(text, pattern, false);
        expect(check).toBe('this is my string');
    });
});
