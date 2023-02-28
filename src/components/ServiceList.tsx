import Service from "@/components/Service";
import { BarberService as IService } from "../types";
import { useContext } from "react";
import { CustomerAppointmentContext } from "@/context/CustomerAppointmentProvider";
import { convertDateToUnixTimestamp } from "@/utilities/date";
import { AvailableAppointmentsContext } from "@/context/AvailableAppointmentProvider";

export default function ServiceList() {
  const { availableAppointments } = useContext(AvailableAppointmentsContext);
  const { selectedISODateTime } = useContext(CustomerAppointmentContext);

  function renderServices() {
    return availableAppointments
      .filter(({ startTimestamp }) => {
        return (
          convertDateToUnixTimestamp(new Date(selectedISODateTime)) ===
          startTimestamp
        );
      })
      .map(({ availableBarberServices }) => {
        return availableBarberServices.map(
          ({ id, name, description, durationInMinutes, priceInUSD }) => {
            return (
              <li
                key={id}
                className="flex justify-between items-center bg-white hover:bg-neutral-200 rounded-sm animate-fadeIn"
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

  if (
    !availableAppointments.some(({ startTimestamp }) => {
      return (
        convertDateToUnixTimestamp(new Date(selectedISODateTime)) ===
        startTimestamp
      );
    })
  )
    return <div />;

  return <ul className="flex flex-col space-y-2">{renderServices()}</ul>;
}
