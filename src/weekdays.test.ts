import { DateTime } from 'luxon';
import serina from './serina';
import Helper from './Helper';
import { ParsedSchema } from './serina.schema';

describe('Week Days', () => {
    describe('parseWeekdayInText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedSchema = {
                original: text,
                isValid: true,
                matches: [
                    {
                        dateTime: DateTime.local()
                            .set({ weekday: 8 })
                            .startOf('second')
                            .toJSDate(),
                        text: 'hand in paper',
                        matched: 'on mon'
                    }
                ]
            };

            expect(Helper.parseWeekdayInText(text)).toEqual(result);
        });

        test('should find multiple matches', () => {
            const text = "hand in tuesday's paper on mon";
            const result: ParsedSchema = {
                original: text,
                isValid: true,
                matches: [
                    {
                        dateTime: DateTime.local()
                            .set({ weekday: 9 })
                            .startOf('second')
                            .toJSDate(),
                        text: "hand in 's paper on mon",
                        matched: 'tuesday'
                    },
                    {
                        dateTime: DateTime.local()
                            .set({ weekday: 8 })
                            .startOf('second')
                            .toJSDate(),
                        text: "hand in tuesday's paper",
                        matched: 'on mon'
                    }
                ]
            };
            expect(Helper.parseWeekdayInText(text)).toEqual(result);
        });
    });

    describe('matchWeekdays()', () => {
        test('should match monday', () => {
            expect(Helper.matchWeekdays('mon')).toEqual(['mon']);
            expect(Helper.matchWeekdays('Mon')).toEqual(['mon']);
            expect(Helper.matchWeekdays('monday')).toEqual(['monday']);
            expect(Helper.matchWeekdays('Monday')).toEqual(['monday']);
        });

        test('should match tuesday', () => {
            expect(Helper.matchWeekdays('tue')).toEqual(['tue']);
            expect(Helper.matchWeekdays('Tue')).toEqual(['tue']);
            expect(Helper.matchWeekdays('tues')).toEqual(['tues']);
            expect(Helper.matchWeekdays('Tues')).toEqual(['tues']);
            expect(Helper.matchWeekdays('tuesday')).toEqual(['tuesday']);
            expect(Helper.matchWeekdays('Tuesday')).toEqual(['tuesday']);
        });

        test('should match wednesday', () => {
            expect(Helper.matchWeekdays('wed')).toEqual(['wed']);
            expect(Helper.matchWeekdays('Wed')).toEqual(['wed']);
            expect(Helper.matchWeekdays('wedn')).toEqual(['wedn']);
            expect(Helper.matchWeekdays('Wedn')).toEqual(['wedn']);
            expect(Helper.matchWeekdays('wednesday')).toEqual(['wednesday']);
            expect(Helper.matchWeekdays('Wednesday')).toEqual(['wednesday']);
        });

        test('should match thursday', () => {
            expect(Helper.matchWeekdays('thu')).toEqual(['thu']);
            expect(Helper.matchWeekdays('Thu')).toEqual(['thu']);
            expect(Helper.matchWeekdays('thur')).toEqual(['thur']);
            expect(Helper.matchWeekdays('Thur')).toEqual(['thur']);
            expect(Helper.matchWeekdays('thursday')).toEqual(['thursday']);
            expect(Helper.matchWeekdays('Thursday')).toEqual(['thursday']);
        });

        test('should match friday', () => {
            expect(Helper.matchWeekdays('fri')).toEqual(['fri']);
            expect(Helper.matchWeekdays('Fri')).toEqual(['fri']);
            expect(Helper.matchWeekdays('friday')).toEqual(['friday']);
            expect(Helper.matchWeekdays('Friday')).toEqual(['friday']);
        });

        test('should match saturday', () => {
            expect(Helper.matchWeekdays('sat')).toEqual(['sat']);
            expect(Helper.matchWeekdays('Sat')).toEqual(['sat']);
            expect(Helper.matchWeekdays('saturday')).toEqual(['saturday']);
            expect(Helper.matchWeekdays('Saturday')).toEqual(['saturday']);
        });

        test('should match sunday', () => {
            expect(Helper.matchWeekdays('sun')).toEqual(['sun']);
            expect(Helper.matchWeekdays('Sun')).toEqual(['sun']);
            expect(Helper.matchWeekdays('sunday')).toEqual(['sunday']);
            expect(Helper.matchWeekdays('Sunday')).toEqual(['sunday']);
        });
    });
    describe('Parse Text Contains Weekday', () => {
        let result: ParsedSchema;
        const weekdays = [
            'mon',
            'monday',
            'tue',
            'tues',
            'tuesday',
            'wed',
            'wedn',
            'wednesday',
            'thu',
            'thur',
            'thursday',
            'fri',
            'friday',
            'sat',
            'saturday',
            'sun',
            'sunday'
        ];

        beforeEach(() => {
            result = {
                original: '',
                isValid: true,
                matches: [
                    {
                        dateTime: DateTime.local()
                            .set({ weekday: 8 })
                            .startOf('second')
                            .toJSDate(),
                        text: 'buy milk',
                        matched: ''
                    }
                ]
            };
        });

        test('should parse date correctly for next monday', () => {
            const text = ['buy milk', 'buy milk for', 'buy milk next', 'buy milk this'];

            text.forEach(elem => {
                ['mon', 'monday'].forEach(weekday => {
                    const combination = `${elem} ${weekday}`;
                    result.original = combination;
                    result.matches[0].matched = combination.replace('buy milk ', '');
                    expect(serina(combination)).toEqual(result);
                });
            });
        });

        test('should return correct date for last monday', () => {
            const text = ['buy milk last', 'buy milk prev', 'buy milk previous'];

            result.matches[0].dateTime = DateTime.local()
                .set({ weekday: 1 })
                .startOf('second')
                .toJSDate();

            text.forEach(elem => {
                ['mon', 'monday'].forEach(weekday => {
                    const combination = `${elem} ${weekday}`;
                    result.original = combination;
                    result.matches[0].matched = combination.replace('buy milk ', '');
                    expect(serina(combination)).toEqual(result);
                });
            });
        });
    });
});
