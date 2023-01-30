import Month from './month';

describe('Month', () => {
    beforeAll(() => {
        // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
        vi.useFakeTimers();
        vi.setSystemTime(new Date(Date.UTC(2019, 2, 19)));
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    test('return null if no match', () => {
        const filter = new Month();

        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('return correct date object', () => {
        const filter = new Month();
        const result = filter.parseText('test string march');
        expect(result).toEqual([
            {
                dateTime: new Date('2019-03-01T00:00:00.000Z'),
                matched: 'march',
                text: 'test string',
            },
        ]);
    });
});
