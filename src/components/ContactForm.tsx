import { ScissorsIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FormEvent, useContext } from "react";
import { CustomerAppointmentContext } from "@/context/CustomerAppointmentProvider";
import {
  createCustomerAppointment,
  createCustomerAppointmentConfirmationEmail,
  createSlackCustomerAppointment,
} from "@/services/api";
import { CustomerAppointment } from "@/types";
import { convertDateToUnixTimestamp } from "@/utilities/date";

interface ContactFormProps {}

export default function ContactForm({}: ContactFormProps) {
  const {
    customerInformation,
    selectedISODateTime,
    selectedBarberServiceId,
    setCustomerInformation,
    setIsAppointmentBooked,
  } = useContext(CustomerAppointmentContext);
  const { firstName, lastName, email, phone } = customerInformation;

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const customerAppointment: CustomerAppointment = {
      startTimestamp: convertDateToUnixTimestamp(new Date(selectedISODateTime)),
      endTimestamp: 0,
      barberServiceId: selectedBarberServiceId,
      customerInformation: customerInformation,
    };
    const response = await createCustomerAppointment(customerAppointment);
    setIsAppointmentBooked(true);
    const sendEmailResponse =
      createCustomerAppointmentConfirmationEmail(response);
    const slackCustomerAppointmentResponse =
      createSlackCustomerAppointment(response);
  }

  return (
    <form className="grid grid-cols-1 gap-y-2" onSubmit={handleFormSubmit}>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="firstName">
          First name
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-sm"
          id="firstName"
          type="text"
          placeholder="Peter"
          value={firstName}
          onChange={(event) => {
            setCustomerInformation({
              ...customerInformation,
              firstName: event.target.value,
            });
          }}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="lastName">
          Last name
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-sm"
          id="lastName"
          type="text"
          placeholder="Pan"
          value={lastName}
          onChange={(event) => {
            setCustomerInformation({
              ...customerInformation,
              lastName: event.target.value,
            });
          }}
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="email">
          Email
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-sm"
          id="email"
          type="email"
          placeholder="example@ocf.com"
          value={email}
          onChange={(event) => {
            setCustomerInformation({
              ...customerInformation,
              email: event.target.value,
            });
          }}
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="phone">
          Phone
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-sm"
          id="phone"
          type="tel"
          pattern="^[0-9]*$"
          placeholder="xxxxxxxxxx"
          value={phone}
          onChange={(event) => {
            setCustomerInformation({
              ...customerInformation,
              phone: event.target.value,
            });
          }}
          maxLength={10}
          required
        />
      </div>
      <div className="mb-2">
        <hr className="border-neutral-200 mt-2 mb-8" />
        <button
          className="flex justify-center items-center gap-2 p-3 w-full text-white bg-cyan-700 focus:outline-neutral-300 rounded-sm"
          id="bookAppointment"
          type="submit"
        >
          Book Appointment
        </button>
      </div>
      <div className="text-xs text-center text-neutral-500">
        This site is protected by reCAPTCHA and the Google{" "}
        <Link
          className="focus:outline-neutral-300"
          href="https://policies.google.com/privacy"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          className="focus:outline-neutral-300"
          href="https://policies.google.com/terms"
        >
          Terms of Service
        </Link>{" "}
        apply.
      </div>
      <div className="text-xs text-center text-neutral-500">
        Developed by{" "}
        <Link
          className="text-blue-500"
          href="https://www.linkedin.com/in/josue-palomo/"
        >
          Josue Palomo
        </Link>
      </div>
    </form>
  );
}
