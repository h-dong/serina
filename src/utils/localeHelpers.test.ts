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

  test('returns the locale config for a resolved locale', () => {
    expect(getLocale('en-US')).toBe(enUS);
    expect(getLocale('fr-FR')).toBe(enGB);
  });

  test('returns date order for the resolved locale', () => {
    expect(getDateOrder('en-US')).toBe('MDY');
    expect(getDateOrder('en-GB')).toBe('DMY');
    expect(getDateOrder('en-CA')).toBe('YMD');
  });
});
