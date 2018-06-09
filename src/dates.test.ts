import { DateTime } from 'luxon';
import serina from './serina';

describe.skip('serina Tests', () => {
    describe('Relative To Today', () => {
        test('should return user input string as original element', () => {
            expect(serina('hello world').original).toBe('hello world');
        });

        test('should return correct date for tomorrow', () => {
            expect(serina('buy milk tomorrow')).toEqual({
                original: 'buy milk tomorrow',
                text: 'buy milk',
                isValid: true,
                dateTime: DateTime.local()
                    .plus({ days: 1 })
                    .startOf('second')
                    .toJSDate()
            });
        });

        test('should return correct date for day after', () => {
            expect(serina('buy milk day after')).toEqual({
                original: 'buy milk day after',
                text: 'buy milk',
                isValid: true,
                dateTime: DateTime.local()
                    .plus({ days: 2 })
                    .startOf('second')
                    .toJSDate()
            });
        });

        test('should return correct date for day after tomorrow', () => {
            expect(serina('buy milk day after tomorrow')).toEqual({
                original: 'buy milk day after tomorrow',
                text: 'buy milk tomorrow',
                isValid: true,
                dateTime: DateTime.local()
                    .plus({ days: 2 })
                    .startOf('second')
                    .toJSDate()
            });
        });

        test('should return correct date for today', () => {
            expect(serina('buy milk today')).toEqual({
                original: 'buy milk today',
                text: 'buy milk',
                isValid: true,
                dateTime: DateTime.local()
                    .startOf('second')
                    .toJSDate()
            });
        });

        test.skip('should return correct date for end of day', () => {
            expect(serina('buy milk end of day')).toEqual({
                original: 'buy milk end of day',
                text: 'buy milk',
                isValid: true,
                dateTime: DateTime.local()
                    .startOf('second')
                    .toJSDate()
            });
        });

        test.skip('should return correct date for end of day today', () => {
            expect(serina('buy milk end of day today').dateTime).toBe('hello world');
        });

        test('should return correct date for yesterday', () => {
            expect(serina('buy milk yesterday')).toEqual({
                original: 'buy milk yesterday',
                text: 'buy milk',
                isValid: true,
                dateTime: DateTime.local()
                    .minus({ days: 1 })
                    .startOf('second')
                    .toJSDate()
            });
        });

        test('should return correct date for day before', () => {
            expect(serina('buy milk day before')).toEqual({
                original: 'buy milk day before',
                text: 'buy milk',
                isValid: true,
                dateTime: DateTime.local()
                    .minus({ days: 2 })
                    .startOf('second')
                    .toJSDate()
            });
        });

        test('should return correct date for day before yesterday', () => {
            expect(serina('buy milk day before yesterday')).toEqual({
                original: 'buy milk day before yesterday',
                text: 'buy milk yesterday',
                isValid: true,
                dateTime: DateTime.local()
                    .minus({ days: 2 })
                    .startOf('second')
                    .toJSDate()
            });
        });
    });

    describe.skip('Future Days', () => {
        test('should return correct date for end of the week', () => {
            expect(serina('buy milk end of the week').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the month', () => {
            expect(serina('buy milk end of the month').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the quarter', () => {
            expect(serina('buy milk end of the quarter').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the season', () => {
            expect(serina('buy milk end of the season').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the year', () => {
            expect(serina('buy milk end of the year').dateTime).toBe('hello world');
        });

        test('should return correct date for next week', () => {
            expect(serina('buy milk next week').dateTime).toBe('hello world');
        });

        test('should return correct date for next month', () => {
            expect(serina('buy milk next month').dateTime).toBe('hello world');
        });

        test('should return correct date for next quarter', () => {
            expect(serina('buy milk next quarter').dateTime).toBe('hello world');
        });

        test('should return correct date for next season', () => {
            expect(serina('buy milk next season').dateTime).toBe('hello world');
        });

        test('should return correct date for next year', () => {
            expect(serina('buy milk next year').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the week', () => {
            expect(serina('buy milk end of the week').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the month', () => {
            expect(serina('buy milk end of the month').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the quarter', () => {
            expect(serina('buy milk end of the quarter').dateTime).toBe('hello world');
        });

        test('should return correct date for end of the year', () => {
            expect(serina('buy milk end of the year').dateTime).toBe('hello world');
        });
    });
});
