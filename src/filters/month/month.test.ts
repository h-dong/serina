import { Settings, DateTime } from 'luxon';
import Month from './month';
import { ParsedMatchSchema } from '../../serina.schema';

describe('Month', () => {
    const mockDate = (month, year) => {
        return DateTime.local()
            .set({ month, year })
            .startOf('minutes')
            .toJSDate();
    };

    const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september',
    'october', 'november', 'december'];

    beforeAll(() => {
        // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
        Settings.now = () => 1561819692628;
    });

    afterAll(() => {
        // Restore Date Time Mock
        Settings.now = () => Date.now();
    });

    describe('parseText()', () => {
        describe('if no past or future words are used', () => {
            test('should return date in next year if the month is before the current month', () => {
                for (let i = 0; i < 5; i++) {
                    const text = 'visit athens in ' + shortMonths[i];
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(i + 1, 2020),
                            text: 'visit athens',
                            matched: 'in ' + shortMonths[i],
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                }
            });

            test('should return date in the current year if the month is current month or later', () => {
                for (let i = 5; i < 12; i++) {
                    const text = 'visit athens in ' + shortMonths[i];
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(i + 1, 2019),
                            text: 'visit athens',
                            matched: 'in ' + shortMonths[i],
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                }
            });

            test('should parse the month regardless of capital letters', () => {
                const text = 'visit athens in DEceMBeR';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDate(12, 2019),
                        text: 'visit athens',
                        matched: 'in december',
                    },
                ];
                expect(Month.parseText(text)).toEqual(result);
            });

            test('should parse multiple matches', () => {
                const text = 'visit athens in September or October';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDate(9, 2019),
                        text: 'visit athens or october',
                        matched: 'in september',
                    },
                    {
                        dateTime: mockDate(10, 2019),
                        text: 'visit athens in september or',
                        matched: 'october',
                    },
                ];
                expect(Month.parseText(text)).toEqual(result);
            });
        });
        describe('if a past word is used', () => {
            test('should return date in the same year if the month is before the current month', () => {
                for (let i = 0; i < 5; i++) {
                    const text = 'visit athens last ' + shortMonths[i];
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(i + 1, 2019),
                            text: 'visit athens',
                            matched: 'last ' + shortMonths[i],
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                }
            });

            test('should return date in the previous year if the month is current month or later', () => {
                for (let i = 5; i < 12; i++) {
                    const text = 'visit athens last ' + shortMonths[i];
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(i + 1, 2018),
                            text: 'visit athens',
                            matched: 'last ' + shortMonths[i],
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                }
            });

            test('should parse multiple matches', () => {
                const text = 'visit athens last September or last October';
                const result: ParsedMatchSchema[] = [
                    {
                        dateTime: mockDate(9, 2018),
                        text: 'visit athens or last october',
                        matched: 'last september',
                    },
                    {
                        dateTime: mockDate(10, 2018),
                        text: 'visit athens last september or',
                        matched: 'last october',
                    },
                ];
                expect(Month.parseText(text)).toEqual(result);
            });
        });

        describe('if a future word is used', () => {
            test('should return date in next year if the month is before the current month', () => {
                for (let i = 0; i < 5; i++) {
                    const text = 'visit athens next ' + shortMonths[i];
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(i + 1, 2020),
                            text: 'visit athens',
                            matched: 'next ' + shortMonths[i],
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                }
            });

            test('should return date in the current year if the month is current month or later', () => {
                for (let i = 5; i < 12; i++) {
                    const text = 'visit athens next ' + shortMonths[i];
                    const result: ParsedMatchSchema[] = [
                        {
                            dateTime: mockDate(i + 1, 2019),
                            text: 'visit athens',
                            matched: 'next ' + shortMonths[i],
                        },
                    ];
                    expect(Month.parseText(text)).toEqual(result);
                }
            });
        });
    });
    describe('convertMonthStringToNumber()', () => {
        test('should return correct number for each short month string', () => {
            for (let i = 0; i < 12; i++) {
                const text = shortMonths[i];
                expect(Month.convertMonthStringToNumber(text)).toEqual(i + 1);
            }
        });

        test('should return correct number for each long month string', () => {
            for (let i = 0; i < 12; i++) {
                const text = longMonths[i];
                expect(Month.convertMonthStringToNumber(text)).toEqual(i + 1);
            }
        });
    });
});
