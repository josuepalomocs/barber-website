export interface TimeOption {
  date: Date;
}

export interface BarberService {
  id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  priceInUSD: number;
}

export interface BarberDaySchedule {
  weekdayNumber: number;
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
  timestamp: number;
  barberServiceId: string;
  customerInformation: CustomerInformation;
}

export interface CustomerInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
