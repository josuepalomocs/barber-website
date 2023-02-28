import { createContext, ReactNode, useContext } from "react";
import { AvailableAppointment, BarberService } from "@/types";
import useAvailableAppointmentsByDate from "@/hooks/useAvailableAppointmentsByDate";
import { CustomerAppointmentContext } from "@/context/CustomerAppointmentProvider";

interface AvailableAppointmentsProviderProps {
  children: ReactNode;
}

interface AvailableAppointmentsContext {
  availableAppointments: AvailableAppointment[];
  availableAppointmentsAreLoading: boolean;
}

export const AvailableAppointmentsContext =
  createContext<AvailableAppointmentsContext>({
    availableAppointments: [],
    availableAppointmentsAreLoading: false,
  });

export function AvailableAppointmentsProvider({
  children,
}: AvailableAppointmentsProviderProps) {
  const { selectedISODateTime } = useContext(CustomerAppointmentContext);
  const selectedDate = new Date(selectedISODateTime);
  const selectedDateYear = selectedDate.getFullYear();
  const selectedDateMonth = selectedDate.getMonth();
  const selectedDateDayOfMonth = selectedDate.getDate();
  const value = useAvailableAppointmentsByDate(
    new Date(
      selectedDateYear,
      selectedDateMonth,
      selectedDateDayOfMonth
    ).toISOString()
  );

  return (
    <AvailableAppointmentsContext.Provider value={value}>
      {children}
    </AvailableAppointmentsContext.Provider>
  );
}
