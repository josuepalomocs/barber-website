import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import useCalendar from "@/hooks/useCalendar";
import {
  formatDate,
  getDayOfMonth,
  getDaysInMonth,
  getMonth,
  getWeekday,
  getYear,
} from "@/utilities/date";
import useAppointment from "@/hooks/useAppointment";
import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";

interface CalendarProps {}

export default function Calendar({}: CalendarProps) {
  const { selectedDateTime, selectDateTime } = useContext(AppointmentContext);

  const { selectDate, selectedView, selectPreviousView, selectNextView } =
    useCalendar({
      currentDate: selectedDateTime,
    });

  const inactiveButtonStyles = "text-neutral-400 hover:bg-neutral-200";
  const inactiveDayStyles = "text-neutral-400 font-light";
  const selectedDayStyles =
    "bg-blue-50 outline outline-1 outline-blue-500 rounded-lg";

  function renderTableBodyRows() {
    const firstDayOfMonthDate = new Date(
      selectedView.year,
      selectedView.month,
      1
    );
    const firstDayOfMonthIndex = getWeekday(firstDayOfMonthDate);
    const daysInMonth = getDaysInMonth(firstDayOfMonthDate);
    const numCalendarRows = Math.ceil((daysInMonth + firstDayOfMonthIndex) / 7);

    return Array.from({ length: numCalendarRows }, (_, i) => (
      <tr key={i} className="text-sm flex justify-between">
        {Array.from({ length: 7 }, (_, j) => {
          if (i === 0 && j < firstDayOfMonthIndex) {
            return <td key={i * 7 + j} className="w-10 h-10" />;
          }
          if (
            i === numCalendarRows - 1 &&
            7 * i + j - firstDayOfMonthIndex + 1 > daysInMonth
          ) {
            return <td key={i * 7 + j} className="w-10 h-10" />;
          }
          return (
            <td
              key={i * 7 + j}
              className={`${
                7 * i + j - firstDayOfMonthIndex + 1 ===
                  getDayOfMonth(selectedDateTime) &&
                selectedView.month === getMonth(selectedDateTime) &&
                selectedView.year === getYear(selectedDateTime)
                  ? selectedDayStyles
                  : 7 * i + j - firstDayOfMonthIndex + 1 >=
                    getDayOfMonth(new Date())
                  ? "hover:bg-neutral-200"
                  : ""
              }`}
            >
              {7 * i + j - firstDayOfMonthIndex + 1 <
                getDayOfMonth(new Date()) &&
              selectedView.month === getMonth(new Date()) &&
              selectedView.year === getYear(new Date()) ? (
                <div
                  className={`flex items-center justify-center ${inactiveDayStyles} w-10 h-10`}
                >
                  {7 * i + j - firstDayOfMonthIndex + 1}
                </div>
              ) : (
                <button
                  className="w-10 h-10 focus:outline-neutral-300"
                  onClick={() => {
                    selectDateTime(
                      new Date(
                        selectedView.year,
                        selectedView.month,
                        7 * i + j - firstDayOfMonthIndex + 1,
                        0,
                        0
                      )
                    );
                  }}
                >
                  {7 * i + j - firstDayOfMonthIndex + 1}
                </button>
              )}
            </td>
          );
        })}
      </tr>
    ));
  }

  return (
    <div className="py-2 border border-neutral-200 bg-white rounded-lg">
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <button
            className={`ml-8 text-neutral-400 p-2 hover:text-neutral-500 hover:bg-neutral-200 focus:outline-neutral-300`}
            onClick={selectPreviousView}
          >
            <ChevronLeftIcon className="w-[20px] h-[20px]" />
          </button>
          <span className="text-sm text-neutral-500">
            {formatDate(
              new Date(selectedView.year, selectedView.month),
              "MMMM yyyy"
            )}
          </span>
          <button
            className="mr-8 text-neutral-400 p-2 hover:text-neutral-500 hover:bg-neutral-200 focus:outline-neutral-300"
            onClick={selectNextView}
          >
            <ChevronRightIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <hr className="border-neutral-200 mb-2" />
      <table className="border-collapse w-auto m-auto">
        <thead className="text-sm">
          <tr className="flex justify-between [&>th]:font-normal [&>th]:text-neutral-500 [&>th]:w-10 [&>th]:h-10">
            <th className="flex justify-center items-center">Sun</th>
            <th className="flex justify-center items-center">Mon</th>
            <th className="flex justify-center items-center">Tue</th>
            <th className="flex justify-center items-center">Wed</th>
            <th className="flex justify-center items-center">Thu</th>
            <th className="flex justify-center items-center">Fri</th>
            <th className="flex justify-center items-center">Sat</th>
          </tr>
        </thead>
        <tbody>{renderTableBodyRows()}</tbody>
      </table>
    </div>
  );
}
