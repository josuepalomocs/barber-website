import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import useCalendar from "@/hooks/useCalendar";
import {
  formatDate,
  getDayOfMonth,
  getDayOfWeek,
  getDaysInMonth,
  getMonth,
  getYear,
} from "@/utilities/date";
import { useContext } from "react";
import { CustomerAppointmentContext } from "@/context/CustomerAppointmentProvider";

export default function Calendar() {
  const { selectedISODateTime, setSelectedISODateTime } = useContext(
    CustomerAppointmentContext
  );
  console.log(selectedISODateTime);
  const selectedDate = new Date(selectedISODateTime);
  const selectedDateYear = selectedDate.getFullYear();
  const selectedDateMonth = selectedDate.getMonth();
  const selectedDateDayOfMonth = selectedDate.getDate();

  const {
    selectedCalendarView,
    selectPreviousView,
    selectNextView,
    closedDaysOfWeek,
  } = useCalendar();
  const disabledTableCellStyles = "text-neutral-400 font-light";
  const activeTableCellStyles = "hover:bg-neutral-200 text-neutral-800";
  const selectedTableCellStyles =
    "bg-blue-50 outline outline-1 outline-blue-500 rounded-sm";

  function renderTableBodyRows() {
    const firstDayOfMonthDate = new Date(
      selectedCalendarView.year,
      selectedCalendarView.month,
      1
    );
    const firstDayOfMonthIndex = getDayOfWeek(firstDayOfMonthDate);
    const daysInMonth = getDaysInMonth(firstDayOfMonthDate);
    const numCalendarRows = Math.ceil((daysInMonth + firstDayOfMonthIndex) / 7);

    return Array.from({ length: numCalendarRows }, (_, i) => (
      <tr key={i} className="text-sm flex justify-between">
        {Array.from({ length: 7 }, (_, j) => {
          const tableCellIndex = i * 7 + j;
          if (isTableCellEmpty())
            return <td key={tableCellIndex} className="w-10 h-10" />;

          if (isTableCellDisabled()) {
            return (
              <td
                key={tableCellIndex}
                className={`w-10 h-10 ${disabledTableCellStyles}`}
              >
                <div className={`flex items-center justify-center w-10 h-10`}>
                  {tableCellIndex - firstDayOfMonthIndex + 1}
                </div>
              </td>
            );
          }

          return (
            <td
              key={tableCellIndex}
              className={`${
                isTableCellSelected()
                  ? selectedTableCellStyles
                  : isTableCellActive()
                  ? activeTableCellStyles
                  : ""
              }`}
            >
              {isTableCellDisabled() ? (
                <div
                  className={`flex items-center justify-center w-10 h-10 ${disabledTableCellStyles}`}
                >
                  {tableCellIndex - firstDayOfMonthIndex + 1}
                </div>
              ) : (
                <button
                  className="w-10 h-10 focus:outline-neutral-300"
                  onClick={() => {
                    setSelectedISODateTime(
                      `${selectedCalendarView.year}-${
                        selectedCalendarView.month + 1 < 10
                          ? `0${selectedCalendarView.month + 1}`
                          : selectedCalendarView.month + 1
                      }-${
                        tableCellIndex - firstDayOfMonthIndex + 1 < 10
                          ? `0${tableCellIndex - firstDayOfMonthIndex + 1}`
                          : tableCellIndex - firstDayOfMonthIndex + 1
                      }T06:00:00.000Z`
                    );
                  }}
                >
                  {tableCellIndex - firstDayOfMonthIndex + 1}
                </button>
              )}
            </td>
          );
          function isTableCellEmpty() {
            return (
              (i === 0 && j < firstDayOfMonthIndex) ||
              (i === numCalendarRows - 1 &&
                tableCellIndex - firstDayOfMonthIndex + 1 > daysInMonth)
            );
          }

          function isTableCellDisabled() {
            return (
              closedDaysOfWeek.includes(j) ||
              (tableCellIndex - firstDayOfMonthIndex + 1 <
                getDayOfMonth(new Date()) &&
                selectedCalendarView.month === getMonth(new Date()) &&
                selectedCalendarView.year === getYear(new Date()))
            );
          }

          function isTableCellSelected() {
            return (
              tableCellIndex - firstDayOfMonthIndex + 1 ===
                selectedDateDayOfMonth &&
              selectedCalendarView.month === selectedDateMonth &&
              selectedCalendarView.year === selectedDateYear
            );
          }

          function isTableCellActive() {
            return (
              tableCellIndex - firstDayOfMonthIndex + 1 >=
                getDayOfMonth(new Date()) ||
              selectedCalendarView.month != getMonth(new Date()) ||
              selectedCalendarView.year != getYear(new Date())
            );
          }
        })}
      </tr>
    ));
  }

  return (
    <div className="py-2 border border-neutral-200 bg-white rounded-sm">
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
              new Date(selectedCalendarView.year, selectedCalendarView.month),
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
