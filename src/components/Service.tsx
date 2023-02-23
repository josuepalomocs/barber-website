import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";
import { BarberService as IService } from "../types";

interface ServiceProps extends IService {}

export default function Service({
  id,
  name,
  durationInMinutes,
  priceInUSD,
}: ServiceProps) {
  const { selectedServiceId, selectServiceId } = useContext(AppointmentContext);

  const selectedServiceStyles = "border bg-blue-50 border-blue-500";

  const hours = Math.trunc(durationInMinutes / 60);
  const minutesRemainder = durationInMinutes % 60;
  let durationString = hours
    ? `${hours}h ${minutesRemainder ? `${minutesRemainder}min` : ""}`
    : `${durationInMinutes}min`;

  return (
    <button
      className={`w-full h-full flex justify-between text-left p-4 focus:outline-neutral-300 rounded-lg border border-neutral-200 ${
        selectedServiceId === id ? selectedServiceStyles : ""
      }`}
      onClick={() => {
        selectServiceId(id);
      }}
    >
      <div className="">
        <p className="mb-4">{name}</p>
        <p className="text-neutral-500 text-xs">{durationString}</p>
      </div>
      <p className="">${priceInUSD}</p>
    </button>
  );
}
