import type { LocaleConfig } from 'utils/localeHelpers';

export const enCA: LocaleConfig = {
  id: 'en-CA',
  name: 'Canadian English',
  dateFormat: 'YYYY-MM-DD',
  dateOrder: 'YMD',
  dateSeparator: '-',
  patterns: {
    date: ['YYYY-MM-DD', 'YYYY/MM/DD'],
    time: ['HH:mm', 'HH:mm:ss'],
  },
};
