import TimeOptionList from "@/components/TimeOptionList";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import { AvailableAppointment } from "@/types";
import { AvailableAppointmentsContext } from "@/context/AvailableAppointmentProvider";

export default function TimeOptionListContainer() {
  const { availableAppointments, availableAppointmentsAreLoading } = useContext(
    AvailableAppointmentsContext
  );

  const [selectedGroup, setSelectedGroup] = useState(0);

  useEffect(() => {
    setSelectedGroup(0);
  }, [availableAppointments]);

  const availableAppointmentTimeGroups: AvailableAppointment[][] =
    createAvailableAppointmentTimeGroups();

  function createAvailableAppointmentTimeGroups(): AvailableAppointment[][] {
    const result: AvailableAppointment[][] = [];

    for (let i = 0; i < availableAppointments.length; i += 8) {
      result.push(availableAppointments.slice(i, i + 8));
    }

    return result;
  }

  return (
    <div className="text-sm">
      <div className="flex justify-between mb-4 items-center">
        <p className="text-neutral-500">Pick a time</p>
        <div className="text-neutral-400">
          <button
            className="p-2 hover:bg-neutral-200 rounded-sm"
            onClick={() => {
              if (selectedGroup > 0) {
                setSelectedGroup(selectedGroup - 1);
              }
            }}
          >
            <ChevronUpIcon className="w-[20px] h-[20px]" />
          </button>
          <button
            className="p-2 hover:bg-neutral-200 rounded-sm"
            onClick={() => {
              if (selectedGroup < availableAppointmentTimeGroups.length - 1) {
                setSelectedGroup(selectedGroup + 1);
              }
            }}
          >
            <ChevronDownIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <TimeOptionList
        timeOptionList={availableAppointmentTimeGroups[selectedGroup]}
        isLoading={availableAppointmentsAreLoading}
      />
    </div>
  );
}
