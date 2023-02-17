import { ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  value?: string | number | readonly string[] | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  name,
  type,
  placeholder,
  label,
  value,
  handleChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col mb-2">
      <label className="pb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="p-3 border border-neutral-200 bg-white focus:outline-neutral-300 rounded"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
