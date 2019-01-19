import { DateTime } from 'luxon';
import DayOfTheWeek from './dayOfTheWeek';
import { ParsedMatchSchema } from '../../serina.schema';

describe('Day Of The Week', () => {
    const mockWeekday = weekday => {
        return DateTime.local()
            .set({ weekday })
            .startOf('second')
            .toJSDate();
    };

    describe('parseText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(8),
                    text: 'hand in paper',
                    matched: 'on mon'
                }
            ];

            expect(DayOfTheWeek.parseText(text)).toEqual(result);
        });

        test('should find multiple matches', () => {
            const text = "hand in tuesday's paper on mon";
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(9),
                    text: "hand in 's paper on mon",
                    matched: 'tuesday'
                },
                {
                    dateTime: mockWeekday(8),
                    text: "hand in tuesday's paper",
                    matched: 'on mon'
                }
            ];
            expect(DayOfTheWeek.parseText(text)).toEqual(result);
        });
    });

    describe('matchWeekdays()', () => {
        test('should match monday', () => {
            expect(DayOfTheWeek.matchWeekdays('mon')).toEqual(['mon']);
            expect(DayOfTheWeek.matchWeekdays('Mon')).toEqual(['mon']);
            expect(DayOfTheWeek.matchWeekdays('monday')).toEqual(['monday']);
            expect(DayOfTheWeek.matchWeekdays('Monday')).toEqual(['monday']);
        });

        test('should match tuesday', () => {
            expect(DayOfTheWeek.matchWeekdays('tue')).toEqual(['tue']);
            expect(DayOfTheWeek.matchWeekdays('Tue')).toEqual(['tue']);
            expect(DayOfTheWeek.matchWeekdays('tues')).toEqual(['tues']);
            expect(DayOfTheWeek.matchWeekdays('Tues')).toEqual(['tues']);
            expect(DayOfTheWeek.matchWeekdays('tuesday')).toEqual(['tuesday']);
            expect(DayOfTheWeek.matchWeekdays('Tuesday')).toEqual(['tuesday']);
        });

        test('should match wednesday', () => {
            expect(DayOfTheWeek.matchWeekdays('wed')).toEqual(['wed']);
            expect(DayOfTheWeek.matchWeekdays('Wed')).toEqual(['wed']);
            expect(DayOfTheWeek.matchWeekdays('wedn')).toEqual(['wedn']);
            expect(DayOfTheWeek.matchWeekdays('Wedn')).toEqual(['wedn']);
            expect(DayOfTheWeek.matchWeekdays('wednesday')).toEqual(['wednesday']);
            expect(DayOfTheWeek.matchWeekdays('Wednesday')).toEqual(['wednesday']);
        });

        test('should match thursday', () => {
            expect(DayOfTheWeek.matchWeekdays('thu')).toEqual(['thu']);
            expect(DayOfTheWeek.matchWeekdays('Thu')).toEqual(['thu']);
            expect(DayOfTheWeek.matchWeekdays('thur')).toEqual(['thur']);
            expect(DayOfTheWeek.matchWeekdays('Thur')).toEqual(['thur']);
            expect(DayOfTheWeek.matchWeekdays('thursday')).toEqual(['thursday']);
            expect(DayOfTheWeek.matchWeekdays('Thursday')).toEqual(['thursday']);
        });

        test('should match friday', () => {
            expect(DayOfTheWeek.matchWeekdays('fri')).toEqual(['fri']);
            expect(DayOfTheWeek.matchWeekdays('Fri')).toEqual(['fri']);
            expect(DayOfTheWeek.matchWeekdays('friday')).toEqual(['friday']);
            expect(DayOfTheWeek.matchWeekdays('Friday')).toEqual(['friday']);
        });

        test('should match saturday', () => {
            expect(DayOfTheWeek.matchWeekdays('sat')).toEqual(['sat']);
            expect(DayOfTheWeek.matchWeekdays('Sat')).toEqual(['sat']);
            expect(DayOfTheWeek.matchWeekdays('saturday')).toEqual(['saturday']);
            expect(DayOfTheWeek.matchWeekdays('Saturday')).toEqual(['saturday']);
        });

        test('should match sunday', () => {
            expect(DayOfTheWeek.matchWeekdays('sun')).toEqual(['sun']);
            expect(DayOfTheWeek.matchWeekdays('Sun')).toEqual(['sun']);
            expect(DayOfTheWeek.matchWeekdays('sunday')).toEqual(['sunday']);
            expect(DayOfTheWeek.matchWeekdays('Sunday')).toEqual(['sunday']);
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
                    matched: ''
                }
            ];
        });

        describe('For Monday', () => {
            const weekdayArray = ['mon', 'monday'];
            test('should parse date correctly for next monday', () => {
                result[0].dateTime = mockWeekday(8);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last monday', () => {
                result[0].dateTime = mockWeekday(1);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Tuesday', () => {
            const weekdayArray = ['tue', 'tues', 'tuesday'];

            test('should parse date correctly for next tuesday', () => {
                result[0].dateTime = mockWeekday(9);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last tuesday', () => {
                result[0].dateTime = mockWeekday(2);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Wednesday', () => {
            const weekdayArray = ['wed', 'wedn', 'wednesday'];

            test('should parse date correctly for next wednesday', () => {
                result[0].dateTime = mockWeekday(10);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last wednesday', () => {
                result[0].dateTime = mockWeekday(3);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Thursday', () => {
            const weekdayArray = ['thu', 'thur', 'thursday'];

            test('should parse date correctly for next thursday', () => {
                result[0].dateTime = mockWeekday(11);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last thursday', () => {
                result[0].dateTime = mockWeekday(4);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Friday', () => {
            const weekdayArray = ['fri', 'friday'];

            test('should parse date correctly for next friday', () => {
                result[0].dateTime = mockWeekday(12);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last friday', () => {
                result[0].dateTime = mockWeekday(5);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Saturday', () => {
            const weekdayArray = ['sat', 'saturday'];

            test('should parse date correctly for next saturday', () => {
                result[0].dateTime = mockWeekday(13);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last saturday', () => {
                result[0].dateTime = mockWeekday(6);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Sunday', () => {
            const weekdayArray = ['sun', 'sunday'];

            test('should parse date correctly for next sunday', () => {
                result[0].dateTime = mockWeekday(14);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last sunday', () => {
                result[0].dateTime = mockWeekday(7);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(DayOfTheWeek.parseText(combination)).toEqual(result);
                    });
                });
            });
        });
    });
});
