import { nextMonths, orderUnits } from './helper';
import { DayLiteUnits } from './types';

class DayLite {
    private _dateTime: Date;

    constructor(date?: Date) {
        this._dateTime = date ? new Date(date.getTime()) : new Date();
    }

    get millisecond() {
        return this._dateTime.getMilliseconds();
    }

    private set millisecond(value: number) {
        this._dateTime.setMilliseconds(value);
    }

    get second() {
        return this._dateTime.getSeconds();
    }

    private set second(value: number) {
        this._dateTime.setSeconds(value);
    }

    get minute() {
        return this._dateTime.getMinutes();
    }

    private set minute(value: number) {
        this._dateTime.setMinutes(value);
    }

    get hour() {
        return this._dateTime.getHours();
    }

    private set hour(value: number) {
        this._dateTime.setHours(value);
    }

    get day() {
        return this._dateTime.getDate();
    }

    private set day(value: number) {
        this._dateTime.setDate(value);
    }

    get weekday() {
        return this._dateTime.getDay();
    }

    private set weekday(value: number) {
        const diff = this.weekday - value;

        this.set({
            day: this.day + diff,
        });
    }

    get weekdayName() {
        return this._dateTime.toLocaleString('default', { weekday: 'long' });
    }

    get month() {
        return this._dateTime.getMonth() + 1;
    }

    private set month(value: number) {
        this._dateTime.setMonth(value - 1);
    }

    get nativeMonth() {
        return this._dateTime.getMonth();
    }

    get monthName() {
        return this._dateTime.toLocaleString('default', { month: 'long' });
    }

    get year() {
        return this._dateTime.getFullYear();
    }

    private set year(value: number) {
        this._dateTime.setFullYear(value);
    }

    get leapYear() {
        return new Date(this.year, 1, 29).getDate() === 29;
    }

    get daysInMonth() {
        return new Date(this.year, this.nativeMonth + 1, 0).getDate();
    }

    toDate() {
        return this._dateTime;
    }

    toISOString() {
        return this._dateTime.toISOString();
    }

    toString() {
        return this.toISOString();
    }

    now() {
        return this._dateTime;
    }

    set(changes: Partial<Record<DayLiteUnits, number>>) {
        const orderedKeys = orderUnits(Object.keys(changes) as DayLiteUnits[]);

        orderedKeys.forEach(key => {
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
                    if (value < 1) {
                        this.day = 1;
                    } else if (value > this.daysInMonth) {
                        this.day = this.daysInMonth;
                    } else {
                        this.day = value;
                    }
                    break;
                // case 'week':
                //     this.day = value;
                //     break;
                case 'weekday':
                    this.day += value - this.weekday;
                    break;
                case 'month':
                    if (value < 1) {
                        this.month = 1;
                    } else if (value > 12) {
                        this.month = 12;
                    } else {
                        this.month = value > 0 ? value : value + 1;
                    }
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

    plus(value: number, unit: DayLiteUnits) {
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
                this.month += value;
                break;
            case 'year':
                this.year += value;
                break;
            default:
                throw 'Cannot perform .plus() operation with unknown unit';
        }

        return this;
    }

    minus(value: number, unit: DayLiteUnits) {
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
                this.month -= value;
                break;
            case 'year':
                this.year -= value;
                break;
            default:
                throw 'Cannot perform .minus() operation with unknown unit';
        }

        return this;
    }

    next(value: number, unit: DayLiteUnits) {
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
                this._dateTime = nextMonths(this._dateTime, value);
                break;
            case 'year':
                this.year += value;
                break;
            default:
                throw 'Cannot perform .next() operation with unknown unit';
        }

        return this;
    }

    prev(value: number, unit: DayLiteUnits) {
        return this.previous(value, unit);
    }

    previous(value: number, unit: DayLiteUnits) {
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
                this.month -= value;
                break;
            case 'year':
                this.year -= value;
                break;
            default:
                throw 'Cannot perform .prev() or .previous() operation with unknown unit';
        }

        return this;
    }

    start(unit: DayLiteUnits) {
        return this.startOf(unit);
    }

    startOf(unit: DayLiteUnits) {
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
            case 'week':
                this.millisecond = 0;
                this.second = 0;
                this.minute = 0;
                this.hour = 0;
                this.day = this.day - this.weekday + 1; // plus 1 here because first Monday is first day of the week
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
                this.month = 1;
                break;
            default:
                throw 'Cannot perform .start() or .startOf() operation with unknown unit';
        }

        return this;
    }

    end(unit: DayLiteUnits) {
        return this.endOf(unit);
    }

    endOf(unit: DayLiteUnits) {
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
                this.day = new Date(this.year, this.month, 0).getDate();
                break;
            case 'year':
                this.millisecond = 999;
                this.second = 59;
                this.minute = 59;
                this.hour = 23;
                this.day = new Date(this.year, this.month, 0).getDate();
                this.month = 12;
                break;
            default:
                throw 'Cannot perform .end() or .endOf() operation with unknown unit';
        }

        return this;
    }
}

export function dayLite(date?: Date) {
    return new DayLite(date);
}
