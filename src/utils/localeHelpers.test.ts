import { LOCALES, enCA, enGB, enUS } from 'locales';
import { getDateOrder, getLocale, resolveLocale } from 'utils/localeHelpers';

describe('localeHelpers', () => {
  test('exports locale configs keyed by locale id', () => {
    expect(LOCALES).toEqual({
      'en-US': enUS,
      'en-GB': enGB,
      'en-CA': enCA,
    });
  });

  test.each([
    { locale: undefined, expected: 'en-GB' },
    { locale: 'en-US', expected: 'en-US' },
    { locale: 'en-GB', expected: 'en-GB' },
    { locale: 'en-CA', expected: 'en-CA' },
    { locale: 'en-AU', expected: 'en-US' },
    { locale: 'fr-FR', expected: 'en-GB' },
  ])('resolves $locale to $expected', ({ locale, expected }) => {
    expect(resolveLocale(locale)).toBe(expected);
  });

  test.each([
    { locale: 'en-US', expected: enUS },
    { locale: 'fr-FR', expected: enGB },
  ])('returns $expected.id for $locale', ({ locale, expected }) => {
    expect(getLocale(locale)).toBe(expected);
  });

  test.each([
    { locale: 'en-US', expected: 'MDY' },
    { locale: 'en-GB', expected: 'DMY' },
    { locale: 'en-CA', expected: 'YMD' },
  ])('returns $expected date order for $locale', ({ locale, expected }) => {
    expect(getDateOrder(locale)).toBe(expected);
  });
});
