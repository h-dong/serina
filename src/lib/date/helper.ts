import { dayLite } from './dayLite';
import { DayLiteUnits } from './types';

export function nextMonths(date: Date, value: number): Date {
    const dateObj = dayLite(date);
    const { day, month, nativeMonth, year } = dateObj;

    let count = value;
    // loop to skip any months without the day
    // e.g. given date is 31st March, since Apr does not have 31st, so skip to May
    while (day > dayLite(new Date(year, nativeMonth + count, 1)).daysInMonth) {
        count++;
    }

    return dateObj.set({ year, month, day }).plus(count, 'month').toDate();
}

export function nextYears(date: Date, value: number): Date {
    const dateObj = dayLite(date);
    const { day, month, nativeMonth, year } = dateObj;

    let count = value;
    // loop to skip any year without the day or has diff month
    // e.g.given date is 2000 Feb 29th, since 2001 Feb does not have 29th, so skip to 2004
    while (
        day > dayLite(new Date(year + count, nativeMonth, 1)).daysInMonth ||
        dayLite(new Date(year + count, nativeMonth, day)).nativeMonth != nativeMonth
    ) {
        count++;
    }

    return dateObj.set({ year, month, day }).plus(count, 'year').toDate();
}

export function prevMonths(date: Date, value: number): Date {
    const dateObj = dayLite(date);
    const { day, month, nativeMonth, year } = dateObj;

    let count = value;
    // loop to skip any months without the day
    // e.g. given date is May 31st, since Apr does not have 31st, so skip to Mar

    while (day > dayLite(new Date(year, nativeMonth - count, 1)).daysInMonth) {
        count++;
    }

    return dateObj.set({ year, month, day }).minus(count, 'month').toDate();
}

export function prevYears(date: Date, value: number): Date {
    const dateObj = dayLite(date);
    const { day, month, nativeMonth, year } = dateObj;

    let count = value;
    // loop to skip any year without the day
    // e.g. given date is 2004 Feb 29th, since 2001 Feb does not have 29th, so skip to 2000
    while (
        day > dayLite(new Date(year - count, nativeMonth, 1)).daysInMonth ||
        dayLite(new Date(year - count, nativeMonth, 1)).nativeMonth != nativeMonth
    ) {
        count++;
    }

    return dateObj.set({ year, month, day }).minus(count, 'year').toDate();
}

export function orderUnits(units: DayLiteUnits[]): DayLiteUnits[] {
    const order: DayLiteUnits[] = [
        'year',
        'month',
        'weekday',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];
    const newList = [];

    order.forEach(unit => {
        if (units.includes(unit)) newList.push(unit);
    });

    return newList;
}
