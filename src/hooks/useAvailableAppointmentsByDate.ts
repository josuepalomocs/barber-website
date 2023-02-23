import { useEffect, useState } from "react";
import { getAvailableAppointmentsByDateRequest } from "@/services/api";
import { AvailableAppointment } from "@/types";

export default function useAvailableAppointmentsByDate(date: string) {
  const [availableAppointments, setAvailableAppointments] = useState<
    AvailableAppointment[]
  >([]);
  const [availableAppointmentsAreLoading, setAvailableAppointmentsAreLoading] =
    useState(false);

  useEffect(() => {
    async function getAvailableAppointmentTimesByDate() {
      setAvailableAppointmentsAreLoading(true);
      const response = await getAvailableAppointmentsByDateRequest(date);
      setAvailableAppointments(response);
      setAvailableAppointmentsAreLoading(false);
    }

    getAvailableAppointmentTimesByDate().catch((error) => console.log(error));
  }, [date]);

  return { availableAppointments, availableAppointmentsAreLoading };
}
