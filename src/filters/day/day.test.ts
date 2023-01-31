import Day from './day';

describe('Day', () => {
    describe('Normal behaviour', () => {
        beforeAll(() => {
            // Mock Date Time to Saturday, 19 February 2019 18:06:18 GMT+00:00
            vi.useFakeTimers();
            vi.setSystemTime(new Date(Date.UTC(2019, 1, 19)));
        });

        afterAll(() => {
            vi.useRealTimers();
        });

        test('return null if no match', () => {
            const filter = new Day();

            const result = filter.parseText('some random text');
            expect(result).toBeNull();
        });

        test('return correct date object', () => {
            const filter = new Day();
            const result = filter.parseText('test string 17th');
            expect(result).toEqual([
                {
                    dateTime: new Date('2019-03-17T00:00:00.000Z'),
                    matched: '17th',
                    text: 'test string',
                },
            ]);
        });
    });
});
