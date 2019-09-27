import { DateTime } from 'luxon';
import { TestCaseSchema } from '../../serina.schema';
import Time from './time';

describe('Time', () => {
    const mockTime = (hour, minute) => DateTime.utc()
        .set({ hour, minute })
        .startOf('minute')
        .toJSDate();

    describe('parseText', () => {
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
                case: 'attend daily stand up 24:45',
                result: null,
            },
            {
                case: 'attend daily stand up 25pm',
                result: null,
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
            {
                case: 'go to work at quarter to 4',
                result: [
                    { dateTime: mockTime(3, 45), text: 'go to work', matched: 'at quarter to 4' },
                ],
            },
            {
                case: 'go to work at quarter past 4',
                result: [
                    { dateTime: mockTime(4, 15), text: 'go to work', matched: 'at quarter past 4' },
                ],
            },
            {
                case: 'go to work at quarter to 4pm',
                result: [
                    { dateTime: mockTime(15, 45), text: 'go to work', matched: 'at quarter to 4pm' },
                ],
            },
            {
                case: 'go to work at half past 4',
                result: [
                    { dateTime: mockTime(4, 30), text: 'go to work', matched: 'at half past 4' },
                ],
            },
            {
                case: 'go to work at 20 past 4',
                result: [
                    { dateTime: mockTime(4, 20), text: 'go to work', matched: 'at 20 past 4' },
                ],
            },
            {
                case: 'go to work at 20 minutes past 4',
                result: [
                    { dateTime: mockTime(4, 20), text: 'go to work', matched: 'at 20 minutes past 4' },
                ],
            },
            {
                case: 'go to work at 20 min past 4',
                result: [
                    { dateTime: mockTime(4, 20), text: 'go to work', matched: 'at 20 min past 4' },
                ],
            },
            {
                case: 'go to work at 20 min to 12am',
                result: [
                    { dateTime: mockTime(23, 40), text: 'go to work', matched: 'at 20 min to 12am' },
                ],
            },
            {
                case: 'go to work at 20 min to 90',
                result: null,
            },
            {
                case: 'go to work at 20 min to 23',
                result: [
                    { dateTime: mockTime(22, 40), text: 'go to work', matched: 'at 20 min to 23' },
                ],
            },
            {
                case: 'go to work at 20 min to 24',
                result: null,
            },
            {
                case: 'go to work at 20 min to 19',
                result: [
                    { dateTime: mockTime(18, 40), text: 'go to work', matched: 'at 20 min to 19' },
                ],
            },
        ];
        test('should parse sentences with time correctly', () => {
            testCases.forEach(item => {
                const parsedText = Time.parseText(item.case);
                expect(parsedText).toEqual(item.result);
            });
        });
    });

    describe('convertVerbalExpressionToString', () => {
        const testCases = [
            {  case: 'quarter to 4', result: { hour: 3, minute: 45 } },
            {  case: 'quarter past 4', result: { hour: 4, minute: 15 } },
            {  case: 'quarter to 4pm', result: { hour: 15, minute: 45 } },
            {  case: 'half past 4', result: { hour: 4, minute: 30 } },
            {  case: '20 past 4', result: { hour: 4, minute: 20 } },
            {  case: '20 minutes past 4', result: { hour: 4, minute: 20 } },
            {  case: '20 min past 4', result: { hour: 4, minute: 20 } },
            {  case: '25 min to 12am', result: { hour: 23, minute: 35 } },
        ];
        test('should give correct result', () => {
            testCases.forEach(item => {
                const parsedText = Time.convertVerbalExpressionToObj(item.case);
                expect(parsedText).toEqual(item.result);
            });
        });
    });

    describe('convertMinutePartToNumber', () => {
        const testCases = [
            {  minutePart: 'quarter', beforeHour: true, result: 45 },
            {  minutePart: 'quarter', beforeHour: false, result: 15 },
            {  minutePart: 'half', beforeHour: false, result: 30 },
            {  minutePart: 'half', beforeHour: true, result: 30 },
            {  minutePart: '20', beforeHour: false, result: 20 },
            {  minutePart: '20', beforeHour: true, result: 40 },
        ];
        test('should give correct result', () => {
            testCases.forEach(item => {
                const parsedText = Time.convertMinutePartToNumber(item.minutePart, item.beforeHour);
                expect(parsedText).toEqual(item.result);
            });
        });
    });

    describe('convertHourPartToNumber', () => {
        let hourPart;
        test('should give correct result when no meridiem is used', () => {
            hourPart = '3';
            const parsedText = Time.convertHourPartToNumber(hourPart, false);
            expect(parsedText).toEqual(3);
        });
        test('should give correct result when AM meridiem is used', () => {
            hourPart = '3am';
            const parsedText = Time.convertHourPartToNumber(hourPart, false);
            expect(parsedText).toEqual(3);
        });
        test('should give correct result when PM meridiem is used', () => {
            hourPart = '3pm';
            const parsedText = Time.convertHourPartToNumber(hourPart, false);
            expect(parsedText).toEqual(15);
        });
        test('should correctly subtract 1 hour if beforeHour is true', () => {
            hourPart = '3pm';
            const parsedText = Time.convertHourPartToNumber(hourPart, true);
            expect(parsedText).toEqual(14);
        });
        test('should correctly set hour to 11pm if beforeHour is true and hour is 12am', () => {
            hourPart = '12am';
            const parsedText = Time.convertHourPartToNumber(hourPart, true);
            expect(parsedText).toEqual(23);
        });
    });
});
