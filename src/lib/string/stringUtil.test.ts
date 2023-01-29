import { dayLite } from 'lib/date/dayLite';
import { contains, matchPattern, parseMatches, remove, trimWhiteSpaces } from './stringUtil';

describe('String Utils', () => {
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

    describe('parseMatches()', () => {
        let text: string;
        let pattern: string;
        let dateTimeObj: Date;

        beforeEach(() => {
            text = 'this is my test string';
            pattern = 'test';
            dateTimeObj = dayLite().toDate();
        });

        test('should be able to match pattern in middle of text', () => {
            const parsed = parseMatches(text, pattern, dateTimeObj);
            expect(parsed).toEqual({
                text: text.replace(` ${pattern}`, ''),
                dateTime: dateTimeObj,
                matched: pattern,
            });
        });

        test('should be able to match pattern at start of text', () => {
            text = 'test this other string';
            const parsed = parseMatches(text, pattern, dateTimeObj);
            expect(parsed).toEqual({
                text: text.replace(`${pattern} `, ''),
                dateTime: dateTimeObj,
                matched: pattern,
            });
        });

        test('should be able to match pattern at end of text', () => {
            text = 'and one more string test';
            const parsed = parseMatches(text, pattern, dateTimeObj);
            expect(parsed).toEqual({
                text: text.replace(` ${pattern}`, ''),
                dateTime: dateTimeObj,
                matched: pattern,
            });
        });

        // TODO: fix this test
        test('should be able to handle identical matches', () => {
            text = 'test this string with test appearing twice';
            const parsed = parseMatches(text, pattern, dateTimeObj);
            expect(parsed).toEqual({
                text: text.replace(` ${pattern}`, ''),
                dateTime: dateTimeObj,
                matched: ' this string with test appearing twice',
            });
            expect(true).toBe(false);
        });
    });

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
});
