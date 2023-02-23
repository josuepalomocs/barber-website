import TimeOption from "@/components/TimeOption";
import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";
import useAvailableAppointmentsByDate from "@/hooks/useAvailableAppointmentsByDate";
import { convertUnixTimestampToDate } from "@/utilities/date";

export default function TimeOptionList() {
  const { availableAppointments, availableAppointmentsAreLoading } =
    useContext(AppointmentContext);

  function renderTimeOptions(): JSX.Element[] {
    return availableAppointments.map(({ startTimestamp }) => {
      return (
        <li
          key={startTimestamp}
          className="text-center bg-white hover:bg-neutral-200 rounded-lg"
        >
          <TimeOption date={convertUnixTimestampToDate(startTimestamp)} />
        </li>
      );
    });
  }

  if (availableAppointmentsAreLoading)
    return (
      <div className="flex justify-center w-full h-full opacity-80 animate-fadeIn">
        <img src="/icons8-barber-pole.gif" />
      </div>
    );

  if (!availableAppointments.length)
    return (
      <div className="flex justify-center w-full h-full animate-fadeIn">
        <p className="text-sm text-neutral-500 text-center">
          Sorry about that, we&apos;re full.
          <br />
          Try another date.
        </p>
      </div>
    );

  return (
    <ul className="grid grid-cols-2 gap-2 animate-fadeIn">
      {renderTimeOptions()}
    </ul>
  );
}
