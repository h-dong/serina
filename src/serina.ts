import { ParsedSchema, ParsedMatchSchema } from './serina.schema';
import DayOfTheWeek from './filters/dayOfTheWeek/dayOfTheWeek';

const serina = (text: string): ParsedSchema => {
    let parsedData: ParsedSchema = {
        original: text,
        isValid: false,
        matches: []
    };

    const weekdays: ParsedMatchSchema[] = DayOfTheWeek.parseText(text);
    if (weekdays && weekdays.length) parsedData.matches = parsedData.matches.concat(weekdays);
    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
};

export default serina;
