import Serina from '../src/serina';

describe('Serina Tests', () => {
  describe('Relative To Today', () => {
    test('should return user input string as original element', () => {
      expect(Serina('hello world')).toBe('hello world');
    });
  
    test('should return correct date for tomorrow', () => {
      expect(Serina('buy milk tomorrow').date).toBe('hello world');
    });
  
    test('should return correct date for day after', () => {
      expect(Serina('buy milk day after').date).toBe('hello world');
    });
  
    test('should return correct date for day after tomorrow', () => {
      expect(Serina('buy milk day after tomorrow').date).toBe('hello world');
    });
  
    test('should return correct date for today', () => {
      expect(Serina('buy milk today').date).toBe('hello world');
    });

    test('should return correct date for end of day', () => {
      expect(Serina('buy milk end of day').date).toBe('hello world');
    });

    test('should return correct date for end of day today', () => {
      expect(Serina('buy milk end of day today').date).toBe('hello world');
    });
  
    test('should return correct date for yesterday', () => {
      expect(Serina('buy milk yesterday').date).toBe('hello world');
    });
  
    test('should return correct date for day before', () => {
      expect(Serina('buy milk day before').date).toBe('hello world');
    });
  
    test('should return correct date for day before yesterday', () => {
      expect(Serina('buy milk day before yesterday').date).toBe('hello world');
    });
  
    test('should return correct date for day before yesterday', () => {
      expect(Serina('buy milk day before yesterday').date).toBe('hello world');
    });      
  });

  describe('Week Days', () => {
    test('should return correct date for next Monday', () => {
      expect(Serina('buy milk next Monday').date).toBe('hello world');
    });

    test('should return correct date for next Tuesday', () => {
      expect(Serina('buy milk next Tuesday').date).toBe('hello world');
    });

    test('should return correct date for next Wednesday', () => {
      expect(Serina('buy milk next Wednesday').date).toBe('hello world');
    });

    test('should return correct date for next Thursday', () => {
      expect(Serina('buy milk next Thursday').date).toBe('hello world');
    });

    test('should return correct date for next Friday', () => {
      expect(Serina('buy milk next Friday').date).toBe('hello world');
    });

    test('should return correct date for next Saturday', () => {
      expect(Serina('buy milk next Saturday').date).toBe('hello world');
    });

    test('should return correct date for next Sunday', () => {
      expect(Serina('buy milk next Sunday').date).toBe('hello world');
    });
  });

  describe('Future Days', () => {
    test('should return correct date for end of the week', () => {
      expect(Serina('buy milk end of the week').date).toBe('hello world');
    });

    test('should return correct date for end of the month', () => {
      expect(Serina('buy milk end of the month').date).toBe('hello world');
    });

    test('should return correct date for end of the quarter', () => {
      expect(Serina('buy milk end of the quarter').date).toBe('hello world');
    });

    test('should return correct date for end of the season', () => {
      expect(Serina('buy milk end of the season').date).toBe('hello world');
    });

    test('should return correct date for end of the year', () => {
      expect(Serina('buy milk end of the year').date).toBe('hello world');
    });

    test('should return correct date for next week', () => {
      expect(Serina('buy milk next week').date).toBe('hello world');
    });

    test('should return correct date for next month', () => {
      expect(Serina('buy milk next month').date).toBe('hello world');
    });

    test('should return correct date for next quarter', () => {
      expect(Serina('buy milk next quarter').date).toBe('hello world');
    });

    test('should return correct date for next season', () => {
      expect(Serina('buy milk next season').date).toBe('hello world');
    });

    test('should return correct date for next year', () => {
      expect(Serina('buy milk next year').date).toBe('hello world');
    });

    test('should return correct date for end of the week', () => {
      expect(Serina('buy milk end of the week').date).toBe('hello world');
    });

    test('should return correct date for end of the month', () => {
      expect(Serina('buy milk end of the month').date).toBe('hello world');
    });

    test('should return correct date for end of the quarter', () => {
      expect(Serina('buy milk end of the quarter').date).toBe('hello world');
    });

    test('should return correct date for end of the year', () => {
      expect(Serina('buy milk end of the year').date).toBe('hello world');
    });
  });
});
