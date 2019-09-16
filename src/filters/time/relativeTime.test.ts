import { DateTime, Settings } from 'luxon';
import { TestCaseSchema } from '../../serina.schema';
import RelativeTime from './relativeTime';

// Mock Date Time to 2018/11/1 23:30:00 GMT+0110
Settings.now = () => 1541115000000;

afterAll(() => {
    // Restore Date Time Mock
    Settings.now = () => Date.now();
});

describe('RelativeTime', () => {
    const mockDates = (day, month, year, hour, minute) => DateTime.utc()
        .set({ day, month, year, hour, minute })
        .startOf('minute')
        .toJSDate();

    const testCases: TestCaseSchema[] = [
        {
            case: 'go to work in half an hour',
            result: [
                { dateTime: mockDates(2, 11, 2018, 0, 0), text: 'go to work', matched: 'in half an hour' },
            ],
        }, {
            case: 'go to work in 15 minutes',
            result: [
                { dateTime: mockDates(1, 11, 2018, 23, 45), text: 'go to work', matched: 'in 15 minutes' },
            ],
        }, {
            case: 'go to work in 15 mins',
            result: [
                { dateTime: mockDates(1, 11, 2018, 23, 45), text: 'go to work', matched: 'in 15 mins' },
            ],
        }, {
            case: 'go to work in 15 min',
            result: [
                { dateTime: mockDates(1, 11, 2018, 23, 45), text: 'go to work', matched: 'in 15 min' },
            ],
        }, {
            case: 'go to work in an hour',
            result: [
                { dateTime: mockDates(2, 11, 2018, 0, 30), text: 'go to work', matched: 'in an hour' },
            ],
        }, {
            case: 'go to work in 1 hour',
            result: [
                { dateTime: mockDates(2, 11, 2018, 0, 30), text: 'go to work', matched: 'in 1 hour' },
            ],
        }, {
            case: 'go to work in 1 hr',
            result: [
                { dateTime: mockDates(2, 11, 2018, 0, 30), text: 'go to work', matched: 'in 1 hr' },
            ],
        }, {
            case: 'go to work in 2 hours',
            result: [
                { dateTime: mockDates(2, 11, 2018, 1, 30), text: 'go to work', matched: 'in 2 hours' },
            ],
        }, {
            case: 'go to work in 2 hrs',
            result: [
                { dateTime: mockDates(2, 11, 2018, 1, 30), text: 'go to work', matched: 'in 2 hrs' },
            ],
        }, {
            case: 'go to work 2 hrs from now',
            result: [
                { dateTime: mockDates(2, 11, 2018, 1, 30), text: 'go to work', matched: '2 hrs from now' },
            ],
        }, {
            case: 'go to work 2 hrs after',
            result: [
                { dateTime: mockDates(2, 11, 2018, 1, 30), text: 'go to work', matched: '2 hrs after' },
            ],
        }, {
            case: 'go to work 2 hrs later',
            result: [
                { dateTime: mockDates(2, 11, 2018, 1, 30), text: 'go to work', matched: '2 hrs later' },
            ],
        }, {
            case: 'go to work after 2 hrs',
            result: [
                { dateTime: mockDates(2, 11, 2018, 1, 30), text: 'go to work', matched: 'after 2 hrs' },
            ],
        },  {
            case: 'go to work after 30 secs',
            result: [
                { dateTime: mockDates(1, 11, 2018, 23, 30), text: 'go to work', matched: 'after 30 secs' },
            ],
        },  {
            case: 'go to work after 60 seconds',
            result: [
                { dateTime: mockDates(1, 11, 2018, 23, 31), text: 'go to work', matched: 'after 60 seconds' },
            ],
        },
    ];

    test('should give correct time', () => {
        testCases.forEach(item => {
            const parsedText = RelativeTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });
});
