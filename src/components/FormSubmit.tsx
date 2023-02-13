import { HTMLInputTypeAttribute } from "react";

interface FormSubmitProps {
  id: string;
  name: string;
}

export default function FormSubmit({ id, name }: FormSubmitProps) {
  return (
    <div className="flex flex-col justify-between mb-2 flex-1">
      <hr className="border-neutral-200 mt-2" />
      <button
        className="p-3 w-full text-white bg-neutral-900 focus:outline-neutral-300"
        id={id}
        name={name}
        type="submit"
      >
        Add service
      </button>
    </div>
  );
}
