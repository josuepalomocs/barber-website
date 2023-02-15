import { BarberService } from "@/types";
import AdminService from "@/components/admin/AdminService";
import { useEffect, useState } from "react";
import axios from "axios";

interface AdminServiceListProps {}

export default function AdminServiceList({}: AdminServiceListProps) {
  const [barberServiceList, setBarberServiceList] = useState<BarberService[]>(
    []
  );

  useEffect(() => {
    async function getBarberServiceListFromServer(): Promise<void> {
      const apiEndpoint = "http://localhost:3000/api/services";
      const { data } = await axios.get<BarberService[]>(apiEndpoint);
      setBarberServiceList(data);
    }

    getBarberServiceListFromServer();
  }, []);

  function handleDeleteFromList(id: string) {
    const newBarberServiceList = barberServiceList.filter((barberService) => {
      return barberService.id != id;
    });
    setBarberServiceList(newBarberServiceList);
  }

  function renderServices() {
    if (!barberServiceList.length) {
      return <></>;
    }
    return barberServiceList.map((barberService) => {
      return (
        <li key={barberService.id}>
          <AdminService
            barberService={barberService}
            handleDeleteFromList={handleDeleteFromList}
          />
        </li>
      );
    });
  }

  return <ul className="">{renderServices()}</ul>;
}
