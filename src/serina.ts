import { ParsedSchema, ParsedMatchSchema } from './serina.schema';
import WeekDay from './filters/weekDay/weekDay';
import Day from './filters/day/day';
import Month from './filters/month/month';
import Year from 'filters/year/year';
import Time from 'filters/time/time';
import Dates from 'filters/dates/dates';
import PartialDates from './filters/dates/partialDates';

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

    const time: ParsedMatchSchema[] = Time.parseText(text);
    if (time && time.length) parsedData.matches = parsedData.matches.concat(time);

    const dates: ParsedMatchSchema[] = Dates.parseText(text);
    if (dates && dates.length) parsedData.matches = parsedData.matches.concat(dates);

    const partialDates: ParsedMatchSchema[] = PartialDates.parseText(text);
    if (partialDates && partialDates.length) parsedData.matches = parsedData.matches.concat(partialDates);

    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
};

export default serina;
