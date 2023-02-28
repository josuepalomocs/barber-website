import { useEffect, useState } from "react";
import { BarberDaySchedule } from "@/types";
import { getBarberDaySchedules } from "@/services/api";

interface CalendarView {
  year: number;
  month: number;
}

export default function useCalendar() {
  const currentDate = new Date();
  const currentDateYear = currentDate.getFullYear();
  const currentDateMonth = currentDate.getMonth();

  const [selectedCalendarView, setSelectedCalendarView] =
    useState<CalendarView>({
      year: currentDateYear,
      month: currentDateMonth,
    });

  const [barberDaySchedules, setBarberDaySchedules] = useState<
    BarberDaySchedule[]
  >([]);

  useEffect(() => {
    getBarberDaySchedules()
      .then((barberDaySchedules) => setBarberDaySchedules(barberDaySchedules))
      .catch((error) => console.log(error));
  }, []);

  function selectPreviousView(): void {
    const isDifferentMonthOrYear =
      selectedCalendarView.month !== currentDateMonth ||
      selectedCalendarView.year !== currentDateYear;

    if (isDifferentMonthOrYear) {
      let newMonth = selectedCalendarView.month - 1;
      let newYear = selectedCalendarView.year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      const newView = { month: newMonth, year: newYear };
      setSelectedCalendarView(newView);
    }
  }

  function selectNextView() {
    let newMonth = selectedCalendarView.month + 1;
    let newYear = selectedCalendarView.year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    const newView = { month: newMonth, year: newYear };
    setSelectedCalendarView(newView);
  }

  const closedDaysOfWeek = barberDaySchedules
    .filter(({ openTime }) => {
      return openTime === "";
    })
    .map(({ dayOfWeek }) => {
      return dayOfWeek;
    });

  return {
    selectedCalendarView,
    closedDaysOfWeek,
    selectPreviousView,
    selectNextView,
  };
}
