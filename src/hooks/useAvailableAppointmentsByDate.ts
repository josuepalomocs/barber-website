import { useEffect, useState } from "react";
import { getAvailableAppointmentsByDateRequest } from "@/services/api";
import { AvailableAppointment } from "@/types";
import { formatDate } from "@/utilities/date";

export default function useAvailableAppointmentsByDate(date: string) {
  const [availableAppointments, setAvailableAppointments] = useState<
    AvailableAppointment[]
  >([]);
  const [availableAppointmentsAreLoading, setAvailableAppointmentsAreLoading] =
    useState(false);

  useEffect(() => {
    async function getAvailableAppointmentTimesByDate() {
      setAvailableAppointmentsAreLoading(true);
      const response = await getAvailableAppointmentsByDateRequest(
        formatDate(new Date(date), "yyyy-MM-dd")
      );
      setAvailableAppointments(response);
      setAvailableAppointmentsAreLoading(false);
    }

    getAvailableAppointmentTimesByDate().catch((error) => console.log(error));
  }, [date.slice(0, 10)]);

  return { availableAppointments, availableAppointmentsAreLoading };
}
