import { FormEvent, useState } from "react";
import { ContactInformation } from "@/types";
import {
  getDayOfMonth,
  getDaysInMonth,
  getMonth,
  getYear,
} from "@/utilities/date";

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
  const [selectedServiceId, setSelectedServiceId] = useState(-1);
  const [contactInformation, setContactInformation] =
    useState<ContactInformation>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

  function selectDateTime(date: Date) {
    setSelectedDateTime(date);
  }

  function selectServiceId(serviceId: number) {
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

  return {
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
