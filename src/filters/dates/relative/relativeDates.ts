import { ParsedMatchSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import { DATES } from '../dates.constants';
import RELATIVE_DATES, { RELATIVE_ADVERB } from './relativeDates.constants';
import { parseMatches, contains, remove, matchPattern } from 'utils';

export default class RelativeDates {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `(${DATES.FILLER_WORDS})?${RELATIVE_DATES.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static timeUnitToString(matchAgainst: string): string {
        for (const key in RELATIVE_DATES.TIME_UNITS) {
            if (contains(matchAgainst, RELATIVE_DATES.TIME_UNITS[key])) {
                return key;
            }
        }
        return null;
    }

    static convertRelativeAdverbToObj(relativeDateStr: string): DateTime {
        if (contains(relativeDateStr, RELATIVE_ADVERB.TODAY)) {
            return DateTime.utc();
        } else if (contains(relativeDateStr, RELATIVE_ADVERB.TOMORROW)) {
            return DateTime.utc().plus({ days: 1 });
        }
        return null;
    }

    static getNext(unit): DateTime {
        return DateTime.utc()
            .plus({ [unit]: 1 })
            .startOf(unit)
            .endOf('day');
    }

    static convertRelativeExpressionToObj(expression: string): DateTime {
        const unit = this.timeUnitToString(matchPattern(expression, RELATIVE_DATES.TIME_UNITS.ANY)[0]);
        const period = remove(expression, unit);
        let quantity;
        if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.ONE)) {
            quantity = 1;
        } else if (contains(period, RELATIVE_DATES.VERBAL_QUANTIFIERS.NEXT)) {
            return this.getNext(unit);
        } else {
            quantity = parseInt(period, 10);
        }
        if (contains(unit, RELATIVE_DATES.TIME_UNITS.ANY)) {
            return DateTime.utc().plus({ [unit]: quantity });
        }
        return null;
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, RELATIVE_DATES.FILLER_WORDS);
        let dateObj;
        if (contains(removedFillerWords, `${RELATIVE_DATES.RELATIVE_ADVERB}`)) {
            dateObj = this.convertRelativeAdverbToObj(removedFillerWords);
        } else {
            dateObj = this.convertRelativeExpressionToObj(removedFillerWords);
        }
        if (!dateObj) return null;
        return dateObj.endOf('day').toJSDate();
    }
}
