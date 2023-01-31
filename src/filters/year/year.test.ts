import Year from './year';

describe('Year', () => {
    test('return null if no match', () => {
        const filter = new Year();
        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('return correct date object', () => {
        const filter = new Year();
        const result = filter.parseText('test string 9999');
        expect(result).toEqual([
            {
                dateTime: new Date('9999-01-01T00:00:00.000Z'),
                matched: '9999',
                text: 'test string',
            },
        ]);
    });
});
