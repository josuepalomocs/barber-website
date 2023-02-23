import Service from "@/components/Service";
import { BarberService as IService } from "../types";
import { useContext } from "react";
import { AppointmentContext } from "@/context/AppointmentProvider";
import { convertDateToUnixTimestamp } from "@/utilities/date";

export default function ServiceList() {
  const { selectedDateTime, availableAppointments } =
    useContext(AppointmentContext);

  function renderServices() {
    return availableAppointments
      .filter(({ startTimestamp, availableBarberServices }) => {
        return convertDateToUnixTimestamp(selectedDateTime) === startTimestamp;
      })
      .map(({ availableBarberServices }) => {
        return availableBarberServices.map(
          ({ id, name, description, durationInMinutes, priceInUSD }) => {
            return (
              <li
                key={id}
                className="flex justify-between items-center bg-white hover:bg-neutral-200 rounded-lg"
              >
                <Service
                  id={id}
                  name={name}
                  description={description}
                  durationInMinutes={durationInMinutes}
                  priceInUSD={priceInUSD}
                />
              </li>
            );
          }
        );
      });
  }

  return <ul className="flex flex-col space-y-2">{renderServices()}</ul>;
}
