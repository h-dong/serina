import { dayLight } from './dayLight';

describe('dayLight', () => {
    describe('Constructor', () => {
        afterEach(() => {
            jest.useRealTimers();
        });

        test('should return passed date object', () => {
            jest.useFakeTimers().setSystemTime(new Date('2020-06-10T11:22:33'));
            const date = new Date(2021, 10, 20);
            expect(dayLight(date).year).toBe(2021);
        });

        test('should use current date if nothing has been passed', () => {
            expect(dayLight().year).toBe(2022);
        });
    });

    describe('Basic Getters', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            jest.useRealTimers();
        });

        test.each`
            name              | operation                 | output
            ${'second'}       | ${dayLight().second}      | ${35}
            ${'minute'}       | ${dayLight().minute}      | ${55}
            ${'hour'}         | ${dayLight().hour}        | ${14}
            ${'day'}          | ${dayLight().day}         | ${20}
            ${'weekday'}      | ${dayLight().weekday}     | ${4}
            ${'weekday name'} | ${dayLight().weekdayName} | ${'Thursday'}
            ${'month'}        | ${dayLight().month}       | ${10}
            ${'month name'}   | ${dayLight().monthName}   | ${'November'}
            ${'year'}         | ${dayLight().year}        | ${2022}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('plus() operation', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            jest.useRealTimers();
        });

        test.each`
            name        | operation                              | output
            ${'second'} | ${dayLight().plus(1, 'second').second} | ${36}
            ${'minute'} | ${dayLight().plus(1, 'minute').minute} | ${56}
            ${'hour'}   | ${dayLight().plus(1, 'hour').hour}     | ${15}
            ${'day'}    | ${dayLight().plus(1, 'day').day}       | ${21}
            ${'month'}  | ${dayLight().plus(1, 'month').month}   | ${11}
            ${'year'}   | ${dayLight().plus(1, 'year').year}     | ${2023}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('minus() operation', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            jest.useRealTimers();
        });

        test.each`
            name        | operation                               | output
            ${'second'} | ${dayLight().minus(1, 'second').second} | ${34}
            ${'minute'} | ${dayLight().minus(1, 'minute').minute} | ${54}
            ${'hour'}   | ${dayLight().minus(1, 'hour').hour}     | ${13}
            ${'day'}    | ${dayLight().minus(1, 'day').day}       | ${19}
            ${'month'}  | ${dayLight().minus(1, 'month').month}   | ${9}
            ${'year'}   | ${dayLight().minus(1, 'year').year}     | ${2021}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });

    describe('set() operation', () => {
        jest.useFakeTimers().setSystemTime(new Date('2022-10-20T14:55:35'));

        afterAll(() => {
            jest.useRealTimers();
        });

        test.each`
            name        | operation                               | output
            ${'second'} | ${dayLight().set({ second: 1 }).second} | ${1}
            ${'minute'} | ${dayLight().set({ minute: 1 }).minute} | ${1}
            ${'hour'}   | ${dayLight().set({ hour: 1 }).hour}     | ${1}
            ${'day'}    | ${dayLight().set({ day: 1 }).day}       | ${1}
            ${'month'}  | ${dayLight().set({ month: 1 }).month}   | ${1}
            ${'month'}  | ${dayLight().set({ month: 12 }).month}  | ${12}
            ${'year'}   | ${dayLight().set({ year: 1 }).year}     | ${1}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });

        test.each`
            name        | operation                                                          | output
            ${'second'} | ${dayLight().set({ day: 2, month: 11, year: 2018 }).toISOString()} | ${'2018-11-02T14:55:35.000Z'}
        `('should return correct $name', ({ operation, output }) => {
            expect(operation).toEqual(output);
        });
    });
});
