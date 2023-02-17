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
    <div className="fixed top-0 left-0 w-full h-screen bg-white rounded drop-shadow">
      <div className="flex justify-between items-center w-full h-16 px-4 border-b border-neutral-200">
        <h2 className="text-sm text-neutral-600 font-medium">{title}</h2>
        <button
          className="text-neutral-400 text-xs focus:outline-neutral-300 p-2"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <div className="text-xs p-4">{children}</div>
    </div>
  );
}
