import Day from './day';
import { ParsedMatchSchema } from 'serina.schema';
import { Settings, DateTime } from 'luxon';

describe('Day', () => {
    describe('Normal Usage', () => {
        let mockDay;
        let testData: {
            date: string;
            dateTime: Date;
        }[];

        beforeAll(() => {
            Settings.now = () => new Date(2019, 0, 19).valueOf(); // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
            mockDay = (day: number, month: number, year: number): Date =>
                DateTime.utc().set({ day, month, year }).endOf('day').toJSDate();

            testData = [
                { date: '01st', dateTime: mockDay(1, 2, 2019) },
                { date: '02nd', dateTime: mockDay(2, 2, 2019) },
                { date: '03rd', dateTime: mockDay(3, 2, 2019) },
                { date: '04th', dateTime: mockDay(4, 2, 2019) },
                { date: '05th', dateTime: mockDay(5, 2, 2019) },
                { date: '06th', dateTime: mockDay(6, 2, 2019) },
                { date: '07th', dateTime: mockDay(7, 2, 2019) },
                { date: '08th', dateTime: mockDay(8, 2, 2019) },
                { date: '09th', dateTime: mockDay(9, 2, 2019) },
                { date: '1st', dateTime: mockDay(1, 2, 2019) },
                { date: '2nd', dateTime: mockDay(2, 2, 2019) },
                { date: '3rd', dateTime: mockDay(3, 2, 2019) },
                { date: '4th', dateTime: mockDay(4, 2, 2019) },
                { date: '5th', dateTime: mockDay(5, 2, 2019) },
                { date: '6th', dateTime: mockDay(6, 2, 2019) },
                { date: '7th', dateTime: mockDay(7, 2, 2019) },
                { date: '8th', dateTime: mockDay(8, 2, 2019) },
                { date: '9th', dateTime: mockDay(9, 2, 2019) },
                { date: '10th', dateTime: mockDay(10, 2, 2019) },
                { date: '11th', dateTime: mockDay(11, 2, 2019) },
                { date: '12th', dateTime: mockDay(12, 2, 2019) },
                { date: '13th', dateTime: mockDay(13, 2, 2019) },
                { date: '14th', dateTime: mockDay(14, 2, 2019) },
                { date: '15th', dateTime: mockDay(15, 2, 2019) },
                { date: '16th', dateTime: mockDay(16, 2, 2019) },
                { date: '17th', dateTime: mockDay(17, 2, 2019) },
                { date: '18th', dateTime: mockDay(18, 2, 2019) },
                { date: '19th', dateTime: mockDay(19, 1, 2019) },
                { date: '20th', dateTime: mockDay(20, 1, 2019) },
                { date: '21th', dateTime: mockDay(21, 1, 2019) },
                { date: '22th', dateTime: mockDay(22, 1, 2019) },
                { date: '23th', dateTime: mockDay(23, 1, 2019) },
                { date: '24th', dateTime: mockDay(24, 1, 2019) },
                { date: '25th', dateTime: mockDay(25, 1, 2019) },
                { date: '26th', dateTime: mockDay(26, 1, 2019) },
                { date: '27th', dateTime: mockDay(27, 1, 2019) },
                { date: '28th', dateTime: mockDay(28, 1, 2019) },
                { date: '29th', dateTime: mockDay(29, 1, 2019) },
                { date: '30th', dateTime: mockDay(30, 1, 2019) },
                { date: '31th', dateTime: mockDay(31, 1, 2019) },
            ];
        });

        test('without filler word', () => {
            const text = 'go to library';

            testData.forEach(testCase => {
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: testCase.dateTime,
                        text,
                        matched: testCase.date,
                    },
                ];
                expect(Day.parseText(`${text} ${testCase.date}`)).toEqual(result);
            });
        });

        test('with "on" filler word', () => {
            const text = 'go to library';

            testData.forEach(testCase => {
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: testCase.dateTime,
                        text,
                        matched: `on ${testCase.date}`,
                    },
                ];
                expect(Day.parseText(`${text} on ${testCase.date}`)).toEqual(result);
            });
        });

        test('with "on the" filler word', () => {
            const text = 'go to library';

            testData.forEach(testCase => {
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: testCase.dateTime,
                        text,
                        matched: `on the ${testCase.date}`,
                    },
                ];
                expect(Day.parseText(`${text} on the ${testCase.date}`)).toEqual(result);
            });
        });

        test('should return correct case for matched string', () => {
            const text = 'Hand in paper 5th';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockDay(5, 2, 2019),
                    text: 'Hand in paper',
                    matched: '5th',
                },
            ];

            expect(Day.parseText(text)).toEqual(result);
        });

        describe('Edge Cases', () => {
            const text = 'go to library';

            beforeAll(() => {
                // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
                Settings.now = () => new Date(2019, 2, 19).valueOf();
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

            test('should skip month until a month that has it', () => {
                // e.g. if 31st is asked during Feb, we should skip to March (next month with that date)
                const date = '31st';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDay(31, 3, 2019),
                        text,
                        matched: date,
                    },
                ];
                expect(Day.parseText(`${text} ${date}`)).toEqual(result);
            });
        });
    });
});
