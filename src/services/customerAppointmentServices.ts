import { CustomerAppointment } from "@/types";
import {
  getBarberDayScheduleByWeekdayNumberFromDB,
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
  getCustomerAppointmentsFromDB,
} from "@/database/customerAppointmentRepository";

export async function getAllCustomerAppointments() {
  return getCustomerAppointmentsFromDB();
}

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

  return getBarberDayScheduleByWeekdayNumberFromDB(weekdayNumber).then(
    (barberDaySchedule) => {
      return getBarberServiceByIdInDB(customerAppointment.barberServiceId).then(
        (barberService) => {
          if (!barberDaySchedule)
            throw new Error(
              `Failed to find barberDaySchedule with weekdayNumber '${weekdayNumber}'`
            );
          if (!barberService)
            throw new Error(
              `Failed to find barber service with id '${customerAppointment.barberServiceId}'`
            );
          if (!barberDaySchedule.openTime)
            throw new Error(
              `Invalid appointment. Could not create appointment on weekdayNumber '${weekdayNumber}'
                due to no opening time.`
            );
          const customerAppointmentEndDate = new Date(
            customerAppointment.timestamp * 1000 +
              barberService.durationInMinutes * 60 * 1000
          );
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
            throw new Error(`Invalid appointment. Could not create appointment due to an overlap with 
              either the opening time, closing time, or any break times.`);
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
