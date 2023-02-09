import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import Services from "@/components/Services";
import PersonalForm from "@/components/PersonalForm";

interface SidebarProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export default function Sidebar({
  isOpen,
  openSidebar,
  closeSidebar,
}: SidebarProps) {
  if (!isOpen) {
    return <></>;
  }

  return (
    <aside className="fixed max-h-screen right-0 top-0 max-w-[400px] p-8 overflow-y-auto">
      <div className="flex justify-between mb-2">
        <h2 className="font-medium">Book an appointment</h2>
        <button className="font-light text-xs" onClick={closeSidebar}>
          Close
        </button>
      </div>
      <h2 className="text-xs text-neutral-500 mb-4">Pick a date</h2>
      <div className="mb-4">
        <Calendar currentDate={new Date()} />
      </div>
      <hr className="border-neutral-200 mb-8" />
      <div className="mb-4">
        <TimeSlots />
      </div>
      <hr className="border-neutral-200 mb-8" />
      <div className="mb-4">
        <Services />
      </div>
      <hr className="border-neutral-200 mb-8" />
      <div className="">
        <PersonalForm />
      </div>
    </aside>
  );
}
