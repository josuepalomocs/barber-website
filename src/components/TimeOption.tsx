import {
  formatDate,
  getDayOfMonth,
  getMonth,
  getYear,
  isSameMinute,
} from "@/utilities/date";
import useAppointment from "@/hooks/useAppointment";
import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";

interface TimeOptionProps {
  date: Date;
}

export default function TimeOption({ date }: TimeOptionProps) {
  const { selectedDateTime, selectDateTime } = useContext(AppointmentContext);
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDayOfMonth(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeOptionDate = new Date(year, month, day, hours, minutes);

  console.log(date);

  const selectedTimeOptionStyles = "bg-neutral-900 text-white";

  const sameDateTime = isSameMinute(selectedDateTime, timeOptionDate);

  return (
    <button
      className={`w-full h-full p-3 focus:outline-neutral-300 ${
        sameDateTime ? selectedTimeOptionStyles : ""
      }`}
      onClick={() => {
        selectDateTime(new Date(year, month, day, hours, minutes));
      }}
    >
      <time dateTime={date.toISOString()}>{formatDate(date, "h:mmaaa")}</time>
    </button>
  );
}
