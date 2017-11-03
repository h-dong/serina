import Serina from '../src/serina';

describe('Serina Whole Day', () => {
  test('should return user input string as original element', () => {
    const parsed = Serina('hello world');
    expect(parsed.original).toBe('hello world');
  });
});
