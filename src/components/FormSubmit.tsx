import { HTMLInputTypeAttribute } from "react";

interface FormSubmitProps {
  id: string;
  name: string;
}

export default function FormSubmit({ id, name }: FormSubmitProps) {
  return (
    <div className="flex flex-col justify-between my-2 flex-1">
      <hr className="border-neutral-200 mb-4" />
      <button
        className="p-3 w-full bg-black text-white border focus:outline-neutral-300 rounded"
        id={id}
        name={name}
        type="submit"
      >
        Add service
      </button>
    </div>
  );
}
