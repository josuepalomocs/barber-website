import { useState } from "react";

interface CalendarDate {
  year: number;
  month: number;
  dayOfMonth: number;
}

interface CalendarView {
  year: number;
  month: number;
}

export default function useBookingCalendar() {
  const [selectedCalendarDate, setSelectedCalendarDate] =
    useState<CalendarDate>({
      year: getCurrentYear(),
      month: getCurrentMonth(),
      dayOfMonth: getCurrentDayOfMonth(),
    });
  const [selectedCalendarView, setSelectedCalendarView] =
    useState<CalendarView>({
      year: getCurrentYear(),
      month: getCurrentMonth(),
    });

  function selectCalendarDate(year: number, month: number, dayOfMonth: number) {
    setSelectedCalendarDate({ year, month, dayOfMonth });
  }

  function selectPreviousCalendarViewMonth() {
    if (selectedCalendarView.month === 0) {
      setSelectedCalendarView({
        year: selectedCalendarView.year - 1,
        month: 11,
      });
      return;
    }
    setSelectedCalendarView({
      ...selectedCalendarView,
      month: selectedCalendarView.month - 1,
    });
  }

  function selectNextCalendarViewMonth() {
    if (selectedCalendarView.month === 11) {
      setSelectedCalendarView({
        year: selectedCalendarView.year + 1,
        month: 0,
      });
      return;
    }
    setSelectedCalendarView({
      ...selectedCalendarView,
      month: selectedCalendarView.month + 1,
    });
  }

  return {
    selectedCalendarDate,
    selectedCalendarView,
    selectCalendarDate,
    selectPreviousCalendarViewMonth,
    selectNextCalendarViewMonth,
  };
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getCurrentMonth() {
  return new Date().getMonth();
}

function getCurrentDayOfMonth() {
  return new Date().getDate();
}
