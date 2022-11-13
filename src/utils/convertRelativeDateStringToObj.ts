import contains from './contains';
import findMatchingKey from './findMatchingKey';
import matchPattern from './matchPattern';
import remove from './remove';
import RELATIVE_DATES, { RELATIVE_ADVERB } from 'filters/relativeDates/relativeDates.constants';
import { dayLight } from 'lib/date/dayLight';
import { DataTimeUnits } from 'lib/date/types';

function timeUnitToString(matchAgainst: string): string {
    return findMatchingKey(RELATIVE_DATES.TIME_UNITS, matchAgainst);
}

function convertRelativeAdverbToObj(relativeDateStr: string): Date {
    if (contains(relativeDateStr, RELATIVE_ADVERB.TODAY)) {
        return dayLight().toDate();
    }
    return dayLight().plus(1, 'day').toDate();
}

function getNext(unit): Date {
    return dayLight().plus(1, [unit]).startOf(unit).endOf('day').toDate();
}

function convertRelativeExpressionToObj(expression: string): Date {
    const [timeUnit] = matchPattern(expression, RELATIVE_DATES.TIME_UNITS.ANY);
    const unit = timeUnitToString(timeUnit);
    const period = remove(expression, unit);
    let quantity;
    if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.ONE)) {
        quantity = 1;
    } else if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.NEXT)) {
        return getNext(unit);
    } else {
        quantity = parseInt(period, 10);
    }
    return dayLight()
        .plus(quantity, [unit] as DataTimeUnits)
        .toDate();
}

function convertRelativeDateStringToObj(date: string): Date {
    const removedFillerWords = remove(date, RELATIVE_DATES.FILLER_WORDS);
    if (contains(removedFillerWords, RELATIVE_DATES.RELATIVE_ADVERB)) {
        return convertRelativeAdverbToObj(removedFillerWords);
    } else {
        return convertRelativeExpressionToObj(removedFillerWords);
    }
}

export { convertRelativeDateStringToObj as default, getNext };
