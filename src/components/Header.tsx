import { Bars3Icon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface HeaderProps {
  openSidebar: () => void;
}

export default function Header({ openSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 h-20 border border-b border-neutral-200">
      <div className="flex justify-center items-center w-full h-full px-4">
        <Link href="/" className="text-center tracking-[.25em]">
          ocfades
        </Link>
        {/*<button*/}
        {/*  className="bg-neutral-800 text-white text-xs p-2"*/}
        {/*  onClick={openSidebar}*/}
        {/*>*/}
        {/*  BOOK APPOINTMENT*/}
        {/*</button>*/}
      </div>
    </header>
  );
}
