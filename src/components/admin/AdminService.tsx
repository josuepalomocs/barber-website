import { BarberService } from "@/types";
import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";

interface AdminServiceProps {
  barberService: BarberService;
  handleDeleteFromList: (id: string) => void;
}

export default function AdminService({
  barberService,
  handleDeleteFromList,
}: AdminServiceProps) {
  const { id, name, description, durationInMinutes, priceInUSD } =
    barberService;

  const hours = Math.trunc(durationInMinutes / 60);
  const minutesRemainder = durationInMinutes % 60;
  const formattedDuration = hours
    ? `${hours}h ${minutesRemainder ? `${minutesRemainder}min` : ""}`
    : `${durationInMinutes}min`;

  async function deleteBarberService() {
    const apiUrl = new URL("http://localhost:3000/api/services");
    const queryParams = new URLSearchParams(`barber-service-id=${id}`);
    apiUrl.search = queryParams.toString();

    const response = await axios.delete(apiUrl.toString());
    handleDeleteFromList(id);
  }

  return (
    <div className="flex">
      <div className="text-neutral-500 w-full h-full p-4 focus:outline-neutral-300 border border-neutral-200 bg-neutral-100">
        <div className="w-full flex justify-between mb-4">
          <p className="">{name}</p>
          <p className="">${priceInUSD}</p>
        </div>
        <p className="mb-4">{description}</p>
        <p className="">Duration: {formattedDuration}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="p-2">Edit</button>
        <button className="p-2" onClick={deleteBarberService}>
          Delete
        </button>
      </div>
    </div>
  );
}
