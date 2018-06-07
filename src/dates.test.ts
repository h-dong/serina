import dayjs from 'dayjs';
import serina from '../dist/serina.js';

describe('serina Tests', () => {
  describe('Relative To Today', () => {
    test('should return user input string as original element', () => {
      expect(serina('hello world').original).toBe('hello world');
    });

    test('should return correct date for tomorrow', () => {
      expect(serina('buy milk tomorrow').original).toBe('buy milk tomorrow');
      expect(serina('buy milk tomorrow').text).toBe('buy milk');
      expect(serina('buy milk tomorrow').date).toBe(dayjs().add(1, 'day').toDate());
    });

    test.skip('should return correct date for day after', () => {
      expect(serina('buy milk day after').date).toBe('hello world');
    });

    test.skip('should return correct date for day after tomorrow', () => {
      expect(serina('buy milk day after tomorrow').date).toBe('hello world');
    });

    test.skip('should return correct date for today', () => {
      expect(serina('buy milk today').date).toBe('hello world');
    });

    test.skip('should return correct date for end of day', () => {
      expect(serina('buy milk end of day').date).toBe('hello world');
    });

    test.skip('should return correct date for end of day today', () => {
      expect(serina('buy milk end of day today').date).toBe('hello world');
    });

    test.skip('should return correct date for yesterday', () => {
      expect(serina('buy milk yesterday').date).toBe('hello world');
    });

    test.skip('should return correct date for day before', () => {
      expect(serina('buy milk day before').date).toBe('hello world');
    });

    test.skip('should return correct date for day before yesterday', () => {
      expect(serina('buy milk day before yesterday').date).toBe('hello world');
    });

    test.skip('should return correct date for day before yesterday', () => {
      expect(serina('buy milk day before yesterday').date).toBe('hello world');
    });
  });

  describe.skip('Week Days', () => {
    test('should return correct date for next Monday', () => {
      expect(serina('buy milk next Monday').date).toBe('hello world');
    });

    test('should return correct date for next Tuesday', () => {
      expect(serina('buy milk next Tuesday').date).toBe('hello world');
    });

    test('should return correct date for next Wednesday', () => {
      expect(serina('buy milk next Wednesday').date).toBe('hello world');
    });

    test('should return correct date for next Thursday', () => {
      expect(serina('buy milk next Thursday').date).toBe('hello world');
    });

    test('should return correct date for next Friday', () => {
      expect(serina('buy milk next Friday').date).toBe('hello world');
    });

    test('should return correct date for next Saturday', () => {
      expect(serina('buy milk next Saturday').date).toBe('hello world');
    });

    test('should return correct date for next Sunday', () => {
      expect(serina('buy milk next Sunday').date).toBe('hello world');
    });
  });

  describe.skip('Future Days', () => {
    test('should return correct date for end of the week', () => {
      expect(serina('buy milk end of the week').date).toBe('hello world');
    });

    test('should return correct date for end of the month', () => {
      expect(serina('buy milk end of the month').date).toBe('hello world');
    });

    test('should return correct date for end of the quarter', () => {
      expect(serina('buy milk end of the quarter').date).toBe('hello world');
    });

    test('should return correct date for end of the season', () => {
      expect(serina('buy milk end of the season').date).toBe('hello world');
    });

    test('should return correct date for end of the year', () => {
      expect(serina('buy milk end of the year').date).toBe('hello world');
    });

    test('should return correct date for next week', () => {
      expect(serina('buy milk next week').date).toBe('hello world');
    });

    test('should return correct date for next month', () => {
      expect(serina('buy milk next month').date).toBe('hello world');
    });

    test('should return correct date for next quarter', () => {
      expect(serina('buy milk next quarter').date).toBe('hello world');
    });

    test('should return correct date for next season', () => {
      expect(serina('buy milk next season').date).toBe('hello world');
    });

    test('should return correct date for next year', () => {
      expect(serina('buy milk next year').date).toBe('hello world');
    });

    test('should return correct date for end of the week', () => {
      expect(serina('buy milk end of the week').date).toBe('hello world');
    });

    test('should return correct date for end of the month', () => {
      expect(serina('buy milk end of the month').date).toBe('hello world');
    });

    test('should return correct date for end of the quarter', () => {
      expect(serina('buy milk end of the quarter').date).toBe('hello world');
    });

    test('should return correct date for end of the year', () => {
      expect(serina('buy milk end of the year').date).toBe('hello world');
    });
  });
});
