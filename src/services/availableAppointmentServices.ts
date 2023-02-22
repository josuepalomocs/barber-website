import { getCustomerAppointmentsByDate } from "@/services/customerAppointmentServices";
import {
  getBarberDayScheduleByWeekdayNumberFromDB,
  getBarberServicesInDB,
} from "@/services/database";
import {
  getDayOfMonth,
  getWeekday,
  isAfter,
  isBefore,
  isSameMinute,
  isSameOrAfter,
  isSameOrBefore,
} from "@/utilities/date";

export async function getAvailableAppointmentsByDate(date: string) {
  const dateObject = new Date();
  dateObject.setFullYear(Number(date.split("-")[0]));
  dateObject.setMonth(Number(date.split("-")[1]) - 1);
  dateObject.setDate(Number(date.split("-")[2]));
  dateObject.setHours(0, 0, 0, 0);

  const dateYear = dateObject.getFullYear();
  const dateMonth = dateObject.getMonth();
  const dateDay = dateObject.getDate();
  //TODO: validate that the date argument is a correct date
  const customerAppointmentsByDate = await getCustomerAppointmentsByDate(date);
  const weekdayNumber = getWeekday(new Date(date));
  const barberDaySchedule = await getBarberDayScheduleByWeekdayNumberFromDB(
    weekdayNumber
  );
  const barberServices = await getBarberServicesInDB();
  const availableAppointmentSlots = barberDaySchedule?.appointmentSlots.map(
    (appointmentSlot) => {
      const time = appointmentSlot.split(":");
      const appointmentSlotDate = new Date(
        dateYear,
        dateMonth,
        dateDay,
        Number(time[0]),
        Number(time[1])
      );
      if (
        customerAppointmentsByDate.some((customerAppointment) => {
          if (
            isSameMinute(
              new Date(customerAppointment.startTimestamp * 1000),
              appointmentSlotDate
            ) ||
            (isBefore(
              new Date(customerAppointment.startTimestamp * 1000),
              appointmentSlotDate
            ) &&
              isAfter(
                new Date(customerAppointment.endTimestamp * 1000),
                appointmentSlotDate
              ))
          ) {
            // appointment slot overlaps with existing customer appointment
            return true;
          }
          return false;
        })
      ) {
        return false;
      }
      const availableBarberServices = barberServices.map((barberService) => {
        const appointmentEndTimestamp = new Date(
          appointmentSlotDate.getTime() +
            barberService.durationInMinutes * 60 * 1000
        );
      });
      return appointmentSlot;
    }
  );
  return customerAppointmentsByDate;
}
