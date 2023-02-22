import { useEffect, useState } from "react";
import { CustomerAppointment } from "@/types";
import { getAllCustomerAppointmentsRequest } from "@/services/api";

export default function useCustomerAppointments() {
  const [customerAppointments, setCustomerAppointments] = useState<
    CustomerAppointment[]
  >([]);

  useEffect(() => {
    async function getAllCustomerAppointments() {
      const response = await getAllCustomerAppointmentsRequest();
      setCustomerAppointments(response);
    }

    getAllCustomerAppointments().catch((error) => console.log(error));
  }, []);

  return { customerAppointments };
}
