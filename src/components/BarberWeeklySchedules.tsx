import useBarberWeeklySchedule from "@/hooks/useBarberWeeklySchedule";

export default function BarberWeeklySchedules() {
  const { barberWeeklySchedule, error } = useBarberWeeklySchedule();
  console.log(barberWeeklySchedule);

  return <></>;
}
