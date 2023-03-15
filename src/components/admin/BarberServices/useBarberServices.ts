import { useEffect, useState } from "react";
import { BarberService } from "@/types";
import { springServerHttpClient } from "@/lib/axios";

export default function useBarberServices() {
  const [barberServices, setBarberServices] = useState<BarberService[]>();

  useEffect(() => {
    async function getBarberServices() {
      try {
        console.log("here");
        const { data } = await springServerHttpClient.get<BarberService[]>(
          "/barber-services"
        );
        setBarberServices(data);
      } catch (error) {
        console.log(error);
      }
    }

    getBarberServices();
  }, []);

  return { barberServices };
}
