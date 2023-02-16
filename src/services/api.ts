import axios from "axios";
import { BarberService } from "@/types";

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

// http requests that target the 'barber-service' api route
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
