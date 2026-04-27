import { LOCALES } from 'locales';

export type DateOrder = 'DMY' | 'MDY' | 'YMD';

export interface LocaleConfig {
  id: string;
  name: string;
  dateFormat: string;
  dateOrder: DateOrder;
  dateSeparator: string;
  patterns: Record<string, string[]>;
}

const localeMap: Record<string, LocaleConfig> = LOCALES;

export function resolveLocale(locale?: string): string {
  if (!locale) return 'en-GB';
  if (locale in localeMap) return locale;

  const baseLocale = locale.split('-')[0];
  const match = Object.keys(localeMap).find((key) => key.startsWith(`${baseLocale}-`));
  return match ?? 'en-GB';
}

export function getLocale(locale?: string): LocaleConfig {
  return localeMap[resolveLocale(locale)];
}

export function getDateOrder(locale?: string): DateOrder {
  return getLocale(locale).dateOrder;
}
