import { getValidMatch, weekdayAndTimeToDateObj } from './weekdayAndTime.helpers';

describe('Weekday And Time Helpers', () => {
    describe('getValidMatch()', () => {
        test('should return null if no match', () => {
            const text = 'hello world';
            const pattern = 'no match';
            const result = getValidMatch(text, pattern);
            expect(result).toBeNull();
        });

        test('should return the first match if there is one match', () => {
            const text = 'one match';
            const pattern = 'match';
            const result = getValidMatch(text, pattern);
            expect(result).toBe('match');
        });

        test('should return the first match if there are multiple matches', () => {
            const text = 'match matches match';
            const pattern = 'match';
            const result = getValidMatch(text, pattern);
            expect(result).toBe('match');
        });
    });

    describe('weekdayAndTimeToDateObj()', () => {
        test('should return a date object if there is one match', () => {
            const matchingText = '2am monday';
            const result = weekdayAndTimeToDateObj(matchingText);
            expect(result).toBeInstanceOf(Date);
        });

        test('should return a date object if there are multiple matches', () => {
            const matchingText = '2am monday 3pm friday';
            const result = weekdayAndTimeToDateObj(matchingText);
            expect(result).toBeInstanceOf(Date);
        });
    });
});
