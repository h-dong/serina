import Dates from './dates';

describe('Dates', () => {
    test('return null if no match', () => {
        const filter = new Dates();

        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('return correct date object', () => {
        const filter = new Dates();
        const result = filter.parseText('test string 2023/01/01');
        expect(result).toEqual([
            {
                dateTime: new Date('2023-01-01T00:00:00.000Z'),
                matched: '2023/01/01',
                text: 'test string',
            },
        ]);
    });
});
