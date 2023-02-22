import TimeOptionList from "@/components/TimeOptionList";

interface TimeOptionListContainer {}

export default function TimeOptionListContainer({}: TimeOptionListContainer) {
  return (
    <div className="text-sm">
      <p className="text-neutral-500 mb-4">Pick a time</p>
      <TimeOptionList
        timeOptionList={[
          new Date(2023, 1, 25, 8),
          new Date(2023, 1, 25, 9),
          new Date(2023, 1, 25, 10),
        ]}
      />
    </div>
  );
}
