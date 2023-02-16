import { useEffect, useState } from "react";
import { BarberService } from "@/types";
import {
  createBarberServiceRequest,
  deleteBarberServiceRequest,
  getBarberServiceListRequest,
  updateBarberServiceRequest,
} from "@/services/api";

export default function useAdminBarberServiceList() {
  const [barberServiceList, setBarberServiceList] = useState<BarberService[]>(
    []
  );

  useEffect(() => {
    getBarberServiceListRequest()
      .then((barberServiceList) => setBarberServiceList(barberServiceList))
      .catch((error) => console.log(error));
  }, []);

  function createBarberService(newBarberService: BarberService): void {
    createBarberServiceRequest(newBarberService)
      .then((newBarberService) =>
        setBarberServiceList([...barberServiceList, newBarberService])
      )
      .catch((error) => console.log(error));
  }

  function updateBarberService(modifiedBarberService: BarberService): void {
    updateBarberServiceRequest(modifiedBarberService)
      .then((modifiedBarberService) =>
        setBarberServiceList(
          barberServiceList.map((barberService) =>
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
        setBarberServiceList(
          barberServiceList.filter((barberService) => barberService.id != id)
        )
      )
      .catch((error) => console.log(error));
  }

  return {
    barberServiceList,
    createBarberService,
    updateBarberService,
    deleteBarberService,
  };
}
