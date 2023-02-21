import BarberService from "@/components/admin/BarberService";
import AddServiceModal from "@/components/admin/AddBarberServiceModal";
import useModal from "@/hooks/useModal";
import { BarberService as IBarberService } from "../../types";
interface BarberServicesProps {
  barberServices: IBarberService[];
  updateBarberService: (barberService: IBarberService) => void;
  deleteBarberService: (id: string) => void;
}

export default function BarberServices({
  barberServices,
  updateBarberService,
  deleteBarberService,
}: BarberServicesProps) {
  function renderServices() {
    if (!barberServices.length) {
      return <p className="px-4 text-sm">You do not have any services.</p>;
    }
    return barberServices.map((barberService) => {
      return (
        <li className="px-4 py-2 bg-white" key={barberService.id}>
          <BarberService
            barberService={barberService}
            actions={{ updateBarberService, deleteBarberService }}
          />
        </li>
      );
    });
  }

  return (
    <>
      <ul className="">{renderServices()}</ul>
    </>
  );
}
