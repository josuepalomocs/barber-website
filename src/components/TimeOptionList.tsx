import TimeOption from "@/components/TimeOption";
import { convertUnixTimestampToDate } from "@/utilities/date";
import { AvailableAppointment } from "@/types";

interface TimeOptionListProps {
  timeOptionList: AvailableAppointment[];
  isLoading: boolean;
}

export default function TimeOptionList({
  timeOptionList,
  isLoading,
}: TimeOptionListProps) {
  function renderTimeOptions(): JSX.Element[] {
    return timeOptionList.map(({ startTimestamp }) => {
      return (
        <li
          key={startTimestamp}
          className="text-center bg-white hover:bg-neutral-200 rounded-lg"
        >
          <TimeOption date={convertUnixTimestampToDate(startTimestamp)} />
        </li>
      );
    });
  }

  if (isLoading)
    return (
      <div className="flex justify-center w-full h-full opacity-80 animate-fadeIn">
        <img src="/icons8-barber-pole.gif" />
      </div>
    );

  if (!timeOptionList)
    return (
      <div className="flex justify-center w-full h-full animate-fadeIn">
        <p className="text-sm text-neutral-500 text-center">
          Sorry about that, we&apos;re full.
          <br />
          Try another date.
        </p>
      </div>
    );

  return (
    <ul className="grid grid-cols-2 gap-2 animate-fadeIn">
      {renderTimeOptions()}
    </ul>
  );
}
