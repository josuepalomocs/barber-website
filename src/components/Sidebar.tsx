import { ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  children: ReactNode;
}

export default function Sidebar({
  isOpen,
  closeSidebar,
  children,
}: SidebarProps) {
  const isOpenStyles = "translate-x-[640px]";
  return (
    <>
      <aside
        className={`flex justify-center fixed top-0 right-0 max-h-screen w-full sm:max-w-[400px] overflow-y-auto z-10 bg-white ${
          !isOpen ? isOpenStyles : ""
        } transition duration-300`}
      >
        {children}
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
