import {
    add,
    endOfMonth,
    isAfter,
    isBefore,
    isSameDay,
    isSameMonth,
    isSameYear,
    startOfDay,
    startOfMonth,
} from 'date-fns'

export enum Day {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

export function isInDateRange(range: [Date, Date], date: Date) {
    if (isSameDay(range[0], date) || isSameDay(range[1], date)) return true
    return isAfter(date, range[0]) && isBefore(date, range[1])
}

export function isSpecificDay(days: Day[], date: Date) {
    return days.includes(date.getDay())
}

export function addMonth(date: Date, amount: number) {
    return add(date, {
        months: amount,
    })
}

export function getDateOfMonth(date: string) {
    return new Date(date)
}

export function isStartOfMonth(date: Date) {
    return isSameDay(startOfMonth(date), date)
}

export function isEndOfMonth(date: Date) {
    return isSameDay(endOfMonth(date), date)
}

export function isEqualDate(dateLeft: Date, dateRight: Date | null) {
    return !!dateRight && isSameDay(dateLeft, dateRight)
}

export function isBeforeDate(dateLeft: Date, dateRight: Date) {
    return isBefore(startOfDay(dateLeft), startOfDay(dateRight))
}

export function isAfterDate(dateLeft: Date, dateRight: Date) {
    return isAfter(startOfDay(dateLeft), startOfDay(dateRight))
}

export function isSameOrAfter(dateLeft: Date, dateRight: Date) {
    return isEqualDate(dateLeft, dateRight) || isAfter(dateLeft, dateRight)
}

export function isSameMonthOfYear(dateLeft: Date, dateRight: Date) {
    return isSameMonth(dateLeft, dateRight) && isSameYear(dateLeft, dateRight)
}
