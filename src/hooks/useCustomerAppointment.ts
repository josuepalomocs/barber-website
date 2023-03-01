import { useEffect, useState } from "react";
import { CustomerInformation } from "@/types";

export function useCustomerAppointment() {
  const [selectedISODateTime, setSelectedISODateTime] = useState(
    new Date().toISOString()
  );
  const [selectedBarberServiceId, setSelectedBarberServiceId] = useState("");
  const [customerInformation, setCustomerInformation] =
    useState<CustomerInformation>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

  useEffect(() => {
    setSelectedBarberServiceId("");
  }, [selectedISODateTime]);

  return {
    selectedISODateTime,
    selectedBarberServiceId,
    customerInformation,
    isAppointmentBooked,
    setSelectedISODateTime,
    setSelectedBarberServiceId,
    setCustomerInformation,
    setIsAppointmentBooked,
  };
}
