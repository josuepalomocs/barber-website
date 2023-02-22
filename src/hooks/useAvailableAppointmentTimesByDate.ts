import { useEffect, useState } from "react";

export default function useAvailableAppointmentTimesByDate(date: Date) {
  const [availableAppointmentTimes, setAvailableAppointmentTimes] = useState<
    string[]
  >([]);

  useEffect(() => {
    async function getAvailableAppointmentTimesByDate() {
      const response = await getAppointment;
    }

    getAvailableAppointmentTimesByDate().catch((error) => console.log(error));
  }, [date]);

  return {};
}
