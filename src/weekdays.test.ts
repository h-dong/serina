import { DateTime } from 'luxon';
import serina from './serina';
import Helper from './Helper';
import { ParsedSchema } from './serina.schema';

describe('Week Days', () => {
    const mockWeekday = weekday => {
        return DateTime.local()
            .set({ weekday })
            .startOf('second')
            .toJSDate();
    };

    describe('parseWeekdayInText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedSchema = {
                original: text,
                isValid: true,
                matches: [
                    {
                        dateTime: mockWeekday(8),
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
                        dateTime: mockWeekday(9),
                        text: "hand in 's paper on mon",
                        matched: 'tuesday'
                    },
                    {
                        dateTime: mockWeekday(8),
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
        const relativeFutureArray = ['buy milk', 'buy milk for', 'buy milk next', 'buy milk this'];
        const relativePastArray = ['buy milk last', 'buy milk prev', 'buy milk previous'];

        beforeEach(() => {
            result = {
                original: '',
                isValid: true,
                matches: [
                    {
                        dateTime: null,
                        text: 'buy milk',
                        matched: ''
                    }
                ]
            };
        });

        describe('For Monday', () => {
            const weekdayArray = ['mon', 'monday'];
            test('should parse date correctly for next monday', () => {
                result.matches[0].dateTime = mockWeekday(8);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last monday', () => {
                result.matches[0].dateTime = mockWeekday(1);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Tuesday', () => {
            const weekdayArray = ['tue', 'tues', 'tuesday'];

            test('should parse date correctly for next tuesday', () => {
                result.matches[0].dateTime = mockWeekday(9);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last tuesday', () => {
                result.matches[0].dateTime = mockWeekday(2);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Wednesday', () => {
            const weekdayArray = ['wed', 'wedn', 'wednesday'];

            test('should parse date correctly for next wednesday', () => {
                result.matches[0].dateTime = mockWeekday(10);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last wednesday', () => {
                result.matches[0].dateTime = mockWeekday(3);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Thursday', () => {
            const weekdayArray = ['thu', 'thur', 'thursday'];

            test('should parse date correctly for next thursday', () => {
                result.matches[0].dateTime = mockWeekday(11);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last thursday', () => {
                result.matches[0].dateTime = mockWeekday(4);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Friday', () => {
            const weekdayArray = ['fri', 'friday'];

            test('should parse date correctly for next friday', () => {
                result.matches[0].dateTime = mockWeekday(12);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last friday', () => {
                result.matches[0].dateTime = mockWeekday(5);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Saturday', () => {
            const weekdayArray = ['sat', 'saturday'];

            test('should parse date correctly for next saturday', () => {
                result.matches[0].dateTime = mockWeekday(13);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last saturday', () => {
                result.matches[0].dateTime = mockWeekday(6);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });

        describe('For Sunday', () => {
            const weekdayArray = ['sun', 'sunday'];

            test('should parse date correctly for next sunday', () => {
                result.matches[0].dateTime = mockWeekday(14);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });

            test('should return correct date for last sunday', () => {
                result.matches[0].dateTime = mockWeekday(7);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result.original = combination;
                        result.matches[0].matched = combination.replace('buy milk ', '');
                        expect(serina(combination)).toEqual(result);
                    });
                });
            });
        });
    });
});
