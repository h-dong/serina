import { ParsedSchema, ParsedMatchSchema } from './serina.schema';
import WeekDay from './filters/weekDay/weekDay';
import Day from './filters/day/day';
import Month from './filters/month/month';
import Year from 'filters/year/year';

const serina = (text: string): ParsedSchema => {
    const parsedData: ParsedSchema = {
        original: text,
        isValid: false,
        matches: [],
    };

    const weekdays: ParsedMatchSchema[] = WeekDay.parseText(text);
    if (weekdays && weekdays.length) parsedData.matches = parsedData.matches.concat(weekdays);

    const day: ParsedMatchSchema[] = Day.parseText(text);
    if (day && day.length) parsedData.matches = parsedData.matches.concat(day);

    const month: ParsedMatchSchema[] = Month.parseText(text);
    if (month && month.length) parsedData.matches = parsedData.matches.concat(month);

    const year: ParsedMatchSchema[] = Year.parseText(text);
    if (year && year.length) parsedData.matches = parsedData.matches.concat(year);

    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
};

export default serina;
