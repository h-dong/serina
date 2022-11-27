import parseMatches from './parseMatches';
import { dayLite } from 'lib/date/dayLite';

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
});
