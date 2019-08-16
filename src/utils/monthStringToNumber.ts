import MONTH from 'filters/month/month.constants';
import contains from './contains';

function monthStrToInt(matchingText: string): number {
    let month = null;

    Object.keys(MONTH.SINGLE).forEach((key, index) => {
        const monthPattern = MONTH.SINGLE[key];
        if (contains(matchingText, monthPattern)) {
            month = index + 1;
        }
    });

    return month;
}

export default monthStrToInt;
