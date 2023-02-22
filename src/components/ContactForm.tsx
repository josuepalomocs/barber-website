import { ScissorsIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";

interface ContactFormProps {}

export default function ContactForm({}: ContactFormProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    handleChangeFirstName,
    handleChangeLastName,
    handleChangeEmail,
    handleChangePhone,
  } = useContext(AppointmentContext);

  return (
    <form className="grid grid-cols-1 gap-y-2" action="">
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="firstName">
          First name
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-lg"
          id="firstName"
          type="text"
          placeholder="Peter"
          value={firstName}
          onChange={handleChangeFirstName}
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="lastName">
          Last name
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-lg"
          id="lastName"
          type="text"
          placeholder="Pan"
          value={lastName}
          onChange={handleChangeLastName}
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="email">
          Email
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-lg"
          id="email"
          type="email"
          placeholder="example@ocf.com"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2 text-neutral-500" htmlFor="phone">
          Phone
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded-lg"
          id="phone"
          type="tel"
          placeholder="+1 (xxx) xxx xxxx"
          value={phone}
          onChange={handleChangePhone}
        />
      </div>
      <div className="mb-2">
        <hr className="border-neutral-200 mt-2 mb-8" />
        <button
          className="flex justify-center items-center gap-2 p-3 w-full text-white bg-blue-600 focus:outline-neutral-300 rounded-lg"
          id="bookAppointment"
          type="submit"
        >
          Book appointment
          <ScissorsIcon className="inline w-[16px] h-[16px]" />
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
    </form>
  );
}
