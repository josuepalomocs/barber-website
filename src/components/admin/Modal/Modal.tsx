import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  handleClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return <></>;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-10"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-md overflow-y-scroll relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg">{title}</h2>
          <button className="text-neutral-700 p-2" onClick={handleClose}>
            <XMarkIcon className="w-[24px] h-[24px]" />
          </button>
        </div>
        <div className="overflow-y-auto h-full p-4">{children}</div>
      </div>
    </div>
  );
}
