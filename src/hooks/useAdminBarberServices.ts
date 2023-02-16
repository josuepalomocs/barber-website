import { useEffect, useState } from "react";
import { BarberService } from "@/types";
import {
  createBarberServiceRequest,
  deleteBarberServiceRequest,
  getBarberServicesRequest,
  updateBarberServiceRequest,
} from "@/services/api";

export default function useAdminBarberServices() {
  const [barberServices, setBarberServices] = useState<BarberService[]>([]);

  useEffect(() => {
    getBarberServicesRequest()
      .then((barberServices) => setBarberServices(barberServices))
      .catch((error) => console.log(error));
  }, []);

  function createBarberService(newBarberService: BarberService): void {
    createBarberServiceRequest(newBarberService)
      .then((newBarberService) =>
        setBarberServices([...barberServices, newBarberService])
      )
      .catch((error) => console.log(error));
  }

  function updateBarberService(modifiedBarberService: BarberService): void {
    updateBarberServiceRequest(modifiedBarberService)
      .then((modifiedBarberService) =>
        setBarberServices(
          barberServices.map((barberService) =>
            modifiedBarberService.id === barberService.id
              ? modifiedBarberService
              : barberService
          )
        )
      )
      .catch((error) => console.log(error));
  }

  function deleteBarberService(id: string): void {
    deleteBarberServiceRequest(id)
      .then(() =>
        setBarberServices(
          barberServices.filter((barberService) => barberService.id != id)
        )
      )
      .catch((error) => console.log(error));
  }

  return {
    barberServices,
    createBarberService,
    updateBarberService,
    deleteBarberService,
  };
}
