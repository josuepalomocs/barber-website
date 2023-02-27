import { useState } from "react";
import { CustomerInformation } from "@/types";

export function useCustomerAppointment() {
  const [selectedISODate, setSelectedISODate] = useState("");
  const [selectedISOTime, setSelectedISOTime] = useState("");
  const [selectedBarberServiceId, setSelectedBarberServiceId] = useState("");
  const [customerInformation, setCustomerInformation] =
    useState<CustomerInformation>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

  return {
    selectedISODate,
    selectedISOTime,
    selectedBarberServiceId,
    customerInformation,
    setSelectedISODate,
    setSelectedISOTime,
    setSelectedBarberServiceId,
    setCustomerInformation,
  };
}
