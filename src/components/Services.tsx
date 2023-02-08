import { PlusIcon } from "@heroicons/react/20/solid";

interface ServicesProps {}

export default function Services({}: ServicesProps) {
  return (
    <div className="text-xs">
      <p className="text-neutral-500 mb-2">Add service(s)</p>
      <ul className="flex flex-col space-y-2">
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200">
          <button className="text-left">
            <p>Haircut</p>
            <p className="text-neutral-500">1h</p>
          </button>
          <p className="">$30</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200">
          <button className="text-left">
            <p>Haircut + Eyebrows</p>
            <p className="text-neutral-500">1h</p>
          </button>
          <p>$35</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200">
          <button className="text-left">
            <p>Haircut + Beard</p>
            <p className="text-neutral-500">1h</p>
          </button>
          <p>$35</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200">
          <button className="text-left">
            <p>Haircut + Beard + Eyebrows</p>
            <p className="text-neutral-500">1h</p>
          </button>
          <p>$40</p>
        </li>
        <li className="flex justify-between items-center p-4 rounded-lg border border-neutral-200">
          <button className="text-left">
            <p>Kids&apos; Haircut</p>
            <p className="text-neutral-500">1h</p>
          </button>
          <p>$40</p>
        </li>
      </ul>
    </div>
  );
}
