import {
  getDay as getDayFn,
  getMonth as getMonthFn,
  getYear as getYearFn,
  getDaysInMonth as getDaysInMonthFn,
  format as formatFn,
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

export function getDaysInMonth(date: Date) {
  return getDaysInMonthFn(date);
}

export function getDayOfMonth(date: Date) {
  return date.getDate();
}

export function formatDate(date: Date, format: string) {
  return formatFn(date, format);
}
