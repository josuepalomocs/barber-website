import { useState } from "react";

interface UseSidebarParams {}

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function openSidebar() {
    setIsOpen(true);
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  return { isOpen, openSidebar, closeSidebar };
}
