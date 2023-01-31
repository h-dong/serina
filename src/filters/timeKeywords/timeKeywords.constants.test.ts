import TIME_KEYWORDS from './timeKeywords.constants';

describe('TIME_KEYWORDS', () => {
    describe('WITH_FILLER_WORDS', () => {
        test.each([
            ['at noon'],
            ['at midnight'],
            ['at mid-night'],
            ['at mid night'],
            ['at midday'],
            ['at mid-day'],
            ['at mid day'],
            ['by noon'],
            ['by midnight'],
            ['by mid-night'],
            ['by mid night'],
            ['by midday'],
            ['by mid-day'],
            ['by mid day'],
            ['around noon'],
            ['around midnight'],
            ['around mid-night'],
            ['around mid night'],
            ['around midday'],
            ['around mid-day'],
            ['around mid day'],
        ])('should match "$text"', text => {
            const regex = new RegExp(TIME_KEYWORDS.WITH_FILLER_WORDS, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('MID_NIGHT', () => {
        test.each([['midnight'], ['mid night'], ['mid-night']])('should match "$text"', text => {
            const regex = new RegExp(TIME_KEYWORDS.MID_NIGHT, 'ig');
            expect(text).toMatch(regex);
        });
    });

    describe('MID_DAY', () => {
        test.each([['noon'], ['midday'], ['mid day'], ['mid-day']])('should match "$text"', text => {
            const regex = new RegExp(TIME_KEYWORDS.MID_DAY, 'ig');
            expect(text).toMatch(regex);
        });
    });
});
