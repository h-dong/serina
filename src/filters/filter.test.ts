import { dayLite } from 'lib/date/dayLite';
import * as stringUtil from 'lib/string/stringUtil';
import { SpyInstance } from 'vitest';
import Filter from './filter';

describe('Filter', () => {
    let spyMatchPattern: SpyInstance;
    let spyParseMatches: SpyInstance;

    beforeEach(() => {
        spyMatchPattern = vi.spyOn(stringUtil, 'matchPattern');
        spyParseMatches = vi.spyOn(stringUtil, 'parseMatches');
    });

    afterEach(() => {
        spyMatchPattern.mockRestore();
        spyParseMatches.mockRestore();
    });

    test('call matchPattern() once', () => {
        const filter = new Filter();
        filter.parseText('some random text');
        // WeekdayAndTime.parseText('some random text');
        expect(stringUtil.matchPattern).toBeCalledTimes(1);
    });

    test('call matchPattern() with correct args', () => {
        const filter = new Filter('text', true);
        filter.parseText('some random text');
        expect(stringUtil.matchPattern).toBeCalledWith('some random text', 'text', true);
    });

    test('do not call parseStringToDateObj() if no match', () => {
        const filter = new Filter('invalid-filter');
        const spyParseStringToDateObj = vi.spyOn(filter, 'parseStringToDateObj');
        filter.parseText('some random text');
        expect(filter.parseStringToDateObj).not.toBeCalled();
        spyParseStringToDateObj.mockRestore();
    });

    test('do not call parseMatches() if no match', () => {
        const filter = new Filter('invalid-filter');
        filter.parseText('some random text');
        expect(stringUtil.parseMatches).not.toBeCalled();
    });

    test('return null if no match', () => {
        const filter = new Filter('invalid-filter');
        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('call parseStringToDateObj() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['text']);
        const filter = new Filter();
        const spyParseStringToDateObj = vi.spyOn(filter, 'parseStringToDateObj');
        filter.parseText('some random text');
        expect(filter.parseStringToDateObj).toBeCalledTimes(1);
        spyParseStringToDateObj.mockRestore();
    });

    test('call parseStringToDateObj() with correct args', () => {
        spyMatchPattern.mockReturnValue(['text']);
        const filter = new Filter();
        const spyParseStringToDateObj = vi.spyOn(filter, 'parseStringToDateObj');
        filter.parseText('some random text');
        expect(filter.parseStringToDateObj).toBeCalledWith('text');
        spyParseStringToDateObj.mockRestore();
    });

    test('call parseStringToDateObj() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['text', 'text']);
        const filter = new Filter();
        const spyParseStringToDateObj = vi.spyOn(filter, 'parseStringToDateObj');
        filter.parseText('some random text and more text');
        expect(filter.parseStringToDateObj).toBeCalledTimes(2);
        spyParseStringToDateObj.mockRestore();
    });

    test('call parseMatches() once if there is one match', () => {
        spyMatchPattern.mockReturnValue(['text']);
        const filter = new Filter();
        filter.parseText('some random text');
        expect(stringUtil.parseMatches).toBeCalledTimes(1);
    });

    test('call parseMatches() with correct args', () => {
        spyMatchPattern.mockReturnValue(['text']);
        const filter = new Filter();
        filter.parseText('some random text');
        expect(stringUtil.parseMatches).toBeCalledWith(
            'some random text',
            'text',
            new Date('2000-01-01T00:00:00.000Z')
        );
    });

    test('call parseMatches() twice if there are two matches', () => {
        spyMatchPattern.mockReturnValue(['text', 'text']);
        const filter = new Filter();
        filter.parseText('some random text and more text');
        expect(stringUtil.parseMatches).toBeCalledTimes(2);
    });

    test('return an array of ParsedMatchSchema if there is at least one match', () => {
        spyMatchPattern.mockReturnValue(['text']);
        const filter = new Filter();
        const expected = filter.parseText('some random text and more text');
        const results = [
            {
                dateTime: dayLite().set({ year: 2000 }).startOf('year').toDate(),
                matched: 'text',
                text: 'some random and more',
            },
        ];
        expect(expected).toEqual(results);
    });
});
