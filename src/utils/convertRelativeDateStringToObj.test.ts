import { DateTime, Settings } from 'luxon';
import { getNext } from './convertRelativeDateStringToObj';

// Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
const mockDate = 1561019692628;
Settings.now = () => mockDate;

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

    describe('getNext', () => {
        test('correctly gets start of next week', () => {
            const testDate = DateTime.utc(2019, 2, 6).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('week');
            expect(parsedNext.toJSDate()).toEqual(mockDates(11, 2, 2019));
        });

        test('correctly gets start of next month', () => {
            const testDate = DateTime.utc(2019, 5, 20).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('month');
            expect(parsedNext.toJSDate()).toEqual(mockDates(1, 6, 2019));
        });

        test('correctly gets start of next month when the date is near the end of a longer month', () => {
            const testDate = DateTime.utc(2019, 1, 31).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('month');
            expect(parsedNext.toJSDate()).toEqual(mockDates(1, 2, 2019));
        });

        test('correctly gets start of next month when the date is near the beginning of a shorter month', () => {
            const testDate = DateTime.utc(2019, 2, 1).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('month');
            expect(parsedNext.toJSDate()).toEqual(mockDates(1, 3, 2019));
        });

        test('correctly gets start of next month when the date is near the end of the year', () => {
            const testDate = DateTime.utc(2019, 12, 2).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('month');
            expect(parsedNext.toJSDate()).toEqual(mockDates(1, 1, 2020));
        });

        test('correctly gets start of next year', () => {
            const testDate = DateTime.utc(2019, 5, 20).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('year');
            expect(parsedNext.toJSDate()).toEqual(mockDates(1, 1, 2020));
        });

        test('correctly gets start of next year when the date is near the start of a leap year', () => {
            const testDate = DateTime.utc(2020, 1, 1).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('year');
            expect(parsedNext.toJSDate()).toEqual(mockDates(1, 1, 2021));
        });

        test('correctly fails when the date is illegal', () => {
            const testDate = DateTime.utc(2019, 2, 31).toMillis();
            Settings.now = () => testDate;
            const parsedNext = getNext('month');
            expect(parsedNext === null);
        });
    });
});
