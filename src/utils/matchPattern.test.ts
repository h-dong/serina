import matchPattern from './matchPattern';

describe('matchPattern()', () => {
    let text: string;
    let pattern: string;

    beforeEach(() => {
        text = 'this is my test string';
        pattern = 'test';
    });

    test('should return true when match is found', () => {
        const check = matchPattern(text, pattern);
        expect(check).toEqual([pattern]);
    });

    test('should be case insensitive', () => {
        text = 'this is my TEST string';
        const check = matchPattern(text, pattern);
        expect(check).toEqual([pattern]);
    });

    test('should only match whole words', () => {
        text = 'this is my teststring';
        const check = matchPattern(text, pattern);
        expect(check).toEqual(null);
    });

    test('should be able to partial match', () => {
        text = 'this is my teststring';
        const check = matchPattern(text, pattern, false);
        expect(check).toEqual([pattern]);
    });
});
