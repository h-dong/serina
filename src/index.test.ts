import serina, { DateParser, parse, parser } from 'serina';

describe('Serina', () => {
  test.each([
    { filter: 'WeekDay', text: 'on Monday', expected: 1 },
    { filter: 'Day', text: 'on 21st', expected: 1 },
    { filter: 'Month', text: 'June', expected: 1 },
    { filter: 'Year', text: '2011', expected: 1 },
    { filter: 'Time', text: '5pm', expected: 1 },
    { filter: 'Dates', text: '15/12/2019', expected: 3 },
    { filter: 'PartialDates', text: '15th Dec', expected: 3 },
    { filter: 'DateAndTime', text: '5am in 2 yrs', expected: 3 },
    { filter: 'DateAndTime', text: '5am 12/2019', expected: 4 },
    { filter: 'RelativeTime', text: 'in 15 mins', expected: 1 },
    { filter: 'RelativeDates', text: 'in 2 days', expected: 1 },
    { filter: 'WeekDayAndTime', text: '5am Mon', expected: 3 },
    { filter: 'TimeKeywords', text: 'at noon', expected: 1 },
  ])('should be able to parse $filter', ({ text, expected }) => {
    const results = serina(`go to work ${text}`);
    expect(results.matches.length).toEqual(expected);
  });

  test('accepts per-call locale options', () => {
    const results = serina('go to work 10/02/2022', { locale: 'en-US' });
    expect(results.matches).toContainEqual({
      dateTime: new Date('2022-10-02T00:00:00.000Z'),
      matched: '10/02/2022',
      text: 'go to work',
    });
  });

  test('DateParser constructor locale is used by default', () => {
    const dateParser = new DateParser({ locale: 'en-US' });
    const results = dateParser.parse('go to work 10/02/2022');
    expect(results.matches).toContainEqual({
      dateTime: new Date('2022-10-02T00:00:00.000Z'),
      matched: '10/02/2022',
      text: 'go to work',
    });
  });

  test('per-call locale overrides DateParser constructor locale', () => {
    const dateParser = new DateParser({ locale: 'en-US' });
    const results = dateParser.parse('go to work 10/02/2022', { locale: 'en-GB' });
    expect(results.matches).toContainEqual({
      dateTime: new Date('2022-02-10T00:00:00.000Z'),
      matched: '10/02/2022',
      text: 'go to work',
    });
  });

  test('exports the singleton parser', () => {
    expect(parser).toBeInstanceOf(DateParser);
  });

  test('exports a parse convenience function', () => {
    const results = parse('go to work 10/02/2022', { locale: 'en-US' });
    expect(results.matches).toContainEqual({
      dateTime: new Date('2022-10-02T00:00:00.000Z'),
      matched: '10/02/2022',
      text: 'go to work',
    });
  });
});
