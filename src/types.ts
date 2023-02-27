export interface BarberService {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  priceInUSD: number;
}

export interface BarberDaySchedule {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  breaks: BarberBreak[];
  appointmentIntervalInMinutes: number;
  appointmentSlots: string[];
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
