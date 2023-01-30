import Day from './day';
import { ParsedMatchSchema } from 'serina.schema';
describe('Day', () => {
    describe('Normal behaviour', () => {
        beforeAll(() => {
            // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
            vi.useFakeTimers();
            vi.setSystemTime(new Date(Date.UTC(2019, 1, 19)));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test('return null if no match', () => {
            const filter = new Day();

            const result = filter.parseText('some random text');
            expect(result).toBeNull();
        });

        test('return correct date object', () => {
            const filter = new Day();
            const result = filter.parseText('test string 17th');
            expect(result).toEqual([
                {
                    dateTime: new Date('2019-03-17T00:00:00.000Z'),
                    matched: '17th',
                    text: 'test string',
                },
            ]);
        });
    });

    describe('Edge Cases (Integration)', () => {
        const text = 'go to library';

        beforeAll(() => {
            // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
            vi.useFakeTimers();
            vi.setSystemTime(new Date(Date.UTC(2019, 2, 19)));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test('should not parse any date before 1st', () => {
            const filter = new Day();
            expect(filter.parseText(`${text} 0th`)).toBe(null);
        });

        test('should not parse a single number', () => {
            const filter = new Day();
            expect(filter.parseText('buy milk 20')).toBe(null);
        });

        test('should not parse any dates beyond 31st', () => {
            const filter = new Day();
            expect(filter.parseText(`${text} 32nd`)).toBe(null);
        });

        test('should skip months until a month that has it', () => {
            // e.g. if 31st is asked during Feb, we should skip to March (next month with that date)
            const date = '31st';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: new Date('2019-03-31T00:00:00.000Z'),
                    text,
                    matched: date,
                },
            ];
            const filter = new Day();
            expect(filter.parseText(`${text} ${date}`)).toEqual(result);
        });
    });
});
