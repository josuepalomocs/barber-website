import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  formatDate,
  getDateFromString,
  getDayOfMonthFromDate,
  getDayOfWeekFromDate,
  getDaysInMonth,
  getMonthFromDate,
  getStartOfMonthDate,
  getYearFromDate,
} from "@/utilities/dayjs";
import { MonthNumber } from "@/types";

interface CalendarProps {
  currentDate: Date;
}

export default function Calendar({ currentDate }: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState(
    getDayOfMonthFromDate(currentDate)
  );
  const [selectedMonth, setSelectedMonth] = useState<MonthNumber>(
    getMonthFromDate(currentDate)
  );
  const [selectedYear, setSelectedYear] = useState(
    getYearFromDate(currentDate)
  );

  const inactiveDayStyling = "text-neutral-400 font-light";
  const selectedDayStyling =
    "bg-blue-50 outline outline-1 outline-blue-400 rounded";

  function renderTableBodyRows() {
    const startOfMonth = getStartOfMonthDate(
      getDateFromString(`${selectedYear}-${selectedMonth + 1}-${selectedDay}`)
    );
    const firstDayIndex = getDayOfWeekFromDate(startOfMonth);
    const daysInMonth = getDaysInMonth(selectedMonth + 1, selectedYear);

    const numRows = Math.ceil((daysInMonth + firstDayIndex) / 7);

    return Array.from({ length: numRows }, (_, i) => (
      <tr key={i} className="text-xs flex justify-between">
        {Array.from({ length: 7 }, (_, j) => {
          if (i === 0 && j < firstDayIndex) {
            return <td key={i * 7 + j} className="w-8 h-8" />;
          }
          if (
            i === numRows - 1 &&
            7 * i + j - firstDayIndex + 1 > daysInMonth
          ) {
            return <td key={i * 7 + j} className="w-8 h-8" />;
          }
          return (
            <td
              key={i * 7 + j}
              className={`${
                7 * i + j - firstDayIndex + 1 === selectedDay
                  ? selectedDayStyling
                  : ""
              }`}
            >
              {7 * i + j - firstDayIndex + 1 <
              getDayOfMonthFromDate(currentDate) ? (
                <div
                  className={`flex items-center justify-center ${inactiveDayStyling} w-8 h-8`}
                >
                  {7 * i + j - firstDayIndex + 1}
                </div>
              ) : (
                <button
                  className="w-8 h-8"
                  onClick={() => {
                    setSelectedDay(7 * i + j - firstDayIndex + 1);
                  }}
                >
                  {7 * i + j - firstDayIndex + 1}
                </button>
              )}
            </td>
          );
        })}
      </tr>
    ));
  }

  return (
    <div className="p-4 rounded-lg border border-neutral-200 bg-white">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <button
            className="text-neutral-400"
            onClick={() => {
              setSelectedMonth((selectedMonth - 1) as MonthNumber);
            }}
          >
            <ChevronLeftIcon className="w-[20px] h-[20px]" />
          </button>
          <span className="text-xs">
            {formatDate(`${selectedYear}-${selectedMonth + 1}`, "MMMM")}
          </span>
          <button
            className="text-neutral-400"
            onClick={() => {
              setSelectedMonth((selectedMonth + 1) as MonthNumber);
            }}
          >
            <ChevronRightIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <hr className="border-neutral-200 mb-2" />
      <table className="border-collapse w-full">
        <thead className="text-xs">
          <tr className="flex justify-between [&>th]:font-light [&>th]:w-8 [&>th]:h-8">
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
