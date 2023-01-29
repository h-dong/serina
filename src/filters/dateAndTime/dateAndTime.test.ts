import DateAndTime from './dateAndTime';

describe('Date And Time', () => {
    test('return null if no match', () => {
        const filter = new DateAndTime();

        const result = filter.parseText('some random text');
        expect(result).toBeNull();
    });

    test('return correct date object ', () => {
        const filter = new DateAndTime();
        const result = filter.parseText('test string 2022/12/25 2am');
        expect(result).toEqual([
            {
                dateTime: new Date('2022-12-26T02:00:00.000Z'),
                matched: '2022/12/25 2am',
                text: 'test string',
            },
        ]);
    });
});
