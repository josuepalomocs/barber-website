import Calendar from "@/components/Calendar";
import TimeSlots from "@/components/TimeSlots";
import Services from "@/components/Services";
import PersonalForm from "@/components/PersonalForm";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const isOpenStyling = "translate-x-[400px]";
  return (
    <>
      <aside
        className={`fixed max-h-screen right-0 top-0 max-w-[400px] overflow-y-auto z-10 bg-neutral-50 ${
          !isOpen ? isOpenStyling : ""
        } transition duration-300`}
      >
        <div className="sticky top-0 bg-neutral-50 px-8">
          <div className="flex justify-between py-4">
            <h2 className="font-medium">Book appointment</h2>
            <button className="font-light text-xs" onClick={closeSidebar}>
              Close
            </button>
          </div>
          <hr className="border-neutral-200" />
        </div>
        <div className="p-8">
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
