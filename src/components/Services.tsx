import { PlusIcon } from "@heroicons/react/20/solid";

interface ServicesProps {}

export default function Services({}: ServicesProps) {
  return (
    <div className="text-xs">
      <p className="text-neutral-500 mb-4">Pick a service</p>
      <ul className="flex flex-col space-y-2">
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200 bg-white">
          <button className="text-left">
            <p className="mb-2">Haircut</p>
            <p className="text-neutral-500">1h</p>
          </button>
          <p className="">$30</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200 bg-white">
          <button className="text-left">
            <p className="mb-2">Haircut + Eyebrows</p>
            <p className="text-neutral-500">1h 15min</p>
          </button>
          <p>$35</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200 bg-white">
          <button className="text-left">
            <p className="mb-2">Haircut + Beard</p>
            <p className="text-neutral-500">1h 15min</p>
          </button>
          <p>$35</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200 bg-white">
          <button className="text-left">
            <p className="mb-2">Haircut + Beard + Eyebrows</p>
            <p className="text-neutral-500">1h 30min</p>
          </button>
          <p>$40</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200 bg-white">
          <button className="text-left">
            <p className="mb-2">Kids&apos; Haircut</p>
            <p className="text-neutral-500">30min</p>
          </button>
          <p>$25</p>
        </li>
      </ul>
    </div>
  );
}
