import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";
import { Service as IService } from "../types";

interface ServiceProps extends IService {}

export default function Service({
  id,
  name,
  durationInMinutes,
  price,
}: ServiceProps) {
  const { selectedServiceId, selectServiceId } = useContext(AppointmentContext);

  const selectedServiceStyles = "bg-neutral-900 text-white";

  const hours = Math.trunc(durationInMinutes / 60);
  const minutesRemainder = durationInMinutes % 60;
  let durationString = hours
    ? `${hours}h ${minutesRemainder ? `${minutesRemainder}min` : ""}`
    : `${durationInMinutes}min`;

  return (
    <button
      className={`w-full h-full flex justify-between text-left p-4 focus:outline-neutral-300 ${
        selectedServiceId === id ? selectedServiceStyles : ""
      }`}
      onClick={() => {
        selectServiceId(id);
      }}
    >
      <div className="">
        <p className="mb-2">{name}</p>
        <p
          className={`text-neutral-400 ${
            selectedServiceId === id ? "text-white" : ""
          }`}
        >
          {durationString}
        </p>
      </div>
      <p className="">${price}</p>
    </button>
  );
}
