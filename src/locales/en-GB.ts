import type { LocaleConfig } from 'utils/localeHelpers';

export const enGB: LocaleConfig = {
  id: 'en-GB',
  name: 'British English',
  dateFormat: 'DD/MM/YYYY',
  dateOrder: 'DMY',
  dateSeparator: '/',
  patterns: {
    date: ['DD/MM/YYYY', 'DD-MM-YYYY', 'D/M/YYYY', 'D MMMM YYYY'],
    time: ['HH:mm', 'HH:mm:ss'],
  },
};
