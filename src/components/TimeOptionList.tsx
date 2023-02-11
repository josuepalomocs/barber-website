import TimeOption from "@/components/TimeOption";

interface TimeOptionsProps {
  timeOptionList: Date[];
}

export default function TimeOptionList({ timeOptionList }: TimeOptionsProps) {
  function renderTimeOptions(): JSX.Element[] {
    return timeOptionList.map((date, index) => {
      return (
        <li
          key={index}
          className="text-center border border-neutral-200 bg-white hover:bg-neutral-200"
        >
          <TimeOption date={date} />
        </li>
      );
    });
  }

  return <ul className="grid grid-cols-2 gap-2">{renderTimeOptions()}</ul>;
}
