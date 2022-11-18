import WeekDay from './weekDay';
import { ParsedMatchSchema } from 'serina.schema';
import { dayLite } from 'lib/date/dayLite';

describe('Day Of The Week', () => {
    // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
    const mockDate = new Date('2019-01-19T18:06:18');
    vi.useFakeTimers().setSystemTime(mockDate);

    const mockWeekday = (weekday: number) => dayLite(mockDate).set({ weekday }).endOf('day').toDate();

    afterAll(() => {
        vi.useRealTimers();
    });

    describe('parseText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(8),
                    text: 'hand in paper',
                    matched: 'on mon',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should find multiple matches', () => {
            const text = "hand in tuesday's paper on mon";
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(9),
                    text: "hand in 's paper on mon",
                    matched: 'tuesday',
                },
                {
                    dateTime: mockWeekday(8),
                    text: "hand in tuesday's paper",
                    matched: 'on mon',
                },
            ];
            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should return correct case for matched string', () => {
            const text = 'Hand in paper on mon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(8),
                    text: 'Hand in paper',
                    matched: 'on mon',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should not match filler word in string', () => {
            const text = 'Gym session Sun';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(7),
                    text: 'Gym session',
                    matched: 'Sun',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });
    });

    describe('Parse Text Contains Weekday', () => {
        let result: ParsedMatchSchema[];
        const relativeFutureArray = ['buy milk', 'buy milk for', 'buy milk next', 'buy milk this'];
        const relativePastArray = ['buy milk last', 'buy milk prev', 'buy milk previous'];

        beforeEach(() => {
            result = [
                {
                    dateTime: null,
                    text: 'buy milk',
                    matched: '',
                },
            ];
        });

        describe.each([
            { title: 'Monday', next: 8, last: 1, weekdayArray: ['mon', 'monday'] },
            { title: 'Tuesday', next: 9, last: 2, weekdayArray: ['tue', 'tues', 'tuesday'] },
            { title: 'Wednesday', next: 10, last: 3, weekdayArray: ['wed', 'wedn', 'wednesday'] },
            { title: 'Thursday', next: 11, last: 4, weekdayArray: ['thu', 'thur', 'thursday'] },
            { title: 'Friday', next: 12, last: 5, weekdayArray: ['fri', 'friday'] },
            { title: 'Saturday', next: 13, last: 6, weekdayArray: ['sat', 'saturday'] },
            { title: 'Sunday', next: 7, last: 0, weekdayArray: ['sun', 'sunday'] },
        ])('$title', ({ title, next, last, weekdayArray }) => {
            test(`should parse date correctly for next ${title}`, () => {
                result[0].dateTime = mockWeekday(next);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test(`should return correct date for last ${title}`, () => {
                result[0].dateTime = mockWeekday(last);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });
    });
});
