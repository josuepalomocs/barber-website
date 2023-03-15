import BarberDaySchedules from "@/components/admin/BarberDaySchedules/BarberDaySchedules";
import useBarberDaySchedules from "@/components/admin/BarberDaySchedules/useBarberDaySchedules";

export default function BarberDaySchedulesContainer() {
  const { barberDaySchedules } = useBarberDaySchedules();

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg">Schedules</h2>
      </div>
      <BarberDaySchedules barberDaySchedules={barberDaySchedules} />
    </div>
  );
}
