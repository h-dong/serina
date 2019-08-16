import { DateTime } from 'luxon';
import { TestCaseSchema } from '../../serina.schema';
import Dates from './dates';

describe('Dates', () => {
    const mockDates = (day, month, year) => DateTime.utc()
        .set({ day, month, year })
        .endOf('day')
        .toJSDate();

    const testCases: TestCaseSchema[] = [{
        case: 'go to work on 02/17/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 02/17/2009' },
        ],
    }, {
        case: 'go to work on 17/02/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 17/02/2009' },
        ],
    }, {
        case: 'go to work on 2009/02/17',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 2009/02/17' },
        ],
    }, {
        case: 'go to work on 2/17/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 2/17/2009' },
        ],
    }, {
        case: 'go to work on 17/2/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 17/2/2009' },
        ],
    }, {
        case: 'go to work on 2009/2/17',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 2009/2/17' },
        ],
    }, {
        case: 'go to work on 2/17/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 2/17/2009' },
        ],
    }, {
        case: 'go to work on 2-17-2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 2-17-2009' },
        ],
    }, {
        case: 'go to work on February 17, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on February 17, 2009' },
        ],
    }, {
        case: 'go to work on 17 February, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 17 February, 2009' },
        ],
    }, {
        case: 'go to work on Feb 17, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on Feb 17, 2009' },
        ],
    }, {
        case: 'go to work on 17 Feb, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009), text: 'go to work', matched: 'on 17 Feb, 2009' },
        ],
    }, {
        case: 'go to work on Feb 17, 2014',
        result: [
            { dateTime: mockDates(17, 2, 2014), text: 'go to work', matched: 'on Feb 17, 2014' },
        ],
    }, {
        case: 'go to work on 17 Feb, 2014',
        result: [
            { dateTime: mockDates(17, 2, 2014), text: 'go to work', matched: 'on 17 Feb, 2014' },
        ],
    }, {
        case: 'go to work on 21st Feb 2019',
        result: [
            { dateTime: mockDates(21, 2, 2019), text: 'go to work', matched: 'on 21st Feb 2019' },
        ],
    }, {
        case: 'go to work on Feb 21st 2019',
        result: [
            { dateTime: mockDates(21, 2, 2019), text: 'go to work', matched: 'on Feb 21st 2019' },
        ],
    }, {
        case: 'go to work on 22nd Feb 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019), text: 'go to work', matched: 'on 22nd Feb 2019' },
        ],
    }, {
        case: 'go to work on Feb 22nd 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019), text: 'go to work', matched: 'on Feb 22nd 2019' },
        ],
    }, {
        case: 'go to work on 22nd Feb 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019), text: 'go to work', matched: 'on 22nd Feb 2019' },
        ],
    }, {
        case: 'go to work on Feb 22nd 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019), text: 'go to work', matched: 'on Feb 22nd 2019' },
        ],
    }, {
        case: 'go to work on 17th February 2019',
        result: [
            { dateTime: mockDates(17, 2, 2019), text: 'go to work', matched: 'on 17th February 2019' },
        ],
    }, {
        case: 'go to work by February 17th 2019',
        result: [
            { dateTime: mockDates(17, 2, 2019), text: 'go to work', matched: 'by February 17th 2019' },
        ],
    }];

    test('should parse the correct dates', () => {
        testCases.forEach(item => {
            const parsedText = Dates.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });
});
