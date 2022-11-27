import Day from './day';
import { ParsedMatchSchema } from 'serina.schema';

describe('Day', () => {
    // Mock Date Time to Saturday, 19 January 2018 18:06:18 GMT+00:00
    const mockDate = new Date(Date.UTC(2018, 0, 19));

    const mockDay = (day: number, month: number, year: number): Date =>
        new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    describe('Normal Usage', () => {
        const testData: {
            date: string;
            dateTime: Date;
        }[] = [
            { date: '01st', dateTime: mockDay(1, 1, 2018) },
            { date: '02nd', dateTime: mockDay(2, 1, 2018) },
            { date: '03rd', dateTime: mockDay(3, 1, 2018) },
            { date: '04th', dateTime: mockDay(4, 1, 2018) },
            { date: '05th', dateTime: mockDay(5, 1, 2018) },
            { date: '06th', dateTime: mockDay(6, 1, 2018) },
            { date: '07th', dateTime: mockDay(7, 1, 2018) },
            { date: '08th', dateTime: mockDay(8, 1, 2018) },
            { date: '09th', dateTime: mockDay(9, 1, 2018) },
            { date: '1st', dateTime: mockDay(1, 1, 2018) },
            { date: '2nd', dateTime: mockDay(2, 1, 2018) },
            { date: '3rd', dateTime: mockDay(3, 1, 2018) },
            { date: '4th', dateTime: mockDay(4, 1, 2018) },
            { date: '5th', dateTime: mockDay(5, 1, 2018) },
            { date: '6th', dateTime: mockDay(6, 1, 2018) },
            { date: '7th', dateTime: mockDay(7, 1, 2018) },
            { date: '8th', dateTime: mockDay(8, 1, 2018) },
            { date: '9th', dateTime: mockDay(9, 1, 2018) },
            { date: '10th', dateTime: mockDay(10, 1, 2018) },
            { date: '11th', dateTime: mockDay(11, 1, 2018) },
            { date: '12th', dateTime: mockDay(12, 1, 2018) },
            { date: '13th', dateTime: mockDay(13, 1, 2018) },
            { date: '14th', dateTime: mockDay(14, 1, 2018) },
            { date: '15th', dateTime: mockDay(15, 1, 2018) },
            { date: '16th', dateTime: mockDay(16, 1, 2018) },
            { date: '17th', dateTime: mockDay(17, 1, 2018) },
            { date: '18th', dateTime: mockDay(18, 1, 2018) },
            { date: '19th', dateTime: mockDay(19, 0, 2018) },
            { date: '20th', dateTime: mockDay(20, 0, 2018) },
            { date: '21th', dateTime: mockDay(21, 0, 2018) },
            { date: '22th', dateTime: mockDay(22, 0, 2018) },
            { date: '23th', dateTime: mockDay(23, 0, 2018) },
            { date: '24th', dateTime: mockDay(24, 0, 2018) },
            { date: '25th', dateTime: mockDay(25, 0, 2018) },
            { date: '26th', dateTime: mockDay(26, 0, 2018) },
            { date: '27th', dateTime: mockDay(27, 0, 2018) },
            { date: '28th', dateTime: mockDay(28, 0, 2018) },
            { date: '29th', dateTime: mockDay(29, 0, 2018) },
            { date: '30th', dateTime: mockDay(30, 0, 2018) },
            { date: '31th', dateTime: mockDay(31, 0, 2018) },
        ];

        beforeAll(() => {
            vi.useFakeTimers();
            vi.setSystemTime(mockDate);
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each(testData)('without filler word $date', ({ date, dateTime }) => {
            const text = 'go to library';

            const result: ParsedMatchSchema[] = [
                {
                    dateTime,
                    text,
                    matched: date,
                },
            ];

            expect(Day.parseText(`${text} ${date}`)).toEqual(result);
        });

        test.each(testData)('with "on" filler word $date', ({ date, dateTime }) => {
            const text = 'go to library';

            const result: ParsedMatchSchema[] = [
                {
                    dateTime: dateTime,
                    text,
                    matched: `on ${date}`,
                },
            ];
            expect(Day.parseText(`${text} on ${date}`)).toEqual(result);
        });

        test.each(testData)('with "on the" filler word $date', ({ date, dateTime }) => {
            const text = 'go to library';

            const result: ParsedMatchSchema[] = [
                {
                    dateTime: dateTime,
                    text,
                    matched: `on ${date}`,
                },
            ];
            expect(Day.parseText(`${text} on ${date}`)).toEqual(result);
        });

        test('should return correct case for matched string', () => {
            const text = 'Hand in paper 5th';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockDay(5, 1, 2018),
                    text: 'Hand in paper',
                    matched: '5th',
                },
            ];

            expect(Day.parseText(text)).toEqual(result);
        });
    });

    describe('Edge Cases', () => {
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
            expect(Day.parseText(`${text} 0th`)).toBe(null);
        });

        test('should not parse a single number', () => {
            expect(Day.parseText('buy milk 20')).toBe(null);
        });

        test('should not parse any dates beyond 31st', () => {
            expect(Day.parseText(`${text} 32nd`)).toBe(null);
        });

        test('should skip months until a month that has it', () => {
            // e.g. if 31st is asked during Feb, we should skip to March (next month with that date)
            const date = '31st';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockDay(31, 2, 2019),
                    text,
                    matched: date,
                },
            ];
            expect(Day.parseText(`${text} ${date}`)).toEqual(result);
        });
    });
});
