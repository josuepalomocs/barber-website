import BarberService from "@/components/admin/BarberService";
import AddServiceModal from "@/components/admin/AdminAddServiceModal";
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
      return <></>;
    }
    return barberServices.map((barberService) => {
      return (
        <li className="mb-4" key={barberService.id}>
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
      <ul className="pt-4 border-t">{renderServices()}</ul>
    </>
  );
}
