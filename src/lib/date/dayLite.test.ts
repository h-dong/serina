import { dayLite } from './dayLite';
import { vi } from 'vitest';

describe('dayLight', () => {
    describe('Constructor', () => {
        afterEach(() => {
            vi.useRealTimers();
        });

        test('should return passed date object', () => {
            vi.useFakeTimers().setSystemTime(new Date('2020-06-10T11:22:33'));
            const date = new Date(2021, 10, 20);
            expect(dayLite(date).year).toBe(2021);
        });

        test('should use current date if nothing has been passed', () => {
            expect(dayLite().year).toBe(2022);
        });
    });

    describe('Basic Getters', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each`
            name              | operation                | output
            ${'second'}       | ${dayLite().second}      | ${35}
            ${'minute'}       | ${dayLite().minute}      | ${55}
            ${'hour'}         | ${dayLite().hour}        | ${14}
            ${'day'}          | ${dayLite().day}         | ${20}
            ${'weekday'}      | ${dayLite().weekday}     | ${4}
            ${'weekday name'} | ${dayLite().weekdayName} | ${'Thursday'}
            ${'month'}        | ${dayLite().month}       | ${10}
            ${'month name'}   | ${dayLite().monthName}   | ${'October'}
            ${'year'}         | ${dayLite().year}        | ${2022}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('plus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each`
            name        | operation                             | output
            ${'second'} | ${dayLite().plus(1, 'second').second} | ${36}
            ${'minute'} | ${dayLite().plus(1, 'minute').minute} | ${56}
            ${'hour'}   | ${dayLite().plus(1, 'hour').hour}     | ${15}
            ${'day'}    | ${dayLite().plus(1, 'day').day}       | ${21}
            ${'month'}  | ${dayLite().plus(1, 'month').month}   | ${11}
            ${'year'}   | ${dayLite().plus(1, 'year').year}     | ${2023}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('minus() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each`
            name        | operation                              | output
            ${'second'} | ${dayLite().minus(1, 'second').second} | ${34}
            ${'minute'} | ${dayLite().minus(1, 'minute').minute} | ${54}
            ${'hour'}   | ${dayLite().minus(1, 'hour').hour}     | ${13}
            ${'day'}    | ${dayLite().minus(1, 'day').day}       | ${19}
            ${'month'}  | ${dayLite().minus(1, 'month').month}   | ${9}
            ${'year'}   | ${dayLite().minus(1, 'year').year}     | ${2021}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('set() operation', () => {
        vi.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            vi.useRealTimers();
        });

        test.each`
            name          | operation                                     | output
            ${'second'}   | ${dayLite().set({ second: 1 }).second}        | ${1}
            ${'minute'}   | ${dayLite().set({ minute: 1 }).minute}        | ${1}
            ${'hour'}     | ${dayLite().set({ hour: 1 }).hour}            | ${1}
            ${'day'}      | ${dayLite().set({ day: 1 }).day}              | ${1}
            ${'month 0'}  | ${dayLite().set({ month: 0 }).toISOString()}  | ${'2022-01-20T14:55:35.000Z'}
            ${'month 1'}  | ${dayLite().set({ month: 1 }).toISOString()}  | ${'2022-01-20T14:55:35.000Z'}
            ${'month 12'} | ${dayLite().set({ month: 12 }).toISOString()} | ${'2022-12-20T14:55:35.000Z'}
            ${'month 12'} | ${dayLite().set({ month: 13 }).toISOString()} | ${'2023-01-20T14:55:35.000Z'}
            ${'year'}     | ${dayLite().set({ year: 1 }).year}            | ${1}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });

        // test.each`
        //     name        | operation                                                         | output
        //     ${'second'} | ${dayLite().set({ day: 2, month: 11, year: 2018 }).toISOString()} | ${'2018-11-02T14:55:35.000Z'}
        // `('should return correct $name', ({ operation, output }) => {
        //     expect(operation).toEqual(output);
        // });
    });
});
