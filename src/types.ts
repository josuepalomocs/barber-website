export interface TimeOption {
  date: Date;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  durationInMinutes: number;
  price: number;
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
