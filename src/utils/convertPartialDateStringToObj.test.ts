import convertPartialDateStringToObj from './convertPartialDateStringToObj';
import { DateTime } from 'luxon';

const currentYear = DateTime.utc().year;
describe('convertDateStringToObj', () => {
    const testCases = [{
        input: '02/2009',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: 'Feb 2009',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: 'February 2009',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: '2/2009',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: '2009 Feb',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: '2009 February',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: '2009/2',
        output: { day: 1, month: 2, year: 2009 },
    }, {
        input: '02/20',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: '02/10',
        output: { day: 2, month: 10, year: currentYear },
    }, {
        input: 'Feb 20',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: 'Feb 20th',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: 'February 20',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: 'February 20th',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: 'Feb 21st',
        output: { day: 21, month: 2, year: currentYear },
    }, {
        input: '20/02',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: '20 Feb',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: '20th Feb',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: '20 February',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: '20th February',
        output: { day: 20, month: 2, year: currentYear },
    }, {
        input: '22nd Feb',
        output: { day: 22, month: 2, year: currentYear },
    }, {
        input: '23rd Feb',
        output: { day: 23, month: 2, year: currentYear },
    }];

    test('should parse the correct dates', () => {
        testCases.forEach(item => {
            const parsedText = convertPartialDateStringToObj(item.input);
            expect(parsedText).toEqual(item.output);
        });
    });
});
