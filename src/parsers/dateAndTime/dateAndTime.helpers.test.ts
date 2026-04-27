import {
  dateAndTimeToDateObj,
  differentDateStringToObj,
  getDateString,
  getTimeString,
} from 'parsers/dateAndTime/dateAndTime.helpers';
import * as dateHelpers from 'parsers/dates/dates.helpers';
import * as partialDateHelpers from 'parsers/partialDates/partialDates.helpers';
import * as relativeDateHelpers from 'parsers/relativeDates/relativeDates.helpers';

describe('DateAndTime Helpers', () => {
  describe('getDateString()', () => {
    test('should return null if no match', () => {
      const result = getDateString('some random text');
      expect(result).toBeNull();
    });

    test('should return null if no date match', () => {
      const result = getDateString('some random text at 8:30am');
      expect(result).toBeNull();
    });

    test.each([
      { text: 'some text on 02/17/2009 4pm', expected: '02/17/2009' },
      { text: 'some text on 17/02/2009 at 8:30am', expected: '17/02/2009' },
      { text: 'some text on 2009/02/17 09:45', expected: '2009/02/17' },
      { text: 'some text Feb 2011 9am', expected: 'feb 2011' },
      { text: 'some text 2 months from now 9am', expected: '2 months from now' },
    ])('should parse the correct date and time $text', ({ text, expected }) => {
      const result = getDateString(text);
      expect(result).toEqual(expected);
    });
  });
  describe('getTimeString()', () => {
    test('should return null if no match', () => {
      const result = getTimeString('some random text');
      expect(result).toBeNull();
    });

    test('should return null if no time match', () => {
      const result = getTimeString('some random text on 02/17/2009');
      expect(result).toBeNull();
    });

    test.each([
      { text: 'some text on 02/17/2009 4pm', expected: '4pm' },
      { text: 'some text on 17/02/2009 at 8:30am', expected: '8:30am' },
      { text: 'some text on 2009/02/17 09:45', expected: '09:45' },
      { text: 'some text Feb 2011 half past 9', expected: 'half past 9' },
    ])('should parse the correct date and time $text', ({ text, expected }) => {
      const result = getTimeString(text);
      expect(result).toEqual(expected);
    });
  });

  describe('differentDateStringToObj()', () => {
    test('should call relative date function', () => {
      const relativeDateHelperSpy = vi.spyOn(relativeDateHelpers, 'relativeDateStringToDayMonthYear');
      differentDateStringToObj('2 months from now');
      expect(relativeDateHelperSpy).toHaveBeenCalled();
    });

    test('should call partial date function', () => {
      const partialDateHelperSpy = vi.spyOn(partialDateHelpers, 'partialDateStringToDayMonthYear');
      differentDateStringToObj('march 2021');
      expect(partialDateHelperSpy).toHaveBeenCalled();
    });

    test('should call normal date function', () => {
      const normalDateHelperSpy = vi.spyOn(dateHelpers, 'dateStringToDayMonthYear');
      differentDateStringToObj('02/17/2009');
      expect(normalDateHelperSpy).toHaveBeenCalled();
    });

    test('uses locale for ambiguous full dates', () => {
      const result = differentDateStringToObj('10/02/2022', 'en-US');
      expect(result).toEqual({ day: 2, month: 10, year: 2022 });
    });
  });

  describe('dateAndTimeToDateObj()', () => {
    test('should return null if no date', () => {
      const result = dateAndTimeToDateObj('some random text 5pm');
      expect(result).toBeNull();
    });

    test('should return null if no time', () => {
      const result = dateAndTimeToDateObj('some random text on 02/17/2009');
      expect(result).toBeNull();
    });

    test('should return null if no date and time', () => {
      const result = dateAndTimeToDateObj('some random text');
      expect(result).toBeNull();
    });

    test('return date and time object', () => {
      const result = dateAndTimeToDateObj('some random text on 02/17/2009 4pm');
      expect(result).toEqual(new Date('2009-02-17T16:00:00.000Z'));
    });

    test('passes locale through to date parsing', () => {
      const result = dateAndTimeToDateObj('10/02/2022 2pm', 'en-US');
      expect(result).toEqual(new Date('2022-10-02T14:00:00.000Z'));
    });

    test('returns null if the time match is outside the valid range', () => {
      const result = dateAndTimeToDateObj('10/02/2022 99:30', 'en-US');
      expect(result).toBeNull();
    });
  });
});
