import { BarberService as BarberServiceType } from "@/types";
import BarberService from "@/components/admin/BarberServices/BarberService";

interface BarberServicesProps {
  barberServices: BarberServiceType[];
}

export default function BarberServices({
  barberServices,
}: BarberServicesProps) {
  function renderBarberServices() {
    if (!barberServices.length)
      return <div className="text-center">No services available</div>;
    return (
      <ul className="flex flex-col space-y-4">
        {barberServices.map((barberService) => {
          const { id, name, durationInMinutes, priceInUsd } = barberService;
          return (
            <li key={id}>
              <BarberService
                name={name}
                durationInMinutes={durationInMinutes}
                priceInUsd={priceInUsd}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="bg-white drop-shadow-sm p-4 rounded-sm">
      {renderBarberServices()}
    </div>
  );
}
