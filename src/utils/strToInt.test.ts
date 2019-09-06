import strToInt from './strToInt';

describe('strToInt()', () => {

    test('should correctly convert given strings into a date object', () => {
        const dateObj = {
            year: 2019,
            month: 9,
            day: 1,
        };
        const check = strToInt('01', '09', '2019');
        expect(check).toEqual(dateObj);
    });

});
