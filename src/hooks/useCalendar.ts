import { useState } from "react";
import { getDayOfMonth, getMonth, getYear } from "@/utilities/date";

type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface View {
  month: MonthNumber;
  year: number;
}

interface SelectedDate {
  day: number;
  month: MonthNumber;
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
        month: (selectedView.month - 1) as MonthNumber,
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
      month: (selectedView.month + 1) as MonthNumber,
    };
    setSelectedView(newMonthView);
  }

  function selectDate(day: number, month: MonthNumber, year: number) {
    setSelectedDate({
      day,
      month,
      year,
    });
  }

  return {
    selectedDate,
    selectDate,
    selectedView,
    selectPreviousView,
    selectNextView,
  };
}
