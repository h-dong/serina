import Month from './month';
import { dayLite } from 'lib/date/dayLite';
import * as stringUtil from 'lib/string/stringUtil';
import { SpyInstance } from 'vitest';
import * as monthHelper from './month.helpers';
import MONTH from './month.constants';

describe('Month', () => {
    describe('Normal behaviour', () => {
        let spyMatchPattern: SpyInstance;
        let spyMonthStringToDateObj: SpyInstance;
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
            spyMonthStringToDateObj = vi.spyOn(monthHelper, 'monthStringToDateObj');
            spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
        });

        afterEach(() => {
            spyMatchPattern.mockRestore();
            spyMonthStringToDateObj.mockRestore();
            spyParseMatches.mockRestore();
        });

        test('call matchPattern() once', () => {
            Month.parseText('some random text');
            expect(stringUtil.matchPattern).toBeCalledTimes(1);
        });

        test('call matchPattern() with correct args', () => {
            Month.parseText('test string oct');
            expect(stringUtil.matchPattern).toBeCalledWith('test string oct', MONTH.WITH_FUTURE_PAST_WORDS);
            spyMatchPattern.mockRestore();
        });

        test('do not call monthStringToDateObj() if no match', () => {
            Month.parseText('some random text');
            expect(monthHelper.monthStringToDateObj).not.toBeCalled();
        });

        test('do not call parseMatches() if no match', () => {
            Month.parseText('some random text');
            expect(stringUtil.parseMatches).not.toBeCalled();
        });

        test('return null if no match', () => {
            const result = Month.parseText('some random text');
            expect(result).toBeNull();
        });

        test('call monthStringToDateObj() once if there is one match', () => {
            spyMatchPattern.mockReturnValue(['oct']);
            Month.parseText('test string oct');
            expect(monthHelper.monthStringToDateObj).toBeCalledTimes(1);
        });

        test('call monthStringToDateObj() with correct args', () => {
            spyMatchPattern.mockReturnValue(['oct']);
            Month.parseText('test string oct');
            expect(monthHelper.monthStringToDateObj).toBeCalledWith('oct');
        });

        test('call monthStringToDateObj() twice if there are two matches', () => {
            spyMatchPattern.mockReturnValue(['oct', 'nov']);
            Month.parseText('test string oct nov');
            expect(monthHelper.monthStringToDateObj).toBeCalledTimes(2);
        });

        test('call parseMatches() once if there is one match', () => {
            spyMatchPattern.mockReturnValue(['oct']);
            Month.parseText('test string oct');
            expect(stringUtil.parseMatches).toBeCalledTimes(1);
        });

        test('call parseMatches() with correct args', () => {
            spyMatchPattern.mockReturnValue(['oct']);
            Month.parseText('test string oct');
            expect(stringUtil.parseMatches).toBeCalledWith(
                'test string oct',
                'oct',
                dayLite().set({ day: 1, month: 10 }).startOf('day').toDate()
            );
        });

        test('call parseMatches() twice if there are two matches', () => {
            spyMatchPattern.mockReturnValue(['oct', 'nov']);
            Month.parseText('test string oct nov');
            expect(stringUtil.parseMatches).toBeCalledTimes(2);
        });

        test('return an array of ParsedMatchSchema if there is at least one match', () => {
            spyMatchPattern.mockReturnValue(['oct']);
            const output = Month.parseText('test string oct nov');
            const results = [
                {
                    dateTime: dayLite().set({ day: 1, month: 10 }).startOf('day').toDate(),
                    matched: 'oct',
                    text: 'test string nov',
                },
            ];
            expect(output).toEqual(results);
        });
    });

    describe.skip('Edge cases', () => {
        test('return null if text is undefined', () => {
            const result = Month.parseText(undefined);
            expect(result).toBeNull();
        });

        test('return null if text is null', () => {
            const result = Month.parseText(null);
            expect(result).toBeNull();
        });

        test('return null if text is empty string', () => {
            const result = Month.parseText('');
            expect(result).toBeNull();
        });
    });
});
