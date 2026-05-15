import type { LocaleConfig } from 'utils/localeHelpers';

export const enUS: LocaleConfig = {
  id: 'en-US',
  name: 'US English',
  dateFormat: 'MM/DD/YYYY',
  dateOrder: 'MDY',
  dateSeparator: '/',
  patterns: {
    date: ['MM/DD/YYYY', 'MM-DD-YYYY', 'M/D/YYYY', 'MMMM D, YYYY'],
    time: ['h:mm a', 'h:mm:ss a'],
  },
};
