import Year from './year';
import { ParsedMatchSchema } from '../../serina.schema';
import { DateTime } from 'luxon';

interface TestCaseSchema {
    case: string;
    result: ParsedMatchSchema[];
}

describe('Year', () => {
    const mockYear = year => DateTime.utc()
        .set({ year })
        .startOf('year')
        .toJSDate();

    const testCases: TestCaseSchema[] = [
        {
            // test earliest match possible
            case: 'start project 1000',
            result: [
                { dateTime: mockYear(1000), text: 'start project', matched: '1000' },
            ],
        },
        {
            // test earliest match possible with filler word
            case: 'start project in 1000',
            result: [
                { dateTime: mockYear(1000), text: 'start project', matched: 'in 1000' },
            ],
        },
        {
            // test common match
            case: 'start project 2019',
            result: [
                { dateTime: mockYear(2019), text: 'start project', matched: '2019' },
            ],
        },
        {
            // test common match with filler word
            case: 'start project in 2019',
            result: [
                { dateTime: mockYear(2019), text: 'start project', matched: 'in 2019' },
            ],
        },
        {
            // test latest match possible
            case: 'start project 9999',
            result: [
                { dateTime: mockYear(9999), text: 'start project', matched: '9999' },
            ],
        },
        {
            // test latest match possible with filler word
            case: 'start project in 9999',
            result: [
                { dateTime: mockYear(9999), text: 'start project', matched: 'in 9999' },
            ],
        },
        {
            // test multiple matches
            case: 'book holiday in 2019 for 2020',
            result: [
                { dateTime: mockYear(2019), text: 'book holiday for 2020', matched: 'in 2019' },
                { dateTime: mockYear(2020), text: 'book holiday in 2019 for', matched: '2020' },
            ],
        },
    ];

    test('test this new format', () => {
        testCases.forEach(item => {
            expect(Year.parseText(item.case)).toEqual(item.result);
        });
    });
});
