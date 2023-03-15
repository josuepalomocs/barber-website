import { BarberDaySchedule as BarberDayScheduleType } from "@/types";
import BarberDaySchedule from "@/components/admin/BarberDaySchedules/BarberDaySchedule";

interface BarberDaySchedulesProps {
  barberDaySchedules: BarberDayScheduleType[];
}

export default function BarberDaySchedules({
  barberDaySchedules,
}: BarberDaySchedulesProps) {
  function renderBarberDaySchedules() {
    if (!barberDaySchedules.length)
      return <div className="text-center">No schedules available</div>;
    return (
      <ul className="flex flex-col space-y-4">
        {barberDaySchedules.map((barberDaySchedule) => {
          const { id, dayOfWeek, openTime, closeTime } = barberDaySchedule;
          return (
            <li key={id}>
              <BarberDaySchedule
                dayOfWeek={dayOfWeek}
                openTime={openTime}
                closeTime={closeTime}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="bg-white drop-shadow-sm p-4 rounded-sm">
      {renderBarberDaySchedules()}
    </div>
  );
}
