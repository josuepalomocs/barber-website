import { ScissorsIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface ContactFormProps {}

export default function ContactForm({}: ContactFormProps) {
  return (
    <form className="grid grid-cols-1 gap-y-2" action="">
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="firstName">
          First name
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300"
          id="firstName"
          type="text"
          placeholder="Peter"
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="lastName">
          Last name
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300"
          id="lastName"
          type="text"
          placeholder="Pan"
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="email">
          Email
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300"
          id="email"
          type="email"
          placeholder="example@ocf.com"
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="phone">
          Phone
        </label>
        <input
          className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300"
          id="phone"
          type="tel"
          placeholder="+1 (xxx) xxx xxxx"
        />
      </div>
      <div className="mb-2">
        <hr className="border-neutral-200 mt-2 mb-8" />
        <button
          className="flex justify-center items-center gap-1 p-3 w-full text-white bg-neutral-900 focus:outline-neutral-300"
          id="bookAppointment"
          type="submit"
        >
          Book appointment
          <ScissorsIcon className="inline w-[12px] h-[12px]" />
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
