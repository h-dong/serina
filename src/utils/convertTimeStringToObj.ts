import { TimeObjectSchema } from 'serina.schema';
import { ANTE_MERIDIEM, POST_MERIDIEM } from 'filters/time/time.constants';
import contains from './contains';
import { remove } from 'utils';

function convertTimeStringToObj(time: string): TimeObjectSchema {
    let hour;
    let minute;

    if (contains(time, `( )?${ANTE_MERIDIEM}|${POST_MERIDIEM}`, false)) {
        // 12H
        const timeWithMeridiem = remove(time, `( )?${ANTE_MERIDIEM}|${POST_MERIDIEM}`, false);
        const timeSplit = timeWithMeridiem.split(':');
        hour = parseInt(timeSplit[0], 10);
        minute = parseInt(timeSplit[1], 10);

        if (isNaN(minute)) minute = 0;

        if (contains(time, POST_MERIDIEM, false)) {
            // Post Meridiem (PM)
            if (hour < 12) hour += 12;
        } else {
            // Ante Meridiem (AM)
            if (hour === 12) hour = 0;
        }
    } else {
        // 24H
        const timeSplit = time.split(':');
        hour = parseInt(timeSplit[0], 10);
        minute = parseInt(timeSplit[1], 10);
    }

    return { hour, minute };
}

export default convertTimeStringToObj;
