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

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// http requests that target the 'barber-services' api route
const barberServicesApiRoute = "/barber-services";

export async function getBarberServicesRequest(
  order?: BarberServicesOrder
): Promise<BarberService[]> {
  const { data } = await httpClient.get<BarberService[]>(
    `${barberServicesApiRoute}${order ? `?order=${order}` : ""}`
  );
  return data;
}

export async function getBarberServiceByIdRequest(
  id: string
): Promise<BarberService> {
  const { data } = await httpClient.get<BarberService>(
    `${barberServicesApiRoute}?barber-service-id=${id}`
  );
  return data;
}

export async function createBarberServiceRequest(
  barberService: BarberService
): Promise<BarberService> {
  const { data } = await httpClient.post<BarberService>(
    `${barberServicesApiRoute}`,
    barberService
  );
  return data;
}

export async function updateBarberServiceRequest(
  barberService: BarberService
): Promise<BarberService> {
  const { data } = await httpClient.put<BarberService>(
    `${barberServicesApiRoute}?barber-service-id=${barberService.id}`,
    barberService
  );
  return data;
}

export async function deleteBarberServiceRequest(id: string): Promise<void> {
  const { data } = await httpClient.delete<void>(
    `${barberServicesApiRoute}?barber-service-id=${id}`
  );
  return data;
}

// http requests that target the 'barber-day-schedules' api route
const barberDaySchedulesApiRoute = "/barber-day-schedules";

export async function getBarberDaySchedules(): Promise<BarberDaySchedule[]> {
  const { data } = await httpClient.get<BarberDaySchedule[]>(
    barberDaySchedulesApiRoute
  );
  return data;
}
export async function getBarberDayScheduleByWeekdayNumberRequest(
  weekdayNumber: number
): Promise<BarberDaySchedule | null> {
  const { data } = await httpClient.get<BarberDaySchedule | null>(
    `${barberDaySchedulesApiRoute}?weekday-number=${weekdayNumber}`
  );
  return data;
}
export async function createBarberDayScheduleRequest(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { data } = await httpClient.post<BarberDaySchedule>(
    barberDaySchedulesApiRoute,
    barberDaySchedule
  );
  return data;
}
export async function updateBarberDayScheduleRequest(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { data } = await httpClient.put<BarberDaySchedule>(
    barberDaySchedulesApiRoute,
    barberDaySchedule
  );
  return data;
}
export async function deleteBarberDayScheduleRequest(
  weekdayNumber: number
): Promise<void> {
  const { data } = await httpClient.delete<void>(
    `${barberDaySchedulesApiRoute}?weekday-number=${weekdayNumber}`
  );
  return data;
}

// http requests that target the 'customer-appointments' api route
const customerAppointmentsApiRoute = "/customer-appointments";

export async function getAllCustomerAppointmentsRequest(): Promise<
  CustomerAppointment[]
> {
  const { data } = await httpClient.get<CustomerAppointment[]>(
    `${customerAppointmentsApiRoute}`
  );
  return data;
}
export async function getCustomerAppointmentsByDateRequest(
  date: string
): Promise<CustomerAppointment[]> {
  const { data } = await httpClient.get<CustomerAppointment[]>(
    `${customerAppointmentsApiRoute}?${date}`
  );
  return data;
}
export async function getCustomerAppointmentByStartTimestampRequest(
  startTimestamp: number
): Promise<CustomerAppointment | null> {
  const { data } = await httpClient.get<CustomerAppointment | null>(
    `${customerAppointmentsApiRoute}?startTimestamp=${startTimestamp}`
  );
  return data;
}
export async function updateCustomerAppointmentRequest(
  customerAppointment: CustomerAppointment
): Promise<CustomerAppointment> {
  const { data } = await httpClient.put<CustomerAppointment>(
    `${customerAppointmentsApiRoute}`,
    customerAppointment
  );
  return data;
}
export async function deleteCustomerAppointmentRequest(
  startTimestamp: number
): Promise<void> {
  await httpClient.delete<void>(
    `${customerAppointmentsApiRoute}?startTimestamp=${startTimestamp}`
  );
}

// http requests that target the 'available-appointments' api route
const availableAppointmentsApiRoute = "/available-appointments";

export async function getAvailableAppointmentsByDateRequest(date: string) {
  const { data } = await httpClient.get<AvailableAppointment[]>(
    `${availableAppointmentsApiRoute}?date=${date}`
  );
  return data;
}

// http requests that target the 'shop-week-open-hours' api route
export async function getShopWeekOpenHours(): Promise<> {}
