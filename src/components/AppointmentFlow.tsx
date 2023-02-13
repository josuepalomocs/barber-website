import Appointment from "@/classes/Appointment";
import { AppointmentProvider } from "@/context/AppointmentProvider";
import Calendar from "@/components/Calendar";
import TimeOptionListContainer from "@/components/TimeOptionListContainer";
import ServiceListContainer from "@/components/ServiceListContainer";
import ContactFormContainer from "@/components/ContactFormContainer";
import { useState } from "react";
import { AppointmentData } from "@/types";

interface AppointmentFlowProps {
  closeSidebar: () => void;
}

export default function AppointmentFlow({
  closeSidebar,
}: AppointmentFlowProps) {
  return (
    <div className="w-full h-full">
      <div className="flex items-center w-full sticky top-0 h-16 text-neutral-900 bg-white border-b border-neutral-200  ">
        <div className="flex justify-between items-center w-full px-4">
          <h2 className="text-xs">Book an appointment with Osvaldo</h2>
          <button
            className="font-light text-xs focus:outline-neutral-300 p-2"
            onClick={closeSidebar}
          >
            Close
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xs text-neutral-500 mb-4">Pick a date</h2>
        <AppointmentProvider>
          <div className="mb-4">
            <Calendar />
          </div>
          <hr className="border-neutral-200 mb-8" />
          <div className="mb-4">
            <TimeOptionListContainer />
          </div>
          <hr className="border-neutral-200 mb-8" />
          <div className="mb-4">
            <ServiceListContainer />
          </div>
          <hr className="border-neutral-200 mb-8" />
          <div className="">
            <ContactFormContainer />
          </div>
        </AppointmentProvider>
      </div>
    </div>
  );
}
