import { DateTime, Settings } from 'luxon';
import { TestCaseSchema } from '../../serina.schema';
import DateAndTime from './dateAndTime';

const currentYear = DateTime.utc().year;

beforeAll(() => {
    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    Settings.now = () => 1561819692628;
});

afterAll(() => {
    // Restore Date Time Mock
    Settings.now = () => Date.now();
});

const mockDates = (day, month, year, hour, minute) => DateTime.utc()
    .set({ day, month, year, hour, minute })
    .startOf('minute')
    .toJSDate();

describe('DateAndTime', () => {

    const fullDateTestCases: TestCaseSchema[] = [{
        case: 'buy milk 20',
        result: null,
    }, {
        case: 'go to work on 02/17/2009 4pm',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on 02/17/2009 4pm' },
        ],
    }, {
        case: 'go to work on 17/02/2009 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2009, 8, 30), text: 'go to work', matched: 'on 17/02/2009 at 8:30am' },
        ],
    }, {
        case: 'attend daily stand up on 2009/02/17 09:45',
        result: [
            { dateTime: mockDates(17, 2, 2009, 9, 45), text: 'attend daily stand up', matched: 'on 2009/02/17 09:45' },
        ],
    }, {
        case: 'go to work 2/17/2009 9am',
        result: [
            { dateTime: mockDates(17, 2, 2009, 9, 0), text: 'go to work', matched: '2/17/2009 9am' },
        ],
    }, {
        case: 'go to work on 17/2/2009 by 12pm',
        result: [
            { dateTime: mockDates(17, 2, 2009, 12, 0), text: 'go to work', matched: 'on 17/2/2009 by 12pm' },
        ],
    }, {
        case: 'go to work on 2009/2/17 12am',
        result: [
            { dateTime: mockDates(17, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2009/2/17 12am' },
        ],
    }, {
        case: 'go to work on 2/17/2009 0:00',
        result: [
            { dateTime: mockDates(17, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2/17/2009 0:00' },
        ],
    }, {
        case: 'go to work on 2-17-2009 at 11:00',
        result: [
            { dateTime: mockDates(17, 2, 2009, 11, 0), text: 'go to work', matched: 'on 2-17-2009 at 11:00' },
        ],
    }, {
        case: 'go to work on February 17, 2009 at 4PM',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on February 17, 2009 at 4PM' },
        ],
    }, {
        case: 'go to work on 17 February, 2009 at 2 pm',
        result: [
            { dateTime: mockDates(17, 2, 2009, 14, 0), text: 'go to work', matched: 'on 17 February, 2009 at 2 pm' },
        ],
    }, {
        case: 'go to work on Feb 17, 2009 at 4 p.M.',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on Feb 17, 2009 at 4 p.M.' },
        ],
    }, {
        case: 'go to work on 17 Feb, 2009 by 4 p.m.',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on 17 Feb, 2009 by 4 p.m.' },
        ],
    }, {
        case: 'go to work on Feb 17, 2014 by 4p.m.',
        result: [
            { dateTime: mockDates(17, 2, 2014, 16, 0), text: 'go to work', matched: 'on Feb 17, 2014 by 4p.m.' },
        ],
    }, {
        case: 'go to work on 17 Feb, 2014 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2014, 8, 30), text: 'go to work', matched: 'on 17 Feb, 2014 at 8:30am' },
        ],
    }, {
        case: 'go to work on 21st Feb 2019 at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, 2019, 8, 30), text: 'go to work', matched: 'on 21st Feb 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 21st 2019 at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, 2019, 8, 30), text: 'go to work', matched: 'on Feb 21st 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on 22nd Feb 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on 22nd Feb 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 22nd 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on Feb 22nd 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on 22nd Feb 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on 22nd Feb 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 22nd 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on Feb 22nd 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on 17th February 2019 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2019, 8, 30), text: 'go to work', matched: 'on 17th February 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work by February 17th 2019 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2019, 8, 30), text: 'go to work', matched: 'by February 17th 2019 at 8:30am' },
        ],
    }];

    const partialDateTestCases: TestCaseSchema[] = [{
        case: 'go to work on 02/2009 at 8:30 am',
        result: [
            { dateTime: mockDates(1, 2, 2009, 8, 30), text: 'go to work', matched: 'on 02/2009 at 8:30 am' },
        ],
    }, {
        case: 'attend daily stand up on Feb 2009 09:45',
        result: [
            { dateTime: mockDates(1, 2, 2009, 9, 45), text: 'attend daily stand up', matched: 'on Feb 2009 09:45' },
        ],
    }, {
        case: 'go to work on February 2009 9am',
        result: [
            { dateTime: mockDates(1, 2, 2009, 9, 0), text: 'go to work', matched: 'on February 2009 9am' },
        ],
    }, {
        case: 'go to work on 2/2009 by 7pm',
        result: [
            { dateTime: mockDates(1, 2, 2009, 19, 0), text: 'go to work', matched: 'on 2/2009 by 7pm' },
        ],
    }, {
        case: 'go to work on 2009 Feb 12pm',
        result: [
            { dateTime: mockDates(1, 2, 2009, 12, 0), text: 'go to work', matched: 'on 2009 Feb 12pm' },
        ],
    }, {
        case: 'go to work on 2009 February 12am',
        result: [
            { dateTime: mockDates(1, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2009 February 12am' },
        ],
    }, {
        case: 'go to work on 2009/2 0:00',
        result: [
            { dateTime: mockDates(1, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2009/2 0:00' },
        ],
    }, {
        case: 'go to work on 02/20 at 11:00',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 11, 0), text: 'go to work', matched: 'on 02/20 at 11:00' },
        ],
    }, {
        case: 'go to work on 02/10 at 4PM',
        result: [
            { dateTime: mockDates(2, 10, currentYear, 16, 0 ), text: 'go to work', matched: 'on 02/10 at 4PM' },
        ],
    },  {
        case: 'go to work on 02-20 at 2 pm',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 14, 0), text: 'go to work', matched: 'on 02-20 at 2 pm' },
        ],
    }, {
        case: 'go to work on 02-10 at 4 p.M.',
        result: [
            { dateTime: mockDates(2, 10, currentYear, 16, 0), text: 'go to work', matched: 'on 02-10 at 4 p.M.' },
        ],
    }, {
        case: 'go to work on Feb 20 by 4p.m.',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 16, 0), text: 'go to work', matched: 'on Feb 20 by 4p.m.' },
        ],
    }, {
        case: 'go to work on Feb 20th at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 20th at 8:30am' },
        ],
    }, {
        case: 'go to work on February 20 at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on February 20 at 8:30am' },
        ],
    }, {
        case: 'go to work on February 20th at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on February 20th at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 21st at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 21st at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 22nd at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 22nd at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 23rd at 8:30am',
        result: [
            { dateTime: mockDates(23, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 23rd at 8:30am' },
        ],
    }, {
        case: 'go to work on 20/02 at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20/02 at 8:30am' },
        ],
    }, {
        case: 'go to work on 20 Feb at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20 Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 20th Feb at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20th Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 20 February at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20 February at 8:30am' },
        ],
    }, {
        case: 'go to work on 20th February at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20th February at 8:30am' },
        ],
    }, {
        case: 'go to work on 21st Feb at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 21st Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 22nd Feb at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 22nd Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 23rd Feb at 8:30am',
        result: [
            { dateTime: mockDates(23, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 23rd Feb at 8:30am' },
        ],
    }, {
        case: 'buy milk 20',
        result: null,
    }];

    test('should parse the correct dates when dates are full', () => {
        fullDateTestCases.forEach(item => {
            const parsedText = DateAndTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });

    test('should parse the correct dates when dates are partial', () => {
        partialDateTestCases.forEach(item => {
            const parsedText = DateAndTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });
});
