import { useEffect, useState } from "react";
import { getDayOfMonth, getMonth, getYear } from "@/utilities/date";
import { BarberDaySchedule } from "@/types";
import { getBarberDaySchedulesRequest } from "@/services/api";

interface View {
  month: number;
  year: number;
}

interface SelectedDate {
  day: number;
  month: number;
  year: number;
}

interface UseCalendarParams {
  currentDate: Date;
}

export default function useCalendar({ currentDate }: UseCalendarParams) {
  const selectedViewInitialState: View = {
    month: getMonth(currentDate),
    year: getYear(currentDate),
  };

  const [selectedView, setSelectedView] = useState<View>(
    selectedViewInitialState
  );

  const selectedDateInitialState: SelectedDate = {
    day: getDayOfMonth(currentDate),
    month: getMonth(currentDate),
    year: getYear(currentDate),
  };

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(
    selectedDateInitialState
  );

  const [barberDaySchedules, setBarberDaySchedules] = useState<
    BarberDaySchedule[]
  >([]);

  function selectPreviousView(): void {
    const currentMonth = getMonth(new Date());
    const currentYear = getYear(new Date());
    if (
      selectedView.month !== currentMonth ||
      selectedView.year !== currentYear
    ) {
      if (selectedView.month === 0) {
        const newView: View = { month: 11, year: selectedView.year - 1 };
        setSelectedView(newView);
        return;
      }
      const newMonthView: View = {
        ...selectedView,
        month: selectedView.month - 1,
      };
      setSelectedView(newMonthView);
    }
  }

  function selectNextView() {
    if (selectedView.month === 11) {
      const newMonthView: View = { month: 0, year: selectedView.year + 1 };
      setSelectedView(newMonthView);
      return;
    }
    const newMonthView: View = {
      ...selectedView,
      month: selectedView.month + 1,
    };
    setSelectedView(newMonthView);
  }

  function selectDate(day: number, month: number, year: number) {
    setSelectedDate({
      day,
      month,
      year,
    });
  }

  const closedDaysOfWeek = barberDaySchedules
    .filter(({ openTime }) => {
      return openTime === "";
    })
    .map(({ weekdayNumber }) => {
      return weekdayNumber;
    });

  useEffect(() => {
    async function getBarberDaySchedules() {
      const response = await getBarberDaySchedulesRequest();
      setBarberDaySchedules(response);
    }

    getBarberDaySchedules().catch((error) => console.log(error));
  }, []);

  return {
    selectedDate,
    selectDate,
    selectedView,
    selectPreviousView,
    selectNextView,
    closedDaysOfWeek,
  };
}
