import { ParsedSchema, ParsedMatchSchema } from 'serina.schema';
import WeekDay from 'filters/weekday2/weekday2';
import Day from 'filters/day/day';
import Month from 'filters/month/month';
import Year from 'filters/year/year';
import Time from 'filters/time/time';
import Dates from 'filters/dates/dates';
import DateAndTime from 'filters/dateAndTime/dateAndTime';
import WeekdayAndTime from 'filters/weekdayAndTime/weekdayAndTime';
import RelativeTime from 'filters/relativeTime/relativeTime';
import RelativeDates from 'filters/relativeDates/relativeDates';
import TimeKeywords from 'filters/timeKeywords/timeKeywords';
import PartialDates from 'filters/partialDates/partialDates';

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
        WeekdayAndTime,
        TimeKeywords,
    ];

    filters.forEach(filterClass => {
        const filter = new filterClass();
        const results: ParsedMatchSchema[] = filter.parseText(text);
        if (results && results.length) parsedData.matches = parsedData.matches.concat(results);
    });

    if (parsedData.matches.length) parsedData.isValid = true;

    return parsedData;
};

export default serina;
