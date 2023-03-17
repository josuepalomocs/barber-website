export type Screen = "home" | "analytics" | "bookings" | "shop";

export interface BarberService {
  id: string;
  name: string;
  durationInMinutes: number;
  priceInUsd: number;
}

export interface BarberDaySchedule {
  id: number;
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
}

export interface DayOfWeek {
  id: number;
  dayName: string;
  dayNumber: number;
}

export interface BarberBreak {
  startTime: string;
  endTime: string;
}

export interface CustomerAppointment {
  startTimestamp: number;
  endTimestamp: number;
  barberServiceId: string;
  customerInformation: CustomerInformation;
}

export interface CustomerInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AvailableAppointment {
  startTimestamp: number;
  availableBarberServices: BarberService[];
}

export interface CustomError {
  code: string;
  message: string;
  details: {
    [key: string]: any;
  };
}
