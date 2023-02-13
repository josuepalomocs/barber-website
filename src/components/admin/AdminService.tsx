import { Service } from "@/types";
import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

interface AdminServiceProps extends Service {}

export default function AdminService({
  id,
  name,
  description,
  durationInMinutes,
  price,
}: AdminServiceProps) {
  const hours = Math.trunc(durationInMinutes / 60);
  const minutesRemainder = durationInMinutes % 60;
  const formattedDuration = hours
    ? `${hours}h ${minutesRemainder ? `${minutesRemainder}min` : ""}`
    : `${durationInMinutes}min`;

  return (
    <div className="flex">
      <div
        className="text-neutral-500 w-full h-full p-4 focus:outline-neutral-300 border border-neutral-200 bg-neutral-100"
        onClick={() => {}}
      >
        <div className="w-full flex justify-between mb-4">
          <p className="">{name}</p>
          <p className="">${price}</p>
        </div>
        <p className="mb-4">{description}</p>
        <p className="">Duration: {formattedDuration}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="p-2">Edit</button>
        <button className="p-2">Delete</button>
      </div>
    </div>
  );
}
