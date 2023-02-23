import {
  getBarberDayScheduleByDayFromDB,
  getBarberServicesFromDB,
} from "@/services/database";
import {
  areDatesOverlapping,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
  getDay,
  isAfter,
} from "@/utilities/date";
import { getCustomerAppointmentsByDateFromDB } from "@/database/customerAppointmentRepository";
import { AvailableAppointment } from "@/types";

export async function getAvailableAppointmentsByDate(
  dateString: string
): Promise<AvailableAppointment[]> {
  const date = new Date(dateString);
  const customerAppointmentsByDate = await getCustomerAppointmentsByDateFromDB(
    date
  );
  const dateDay = getDay(date);
  const barberDaySchedule = await getBarberDayScheduleByDayFromDB(dateDay);
  const barberServices = await getBarberServicesFromDB();

  if (!barberDaySchedule)
    throw new Error(
      "Value 'barberDaySchedule' is null for the provided 'dateString' argument. " +
        "Resolve by adding a 'barberDaySchedule' item for the day of week (eg. 0-6) in which 'dateString' falls on."
    );

  const availableAppointmentsByDate: AvailableAppointment[] =
    barberDaySchedule.appointmentSlots
      .map((appointmentTimeString) => {
        const appointmentStartDateTime = new Date();
        appointmentStartDateTime.setFullYear(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );

        appointmentStartDateTime.setHours(
          Number(appointmentTimeString.split(":")[0]),
          Number(appointmentTimeString.split(":")[1]),
          0,
          0
        );

        const availableBarberServices = barberServices.filter(
          (barberService) => {
            const barberServiceDurationInMilliseconds =
              barberService.durationInMinutes * 60 * 1000;
            const appointmentEndDateTime = new Date(
              appointmentStartDateTime.getTime() +
                barberServiceDurationInMilliseconds
            );

            const isBarberServiceOverlappingWithExistingAppointment =
              customerAppointmentsByDate.some((existingAppointment) => {
                const existingAppointmentStartDateTime =
                  convertUnixTimestampToDate(
                    existingAppointment.startTimestamp
                  );
                const existingAppointmentEndDateTime =
                  convertUnixTimestampToDate(existingAppointment.endTimestamp);
                return areDatesOverlapping(
                  appointmentStartDateTime,
                  appointmentEndDateTime,
                  existingAppointmentStartDateTime,
                  existingAppointmentEndDateTime
                );
              });

            const isBarberServiceOverlappingWithBreak =
              barberDaySchedule.breaks.some((barberBreak) => {
                const breakStartTime = new Date();
                breakStartTime.setFullYear(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                );

                breakStartTime.setHours(
                  Number(barberBreak.startTime.split(":")[0]),
                  Number(barberBreak.startTime.split(":")[1]),
                  0,
                  0
                );

                const breakEndTime = new Date();
                breakEndTime.setFullYear(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                );

                breakEndTime.setHours(
                  Number(barberBreak.endTime.split(":")[0]),
                  Number(barberBreak.endTime.split(":")[1]),
                  0,
                  0
                );

                return areDatesOverlapping(
                  appointmentStartDateTime,
                  appointmentEndDateTime,
                  breakStartTime,
                  breakEndTime
                );
              });

            const closingTimeDate = new Date();
            closingTimeDate.setFullYear(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            closingTimeDate.setHours(
              Number(barberDaySchedule.closeTime.split(":")[0]),
              Number(barberDaySchedule.closeTime.split(":")[1]),
              0,
              0
            );
            const isBarberServiceOverlappingWithClosedHours = isAfter(
              appointmentEndDateTime,
              closingTimeDate
            );

            return !(
              isBarberServiceOverlappingWithExistingAppointment ||
              isBarberServiceOverlappingWithBreak ||
              isBarberServiceOverlappingWithClosedHours
            );
          }
        );

        if (!availableBarberServices.length) {
          return null;
        }

        return {
          startTimestamp: convertDateToUnixTimestamp(appointmentStartDateTime),
          availableBarberServices,
        } as AvailableAppointment;
      })
      .filter((availableAppointmentCandidate) => availableAppointmentCandidate)
      .map(
        (availableAppointment) => availableAppointment as AvailableAppointment
      );

  return availableAppointmentsByDate;
}
