import Helper from './Helper';
import { ParsedSchema } from 'serina.interface';

const serina = (text: string): ParsedSchema => {
  let parsedData: ParsedSchema = {
    original: text,
    isValid: false,
    matches: []
  };

  const weekdays = Helper.parseWeekdayInText(text);
  if (weekdays) parsedData = weekdays;

  return parsedData;
};

export default serina;
