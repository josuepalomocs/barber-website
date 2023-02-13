import { ReactNode } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;

  children: ReactNode;
}

export default function Modal({
  title,
  isOpen,
  closeModal,
  children,
}: ModalProps) {
  if (!isOpen) {
    return <></>;
  }
  return (
    <div className="absolute top-0 flex flex-col w-screen h-screen bg-neutral-50">
      <div className="flex justify-between items-center w-full h-16 px-4 bg-white border-b border-neutral-200">
        <h2 className="text-xs">{title}</h2>
        <button
          className="font-light text-xs focus:outline-neutral-300 p-2"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <div className="h-full text-xs p-4">{children}</div>
    </div>
  );
}
