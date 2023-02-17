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
}

export interface BarberBreak {
  startTime: string;
  endTime: string;
}

export interface ContactInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AppointmentData {
  date: Date;
  serviceId: number;
  contactInformation: ContactInformation;
}
