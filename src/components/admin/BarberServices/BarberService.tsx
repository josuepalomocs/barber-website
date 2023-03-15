import { ScissorsIcon } from "@heroicons/react/20/solid";

interface BarberServiceProps {
  name: string;
  durationInMinutes: number;
  priceInUsd: number;
}

export default function BarberService({
  name,
  durationInMinutes,
  priceInUsd,
}: BarberServiceProps) {
  function formatDurationInMinutes() {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    if (hours) return `${hours}hr ${minutes !== 0 ? `${minutes}min` : ""}`;
    return `${minutes}min`;
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
        <ScissorsIcon className="w-[20px] h-[20px]" />
      </div>
      <div>
        <div>{name}</div>
        <div className="flex space-x-2 text-neutral-400">
          <div className="">{formatDurationInMinutes()}</div>
          <span className="">|</span>
          <div className="">${priceInUsd}</div>
        </div>
      </div>
    </div>
  );
}
