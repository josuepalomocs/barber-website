import axios from "axios";
import { BarberBreak, BarberDaySchedule, BarberService } from "@/types";

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
}

// http requests that target the 'barber-day-schedules' api route
const barberDaySchedulesApiRoute = "/barber-day-schedules";

export async function getBarberDaySchedules() {}
export async function getBarberDayScheduleByWeekdayNumber() {}
export async function createBarberDaySchedule(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const { data } = await instance.post<BarberDaySchedule>(
    barberDaySchedulesApiRoute,
    barberDaySchedule
  );
  return data;
}
export async function updateBarberDaySchedule() {}
export async function deleteBarberDaySchedule() {}
