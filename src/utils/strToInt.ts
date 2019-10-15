import { DateObjectSchema } from 'serina.schema';

function strToInt(dayStr: string, monthStr: string, yearStr: string): DateObjectSchema {
    return {
        day: parseInt(dayStr, 10),
        month: parseInt(monthStr, 10),
        year: parseInt(yearStr, 10),
    };
}

export default strToInt;
