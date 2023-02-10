import { formatDate } from "@/utilities/date";

interface TimeOptionProps {
  date: Date;
}

export default function TimeOption({ date }: TimeOptionProps) {
  return (
    <button className="w-full h-full p-3 focus:outline-neutral-300">
      <time dateTime={date.toISOString()}>{formatDate(date, "h:mmaaa")}</time>
    </button>
  );
}
