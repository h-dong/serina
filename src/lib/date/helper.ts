import { DayLiteUnits } from './types';

export function getDaysInMonth(year: number, month: number, day?: number): number {
    return new Date(year, month + 1, day ?? 0).getDate();
}

export function nextMonths(date: Date, value: number): Date {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let count = value;
    // loop to skip any months without the day
    // e.g. given date is 31st March, since Apr does not have 31st, so skip to May
    while (day > getDaysInMonth(year, month + count)) {
        if (count > 100) throw 'Possible infinite loop within nextMonths()';
        count++;
    }

    const newDate = date;
    newDate.setMonth(month + count);
    return newDate;
}

export function nextYears(date: Date, value: number): Date {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let count = value;
    // loop to skip any year without the day or has diff month
    // e.g.given date is 2000 Feb 29th, since 2001 Feb does not have 29th, so skip to 2004
    while (day > getDaysInMonth(year + count, month) || new Date(year + count, month, day).getMonth() != month) {
        if (count > 100) throw 'Possible infinite loop within nextYears()';
        count++;
    }

    const newDate = date;
    newDate.setFullYear(year + count);
    return newDate;
}

export function prevMonths(date: Date, value: number): Date {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let count = value;
    // loop to skip any months without the day
    // e.g. given date is May 31st, since Apr does not have 31st, so skip to Mar

    while (day > getDaysInMonth(year, month - count)) {
        if (count > 100) throw 'Possible infinite loop within prevMonths()';
        count++;
    }

    const newDate = date;
    newDate.setMonth(month - count);
    return newDate;
}

export function prevYears(date: Date, value: number): Date {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    let count = value;
    // loop to skip any year without the day
    // e.g. given date is 2004 Feb 29th, since 2001 Feb does not have 29th, so skip to 2000
    while (day > getDaysInMonth(year - count, month) || new Date(year - count, month, 1).getMonth() != month) {
        if (count > 100) throw 'Possible infinite loop within prevYears()';
        count++;
    }

    const newDate = date;
    newDate.setFullYear(year - count);
    return newDate;
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
