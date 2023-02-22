import axios from "axios";
import {
  AvailableAppointment,
  BarberBreak,
  BarberDaySchedule,
  BarberService,
  CustomerAppointment,
} from "@/types";

type BarberServicesOrder =
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "duration-desc";

const BASE_URL = "http://localhost:3000/api";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

// http requests that target the 'barber-services' api route
const barberServicesApiRoute = "/barber-services";

export async function getBarberServicesRequest(
  order?: BarberServicesOrder
): Promise<BarberService[]> {
  const { data } = await instance.get<BarberService[]>(
    `${barberServicesApiRoute}${order ? `?order=${order}` : ""}`
  );
  return data;
}

export async function getBarberServiceByIdRequest(
  id: string
): Promise<BarberService> {
  const { data } = await instance.get<BarberService>(
    `${barberServicesApiRoute}?barber-service-id=${id}`
  );
  return data;
}

export async function createBarberServiceRequest(
  barberService: BarberService
): Promise<BarberService> {
  const { data } = await instance.post<BarberService>(
    `${barberServicesApiRoute}`,
    barberService
  );
  return data;
}

export async function updateBarberServiceRequest(
  barberService: BarberService
): Promise<BarberService> {
  const { data } = await instance.put<BarberService>(
    `${barberServicesApiRoute}?barber-service-id=${barberService.id}`,
    barberService
  );
  return data;
}

export async function deleteBarberServiceRequest(id: string): Promise<void> {
  const { data } = await instance.delete<void>(
    `${barberServicesApiRoute}?barber-service-id=${id}`
  );
  return data;
}

// http requests that target the 'barber-day-schedules' api route
const barberDaySchedulesApiRoute = "/barber-day-schedules";

export async function getBarberDaySchedules(): Promise<BarberDaySchedule[]> {
  const { data } = await instance.get<BarberDaySchedule[]>(
    barberDaySchedulesApiRoute
  );
  return data;
}
export async function getBarberDayScheduleByWeekdayNumber(
  weekdayNumber: number
): Promise<BarberDaySchedule | null> {
  const { data } = await instance.get<BarberDaySchedule | null>(
    `${barberDaySchedulesApiRoute}?weekday-number=${weekdayNumber}`
  );
  return data;
}
export async function createBarberDaySchedule(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { data } = await instance.post<BarberDaySchedule>(
    barberDaySchedulesApiRoute,
    barberDaySchedule
  );
  return data;
}
export async function updateBarberDaySchedule(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { data } = await instance.put<BarberDaySchedule>(
    barberDaySchedulesApiRoute,
    barberDaySchedule
  );
  return data;
}
export async function deleteBarberDaySchedule(
  weekdayNumber: number
): Promise<void> {
  const { data } = await instance.delete<void>(
    `${barberDaySchedulesApiRoute}?weekday-number=${weekdayNumber}`
  );
  return data;
}

// http requests that target the 'customer-appointments' api route
const customerAppointmentsApiRoute = "/customer-appointments";

export async function getAllCustomerAppointmentsRequest(): Promise<
  CustomerAppointment[]
> {
  const { data } = await instance.get<CustomerAppointment[]>(
    `${customerAppointmentsApiRoute}`
  );
  return data;
}
export async function getCustomerAppointmentsByDateRequest(
  date: string
): Promise<CustomerAppointment[]> {
  const { data } = await instance.get<CustomerAppointment[]>(
    `${customerAppointmentsApiRoute}?${date}`
  );
  return data;
}
export async function getCustomerAppointmentByStartTimestampRequest(
  startTimestamp: number
): Promise<CustomerAppointment | null> {
  const { data } = await instance.get<CustomerAppointment | null>(
    `${customerAppointmentsApiRoute}?startTimestamp=${startTimestamp}`
  );
  return data;
}
export async function updateCustomerAppointmentRequest(
  customerAppointment: CustomerAppointment
): Promise<CustomerAppointment> {
  const { data } = await instance.put<CustomerAppointment>(
    `${customerAppointmentsApiRoute}`,
    customerAppointment
  );
  return data;
}
export async function deleteCustomerAppointmentRequest(
  startTimestamp: number
): Promise<void> {
  await instance.delete<void>(
    `${customerAppointmentsApiRoute}?startTimestamp=${startTimestamp}`
  );
}

// http requests that target the 'available-appointments' api route
const availableAppointmentsApiRoute = "/available-appointments";

export async function getAvailableAppointmentsByDate(date: string) {
  const { data } = await instance.get<AvailableAppointment[]>(
    `${availableAppointmentsApiRoute}?date=${date}`
  );
  return data;
}
