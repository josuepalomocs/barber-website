import { FormEvent, ReactNode } from "react";

interface FormProps {
  action?: string;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function Form({ action, handleSubmit, children }: FormProps) {
  return (
    <form
      className="flex flex-col min-h-full text-neutral-500 mb-4"
      action={action}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}
