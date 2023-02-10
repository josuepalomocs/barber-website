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

interface CalendarProps {
  currentDate: Date;
}

export default function Calendar({ currentDate }: CalendarProps) {
  const {
    selectedDate,
    selectDate,
    selectedView,
    selectPreviousView,
    selectNextView,
  } = useCalendar({
    currentDate,
  });

  const inactiveDayStyling = "text-neutral-400 font-light";
  const selectedDayStyling =
    "bg-blue-50 outline outline-1 outline-blue-400 rounded";
  const currentDayStyling = "bg-neutral-100 rounded";

  function renderTableBodyRows() {
    const firstDayOfMonthDate = new Date(
      selectedView.year,
      selectedView.month,
      1
    );
    const firstDayOfMonthIndex = getWeekday(firstDayOfMonthDate);
    const daysInMonth = getDaysInMonth(firstDayOfMonthDate);
    const numCalendarRows = Math.ceil((daysInMonth + firstDayOfMonthIndex) / 7);

    console.log(firstDayOfMonthIndex);

    return Array.from({ length: numCalendarRows }, (_, i) => (
      <tr key={i} className="text-xs flex justify-between">
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
                7 * i + j - firstDayOfMonthIndex + 1 === selectedDate.day &&
                selectedView.month === selectedDate.month
                  ? selectedDayStyling
                  : 7 * i + j - firstDayOfMonthIndex + 1 ===
                      getDayOfMonth(currentDate) &&
                    selectedView.month === getMonth(currentDate) &&
                    selectedView.year === getYear(currentDate)
                  ? currentDayStyling
                  : ""
              }`}
            >
              {7 * i + j - firstDayOfMonthIndex + 1 <
                getDayOfMonth(currentDate) &&
              selectedView.month === getMonth(currentDate) ? (
                <div
                  className={`flex items-center justify-center ${inactiveDayStyling} w-10 h-10`}
                >
                  {7 * i + j - firstDayOfMonthIndex + 1}
                </div>
              ) : (
                <button
                  className="w-10 h-10"
                  onClick={() => {
                    selectDate(
                      7 * i + j - firstDayOfMonthIndex + 1,
                      selectedView.month,
                      selectedView.year
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
    <div className="py-2 rounded-lg border border-neutral-200 bg-white">
      <div className="mb-2">
        <div className="flex justify-center space-x-2 items-center">
          <button className="text-neutral-400 p-2" onClick={selectPreviousView}>
            <ChevronLeftIcon className="w-[16px] h-[16px]" />
          </button>
          <span className="text-xs">
            {formatDate(
              new Date(selectedView.year, selectedView.month),
              "MMMM yyyy"
            )}
          </span>
          <button className="text-neutral-400 p-2" onClick={selectNextView}>
            <ChevronRightIcon className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>
      <hr className="border-neutral-200 mb-2" />
      <table className="border-collapse w-auto m-auto">
        <thead className="text-xs">
          <tr className="flex justify-between [&>th]:font-light [&>th]:w-10 [&>th]:h-10">
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
