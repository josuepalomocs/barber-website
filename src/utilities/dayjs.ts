import dayjs, { ManipulateType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DayOfWeekNumber, MonthNumber } from "@/types";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getCurrentDate(): Date {
  return new Date();
}

export function getDateFromString(s: string): Date {
  return dayjs(s).toDate();
}

export function getDayOfWeekFromDate(date: Date | string): DayOfWeekNumber {
  return dayjs(date).day() as DayOfWeekNumber;
}

export function getDayOfMonthFromDate(date: Date | string): number {
  return dayjs(date).date();
}

export function getMonthFromDate(date: Date | string): MonthNumber {
  return dayjs(date).month() as MonthNumber;
}

export function getYearFromDate(date: Date | string): number {
  return dayjs(date).year();
}

export function getDaysInMonth(month: number, year: number): number {
  return dayjs(`${year}-0${month}-11`).daysInMonth();
}

export function formatDate(date: Date | string, format: string): string {
  return dayjs(date).format(format);
}

export function getStartOfMonthDate(date: Date | string) {
  return dayjs(date).startOf("month").toDate();
}

export function subtractFromDate(
  date: Date | string,
  amount: number,
  unit: ManipulateType
): Date {
  return dayjs(date).subtract(amount, unit).toDate();
}
