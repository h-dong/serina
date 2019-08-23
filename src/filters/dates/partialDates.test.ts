import { DateTime} from 'luxon';
import {TestCaseSchema} from '../../serina.schema';
import PartialDates from './partialDates';

const currentYear = DateTime.utc().year;

const mockDates = (day, month, year) => DateTime.utc()
    .set({day, month, year})
    .endOf('day')
    .toJSDate();

describe('Dates', () => {
    describe('Partial Dates', () => {
        const partialDateTestCases: TestCaseSchema[] = [{
            case: 'go to work on 02/2009',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on 02/2009' },
            ],
        }, {
            case: 'go to work on Feb 2009',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on Feb 2009' },
            ],
        }, {
            case: 'go to work on February 2009',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on February 2009' },
            ],
        }, {
            case: 'go to work on 2/2009',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on 2/2009' },
            ],
        }, {
            case: 'go to work on 2009 Feb',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on 2009 Feb' },
            ],
        }, {
            case: 'go to work on 2009 February',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on 2009 February' },
            ],
        }, {
            case: 'go to work on 2009/2',
            result: [
                { dateTime: mockDates(1, 2, 2009), text: 'go to work', matched: 'on 2009/2' },
            ],
        }, {
            case: 'go to work on 02/20',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on 02/20' },
            ],
        }, {
            case: 'go to work on 02/10',
            result: [
                { dateTime: mockDates(2, 10, currentYear), text: 'go to work', matched: 'on 02/10' },
            ],
        }, {
            case: 'go to work on Feb 20',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on Feb 20' },
            ],
        }, {
            case: 'go to work on Feb 20th',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on Feb 20th' },
            ],
        }, {
            case: 'go to work on February 20',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on February 20' },
            ],
        }, {
            case: 'go to work on February 20th',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on February 20th' },
            ],
        }, {
            case: 'go to work on Feb 21st',
            result: [
                { dateTime: mockDates(21, 2, currentYear + 1), text: 'go to work', matched: 'on Feb 21st' },
            ],
        }, {
            case: 'go to work on Feb 22nd',
            result: [
                { dateTime: mockDates(22, 2, currentYear + 1), text: 'go to work', matched: 'on Feb 22nd' },
            ],
        }, {
            case: 'go to work on Feb 23rd',
            result: [
                { dateTime: mockDates(23, 2, currentYear + 1), text: 'go to work', matched: 'on Feb 23rd' },
            ],
        }, {
            case: 'go to work on 20/02',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on 20/02' },
            ],
        }, {
            case: 'go to work on 20 Feb',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on 20 Feb' },
            ],
        }, {
            case: 'go to work on 20th Feb',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on 20th Feb' },
            ],
        }, {
            case: 'go to work on 20 February',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on 20 February' },
            ],
        }, {
            case: 'go to work on 20th February',
            result: [
                { dateTime: mockDates(20, 2, currentYear + 1), text: 'go to work', matched: 'on 20th February' },
            ],
        }, {
            case: 'go to work on 21st Feb',
            result: [
                { dateTime: mockDates(21, 2, currentYear + 1), text: 'go to work', matched: 'on 21st Feb' },
            ],
        }, {
            case: 'go to work on 22nd Feb',
            result: [
                { dateTime: mockDates(22, 2, currentYear + 1), text: 'go to work', matched: 'on 22nd Feb' },
            ],
        }, {
            case: 'go to work on 23rd Feb',
            result: [
                { dateTime: mockDates(23, 2, currentYear + 1), text: 'go to work', matched: 'on 23rd Feb' },
            ],
        }];

        test('should parse the correct dates', () => {
            partialDateTestCases.forEach(item => {
                const parsedText = PartialDates.parseText(item.case);
                expect(parsedText).toEqual(item.result);
            });
        });
    });
});
