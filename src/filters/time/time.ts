import { ParsedMatchSchema, TimeObjectSchema } from 'serina.schema';
import { DateTime } from 'luxon';
import TIME, { MERIDIEM, PM } from './time.constants';
import { parseMatches, convertTimeStringToObj, remove, matchPattern, contains } from 'utils';

export default class Time {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = `${TIME.ANY}`;
        const matches = matchPattern(text, pattern, false);

        if (!matches) return null;

        return matches.map(match => {
            const dateTimeObj = this.convertMatchToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertMinutePartToNumber(minutePart: string, beforeHour: boolean): number {
        if (contains(minutePart, TIME.VERBAL_QUANTIFIERS.QUARTER)) {
            return beforeHour ? 45 : 15;
        } else if (contains(minutePart, TIME.VERBAL_QUANTIFIERS.HALF)) {
            return 30;
        } else {
            const minuteInt = parseInt(minutePart, 10);
            return beforeHour ? 60 - minuteInt : minuteInt;
        }
    }

    static convertHourPartToNumber(hourPart: string, beforeHour: boolean): number {
        let hour;
        if (contains(hourPart, `${MERIDIEM}`, false)) {
            const hourStr = remove(hourPart, `${MERIDIEM}`, false);
            const isAfternoon = contains(hourPart, PM, false);
            hour = parseInt(hourStr, 10);
            if (isAfternoon) {
                if (hour < 12) hour += 12;
            } else {
                if (hour === 12) hour = 0;
            }
        } else {
            hour = parseInt(hourPart, 10);
        }
        if (beforeHour) {
            hour -= 1;
            if (hour === -1) {
                hour = 23;
            }
        }
        return hour;
    }

    static convertVerbalExpressionToObj(matchingText: string): TimeObjectSchema {
        const hourPart =  matchPattern(matchingText, TIME.VERBAL_EXPRESSION.HOURS).pop();
        const removedHour = remove(matchingText, hourPart);
        const determinant = matchPattern(removedHour, TIME.VERBAL_EXPRESSION.DETERMINANT)[0];
        let minutePart = remove(removedHour, determinant);
        minutePart = remove(minutePart, TIME.MINUTE_IDENTIFIER);
        const beforeHour = contains(determinant, TIME.TO);
        const minute = this.convertMinutePartToNumber(minutePart, beforeHour);
        const hour = this.convertHourPartToNumber(hourPart, beforeHour);
        return { hour, minute };
    }

    static convertMatchToDateObj(matchingText: string): Date {
        const removedFillerWords = remove(matchingText, TIME.FILLER_WORDS);
        let timeObj;
        if (contains(matchingText, TIME.VERBAL_EXPRESSION.FULL_EXPRESSION)) {
            timeObj = this.convertVerbalExpressionToObj(removedFillerWords);
        } else {
            timeObj = convertTimeStringToObj(removedFillerWords);
        }
        const { hour, minute } = timeObj;
        const newDateTime = DateTime.utc().set({ hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
