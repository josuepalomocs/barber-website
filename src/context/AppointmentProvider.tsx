import { createContext, FormEvent, ReactNode } from "react";
import { getDayOfMonth, getMonth, getYear } from "@/utilities/date";
import useAppointment from "@/hooks/useAppointment";

type AppointmentContext = {
  selectedDateTime: Date;
  selectDateTime: (date: Date) => void;
  selectedServiceId: number;
  selectServiceId: (serviceId: number) => void;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  handleChangeFirstName: (e: FormEvent<HTMLInputElement>) => void;
  handleChangeLastName: (e: FormEvent<HTMLInputElement>) => void;
  handleChangeEmail: (e: FormEvent<HTMLInputElement>) => void;
  handleChangePhone: (e: FormEvent<HTMLInputElement>) => void;
};

const currentDate = new Date();
const currentDay = getDayOfMonth(currentDate);
const currentMonth = getMonth(currentDate);
const currentYear = getYear(currentDate);

const currentDateSanitized = new Date(
  currentYear,
  currentMonth,
  currentDay,
  0,
  0
);

export const AppointmentContext = createContext<AppointmentContext>({
  selectedDateTime: new Date(currentYear, currentMonth, currentDay, 0, 0),
  selectDateTime: (date: Date) => {},
  selectedServiceId: -1,
  selectServiceId: (serviceId: number) => {},
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  handleChangeFirstName: () => {},
  handleChangeLastName: () => {},
  handleChangeEmail: () => {},
  handleChangePhone: () => {},
});

interface AppointmentProviderProps {
  children: ReactNode;
}

export function AppointmentProvider({ children }: AppointmentProviderProps) {
  const value = useAppointment();

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}
