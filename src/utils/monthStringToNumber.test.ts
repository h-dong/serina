import monthStringToNumber from './monthStringToNumber';

const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september',
'october', 'november', 'december'];

describe('monthStringToNumber()', () => {
    test('should return correct number for each short month string', () => {
        shortMonths.forEach((month, index) => {
            expect(monthStringToNumber(month)).toEqual(index + 1);
        });
    });

    test('should return correct number for each long month string', () => {
        longMonths.forEach((month, index) => {
            expect(monthStringToNumber(month)).toEqual(index + 1);
        });
    });
});
