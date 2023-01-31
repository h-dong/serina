import PartialDates from './partialDates';

describe('Partial Dates', () => {
    // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
    const mockDate = new Date('2019-01-19T18:06:18Z');
    vi.useFakeTimers().setSystemTime(mockDate);

    afterAll(() => {
        vi.useRealTimers();
    });

    test('return null if no match', () => {
        const filter = new PartialDates();

        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('return correct date object', () => {
        const filter = new PartialDates();
        const result = filter.parseText('test string February 2019');
        expect(result).toEqual([
            {
                dateTime: new Date('2019-02-01T00:00:00.000Z'),
                matched: 'February 2019',
                text: 'test string',
            },
        ]);
    });
});
