import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { formatDate, isBefore } from "@/utilities/date";
import { useState } from "react";

export default function BookingsScreen() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  function renderMonthDays(yearNumber: number, monthNumber: number) {
    const date = new Date(yearNumber, monthNumber + 1, 0);
    const days = date.getDate();

    return Array.from({ length: days }, (_, index) => {
      const pastDayStyles = "bg-transparent text-neutral-400";
      const currentDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        index + 1
      );
      return (
        <li key={index}>
          <button
            className={`flex flex-col space-y-2 justify-center items-center w-16 h-16 drop-shadow-sm bg-white rounded-sm ${
              isBefore(currentDate, new Date()) && pastDayStyles
            }`}
          >
            <span className="text-xs text-neutral-400">
              {formatDate(
                new Date(date.getFullYear(), date.getMonth(), index + 1),
                "iii"
              )}
            </span>
            <span className="text-base">{index + 1}</span>
          </button>
        </li>
      );
    });
  }

  return (
    <div className="w-full h-full text-sm bg-neutral-50 text-neutral-700">
      <div className="text-center p-4 border-b">
        <h1 className="text-xl font-display">BOOKINGS</h1>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="p-2">
            <ChevronLeftIcon className="w-[20px] h-[20px]" />
          </button>
          <span>March 2023</span>
          <button className="p-2">
            <ChevronRightIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
        <ul className="flex space-x-4 overflow-x-auto">
          {renderMonthDays(selectedYear, selectedMonth)}
        </ul>
      </div>
    </div>
  );
}
