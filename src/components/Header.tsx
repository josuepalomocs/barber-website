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
    <header className="sticky top-0 h-20 border border-b border-neutral-200">
      <div className="flex justify-between items-center w-full h-full px-4">
        <button className="text-neutral-800 text-xs p-2" onClick={openSidebar}>
          <Bars3Icon className="w-[20px] h-[20px]" />
        </button>
        <Link
          href="/"
          className="text-lg font-extrabold tracking-[.25em] text-neutral-800"
        >
          OCF
        </Link>
        <button className="text-neutral-800 text-xs p-2" onClick={openSidebar}>
          <CalendarIcon className="w-[20px] h-[20px]" />
        </button>
      </div>
    </header>
  );
}
