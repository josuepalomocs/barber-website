import { useEffect, useState } from "react";
import { BarberDaySchedule } from "@/types";
import { springServerHttpClient } from "@/lib/axios";

export default function useBarberDaySchedules() {
  const [barberDaySchedules, setBarberDaySchedules] = useState<
    BarberDaySchedule[]
  >([]);

  useEffect(() => {
    async function getBarberDaySchedules() {
      try {
        const { data } = await springServerHttpClient.get<BarberDaySchedule[]>(
          "/barber-day-schedules"
        );
        setBarberDaySchedules(data);
      } catch (error) {
        console.log(error);
      }
    }

    getBarberDaySchedules();
  }, []);

  return { barberDaySchedules };
}
