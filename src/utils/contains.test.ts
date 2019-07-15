import contains from './contains';

describe('contains()', () => {
    let text: string;
    let pattern: string;

    beforeEach(() => {
        text = 'this is my test string';
        pattern = 'test';
    });

    test('should return true when match is found', () => {
        const check = contains(text, pattern);
        expect(check).toBe(true);
    });

    test('should be case insensitive', () => {
        text = 'this is my TEST string';
        const check = contains(text, pattern);
        expect(check).toBe(true);
    });

    test('should only match whole words', () => {
        text = 'this is my teststring';
        const check = contains(text, pattern);
        expect(check).toBe(false);
    });

    test('should be able to find partial matches', () => {
        text = 'this is my teststring';
        const check = contains(text, pattern, false);
        expect(check).toBe(true);
    });
});
