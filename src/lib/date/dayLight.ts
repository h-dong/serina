import { DataTimeUnits } from './types';

class DayLight {
    private static _dateTime: Date;

    constructor(date?: Date) {
        DayLight._dateTime = date ?? new Date();
    }

    get millisecond() {
        return DayLight._dateTime.getMilliseconds();
    }

    private set millisecond(value: number) {
        DayLight._dateTime.setMilliseconds(value);
    }

    get second() {
        return DayLight._dateTime.getSeconds();
    }

    private set second(value: number) {
        DayLight._dateTime.setSeconds(value);
    }

    get minute() {
        return DayLight._dateTime.getMinutes();
    }

    private set minute(value: number) {
        DayLight._dateTime.setMinutes(value);
    }

    get hour() {
        return DayLight._dateTime.getHours();
    }

    private set hour(value: number) {
        DayLight._dateTime.setHours(value);
    }

    get day() {
        return DayLight._dateTime.getDate();
    }

    private set day(value: number) {
        DayLight._dateTime.setDate(value);
    }

    get weekday() {
        return DayLight._dateTime.getDay();
    }

    private set weekday(value: number) {
        const diff = this.weekday - value;

        this.set({
            day: this.day + diff,
        });
    }

    get weekdayName() {
        return DayLight._dateTime.toLocaleString('default', { weekday: 'long' });
    }

    get month() {
        return DayLight._dateTime.getMonth() + 1;
    }

    private set month(value: number) {
        DayLight._dateTime.setMonth(value - 1);
    }

    get monthName() {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return monthNames[this.month];
    }

    get year() {
        return DayLight._dateTime.getFullYear();
    }
    private set year(value: number) {
        DayLight._dateTime.setFullYear(value);
    }

    toDate() {
        return DayLight._dateTime;
    }

    toISOString() {
        return DayLight._dateTime.toISOString();
    }

    toString() {
        return this.toISOString();
    }

    now() {
        return DayLight._dateTime;
    }

    set(changes: Partial<Record<DataTimeUnits, number>>) {
        Object.keys(changes).forEach(key => {
            const value = changes[key];
            switch (key) {
                case 'second':
                    this.second = value;
                    break;
                case 'minute':
                    this.minute = value;
                    break;
                case 'hour':
                    this.hour = value;
                    break;
                case 'day':
                    this.day = value;
                    break;
                // case 'week':
                //     this.day = value;
                //     break;
                case 'month':
                    this.month = value;
                    break;
                case 'year':
                    this.year = value;
                    break;
                default:
                    throw 'Cannot perform .set() operation with unknown unit';
            }
        });

        return this;
    }

    plus(value: number, unit: DataTimeUnits) {
        switch (unit) {
            case 'millisecond':
                this.millisecond += value;
                break;
            case 'second':
                this.second += value;
                break;
            case 'minute':
                this.minute += value;
                break;
            case 'hour':
                this.hour += value;
                break;
            case 'day':
                this.day += value;
                break;
            case 'week':
                this.day += value * 7;
                break;
            case 'month':
                this.month += value - 1;
                break;
            case 'year':
                this.year += value;
                break;
            default:
                throw 'Cannot perform .plus() operation with unknown unit';
        }

        return this;
    }

    minus(value: number, unit: DataTimeUnits) {
        switch (unit) {
            case 'millisecond':
                this.millisecond -= value;
                break;
            case 'second':
                this.second -= value;
                break;
            case 'minute':
                this.minute -= value;
                break;
            case 'hour':
                this.hour -= value;
                break;
            case 'day':
                this.day -= value;
                break;
            case 'week':
                this.day -= value * 7;
                break;
            case 'month':
                this.month -= value - 1;
                break;
            case 'year':
                this.year -= value;
                break;
            default:
                throw 'Cannot perform .minus() operation with unknown unit';
        }

        return this;
    }

    startOf(unit: DataTimeUnits) {
        switch (unit) {
            case 'millisecond':
                this.millisecond = 0;
                break;
            case 'second':
                this.millisecond = 0;
                break;
            case 'minute':
                this.millisecond = 0;
                this.second = 0;
                break;
            case 'hour':
                this.millisecond = 0;
                this.second = 0;
                this.minute = 0;
                break;
            case 'day':
                this.millisecond = 0;
                this.second = 0;
                this.minute = 0;
                this.hour = 0;
                break;
            case 'month':
                this.millisecond = 0;
                this.second = 0;
                this.minute = 0;
                this.hour = 0;
                this.day = 1;
                break;
            case 'year':
                this.millisecond = 0;
                this.second = 0;
                this.minute = 0;
                this.hour = 0;
                this.day = 1;
                this.month = 0;
                break;
            default:
                throw 'Cannot perform .startOf() operation with unknown unit';
        }

        return this;
    }

    endOf(unit: DataTimeUnits) {
        switch (unit) {
            case 'second':
                this.millisecond = 999;
                break;
            case 'minute':
                this.millisecond = 999;
                this.second = 59;
                break;
            case 'hour':
                this.millisecond = 999;
                this.second = 59;
                this.minute = 59;
                break;
            case 'day':
                this.millisecond = 999;
                this.second = 59;
                this.minute = 59;
                this.hour = 23;
                break;
            case 'month':
                this.millisecond = 999;
                this.second = 59;
                this.minute = 59;
                this.hour = 23;
                this.day = new Date(this.year, this.month + 1, 0).getDate();
                break;
            case 'year':
                this.millisecond = 999;
                this.second = 59;
                this.minute = 59;
                this.hour = 23;
                this.day = new Date(this.year, this.month + 1, 0).getDate();
                this.month = 11;
                break;
            default:
                throw 'Cannot perform .startOf() operation with unknown unit';
        }

        return this;
    }
}

export function dayLight(date?: Date) {
    return new DayLight(date);
}
