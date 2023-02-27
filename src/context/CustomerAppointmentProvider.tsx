import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import useAppointment from "@/hooks/useAppointment";
import { CustomerInformation } from "@/types";
import { useCustomerAppointment } from "@/hooks/useCustomerAppointment";

interface AppointmentProviderProps {
  children: ReactNode;
}

interface AppointmentContext {
  selectedISODate: string;
  selectedISOTime: string;
  selectedBarberServiceId: string;
  customerInformation: CustomerInformation;
  setSelectedISODate: Dispatch<SetStateAction<string>>;
  setSelectedISOTime: Dispatch<SetStateAction<string>>;
  setSelectedBarberServiceId: Dispatch<SetStateAction<string>>;
  setCustomerInformation: Dispatch<SetStateAction<CustomerInformation>>;
}

export const CustomerAppointmentContext = createContext<AppointmentContext>({
  selectedISODate: "",
  selectedISOTime: "",
  selectedBarberServiceId: "",
  customerInformation: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  setSelectedISODate: () => {},
  setSelectedISOTime: () => {},
  setSelectedBarberServiceId: () => {},
  setCustomerInformation: () => {},
});

export function CustomerAppointmentProvider({
  children,
}: AppointmentProviderProps) {
  const value = useCustomerAppointment();

  return (
    <CustomerAppointmentContext.Provider value={value}>
      {children}
    </CustomerAppointmentContext.Provider>
  );
}
