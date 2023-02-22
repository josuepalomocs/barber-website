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
  const dateObject = new Date();
  dateObject.setFullYear(Number(date.split("-")[0]));
  dateObject.setMonth(Number(date.split("-")[1]) - 1);
  dateObject.setDate(Number(date.split("-")[2]));
  dateObject.setHours(0, 0, 0, 0);
  return getCustomerAppointmentsByDateFromDB(dateObject);
}

export async function getCustomerAppointmentByStartTimestamp(
  startTimestamp: number
): Promise<CustomerAppointment | null> {
  if (isNaN(startTimestamp))
    throw new Error(
      `Invalid input parameter 'startTimestamp'. Expected a number.`
    );
  if (startTimestamp < 0)
    throw new Error(
      `Invalid input parameter 'startTimestamp'. Expected a positive number, but received '${startTimestamp}'.`
    );
  return getCustomerAppointmentByTimestampFromDB(startTimestamp);
}

export async function createCustomerAppointmentService(
  customerAppointment: CustomerAppointment
): Promise<CustomerAppointment> {
  const customerAppointmentStartDateTime = new Date(
    customerAppointment.startTimestamp * 1000
  );
  const customerAppointmentEndDateTime = new Date(
    customerAppointment.endTimestamp * 1000
  );
  const weekdayNumber = getWeekday(customerAppointmentStartDateTime);

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
          if (
            isBefore(
              customerAppointmentStartDateTime,
              convertTimeStringToDate(
                barberDaySchedule.openTime,
                customerAppointmentStartDateTime.getFullYear(),
                customerAppointmentStartDateTime.getMonth(),
                customerAppointmentStartDateTime.getDate()
              )
            ) ||
            isAfter(
              customerAppointmentEndDateTime,
              convertTimeStringToDate(
                barberDaySchedule.closeTime,
                customerAppointmentStartDateTime.getFullYear(),
                customerAppointmentStartDateTime.getMonth(),
                customerAppointmentStartDateTime.getDate()
              )
            )
          ) {
            throw new Error(`Invalid appointment. Could not create appointment due to an overlap with 
              either the opening time or the closing time.`);
          }
          if (
            !barberDaySchedule.appointmentSlots.some((appointmentSlot) => {
              const appointmentSlotDate = convertTimeStringToDate(
                appointmentSlot,
                customerAppointmentStartDateTime.getFullYear(),
                customerAppointmentStartDateTime.getMonth(),
                customerAppointmentStartDateTime.getDate()
              );
              return isSameMinute(
                appointmentSlotDate,
                customerAppointmentStartDateTime
              );
            })
          ) {
            throw new Error(`Invalid appointment. Could not create appointment due to the 
              desired appointment time not matching an appointment timeslot.`);
          }
          if (
            barberDaySchedule.breaks.some((barberBreak) => {
              if (
                (isSameOrAfter(
                  customerAppointmentStartDateTime,
                  convertTimeStringToDate(
                    barberBreak.startTime,
                    customerAppointmentStartDateTime.getFullYear(),
                    customerAppointmentStartDateTime.getMonth(),
                    customerAppointmentStartDateTime.getDate()
                  )
                ) &&
                  isBefore(
                    customerAppointmentStartDateTime,
                    convertTimeStringToDate(
                      barberBreak.endTime,
                      customerAppointmentStartDateTime.getFullYear(),
                      customerAppointmentStartDateTime.getMonth(),
                      customerAppointmentStartDateTime.getDate()
                    )
                  )) ||
                (isAfter(
                  customerAppointmentEndDateTime,
                  convertTimeStringToDate(
                    barberBreak.startTime,
                    customerAppointmentStartDateTime.getFullYear(),
                    customerAppointmentStartDateTime.getMonth(),
                    customerAppointmentStartDateTime.getDate()
                  )
                ) &&
                  isSameOrBefore(
                    customerAppointmentEndDateTime,
                    convertTimeStringToDate(
                      barberBreak.endTime,
                      customerAppointmentStartDateTime.getFullYear(),
                      customerAppointmentStartDateTime.getMonth(),
                      customerAppointmentStartDateTime.getDate()
                    )
                  )) ||
                (isSameOrBefore(
                  customerAppointmentStartDateTime,
                  convertTimeStringToDate(
                    barberBreak.startTime,
                    customerAppointmentStartDateTime.getFullYear(),
                    customerAppointmentStartDateTime.getMonth(),
                    customerAppointmentStartDateTime.getDate()
                  )
                ) &&
                  isSameOrAfter(
                    customerAppointmentEndDateTime,
                    convertTimeStringToDate(
                      barberBreak.endTime,
                      customerAppointmentStartDateTime.getFullYear(),
                      customerAppointmentStartDateTime.getMonth(),
                      customerAppointmentStartDateTime.getDate()
                    )
                  ))
              ) {
                return true;
              }
            })
          ) {
            throw new Error(
              `Invalid appointment. Could not create appointment due to an overlap with break times.`
            );
          }
          return getCustomerAppointmentsByDateFromDB(
            customerAppointmentStartDateTime
          ).then((existingCustomerAppointments) => {
            if (
              existingCustomerAppointments.some(
                (existingCustomerAppointment) => {
                  const existingCustomerAppointmentStartDateTime = new Date(
                    existingCustomerAppointment.startTimestamp * 1000
                  );
                  const existingCustomerAppointmentEndDateTime = new Date(
                    existingCustomerAppointment.endTimestamp * 1000
                  );
                  if (
                    (isSameOrAfter(
                      customerAppointmentStartDateTime,
                      existingCustomerAppointmentStartDateTime
                    ) &&
                      isBefore(
                        customerAppointmentStartDateTime,
                        existingCustomerAppointmentEndDateTime
                      )) ||
                    (isAfter(
                      customerAppointmentEndDateTime,
                      existingCustomerAppointmentStartDateTime
                    ) &&
                      isSameOrBefore(
                        customerAppointmentEndDateTime,
                        existingCustomerAppointmentEndDateTime
                      )) ||
                    (isSameOrBefore(
                      customerAppointmentStartDateTime,
                      existingCustomerAppointmentStartDateTime
                    ) &&
                      isSameOrAfter(
                        customerAppointmentEndDateTime,
                        existingCustomerAppointmentEndDateTime
                      ))
                  ) {
                    return true;
                  }
                }
              )
            ) {
              throw new Error(
                `Invalid appointment. Could not create appointment due to an overlap with an existing appointment.`
              );
            }
            return createCustomerAppointmentInDB(customerAppointment).then(
              (customerAppointment) => customerAppointment
            );
          });
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
