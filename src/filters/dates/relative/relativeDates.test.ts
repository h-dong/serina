import { DateTime, Settings } from 'luxon';
import { TestCaseSchema } from '../../../serina.schema';
import RelativeDates from './relativeDates';

// Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
const mockDate = 1561019692628;
Settings.now = () => mockDate;
const currentYear = DateTime.utc().year;
const currentMonth = DateTime.utc().month;
const currentDay = DateTime.utc().day;

beforeEach(() => {
    // Reset the mock in case we need to change it for individual tests
    Settings.now = () => mockDate;
});

afterAll(() => {
    // Restore Date Time Mock
    Settings.now = () => Date.now();
});

describe('RelativeDates', () => {
    const mockDates = (day, month, year) => DateTime.utc()
        .set({ day, month, year })
        .endOf('day')
        .toJSDate();

    const mockNext = (period) => DateTime.utc()
        .plus({ [period]: 1 })
        .startOf(period)
        .endOf('day')
        .toJSDate();

    describe('parseText', () => {
        const testCases: TestCaseSchema[] = [
        {
            description: 'should parse today correctly',
            case: 'go to work today',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear), text: 'go to work', matched: 'today' },
            ],
        }, {
            description: 'should parse tomorrow correctly',
            case: 'go to work tomorrow',
            result: [
                { dateTime: mockDates(currentDay + 1, currentMonth, currentYear), text: 'go to work', matched: 'tomorrow' },
            ],
        }, {
            description: 'should parse in X days correctly',
            case: 'go to work in 5 days',
            result: [
                { dateTime: mockDates(currentDay + 5, currentMonth, currentYear), text: 'go to work', matched: 'in 5 days' },
            ],
        }, {
            description: 'should roll over to next month correctly when the month threshold is crossed',
            case: 'go to work in 31 days',
            result: [
                { dateTime: mockDates(currentDay + 31, currentMonth, currentYear), text: 'go to work', matched: 'in 31 days' },
            ],
        }, {
            description: 'should parse in a day correctly',
            case: 'go to work in a day',
            result: [
                { dateTime: mockDates(currentDay + 1, currentMonth, currentYear), text: 'go to work', matched: 'in a day' },
            ],
        }, {
            description: 'should parse in a week correctly',
            case: 'go to work in a week',
            result: [
                { dateTime: (mockDates(currentDay + 7, currentMonth, currentYear)), text: 'go to work', matched: 'in a week' },
            ],
        }, {
            description: 'should parse in X weeks correctly',
            case: 'go to work in 5 weeks',
            result: [
                { dateTime: mockDates(currentDay + 35, currentMonth, currentYear), text: 'go to work', matched: 'in 5 weeks' },
            ],
        }, {
            description: 'should parse next week correctly',
            case: 'go to work next week',
            result: [
                { dateTime: mockNext('week'), text: 'go to work', matched: 'next week' },
            ],
        }, {
            description: 'should parse in a wk correctly',
            case: 'go to work in a wk',
            result: [
                { dateTime: mockDates(currentDay + 7, currentMonth, currentYear), text: 'go to work', matched: 'in a wk' },
            ],
        }, {
            description: 'should parse in X wks correctly',
            case: 'go to work in 5 wks',
            result: [
                { dateTime: mockDates(currentDay + 35, currentMonth, currentYear), text: 'go to work', matched: 'in 5 wks' },
            ],
        }, {
            description: 'should parse in a month correctly',
            case: 'go to work in a month',
            result: [
                { dateTime: mockDates(currentDay, currentMonth + 1, currentYear), text: 'go to work', matched: 'in a month' },
            ],
        }, {
            description: 'should parse in X months correctly',
            case: 'go to work in 5 months',
            result: [
                { dateTime: mockDates(currentDay, currentMonth + 5, currentYear), text: 'go to work', matched: 'in 5 months' },
            ],
        }, {
            description: 'should roll over to next year correctly when the year threshold is crossed',
            case: 'go to work in 12 months',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 1), text: 'go to work', matched: 'in 12 months' },
            ],
        }, {
            description: 'should parse next month correctly',
            case: 'go to work next month',
            result: [
                { dateTime: mockNext('month'), text: 'go to work', matched: 'next month' },
            ],
        }, {
            description: 'should parse in a year correctly',
            case: 'go to work in a year',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 1), text: 'go to work', matched: 'in a year' },
            ],
        }, {
            description: 'should parse in X years correctly',
            case: 'go to work in 5 years',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 5), text: 'go to work', matched: 'in 5 years' },
            ],
        }, {
            description: 'should parse next year correctly',
            case: 'go to work next year',
            result: [
                { dateTime: mockNext('year'), text: 'go to work', matched: 'next year' },
            ],
        }, {
            description: 'should parse in a yr correctly',
            case: 'go to work in a yr',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 1), text: 'go to work', matched: 'in a yr' },
            ],
        }, {
            description: 'should parse in X yrs correctly',
            case: 'go to work in 5 yrs',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 5), text: 'go to work', matched: 'in 5 yrs' },
            ],
        }, {
            description: 'should parse "later" correctly',
            case: 'go to work 5 years later',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 5), text: 'go to work', matched: '5 years later' },
            ],
        }, {
            description: 'should parse "from now" correctly',
            case: 'go to work 5 years from now',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 5), text: 'go to work', matched: '5 years from now' },
            ],
        }, {
            description: 'should parse "from now" correctly',
            case: '5 years from now go to work',
            result: [
                { dateTime: mockDates(currentDay, currentMonth, currentYear + 5), text: 'go to work', matched: '5 years from now' },
            ],
        }, {
            description: 'should not parse without date units',
            case: 'go to work in 5',
            result: null,
        }];

        testCases.forEach(item => {
            test(item.description, () => {
                const parsedText = RelativeDates.parseText(item.case);
                expect(parsedText).toEqual(item.result);
            });
        });
    });
});
