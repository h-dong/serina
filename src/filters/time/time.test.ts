import Time from './time';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Time', () => {
    const mockTime = (hour: number, minute: number) => dayLite().set({ hour, minute }).startOf('minute').toDate();

    test.each([
        { filter: 'at 8:30am', dateTime: mockTime(8, 30) },
        { filter: '09:45', dateTime: mockTime(9, 45) },
        { filter: '24:45', dateTime: null },
        { filter: '25pm', dateTime: null },
        { filter: '9am', dateTime: mockTime(9, 0) },
        { filter: 'by 7pm', dateTime: mockTime(19, 0) },
        { filter: '12pm', dateTime: mockTime(12, 0) },
        { filter: '12am', dateTime: mockTime(0, 0) },
        { filter: '0:00', dateTime: mockTime(0, 0) },
        { filter: '09:61', dateTime: null },
        { filter: '11:00', dateTime: mockTime(11, 0) },
        { filter: 'at 4PM', dateTime: mockTime(16, 0) },
        { filter: 'at 2 pm', dateTime: mockTime(14, 0) },
        { filter: 'at 4 p.M.', dateTime: mockTime(16, 0) },
        { filter: 'by 4p.m.', dateTime: mockTime(16, 0) },
        { filter: 'at quarter to 4', dateTime: mockTime(3, 45) },
        { filter: 'at quarter past 4', dateTime: mockTime(4, 15) },
        { filter: 'at quarter to 4pm', dateTime: mockTime(15, 45) },
        { filter: 'at half past 4', dateTime: mockTime(4, 30) },
        { filter: 'at 20 past 4', dateTime: mockTime(4, 20) },
        { filter: 'at 20 minutes past 4', dateTime: mockTime(4, 20) },
        { filter: 'at 20 min past 4', dateTime: mockTime(4, 20) },
        { filter: 'at 20 min to 12am', dateTime: mockTime(23, 40) },
        { filter: 'at 20 min to 90', dateTime: null },
        { filter: 'at 20 min to 23', dateTime: mockTime(22, 40) },
        { filter: 'at 20 min to 24', dateTime: null },
        { filter: 'at 20 min to 19', dateTime: mockTime(18, 40) },
    ])('should be able to parse $filter', ({ filter, dateTime }) => {
        const text = 'go to work';
        const results = Time.parseText(`${text} ${filter}`);
        const output = [{ dateTime, matched: filter, text }];
        expect(results).toEqual(output);
    });

    test('should return correct case for matched string', () => {
        const text = 'Hand in paper 11:00';
        const result: ParsedMatchSchema[] = [
            {
                dateTime: mockTime(11, 0),
                text: 'Hand in paper',
                matched: '11:00',
            },
        ];

        expect(Time.parseText(text)).toEqual(result);
    });
});
