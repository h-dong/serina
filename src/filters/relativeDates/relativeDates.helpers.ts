import RELATIVE_DATES, { RELATIVE_ADVERB } from 'filters/relativeDates/relativeDates.constants';
import { dayLite } from 'lib/date/dayLite';
import { DayLiteUnits } from 'lib/date/types';
import { contains, matchPattern, remove } from 'lib/string/stringUtil';
import findMatchingKey from 'utils/findMatchingKey';

type RegexTimeUnit = keyof typeof RELATIVE_DATES.TIME_UNITS;

// TODO: export these functions and test them

function regexTimeUnitToDayLiteTimeUnit(regexTimeUnit: RegexTimeUnit): DayLiteUnits {
    switch (regexTimeUnit) {
        case 'DAYS':
            return 'day';
        case 'WEEKS':
            return 'week';
        case 'MONTHS':
            return 'month';
        case 'YEARS':
            return 'year';
        case 'ANY':
            return null;
    }
}

function timeUnitToString(matchAgainst: string) {
    return findMatchingKey(RELATIVE_DATES.TIME_UNITS, matchAgainst) as RegexTimeUnit;
}

function convertRelativeAdverbToObj(relativeDateStr: string): Date {
    if (contains(relativeDateStr, RELATIVE_ADVERB.TODAY)) {
        return dayLite().toDate();
    }
    return dayLite().plus(1, 'day').toDate();
}

// TODO: can this be moved to dayLite?
export function getNext(unit: DayLiteUnits): Date {
    return dayLite().start(unit).next(1, unit).toDate();
}

function convertRelativeExpressionToObj(expression: string): Date {
    const [timeUnit] = matchPattern(expression, RELATIVE_DATES.TIME_UNITS.ANY);
    const unit = timeUnitToString(timeUnit);

    if (!unit) return null;

    const dayLiteTimeUnit = regexTimeUnitToDayLiteTimeUnit(unit);
    const period = remove(expression, unit);
    let quantity: number;
    if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.ONE)) {
        quantity = 1;
    } else if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.NEXT)) {
        return getNext(dayLiteTimeUnit);
    } else {
        quantity = parseInt(period, 10);
    }

    return dayLite().plus(quantity, dayLiteTimeUnit).toDate();
}

export function relativeDateStringToDayMonthYear(date: string): Date {
    const removedFillerWords = remove(date, RELATIVE_DATES.FILLER_WORDS);
    if (contains(removedFillerWords, RELATIVE_DATES.RELATIVE_ADVERB)) {
        return convertRelativeAdverbToObj(removedFillerWords);
    } else {
        return convertRelativeExpressionToObj(removedFillerWords);
    }
}

export function relativeDateStringToDateObj(matchingText: string): Date {
    const dateObj = relativeDateStringToDayMonthYear(matchingText);
    if (!dateObj) return null;
    return dayLite(dateObj).start('day').toDate();
}
