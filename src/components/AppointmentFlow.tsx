import { AppointmentProvider } from "@/context/AppointmentProvider";
import Calendar from "@/components/Calendar";
import TimeOptionListContainer from "@/components/TimeOptionListContainer";
import ServiceListContainer from "@/components/ServiceListContainer";
import ContactFormContainer from "@/components/ContactFormContainer";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface AppointmentFlowProps {
  closeSidebar: () => void;
}

export default function AppointmentFlow({
  closeSidebar,
}: AppointmentFlowProps) {
  return (
    <div className="w-full h-full">
      <div className="flex items-center w-full h-20 border border-b-200">
        <div className="flex justify-between items-center w-full px-4">
          <div className="">
            <h2 className="text-sm mb-2 text-black">Book appointment</h2>
            <p className="text-xs text-neutral-500">
              Don&apos;t worry, this should be quick.
            </p>
          </div>
          <button
            className="text-sm text-neutral-400 focus:outline-neutral-300 p-2"
            onClick={closeSidebar}
          >
            <XMarkIcon className="w-[20px] h-[20px] text-neutral-500" />
          </button>
        </div>
      </div>
      <div className="p-4 rounded-t-2xl bg-white">
        <h2 className="mt-4 text-sm text-neutral-500 mb-4">Pick a date</h2>
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
