import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { formatDate, getDaysInMonth, isBefore } from "@/utilities/date";
import useBookingCalendar from "@/components/admin/hooks/useBookingCalendar";
import { useEffect, useRef } from "react";

export default function BookingsScreen() {
  const {
    selectedCalendarDate,
    selectedCalendarView,
    selectCalendarDate,
    selectPreviousCalendarViewMonth,
    selectNextCalendarViewMonth,
  } = useBookingCalendar();
  const {
    year: selectedYear,
    month: selectedMonth,
    dayOfMonth: selectedDayOfMonth,
  } = selectedCalendarDate;

  const selectedCalendarViewDate = new Date(
    selectedCalendarView.year,
    selectedCalendarView.month
  );

  const currentDayElement = useRef<HTMLLIElement>(null);

  function scrollToCurrentDayElement() {
    currentDayElement.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  useEffect(() => {
    scrollToCurrentDayElement();
  }, []);

  function renderMonthDays() {
    const daysInSelectedCalendarViewMonth = getDaysInMonth(
      selectedCalendarViewDate
    );

    return Array.from(
      { length: daysInSelectedCalendarViewMonth },
      (_, index) => {
        const pastDayStyles =
          "bg-transparent text-neutral-400 drop-shadow-none";
        const currentAndFutureDayStyles = "bg-white";
        const selectedDateStyles = "bg-black text-white drop-shadow-none";
        return (
          <li
            key={index}
            ref={
              new Date().getDate() === index + 1 ? currentDayElement : undefined
            }
            className={`drop-shadow-sm rounded-sm ${
              selectedYear === selectedCalendarView.year &&
              selectedMonth === selectedCalendarView.month &&
              selectedDayOfMonth === index + 1
                ? selectedDateStyles
                : isBefore(
                    new Date(
                      selectedCalendarView.year,
                      selectedCalendarView.month,
                      index + 2
                    ),
                    new Date()
                  )
                ? pastDayStyles
                : currentAndFutureDayStyles
            }`}
          >
            <button
              className={`flex flex-col space-y-2 justify-center items-center w-16 h-16`}
              onClick={() => {
                selectCalendarDate(
                  selectedCalendarView.year,
                  selectedCalendarView.month,
                  index + 1
                );
              }}
            >
              <span className="text-xs">
                {formatDate(
                  new Date(
                    selectedCalendarView.year,
                    selectedCalendarView.month,
                    index + 1
                  ),
                  "iii"
                )}
              </span>
              <span className="text-base">{index + 1}</span>
            </button>
          </li>
        );
      }
    );
  }

  return (
    <div className="w-full h-full text-sm bg-neutral-50 text-neutral-700">
      <div className="text-center p-4 border-b">
        <h1 className="text-xl font-display">BOOKINGS</h1>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="p-2" onClick={selectPreviousCalendarViewMonth}>
            <ChevronLeftIcon className="w-[20px] h-[20px]" />
          </button>
          <span>
            {formatDate(
              new Date(selectedCalendarView.year, selectedCalendarView.month),
              "MMM yyyy"
            )}
          </span>
          <button className="p-2" onClick={selectNextCalendarViewMonth}>
            <ChevronRightIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
        <ul className="flex space-x-4 overflow-x-auto">{renderMonthDays()}</ul>
      </div>
    </div>
  );
}
