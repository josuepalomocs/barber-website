import {
  getDay as getDayFn,
  getMonth as getMonthFn,
  getYear as getYearFn,
  getDaysInMonth as getDaysInMonthFn,
  format as formatFn,
  isSameMinute as isSameMinuteFn,
  isAfter as isAfterFn,
} from "date-fns";

export type WeekdayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export function getWeekday(date: Date): WeekdayNumber {
  return getDayFn(date);
}

export function getMonth(date: Date): MonthNumber {
  return getMonthFn(date) as MonthNumber;
}

export function getYear(date: Date): number {
  return getYearFn(date);
}

export function getDaysInMonth(date: Date): number {
  return getDaysInMonthFn(date);
}

export function getDayOfMonth(date: Date): number {
  return date.getDate();
}

export function formatDate(date: Date, format: string): string {
  return formatFn(date, format);
}

export function isSameMinute(dateA: Date, dateB: Date): boolean {
  return isSameMinuteFn(dateA, dateB);
}

export function isAfter(dateA: Date, dateB: Date): boolean {
  return isAfterFn(dateA, dateB);
}

export function isSameOrAfter(dateA: Date, dateB: Date) {
  return isAfter(dateA, dateB) || isSameMinute(dateA, dateB);
}
