import { formatDate, isSameOrAfter } from "@/utilities/date";
import { BarberBreak, BarberDaySchedule } from "@/types";
import {
  createBarberDayScheduleInDB,
  updateBarberDayScheduleInDB,
} from "@/services/database";

export async function createBarberDayScheduleService(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { openTime, closeTime, breaks, appointmentIntervalInMinutes } =
    barberDaySchedule;

  barberDaySchedule.appointmentSlots = getAppointmentTimeSlots(
    openTime,
    closeTime,
    breaks,
    appointmentIntervalInMinutes
  );

  return createBarberDayScheduleInDB(barberDaySchedule)
    .then((barberDaySchedule) => barberDaySchedule)
    .catch((error) => error);
}

export async function updateBarberDayScheduleService(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { openTime, closeTime, breaks, appointmentIntervalInMinutes } =
    barberDaySchedule;

  barberDaySchedule.appointmentSlots = getAppointmentTimeSlots(
    openTime,
    closeTime,
    breaks,
    appointmentIntervalInMinutes
  );

  return updateBarberDayScheduleInDB(barberDaySchedule)
    .then((barberDaySchedule) => barberDaySchedule)
    .catch((error) => error);
}

export function getAppointmentTimeSlots(
  openTime: string,
  closeTime: string,
  breaks: BarberBreak[],
  appointmentIntervalInMinutes: number
): string[] {
  if (!openTime) {
    return [];
  }
  let availableAppointmentDates: Date[] = [];
  const openDate = convertHourStringToDate(openTime);
  const closeDate = convertHourStringToDate(closeTime);
  const numBreaks = breaks.length ? breaks.length : 0;
  let nextAppointmentStart = openDate;
  let nextBreakIndex = 0;
  let nextBreakStart = numBreaks
    ? convertHourStringToDate(breaks[nextBreakIndex].startTime)
    : null;
  let nextBreakEnd = numBreaks
    ? convertHourStringToDate(breaks[nextBreakIndex]?.endTime)
    : null;

  // loop while the next appointment start date does not overlap with the shop close date
  while (!isSameOrAfter(nextAppointmentStart, closeDate)) {
    if (nextBreakStart && nextBreakEnd) {
      while (!isSameOrAfter(nextAppointmentStart, nextBreakStart)) {
        availableAppointmentDates.push(nextAppointmentStart);
        const prevAppointmentStart = nextAppointmentStart;
        nextAppointmentStart = new Date();
        nextAppointmentStart.setHours(
          prevAppointmentStart.getHours(),
          prevAppointmentStart.getMinutes() + appointmentIntervalInMinutes,
          0
        );
      }
      // at this point, the next appointment start date overlaps with the next break start date
      // we set the next appointment start date to the next break end date
      nextAppointmentStart = nextBreakEnd;
      if (nextBreakIndex < numBreaks - 1) {
        nextBreakIndex++;
        nextBreakStart = convertHourStringToDate(
          breaks![nextBreakIndex].startTime
        );
        continue;
      }
      nextBreakStart = null;
      nextBreakEnd = null;
    }
    availableAppointmentDates.push(nextAppointmentStart);
    const prevAppointmentStart = nextAppointmentStart;
    nextAppointmentStart = new Date();
    nextAppointmentStart.setHours(
      prevAppointmentStart.getHours(),
      prevAppointmentStart.getMinutes() + appointmentIntervalInMinutes,
      0
    );
  }

  return availableAppointmentDates.map((availableAppointmentDate) =>
    formatDate(availableAppointmentDate, "HH:mm")
  );
}

function convertHourStringToDate(dateString: string): Date {
  const dateStringArray = dateString.split(":");
  const hours = Number(dateStringArray[0]);
  const minutes = Number(dateStringArray[1]);
  const date = new Date();
  date.setHours(hours, minutes, 0);
  return date;
}
