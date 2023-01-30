import RelativeDates from 'filters/relativeDates/relativeDates';

describe('RelativeDates', () => {
    // Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
    vi.useFakeTimers().setSystemTime(new Date('2019-06-20T08:34:52.123Z'));

    afterAll(() => {
        vi.useRealTimers();
    });

    test('return null if no match', () => {
        const filter = new RelativeDates();

        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('return correct date object', () => {
        const filter = new RelativeDates();
        const result = filter.parseText('test string today');
        expect(result).toEqual([
            {
                dateTime: new Date('2019-01-22T02:00:00.000Z'),
                matched: 'tomorrow',
                text: 'test string',
            },
        ]);
    });
});
