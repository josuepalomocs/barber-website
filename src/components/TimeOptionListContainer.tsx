import TimeOptionList from "@/components/TimeOptionList";
import useAvailableAppointmentsByDate from "@/hooks/useAvailableAppointmentsByDate";
import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";

interface TimeOptionListContainer {}

export default function TimeOptionListContainer({}: TimeOptionListContainer) {
  return (
    <div className="text-sm">
      <p className="text-neutral-500 mb-4">Pick a time</p>
      <TimeOptionList />
    </div>
  );
}
