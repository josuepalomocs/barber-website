import {
  getDay as getDayFn,
  getMonth as getMonthFn,
  getYear as getYearFn,
  getDaysInMonth as getDaysInMonthFn,
  format as formatFn,
  isSameMinute as isSameMinuteFn,
  isBefore as isBeforeFn,
  isAfter as isAfterFn,
} from "date-fns";

export function getDayOfWeek(date: Date): number {
  return getDayFn(date);
}

export function getMonth(date: Date): number {
  return getMonthFn(date);
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

export function isBefore(dateA: Date, dateB: Date): boolean {
  return isBeforeFn(dateA, dateB);
}

export function isAfter(dateA: Date, dateB: Date): boolean {
  return isAfterFn(dateA, dateB);
}

export function isSameOrBefore(dateA: Date, dateB: Date) {
  return isBefore(dateA, dateB) || isSameMinute(dateA, dateB);
}

export function isSameOrAfter(dateA: Date, dateB: Date) {
  return isAfter(dateA, dateB) || isSameMinute(dateA, dateB);
}

export function areDatesOverlapping(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date
): boolean {
  return startA <= endB && endA >= startB;
}

export function convertUnixTimestampToDate(timestamp: number) {
  return new Date(timestamp * 1000);
}

export function convertDateToUnixTimestamp(date: Date) {
  return date.getTime() / 1000;
}

export function convertDateToISOString(date: Date) {
  return date.toISOString();
}
