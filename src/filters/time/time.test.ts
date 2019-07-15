import { DateTime } from 'luxon';
import { TestCaseSchema } from '../../serina.schema';
import Time from './time';

describe('Time', () => {
    const mockTime = (hour, minute) => DateTime.utc()
        .set({ hour, minute })
        .startOf('minute')
        .toJSDate();

    const testCases: TestCaseSchema[] = [
        {
            case: 'go to work at 8:30am',
            result: [
                { dateTime: mockTime(8, 30), text: 'go to work', matched: 'at 8:30am' },
            ],
        },
        {
            case: 'attend daily stand up 09:45',
            result: [
                { dateTime: mockTime(9, 45), text: 'attend daily stand up', matched: '09:45' },
            ],
        },
        {
            case: 'buy breakfast 9am',
            result: [
                { dateTime: mockTime(9, 0), text: 'buy breakfast', matched: '9am' },
            ],
        },
        {
            case: 'have report written by 7pm',
            result: [
                { dateTime: mockTime(19, 0), text: 'have report written', matched: 'by 7pm' },
            ],
        },
        {
            case: 'have lunch 12pm',
            result: [
                { dateTime: mockTime(12, 0), text: 'have lunch', matched: '12pm' },
            ],
        },
        {
            case: 'get ready for bed 12am',
            result: [
                { dateTime: mockTime(0, 0), text: 'get ready for bed', matched: '12am' },
            ],
        },
        {
            case: 'set alarm clock for 0:00',
            result: [
                { dateTime: mockTime(0, 0), text: 'set alarm clock for', matched: '0:00' },
            ],
        },
        {
            case: 'attend meeting at 11:00',
            result: [
                { dateTime: mockTime(11, 0), text: 'attend meeting', matched: 'at 11:00' },
            ],
        },
        {
            case: 'afternoon tea at 4PM',
            result: [
                { dateTime: mockTime(16, 0), text: 'afternoon tea', matched: 'at 4PM' },
            ],
        },
        {
            case: 'go to cinema at 2 pm',
            result: [
                { dateTime: mockTime(14, 0), text: 'go to cinema', matched: 'at 2 pm' },
            ],
        },
        {
            case: 'clean the house at 4 p.M.',
            result: [
                { dateTime: mockTime(16, 0), text: 'clean the house', matched: 'at 4 p.M.' },
            ],
        },
        {
            case: 'get shopping done by 4p.m.',
            result: [
                { dateTime: mockTime(16, 0), text: 'get shopping done', matched: 'by 4p.m.' },
            ],
        },
    ];

    test('test this new format', () => {
        testCases.forEach(item => {
            const parsedText = Time.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });
});
