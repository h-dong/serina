import { ParsedSchema, ParsedMatchSchema } from 'serina.schema';
import WeekDay from 'filters/weekDay/weekDay';
import Day from 'filters/day/day';
import Month from 'filters/month/month';
import Year from 'filters/year/year';
import Time from 'filters/time/time';
import Dates from 'filters/dates/dates';
import PartialDates from 'filters/dates/partialDates';
import DateAndTime from 'filters/dateAndTime/dateAndTime';
import WeekDayAndTime from 'filters/weekDayAndTime/weekDayAndTime';
import RelativeTime from 'filters/relativeTime/relativeTime';
import RelativeDates from 'filters/relativeDates/relativeDates';
import TimeKeywords from 'filters/timeKeywords/timeKeywords';

const serina = (text: string): ParsedSchema => {
    const parsedData: ParsedSchema = {
        original: text,
        isValid: false,
        matches: [],
    };

    const filters = [
        WeekDay,
        Day,
        Month,
        Year,
        Time,
        Dates,
        PartialDates,
        DateAndTime,
        RelativeTime,
        RelativeDates,
        WeekDayAndTime,
        TimeKeywords,
    ];

    filters.forEach(filter => {
        const results: ParsedMatchSchema[] = filter.parseText(text);
        if (results && results.length) parsedData.matches = parsedData.matches.concat(results);
    });

    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
};

export default serina;
