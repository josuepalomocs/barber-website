import { useCallback, useEffect, useState } from "react";
import useError from "@/hooks/useError";
import { BarberDaySchedule, CustomError } from "@/types";
import { getBarberDaySchedules } from "@/services/api";

interface BarberDayOpenHours {
  dayOfWeek: number;
  openTimes: {
    start: string;
    end: string;
  }[];
}

export default function useBarberWeeklySchedule() {
  const [barberWeeklySchedule, setBarberWeeklySchedule] = useState<
    BarberDayOpenHours[]
  >([]);
  const { error, setError } = useError();

  useEffect(() => {
    getBarberDaySchedules()
      .then((barberDaySchedules) =>
        setBarberWeeklySchedule(sanitizeBarberDaySchedules(barberDaySchedules))
      )
      .catch((error: CustomError) => setError(error));

    function sanitizeBarberDaySchedules(
      barberDaySchedules: BarberDaySchedule[]
    ): BarberDayOpenHours[] {
      return barberDaySchedules.map((barberDaySchedule) => {
        const { weekdayNumber, openTime, closeTime, breaks } =
          barberDaySchedule;

        const openingHours = [];

        // Add opening hours before the first break
        if (breaks.length === 0 || openTime < breaks[0].startTime) {
          openingHours.push({
            start: openTime,
            end: breaks.length > 0 ? breaks[0].startTime : closeTime,
          });
        }

        // Add opening hours after each break
        for (let i = 0; i < breaks.length; i++) {
          const breakStart = breaks[i].startTime;
          const breakEnd = breaks[i].endTime;
          const previousBreakEnd = i === 0 ? openTime : breaks[i - 1].endTime;

          if (breakStart > previousBreakEnd) {
            openingHours.push({ start: previousBreakEnd, end: breakStart });
          }

          if (i === breaks.length - 1 && breakEnd < closeTime) {
            openingHours.push({ start: breakEnd, end: closeTime });
          }
        }

        return {
          dayOfWeek: weekdayNumber,
          openTimes: openingHours,
        };
      });
    }
  }, []);

  return { barberWeeklySchedule, error };
}
