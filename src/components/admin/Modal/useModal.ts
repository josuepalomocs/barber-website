import { useEffect, useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    toggleBodyScroll(isModalOpen);
    return () => {
      toggleBodyScroll(false);
    };
  }, [isModalOpen]);

  function handleOpenModal() {
    if (!isModalOpen) setIsModalOpen(true);
  }

  function handleCloseModal() {
    if (isModalOpen) setIsModalOpen(false);
  }

  function toggleBodyScroll(isBodyScrollDisabled: boolean) {
    if (isBodyScrollDisabled) {
      document.body.classList.add("no-scroll");
      return;
    }
    document.body.classList.remove("no-scroll");
  }

  function preventTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  return { isModalOpen, handleOpenModal, handleCloseModal };
}
