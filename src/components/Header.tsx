import { Bars3Icon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface HeaderProps {
  openSidebar: () => void;
}

export default function Header({ openSidebar }: HeaderProps) {
  return (
    <header className="grid content-center sticky top-0 h-16 text-sm text-neutral-900 bg-white border-b border-neutral-200">
      <div className="flex justify-between items-center mx-[400px]">
        <Link
          href="/"
          className="text-center tracking-[.25em] text-xs text-neutral-900 font-medium p-2"
        >
          OC FADES
        </Link>
        <div className="flex justify-between items-center text-xs [&>a]:p-2 ml-auto space-x-8">
          <Link href="/about">ABOUT</Link>
          <Link href="/services">SERVICES</Link>
          <Link href="/home">CONTACT</Link>
          <button
            className="flex items-center space-x-2 text-xs p-2 bg-neutral-900 text-white"
            onClick={openSidebar}
          >
            <p className="">BOOK APPOINTMENT</p>
          </button>
        </div>
      </div>
    </header>
  );
}
