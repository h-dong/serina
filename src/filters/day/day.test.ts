import Day from './day';
import { ParsedMatchSchema } from 'serina.schema';
import { SpyInstance } from 'vitest';
import * as stringUtil from 'lib/string/stringUtil';
import * as dayHelper from './day.helpers';
import { dayLite } from 'lib/date/dayLite';
import DAY from './day.constants';

describe('Day', () => {
    describe('Normal behaviour', () => {
        let spyMatchPattern: SpyInstance;
        let spyDayStringToDateObj: SpyInstance;
        let spyParseMatches: SpyInstance;

        beforeAll(() => {
            // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
            vi.useFakeTimers();
            vi.setSystemTime(new Date(Date.UTC(2019, 2, 19)));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        beforeEach(() => {
            spyMatchPattern = vi.spyOn(stringUtil, 'matchPattern');
            spyDayStringToDateObj = vi.spyOn(dayHelper, 'dayStringToDateObj');
            spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
        });

        afterEach(() => {
            spyMatchPattern.mockRestore();
            spyDayStringToDateObj.mockRestore();
            spyParseMatches.mockRestore();
        });

        test('call matchPattern() once', () => {
            Day.parseText('some random text');
            expect(stringUtil.matchPattern).toBeCalledTimes(1);
        });

        test('call matchPattern() with correct args', () => {
            Day.parseText('test string 20');
            expect(stringUtil.matchPattern).toBeCalledWith('test string 20', DAY.DAY_WITH_FILLER_WORDS);
            spyMatchPattern.mockRestore();
        });

        test('do not call dayStringToDateObj() if no match', () => {
            Day.parseText('some random text');
            expect(dayHelper.dayStringToDateObj).not.toBeCalled();
        });

        test('do not call parseMatches() if no match', () => {
            Day.parseText('some random text');
            expect(stringUtil.parseMatches).not.toBeCalled();
        });

        test('return null if no match', () => {
            const result = Day.parseText('some random text');
            expect(result).toBeNull();
        });

        test('call dayStringToDateObj() once if there is one match', () => {
            spyMatchPattern.mockReturnValue(['20']);
            Day.parseText('test string 20');
            expect(dayHelper.dayStringToDateObj).toBeCalledTimes(1);
        });

        test('call dayStringToDateObj() with correct args', () => {
            spyMatchPattern.mockReturnValue(['20']);
            Day.parseText('test string 20');
            expect(dayHelper.dayStringToDateObj).toBeCalledWith('20');
        });

        test('call dayStringToDateObj() twice if there are two matches', () => {
            spyMatchPattern.mockReturnValue(['20', '21']);
            Day.parseText('test string 20 21');
            expect(dayHelper.dayStringToDateObj).toBeCalledTimes(2);
        });

        test('call parseMatches() once if there is one match', () => {
            spyMatchPattern.mockReturnValue(['20']);
            Day.parseText('test string 20');
            expect(stringUtil.parseMatches).toBeCalledTimes(1);
        });

        test('call parseMatches() with correct args', () => {
            spyMatchPattern.mockReturnValue(['20']);
            Day.parseText('test string 20');
            expect(stringUtil.parseMatches).toBeCalledWith(
                'test string 20',
                '20',
                dayLite().set({ day: 20 }).endOf('day').toDate()
            );
        });

        test('call parseMatches() twice if there are two matches', () => {
            spyMatchPattern.mockReturnValue(['20', '21']);
            Day.parseText('test string 20 21');
            expect(stringUtil.parseMatches).toBeCalledTimes(2);
        });

        test('return an array of ParsedMatchSchema if there is at least one match', () => {
            spyMatchPattern.mockReturnValue(['20']);
            const output = Day.parseText('test string 20 21');
            const results = [
                {
                    dateTime: dayLite().set({ day: 20 }).startOf('day').endOf('day').toDate(),
                    matched: '20',
                    text: 'test string 21',
                },
            ];
            expect(output).toEqual(results);
        });
    });

    describe('Edge Cases (Integration)', () => {
        const mockDay = (day: number, month: number, year: number): Date =>
            new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

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
