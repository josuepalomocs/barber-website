import { CustomerAppointment } from "@/types";
import {
  getBarberDayScheduleByWeekdayNumberInDB,
  getBarberServiceByIdInDB,
} from "@/services/database";
import {
  formatDate,
  getWeekday,
  isAfter,
  isBefore,
  isSameMinute,
  isSameOrAfter,
  isSameOrBefore,
} from "@/utilities/date";
import {
  createCustomerAppointmentInDB,
  getCustomerAppointmentByTimestampFromDB,
  getCustomerAppointmentsByDateFromDB,
  getCustomerAppointmentsInDB,
} from "@/database/customerAppointmentRepository";

export async function getAllCustomerAppointments() {}

export async function getCustomerAppointmentsByDate(
  date: string
): Promise<CustomerAppointment[]> {
  if (/^\d{4}:\d{2}:\d{2}$/.test(date))
    throw new Error(
      `Invalid input parameter 'date'. Expected a valid date string, but received '${date}'`
    );
  return getCustomerAppointmentsByDateFromDB(new Date(date));
}

export async function getCustomerAppointmentByTimestamp(
  timestamp: number
): Promise<CustomerAppointment | null> {
  if (isNaN(timestamp))
    throw new Error(`Invalid input parameter 'timestamp'. Expected a number.`);
  if (timestamp < 0)
    throw new Error(
      `Invalid input parameter 'timestamp'. Expected a positive number, but received '${timestamp}'.`
    );
  return getCustomerAppointmentByTimestampFromDB(timestamp);
}

export async function createCustomerAppointmentService(
  customerAppointment: CustomerAppointment
): Promise<CustomerAppointment> {
  const customerAppointmentStartDate = new Date(
    customerAppointment.timestamp * 1000
  );
  const weekdayNumber = getWeekday(customerAppointmentStartDate);

  return getBarberDayScheduleByWeekdayNumberInDB(weekdayNumber).then(
    (barberDaySchedule) => {
      return getBarberServiceByIdInDB(customerAppointment.barberServiceId).then(
        (barberService) => {
          if (!barberDaySchedule) {
            const message = `BarberDaySchedule with weekdayNumber: ${weekdayNumber} is not valid. (Values 0-6 allowed only)`;
            throw new Error(message);
          }
          if (!barberService) {
            const message = `Requested barber service not found.`;
            throw new Error(message);
          }
          const customerAppointmentEndDate = new Date(
            customerAppointment.timestamp * 1000 +
              barberService.durationInMinutes * 60 * 1000
          );
          if (!barberDaySchedule.openTime) {
            const message = `BarberDaySchedule with weekdayNumber: ${weekdayNumber} does not have any open hours. No appointments can be made on this weekday.`;
            throw new Error(message);
          }
          if (
            isBefore(
              customerAppointmentStartDate,
              convertTimeStringToDate(
                barberDaySchedule.openTime,
                customerAppointmentStartDate.getFullYear(),
                customerAppointmentStartDate.getMonth(),
                customerAppointmentStartDate.getDate()
              )
            ) ||
            isAfter(
              customerAppointmentEndDate,
              convertTimeStringToDate(
                barberDaySchedule.closeTime,
                customerAppointmentStartDate.getFullYear(),
                customerAppointmentStartDate.getMonth(),
                customerAppointmentStartDate.getDate()
              )
            )
          ) {
            const message = `The provided customer appointment timestamp: '${customerAppointment.timestamp}' 
          is outside of the barber shop open hours for weekdayNumber: '${weekdayNumber}'`;
            throw new Error(message);
          }
          if (
            !barberDaySchedule.appointmentSlots.some((appointmentSlot) => {
              const appointmentSlotDate = convertTimeStringToDate(
                appointmentSlot,
                customerAppointmentStartDate.getFullYear(),
                customerAppointmentStartDate.getMonth(),
                customerAppointmentStartDate.getDate()
              );
              return isSameMinute(
                appointmentSlotDate,
                customerAppointmentStartDate
              );
            })
          ) {
            const message = `The provided customer appointment timestamp: '${
              customerAppointment.timestamp
            }' (${formatDate(customerAppointmentStartDate, "HH:mm")})
          does not match an appointment slot specified in the barber day schedule for weekdayNumber: '${weekdayNumber}'`;
            throw new Error(message);
          }
          if (
            barberDaySchedule.breaks.some((barberBreak) => {
              if (
                (isSameOrAfter(
                  customerAppointmentStartDate,
                  convertTimeStringToDate(
                    barberBreak.startTime,
                    customerAppointmentStartDate.getFullYear(),
                    customerAppointmentStartDate.getMonth(),
                    customerAppointmentStartDate.getDate()
                  )
                ) &&
                  isBefore(
                    customerAppointmentStartDate,
                    convertTimeStringToDate(
                      barberBreak.endTime,
                      customerAppointmentStartDate.getFullYear(),
                      customerAppointmentStartDate.getMonth(),
                      customerAppointmentStartDate.getDate()
                    )
                  )) ||
                (isAfter(
                  customerAppointmentEndDate,
                  convertTimeStringToDate(
                    barberBreak.startTime,
                    customerAppointmentStartDate.getFullYear(),
                    customerAppointmentStartDate.getMonth(),
                    customerAppointmentStartDate.getDate()
                  )
                ) &&
                  isSameOrBefore(
                    customerAppointmentEndDate,
                    convertTimeStringToDate(
                      barberBreak.endTime,
                      customerAppointmentStartDate.getFullYear(),
                      customerAppointmentStartDate.getMonth(),
                      customerAppointmentStartDate.getDate()
                    )
                  )) ||
                (isSameOrBefore(
                  customerAppointmentStartDate,
                  convertTimeStringToDate(
                    barberBreak.startTime,
                    customerAppointmentStartDate.getFullYear(),
                    customerAppointmentStartDate.getMonth(),
                    customerAppointmentStartDate.getDate()
                  )
                ) &&
                  isSameOrAfter(
                    customerAppointmentEndDate,
                    convertTimeStringToDate(
                      barberBreak.endTime,
                      customerAppointmentStartDate.getFullYear(),
                      customerAppointmentStartDate.getMonth(),
                      customerAppointmentStartDate.getDate()
                    )
                  ))
              ) {
                return true;
              }
            })
          ) {
            const message = `The provided customer appointment timestamp: '${customerAppointment.timestamp}' 
          overlaps with the barber shop break hours for weekdayNumber: '${weekdayNumber}'`;
            throw new Error(message);
          }
          return getCustomerAppointmentsInDB();
          if (false) {
            const message = `The provided customer appointment timestamp: '${customerAppointment.timestamp}' 
          overlaps with the barber shop break hours for weekdayNumber: '${weekdayNumber}'`;
            throw new Error(message);
          }
          return createCustomerAppointmentInDB(customerAppointment).then(
            (customerAppointment) => customerAppointment
          );
        }
      );
    }
  );
}

function convertTimeStringToDate(
  timeString: string,
  year: number,
  month: number,
  day: number
) {
  const array = timeString.split(":");
  return new Date(year, month, day, Number(array[0]), Number(array[1]), 0, 0);
}
