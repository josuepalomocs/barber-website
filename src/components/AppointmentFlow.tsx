import { CustomerAppointmentProvider } from "@/context/CustomerAppointmentProvider";
import Calendar from "@/components/Calendar";
import TimeOptionListContainer from "@/components/TimeOptionListContainer";
import ServiceListContainer from "@/components/ServiceListContainer";
import ContactFormContainer from "@/components/ContactFormContainer";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { AvailableAppointmentsProvider } from "@/context/AvailableAppointmentProvider";

interface AppointmentFlowProps {
  closeSidebar: () => void;
}

export default function AppointmentFlow({
  closeSidebar,
}: AppointmentFlowProps) {
  return (
    <div className="w-full h-full">
      <div className="flex items-center w-full h-20 border border-b-200 bg-white">
        <div className="flex justify-between items-center w-full px-4">
          <div className="">
            <h2 className="text-sm mb-2 text-neutral-700">Book Appointment</h2>
            <p className="text-xs text-neutral-500">
              Let&apos;s get you on Osvaldo&apos;s calendar.
            </p>
          </div>
          <button
            className="text-sm text-neutral-400 focus:outline-neutral-300 p-2"
            onClick={closeSidebar}
          >
            <XMarkIcon className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <div className="p-4 bg-neutral-50">
        <h2 className="mt-4 text-sm text-neutral-500 mb-4">Pick a date</h2>
        <CustomerAppointmentProvider>
          <div className="mb-4">
            <Calendar />
          </div>
          <hr className="border-neutral-200 mb-8" />
          <AvailableAppointmentsProvider>
            <div className="mb-4">
              <TimeOptionListContainer />
            </div>
            <hr className="border-neutral-200 mb-8" />
            <div className="mb-4">
              <ServiceListContainer />
            </div>
          </AvailableAppointmentsProvider>
          <hr className="border-neutral-200 mb-8" />
          <div className="">{<ContactFormContainer />}</div>
        </CustomerAppointmentProvider>
      </div>
    </div>
  );
}
