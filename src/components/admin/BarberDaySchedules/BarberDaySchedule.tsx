import { PencilSquareIcon, SunIcon } from "@heroicons/react/20/solid";
import { DayOfWeek } from "@/types";
import { formatDate } from "@/utilities/date";

interface BarberDayScheduleProps {
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
}

export default function BarberDaySchedule({
  dayOfWeek,
  openTime,
  closeTime,
}: BarberDayScheduleProps) {
  function numberToWeekday(number: number) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[number % 7];
  }

  function utcToLocalTime(utcTimeString: string) {
    console.log(utcTimeString);
    const currentDate = new Date();
    const [hours, minutes] = utcTimeString.split(":");
    const utcDate = new Date(
      Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        Number(hours),
        Number(minutes)
      )
    );
    console.log(utcDate);

    return `${formatDate(utcDate, "h:mmaaa")}`;
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
          <SunIcon className="w-[20px] h-[20px]" />
        </div>
        <div>
          <div>{numberToWeekday(dayOfWeek.dayNumber)}</div>
          <ul className="text-neutral-400">
            <li>
              {utcToLocalTime(openTime)} - {utcToLocalTime(closeTime)}
            </li>
          </ul>
        </div>
      </div>
      <button className="p-2">
        <PencilSquareIcon className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}
