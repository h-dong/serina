import Month from './month';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLight } from 'lib/date/dayLight';

describe('Month', () => {
    const mockDate = (month, year) => {
        return dayLight().set({ month, year }).startOf('month').endOf('day').toDate();
    };

    const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    jest.useFakeTimers().setSystemTime(new Date('2019-06-29T15:48:12'));

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('parseText()', () => {
        test('should return correct case for matched string', () => {
            const text = 'Hand in paper in march';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockDate(3, 2020),
                    text: 'Hand in paper',
                    matched: 'in march',
                },
            ];

            expect(Month.parseText(text)).toEqual(result);
        });

        describe('if no past or future words are used', () => {
            test('should return date in next year if the month is before the current month', () => {
                const shortMonthsBeforeJune = shortMonths.filter((_, index) => index < 5);
                shortMonthsBeforeJune.forEach((month, index) => {
                    const text = `visit athens in ${month}`;
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(index + 1, 2020),
                            text: 'visit athens',
                            matched: `in ${month}`,
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                });
            });

            test('should return date in the current year if the month is current month or later', () => {
                const shortMonthsAfterJune = shortMonths.filter((_, index) => index >= 5);
                shortMonthsAfterJune.forEach((month, index) => {
                    const text = `visit athens in ${month}`;
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(index + 6, 2019),
                            text: 'visit athens',
                            matched: `in ${month}`,
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                });
            });

            test('should parse the month regardless of capital letters', () => {
                const text = 'visit athens in DEceMBeR';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDate(12, 2019),
                        text: 'visit athens',
                        matched: 'in DEceMBeR',
                    },
                ];
                expect(Month.parseText(text)).toEqual(result);
            });

            test('should parse multiple matches', () => {
                const text = 'visit athens in September or October';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDate(9, 2019),
                        text: 'visit athens or October',
                        matched: 'in September',
                    },
                    {
                        dateTime: mockDate(10, 2019),
                        text: 'visit athens in September or',
                        matched: 'October',
                    },
                ];
                expect(Month.parseText(text)).toEqual(result);
            });
        });
        describe('if a past word is used', () => {
            test('should return date in the same year if the month is before the current month', () => {
                const shortMonthsBeforeJune = shortMonths.filter((_, index) => index < 5);
                shortMonthsBeforeJune.forEach((month, index) => {
                    const text = `visit athens last ${month}`;
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(index + 1, 2019),
                            text: 'visit athens',
                            matched: `last ${month}`,
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                });
            });

            test('should return date in the previous year if the month is current month or later', () => {
                const shortMonthsAfterJune = shortMonths.filter((_, index) => index >= 5);
                shortMonthsAfterJune.forEach((month, index) => {
                    const text = `visit athens last ${month}`;
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(index + 6, 2018),
                            text: 'visit athens',
                            matched: `last ${month}`,
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                });
            });

            test('should parse multiple matches', () => {
                const text = 'visit athens last September or last October';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDate(9, 2018),
                        text: 'visit athens or last October',
                        matched: 'last September',
                    },
                    {
                        dateTime: mockDate(10, 2018),
                        text: 'visit athens last September or',
                        matched: 'last October',
                    },
                ];
                expect(Month.parseText(text)).toEqual(result);
            });
        });

        describe('if a future word is used', () => {
            test('should return date in next year if the month is before the current month', () => {
                const shortMonthsBeforeJune = shortMonths.filter((_, index) => index < 5);
                shortMonthsBeforeJune.forEach((month, index) => {
                    const text = `visit athens next ${month}`;
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(index + 1, 2020),
                            text: 'visit athens',
                            matched: `next ${month}`,
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                });
            });

            test('should return date in the current year if the month is current month or later', () => {
                const shortMonthsAfterJune = shortMonths.filter((_, index) => index >= 5);
                shortMonthsAfterJune.forEach((month, index) => {
                    const text = `visit athens next ${month}`;
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(index + 6, 2019),
                            text: 'visit athens',
                            matched: `next ${month}`,
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                });
            });
        });
    });
});
