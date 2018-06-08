import { DateTime } from 'luxon';
import serina from './serina';
import Helper from './Helper';
import { ParsedSchema } from 'serina.interface';

describe('Week Days', () => {
    describe('parseWeekdayInText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedSchema = {
                original: text,
                isValid: true,
                matches: [{
                    dateTime: DateTime.local().set({ weekday : 8 }).startOf('second').toJSDate(),
                    text: 'hand in paper on'
                }]
            };

            expect(Helper.parseWeekdayInText(text)).toEqual(result);
        });

        test('should find multiple matches', () => {
            const text = 'hand in tuesday\'s paper on mon';
            const result: ParsedSchema = {
                original: text,
                isValid: true,
                matches: [{
                    dateTime: DateTime.local().set({ weekday : 9 }).startOf('second').toJSDate(),
                    text: 'hand in \'s paper on mon'
                }, {
                    dateTime: DateTime.local().set({ weekday : 8 }).startOf('second').toJSDate(),
                    text: 'hand in tuesday\'s paper on'
                }]
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
    describe.skip('Monday', () => {
      let correctResult;

      beforeEach(() => {
        correctResult = {
          original: 'buy milk mon',
          text: 'buy milk',
          isValid: true,
          dateTime: DateTime.local().set({ weekday : 8 }).startOf('second').toJSDate()
        };
      });

      test('should return correct date for mon', () => {
        expect(serina('buy milk mon')).toEqual(correctResult);
      });

      test('should return correct date for Mon', () => {
        correctResult.original = 'buy milk Mon';
        expect(serina('buy milk Mon')).toEqual(correctResult);
      });

      test('should return correct date for monday', () => {
        correctResult.original = 'buy milk monday';
        expect(serina('buy milk monday')).toEqual(correctResult);
      });

      test('should return correct date for Monday', () => {
        correctResult.original = 'buy milk Monday';
        expect(serina('buy milk Monday')).toEqual(correctResult);
      });

      test('should return correct date for next monday', () => {
        correctResult.original = 'buy milk next monday';
        expect(serina('buy milk next monday')).toEqual(correctResult);
      });

      test('should return correct date for next Monday', () => {
        correctResult.original = 'buy milk next Monday';
        expect(serina('buy milk next Monday')).toEqual(correctResult);
      });

      test('should return correct date for this monday', () => {
        correctResult.original = 'buy milk this monday';
        correctResult.dateTime = DateTime.local().set({ weekday : 1 }).startOf('second').toJSDate();
        expect(serina('buy milk this monday')).toEqual(correctResult);
      });

      test('should return correct date for this Monday', () => {
        correctResult.original = 'buy milk this Monday';
        correctResult.dateTime = DateTime.local().set({ weekday : 1 }).startOf('second').toJSDate();
        expect(serina('buy milk this Monday')).toEqual(correctResult);
      });

      test('should return correct date for last monday', () => {
        correctResult.original = 'buy milk last monday';
        correctResult.dateTime = DateTime.local().set({ weekday : 1 }).startOf('second').toJSDate();
        expect(serina('buy milk last monday')).toEqual(correctResult);
      });

      test('should return correct date for last Monday', () => {
        correctResult.original = 'buy milk last Monday';
        correctResult.dateTime = DateTime.local().set({ weekday : 1 }).startOf('second').toJSDate();
        expect(serina('buy milk last Monday')).toEqual(correctResult);
      });
    });

    describe.skip('Tuesday', () => {
      test('should return correct date for Tuesday', () => {
        expect(serina('buy milk Tuesday').dateTime).toBe('hello world');
      });

      test('should return correct date for next Tuesday', () => {
        expect(serina('buy milk next Tuesday').dateTime).toBe('hello world');
      });

      test('should return correct date for Wednesday', () => {
        expect(serina('buy milk Wednesday').dateTime).toBe('hello world');
      });

      test('should return correct date for next Wednesday', () => {
        expect(serina('buy milk next Wednesday').dateTime).toBe('hello world');
      });

      test('should return correct date for Thursday', () => {
        expect(serina('buy milk Thursday').dateTime).toBe('hello world');
      });

      test('should return correct date for next Thursday', () => {
        expect(serina('buy milk next Thursday').dateTime).toBe('hello world');
      });

      test('should return correct date for Friday', () => {
        expect(serina('buy milk Friday').dateTime).toBe('hello world');
      });

      test('should return correct date for next Friday', () => {
        expect(serina('buy milk next Friday').dateTime).toBe('hello world');
      });

      test('should return correct date for Saturday', () => {
        expect(serina('buy milk Saturday').dateTime).toBe('hello world');
      });

      test('should return correct date for next Saturday', () => {
        expect(serina('buy milk next Saturday').dateTime).toBe('hello world');
      });

      test('should return correct date for Sunday', () => {
        expect(serina('buy milk Sunday').dateTime).toBe('hello world');
      });

      test('should return correct date for next Sunday', () => {
        expect(serina('buy milk next Sunday').dateTime).toBe('hello world');
      });
    });
  });
