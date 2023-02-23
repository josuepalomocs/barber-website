import { FormEvent, useState } from "react";
import { getDayOfMonth, getMonth, getYear } from "@/utilities/date";
import useAvailableAppointmentsByDate from "@/hooks/useAvailableAppointmentsByDate";
import { CustomerInformation } from "@/types";

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

export default function useAppointment() {
  const [selectedDateTime, setSelectedDateTime] =
    useState(currentDateSanitized);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [contactInformation, setContactInformation] =
    useState<CustomerInformation>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

  function selectDateTime(date: Date) {
    setSelectedDateTime(date);
  }

  function selectServiceId(serviceId: string) {
    setSelectedServiceId(serviceId);
  }

  function handleChangeFirstName(e: FormEvent<HTMLInputElement>) {
    const firstName = e.currentTarget.value;
    setContactInformation({ ...contactInformation, firstName });
  }

  function handleChangeLastName(e: FormEvent<HTMLInputElement>) {
    const lastName = e.currentTarget.value;
    setContactInformation({ ...contactInformation, lastName });
  }

  function handleChangeEmail(e: FormEvent<HTMLInputElement>) {
    const email = e.currentTarget.value;
    setContactInformation({ ...contactInformation, email });
  }

  function handleChangePhone(e: FormEvent<HTMLInputElement>) {
    const phone = e.currentTarget.value;
    setContactInformation({ ...contactInformation, phone });
  }

  const selectedDate = new Date(selectedDateTime);
  selectedDate.setHours(0, 0, 0);
  const { availableAppointments, availableAppointmentsAreLoading } =
    useAvailableAppointmentsByDate(selectedDate.toISOString());

  return {
    availableAppointments,
    availableAppointmentsAreLoading,
    selectedDateTime,
    selectDateTime,
    selectedServiceId,
    selectServiceId,
    firstName: contactInformation.firstName,
    lastName: contactInformation.lastName,
    email: contactInformation.email,
    phone: contactInformation.phone,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeEmail,
    handleChangePhone,
  };
}
