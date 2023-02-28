import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import useAppointment from "@/hooks/useAppointment";
import { CustomerInformation } from "@/types";
import { useCustomerAppointment } from "@/hooks/useCustomerAppointment";

interface CustomerAppointmentProviderProps {
  children: ReactNode;
}

interface AppointmentContext {
  selectedISODateTime: string;
  selectedBarberServiceId: string;
  customerInformation: CustomerInformation;
  setSelectedISODateTime: Dispatch<SetStateAction<string>>;
  setSelectedBarberServiceId: Dispatch<SetStateAction<string>>;
  setCustomerInformation: Dispatch<SetStateAction<CustomerInformation>>;
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
  setSelectedISODateTime: () => {},
  setSelectedBarberServiceId: () => {},
  setCustomerInformation: () => {},
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
