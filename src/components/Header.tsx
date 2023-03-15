import {
  Bars3Icon,
  CalendarDaysIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

interface HeaderProps {
  openSidebar: () => void;
}

export default function Header({ openSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full h-20 border-b bg-white">
      <div className="flex justify-between items-center w-full h-full px-4">
        <button
          className="text-neutral-800 text-xs p-2"
          title="open-navigation"
          onClick={() => {}}
        >
          <Bars3Icon className="w-[20px] h-[20px]" />
        </button>
        <Link
          href="/"
          className="text-base font-display tracking-[.25em] text-neutral-800"
        >
          OCFADES
        </Link>
        <button
          className="text-neutral-800 text-xs p-2"
          title="open-sidebar"
          onClick={openSidebar}
        >
          <CalendarIcon className="w-[20px] h-[20px]" />
        </button>
      </div>
    </header>
  );
}
