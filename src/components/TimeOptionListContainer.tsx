import TimeOptionList from "@/components/TimeOptionList";

interface TimeOptionListContainer {}

export default function TimeOptionListContainer({}: TimeOptionListContainer) {
  return (
    <div className="text-xs">
      <p className="text-neutral-500 mb-4">Pick a time</p>
      <TimeOptionList
        timeOptionList={[
          new Date(2022, 1, 12),
          new Date(2022, 1, 12),
          new Date(2022, 1, 12),
        ]}
      />
    </div>
  );
}
