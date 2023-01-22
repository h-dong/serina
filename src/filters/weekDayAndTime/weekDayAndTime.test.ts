import { dayLite } from 'lib/date/dayLite';
import { SpyInstance } from 'vitest';
import * as stringUtil from 'lib/string/stringUtil';
import * as weekdayAndTimeHelper from './weekdayAndTime.helpers';
import WeekdayAndTime from './weekdayAndTime';
import WEEKDAY_AND_TIME from './weekdayAndTime.constants';

describe('Weekday and Time', () => {
    // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
    const mockDate = new Date('2019-01-19T18:06:18Z');
    vi.useFakeTimers().setSystemTime(mockDate);

    afterAll(() => {
        vi.useRealTimers();
    });

    let spyMatchPattern: SpyInstance;
    let spyWeekdayAndTimeStringToDate: SpyInstance;
    let spyParseMatches: SpyInstance;

    beforeEach(() => {
        spyMatchPattern = vi.spyOn(stringUtil, 'matchPattern');
        spyWeekdayAndTimeStringToDate = vi.spyOn(weekdayAndTimeHelper, 'weekdayAndTimeToDateObj');
        spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
    });

    afterEach(() => {
        spyMatchPattern.mockRestore();
        spyWeekdayAndTimeStringToDate.mockRestore();
        spyParseMatches.mockRestore();
    });

    test('call matchPattern() once', () => {
        WeekdayAndTime.parseText('some random text');
        expect(stringUtil.matchPattern).toBeCalledTimes(1);
    });

    test('call matchPattern() with correct args', () => {
        WeekdayAndTime.parseText('test string 2am monday');
        expect(stringUtil.matchPattern).toBeCalledWith('test string 2am monday', WEEKDAY_AND_TIME.ANY);
        spyMatchPattern.mockRestore();
    });

    test('do not call weekdayAndTimeToDateObj() if no match', () => {
        WeekdayAndTime.parseText('some random text');
        expect(weekdayAndTimeHelper.weekdayAndTimeToDateObj).not.toBeCalled();
    });

    test('do not call parseMatches() if no match', () => {
        WeekdayAndTime.parseText('some random text');
        expect(stringUtil.parseMatches).not.toBeCalled();
    });

    test('return null if no match', () => {
        const result = WeekdayAndTime.parseText('some random text');
        expect(result).toBeNull();
    });

    test('call weekdayAndTimeToDateObj() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['2am monday']);
        WeekdayAndTime.parseText('test string 2am monday');
        expect(weekdayAndTimeHelper.weekdayAndTimeToDateObj).toBeCalledTimes(1);
    });

    test('call weekdayAndTimeToDateObj() with correct args', () => {
        spyMatchPattern.mockReturnValue(['2am monday']);
        WeekdayAndTime.parseText('test string 2am monday');
        expect(weekdayAndTimeHelper.weekdayAndTimeToDateObj).toBeCalledWith('2am monday');
    });

    test('call weekdayAndTimeToDateObj() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['2am monday', 'tuesday 5pm']);
        WeekdayAndTime.parseText('test string 2am monday tuesday 5pm');
        expect(weekdayAndTimeHelper.weekdayAndTimeToDateObj).toBeCalledTimes(2);
    });

    test('call parseMatches() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['2am monday']);
        WeekdayAndTime.parseText('test string 2am monday');
        expect(stringUtil.parseMatches).toBeCalledTimes(1);
    });

    test('call parseMatches() with correct args', () => {
        spyMatchPattern.mockReturnValue(['2am monday']);
        WeekdayAndTime.parseText('test string 2am monday');
        expect(stringUtil.parseMatches).toBeCalledWith(
            'test string 2am monday',
            '2am monday',
            dayLite().set({ weekday: 1, day: 21, hour: 2 }).startOf('hour').toDate()
        );
    });

    test('call parseMatches() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['2am monday', 'tuesday 5pm']);
        WeekdayAndTime.parseText('test string 2am monday tuesday 5pm');
        expect(stringUtil.parseMatches).toBeCalledTimes(2);
    });

    test('return an array of ParsedMatchSchema if there is at least one match', () => {
        spyMatchPattern.mockReturnValue(['2am monday']);
        const output = WeekdayAndTime.parseText('test string 2am monday tuesday 5pm');
        const results = [
            {
                dateTime: dayLite().set({ weekday: 1, day: 21, hour: 2 }).startOf('hour').toDate(),
                matched: '2am monday',
                text: 'test string tuesday 5pm',
            },
        ];
        expect(output).toEqual(results);
    });
});
