import { TimeObjectSchema } from 'serina.schema';
import { MERIDIEM, PM } from 'filters/time/time.constants';
import contains from './contains';
import { remove, isValidTime } from 'utils';

function convertTimeStringToObj(time: string): TimeObjectSchema {
    let hour;
    let minute;

    if (contains(time, `${MERIDIEM}`, false)) {
        // 12H
        const timeWithMeridiem = remove(time, `${MERIDIEM}`, false);
        const [ hourStr, minStr ] = timeWithMeridiem.split(':');
        hour = parseInt(hourStr, 10);
        minute = parseInt(minStr, 10);

        if (isNaN(minute)) minute = 0;

        if (contains(time, `${PM}`,false)) {
            // Post Meridiem (PM)
            if (hour < 12) hour += 12;
        } else {
            // Ante Meridiem (AM)
            if (hour === 12) hour = 0;
        }
    } else {
        // 24H
        const [ hourStr, minStr ] = time.split(':');
        hour = parseInt(hourStr, 10);
        minute = parseInt(minStr, 10);
    }

    return isValidTime(hour, minute) ? { hour, minute } : null;
}

export default convertTimeStringToObj;
