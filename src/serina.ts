import { ParsedSchema, ParsedMatchSchema } from './serina.schema';
import DayOfTheWeek from './filters/dayOfTheWeek/dayOfTheWeek';
import Day from './filters/day/day';

const serina = (text: string): ParsedSchema => {
    const parsedData: ParsedSchema = {
        original: text,
        isValid: false,
        matches: [],
    };

    const weekdays: ParsedMatchSchema[] = DayOfTheWeek.parseText(text);
    if (weekdays && weekdays.length) parsedData.matches = parsedData.matches.concat(weekdays);

    const day: ParsedMatchSchema[] = Day.parseText(text);
    if (day && day.length) parsedData.matches = parsedData.matches.concat(day);

    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
};

export default serina;
