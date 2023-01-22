import Year from './year';
import YEAR from './year.constants';
import * as stringUtil from 'lib/string/stringUtil';
import * as yearHelper from './year.helpers';
import { SpyInstance } from 'vitest';
import { dayLite } from 'lib/date/dayLite';

describe('Year', () => {
    describe('Normal behaviour', () => {
        let spyMatchPattern: SpyInstance;
        let spyYearStringToDate: SpyInstance;
        let spyParseMatches: SpyInstance;

        beforeEach(() => {
            spyMatchPattern = vi.spyOn(stringUtil, 'matchPattern');
            spyYearStringToDate = vi.spyOn(yearHelper, 'yearStringToDate');
            spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
        });

        afterEach(() => {
            spyMatchPattern.mockRestore();
            spyYearStringToDate.mockRestore();
            spyParseMatches.mockRestore();
        });

        test('call matchPattern() once', () => {
            Year.parseText('some random text');
            expect(stringUtil.matchPattern).toBeCalledTimes(1);
        });

        test('call matchPattern() with correct args', () => {
            Year.parseText('test string 2000');
            expect(stringUtil.matchPattern).toBeCalledWith('test string 2000', YEAR.WITH_FILLER_WORDS);
            spyMatchPattern.mockRestore();
        });

        test('do not call yearStringToDate() if no match', () => {
            Year.parseText('some random text');
            expect(yearHelper.yearStringToDate).not.toBeCalled();
        });

        test('do not call parseMatches() if no match', () => {
            Year.parseText('some random text');
            expect(stringUtil.parseMatches).not.toBeCalled();
        });

        test('return null if no match', () => {
            const result = Year.parseText('some random text');
            expect(result).toBeNull();
        });

        test('call yearStringToDate() once if there is one match', () => {
            spyMatchPattern.mockReturnValue(['2000']);
            Year.parseText('test string 2000');
            expect(yearHelper.yearStringToDate).toBeCalledTimes(1);
        });

        test('call yearStringToDate() with correct args', () => {
            spyMatchPattern.mockReturnValue(['2000']);
            Year.parseText('test string 2000');
            expect(yearHelper.yearStringToDate).toBeCalledWith('2000');
        });

        test('call yearStringToDate() twice if there are two matches', () => {
            spyMatchPattern.mockReturnValue(['2000', '2001']);
            Year.parseText('test string 2000 2001');
            expect(yearHelper.yearStringToDate).toBeCalledTimes(2);
        });

        test('call parseMatches() once if there is one match', () => {
            spyMatchPattern.mockReturnValue(['2000']);
            Year.parseText('test string 2000');
            expect(stringUtil.parseMatches).toBeCalledTimes(1);
        });

        test('call parseMatches() with correct args', () => {
            spyMatchPattern.mockReturnValue(['2000']);
            Year.parseText('test string 2000');
            expect(stringUtil.parseMatches).toBeCalledWith(
                'test string 2000',
                '2000',
                dayLite().set({ year: 2000 }).startOf('year').toDate()
            );
        });

        test('call parseMatches() twice if there are two matches', () => {
            spyMatchPattern.mockReturnValue(['2000', '2001']);
            Year.parseText('test string 2000 2001');
            expect(stringUtil.parseMatches).toBeCalledTimes(2);
        });

        test('return an array of ParsedMatchSchema if there is at least one match', () => {
            spyMatchPattern.mockReturnValue(['2000']);
            const output = Year.parseText('test string 2000 2001');
            const results = [
                {
                    dateTime: dayLite().set({ year: 2000 }).startOf('year').toDate(),
                    matched: '2000',
                    text: 'test string 2001',
                },
            ];
            expect(output).toEqual(results);
        });
    });

    describe('Edge cases', () => {
        test('return null if ', () => {
            const result = Year.parseText('we are long way away from year 10000');
            expect(result).toBeNull();
        });
    });
});
