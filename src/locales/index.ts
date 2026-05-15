import { enCA } from './en-CA';
import { enGB } from './en-GB';
import { enUS } from './en-US';

export const LOCALES = {
  [enUS.id]: enUS,
  [enGB.id]: enGB,
  [enCA.id]: enCA,
} as const;

export { enCA, enGB, enUS };
