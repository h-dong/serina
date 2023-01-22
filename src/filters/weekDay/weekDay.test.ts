import { dayLite } from 'lib/date/dayLite';
import { SpyInstance } from 'vitest';
import * as stringUtil from 'lib/string/stringUtil';
import * as weekdayHelper from './weekday.helpers';
import Weekday from './weekday';
import WEEKDAY from './weekday.constants';

describe('Weekday', () => {
    let spyMatchPattern: SpyInstance;
    let spyWeekdayStringToDate: SpyInstance;
    let spyParseMatches: SpyInstance;

    beforeEach(() => {
        spyMatchPattern = vi.spyOn(stringUtil, 'matchPattern');
        spyWeekdayStringToDate = vi.spyOn(weekdayHelper, 'weekdayStringToDateObj');
        spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
    });

    afterEach(() => {
        spyMatchPattern.mockRestore();
        spyWeekdayStringToDate.mockRestore();
        spyParseMatches.mockRestore();
    });

    test('call matchPattern() once', () => {
        Weekday.parseText('some random text');
        expect(stringUtil.matchPattern).toBeCalledTimes(1);
    });

    test('call matchPattern() with correct args', () => {
        Weekday.parseText('test string mon');
        expect(stringUtil.matchPattern).toBeCalledWith('test string mon', WEEKDAY.WITH_FUTURE_PAST_WORDS);
        spyMatchPattern.mockRestore();
    });

    test('do not call weekdayStringToDateObj() if no match', () => {
        Weekday.parseText('some random text');
        expect(weekdayHelper.weekdayStringToDateObj).not.toBeCalled();
    });

    test('do not call parseMatches() if no match', () => {
        Weekday.parseText('some random text');
        expect(stringUtil.parseMatches).not.toBeCalled();
    });

    test('return null if no match', () => {
        const result = Weekday.parseText('some random text');
        expect(result).toBeNull();
    });

    test('call weekdayStringToDateObj() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['mon']);
        Weekday.parseText('test string mon');
        expect(weekdayHelper.weekdayStringToDateObj).toBeCalledTimes(1);
    });

    test('call weekdayStringToDateObj() with correct args', () => {
        spyMatchPattern.mockReturnValue(['mon']);
        Weekday.parseText('test string mon');
        expect(weekdayHelper.weekdayStringToDateObj).toBeCalledWith('mon');
    });

    test('call weekdayStringToDateObj() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['mon', 'tue']);
        Weekday.parseText('test string mon tue');
        expect(weekdayHelper.weekdayStringToDateObj).toBeCalledTimes(2);
    });

    test('call parseMatches() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['mon']);
        Weekday.parseText('test string mon');
        expect(stringUtil.parseMatches).toBeCalledTimes(1);
    });

    test('call parseMatches() with correct args', () => {
        spyMatchPattern.mockReturnValue(['mon']);
        Weekday.parseText('test string mon');
        expect(stringUtil.parseMatches).toBeCalledWith(
            'test string mon',
            'mon',
            dayLite().set({ weekday: 1 }).startOf('day').toDate()
        );
    });

    test('call parseMatches() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['mon', 'tue']);
        Weekday.parseText('test string mon tue');
        expect(stringUtil.parseMatches).toBeCalledTimes(2);
    });

    test('return an array of ParsedMatchSchema if there is at least one match', () => {
        spyMatchPattern.mockReturnValue(['mon']);
        const output = Weekday.parseText('test string mon tue');
        const results = [
            {
                dateTime: dayLite().set({ weekday: 1 }).startOf('day').toDate(),
                matched: 'mon',
                text: 'test string tue',
            },
        ];
        expect(output).toEqual(results);
    });
});
