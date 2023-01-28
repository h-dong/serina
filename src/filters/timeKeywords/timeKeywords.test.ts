import { dayLite } from 'lib/date/dayLite';
import { SpyInstance } from 'vitest';
import * as stringUtil from 'lib/string/stringUtil';
import * as timeKeywordsHelper from './timeKeywords.helpers';
import TimeKeywords from './timeKeywords';
import TIME_KEYWORDS from './timeKeywords.constants';

describe('Time Keywords', () => {
    let spyMatchPattern: SpyInstance;
    let spyTimeKeywordsStringToDate: SpyInstance;
    let spyParseMatches: SpyInstance;

    beforeEach(() => {
        spyMatchPattern = vi.spyOn(stringUtil, 'matchPattern');
        spyTimeKeywordsStringToDate = vi.spyOn(timeKeywordsHelper, 'timeKeywordsToDateObj');
        spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
    });

    afterEach(() => {
        spyMatchPattern.mockRestore();
        spyTimeKeywordsStringToDate.mockRestore();
        spyParseMatches.mockRestore();
    });

    test('call matchPattern() once', () => {
        TimeKeywords.parseText('some random text');
        expect(stringUtil.matchPattern).toBeCalledTimes(1);
    });

    test('call matchPattern() with correct args', () => {
        TimeKeywords.parseText('test string midday');
        expect(stringUtil.matchPattern).toBeCalledWith('test string midday', TIME_KEYWORDS.WITH_FILLER_WORDS, false);
        spyMatchPattern.mockRestore();
    });

    test('do not call timeKeywordsToDateObj() if no match', () => {
        TimeKeywords.parseText('some random text');
        expect(timeKeywordsHelper.timeKeywordsToDateObj).not.toBeCalled();
    });

    test('do not call parseMatches() if no match', () => {
        TimeKeywords.parseText('some random text');
        expect(stringUtil.parseMatches).not.toBeCalled();
    });

    test('return null if no match', () => {
        const result = TimeKeywords.parseText('some random text');
        expect(result).toBeNull();
    });

    test('call timeKeywordsToDateObj() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['midday']);
        TimeKeywords.parseText('test string midday');
        expect(timeKeywordsHelper.timeKeywordsToDateObj).toBeCalledTimes(1);
    });

    test('call timeKeywordsToDateObj() with correct args', () => {
        spyMatchPattern.mockReturnValue(['midday']);
        TimeKeywords.parseText('test string midday');
        expect(timeKeywordsHelper.timeKeywordsToDateObj).toBeCalledWith('midday');
    });

    test('call timeKeywordsToDateObj() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['midday', 'midnight']);
        TimeKeywords.parseText('test string midday midnight');
        expect(timeKeywordsHelper.timeKeywordsToDateObj).toBeCalledTimes(2);
    });

    test('call parseMatches() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['midday']);
        TimeKeywords.parseText('test string midday');
        expect(stringUtil.parseMatches).toBeCalledTimes(1);
    });

    test('call parseMatches() with correct args', () => {
        spyMatchPattern.mockReturnValue(['midday']);
        TimeKeywords.parseText('test string midday');
        expect(stringUtil.parseMatches).toBeCalledWith(
            'test string midday',
            'midday',
            dayLite().startOf('day').plus(2, 'day').minus(12, 'hour').toDate()
        );
    });

    test('call parseMatches() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['midday', 'midnight']);
        TimeKeywords.parseText('test string midday midnight');
        expect(stringUtil.parseMatches).toBeCalledTimes(2);
    });

    test('return an array of ParsedMatchSchema if there is at least one match', () => {
        spyMatchPattern.mockReturnValue(['midday']);
        const output = TimeKeywords.parseText('test string midday');
        const results = [
            {
                dateTime: dayLite().startOf('day').plus(1, 'day').plus(12, 'hour').toDate(),
                matched: 'midday',
                text: 'test string',
            },
        ];
        expect(output).toEqual(results);
    });

    test('return null if there is no match', () => {
        const output = TimeKeywords.parseText('no match string');
        expect(output).toBeNull();
    });
});
