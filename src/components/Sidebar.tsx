import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import Services from "@/components/Services";
import PersonalForm from "@/components/PersonalForm";
import TimeOptionListContainer from "@/components/TimeOptionListContainer";
import ServiceListContainer from "@/components/ServiceListContainer";
import ContactFormContainer from "@/components/ContactFormContainer";
import { useState } from "react";
import { AppointmentData } from "@/types";
import { getDayOfMonth } from "@/utilities/date";
import { AppointmentProvider } from "@/context/AppointmentProvider";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const appointmentDataInitialState = {
    date: new Date(),
    serviceId: 0,
    contactInformation: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  };

  const [appointmentData, setAppointmentData] = useState<AppointmentData>(
    appointmentDataInitialState
  );

  const isOpenStyles = "translate-x-[640px]";
  return (
    <>
      <aside
        className={`flex justify-center fixed top-0 right-0 max-h-screen w-full sm:max-w-[400px] overflow-y-auto z-10 bg-neutral-50 ${
          !isOpen ? isOpenStyles : ""
        } transition duration-300`}
      >
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
      </aside>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-neutral-900 opacity-75 transition-opacity z-0 ${
          isOpen ? "" : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
      ></div>
    </>
  );
}
