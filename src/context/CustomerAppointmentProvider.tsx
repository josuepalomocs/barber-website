import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { CustomerInformation } from "@/types";
import { useCustomerAppointment } from "@/hooks/useCustomerAppointment";

interface CustomerAppointmentProviderProps {
  children: ReactNode;
}

interface AppointmentContext {
  selectedISODateTime: string;
  selectedBarberServiceId: string;
  customerInformation: CustomerInformation;
  isAppointmentBooked: boolean;
  setSelectedISODateTime: Dispatch<SetStateAction<string>>;
  setSelectedBarberServiceId: Dispatch<SetStateAction<string>>;
  setCustomerInformation: Dispatch<SetStateAction<CustomerInformation>>;
  setIsAppointmentBooked: Dispatch<SetStateAction<boolean>>;
}

export const CustomerAppointmentContext = createContext<AppointmentContext>({
  selectedISODateTime: new Date().toISOString(),
  selectedBarberServiceId: "",
  customerInformation: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  isAppointmentBooked: false,
  setSelectedISODateTime: () => {},
  setSelectedBarberServiceId: () => {},
  setCustomerInformation: () => {},
  setIsAppointmentBooked: () => {},
});

export function CustomerAppointmentProvider({
  children,
}: CustomerAppointmentProviderProps) {
  const value = useCustomerAppointment();

  return (
    <CustomerAppointmentContext.Provider value={value}>
      {children}
    </CustomerAppointmentContext.Provider>
  );
}
