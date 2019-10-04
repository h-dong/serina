import { contains, findMatchingKey, matchPattern, remove } from './index';
import RELATIVE_DATES, { RELATIVE_ADVERB } from '../filters/dates/relative/relativeDates.constants';
import { DateTime } from 'luxon';

function timeUnitToString(matchAgainst: string): string {
    return findMatchingKey(RELATIVE_DATES.TIME_UNITS, matchAgainst);
}

function convertRelativeAdverbToObj(relativeDateStr: string): DateTime {
    if (contains(relativeDateStr, RELATIVE_ADVERB.TODAY)) {
        return DateTime.utc();
    }
    return DateTime.utc().plus({ days: 1 });
}

function getNext(unit): DateTime {
    return DateTime.utc()
        .plus({ [unit]: 1 })
        .startOf(unit)
        .endOf('day');
}

function convertRelativeExpressionToObj(expression: string): DateTime {
    const [ timeUnit ] = matchPattern(expression, RELATIVE_DATES.TIME_UNITS.ANY);
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
    return DateTime.utc().plus({ [unit]: quantity });
}

function convertRelativeDateStringToObj(date: string): DateTime {
    const removedFillerWords = remove(date, RELATIVE_DATES.FILLER_WORDS);
    if (contains(removedFillerWords, RELATIVE_DATES.RELATIVE_ADVERB)) {
        return convertRelativeAdverbToObj(removedFillerWords);
    } else {
        return convertRelativeExpressionToObj(removedFillerWords);
    }
}

export {
    convertRelativeDateStringToObj as default,
    getNext,
};
