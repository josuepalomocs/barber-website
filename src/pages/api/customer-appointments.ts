import type { NextApiRequest, NextApiResponse } from "next";
import {
  createCustomerAppointmentService,
  getCustomerAppointmentByTimestamp,
  getCustomerAppointmentsByDate,
} from "@/services/customerAppointmentServices";
import { CustomerAppointment } from "@/types";
import { getCustomerAppointmentsInDB } from "@/services/database";

export default async function customerAppointmentController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const timestamp = req.query["timestamp"];
    const date = req.query["date"];
    if (timestamp && typeof timestamp === "string") {
      return getCustomerAppointmentByTimestamp(Number(timestamp))
        .then((customerAppointment) =>
          res.status(200).json(customerAppointment)
        )
        .catch((error) => res.status(500).json(error));
    }
    if (date && typeof date === "string") {
      return getCustomerAppointmentsByDate(date)
        .then((customerAppointment) =>
          res.status(200).json(customerAppointment)
        )
        .catch((error) => res.status(500).json(error));
    }
    return getCustomerAppointmentsInDB()
      .then((customerAppointments) =>
        res.status(200).json(customerAppointments)
      )
      .catch((error) => res.status(500).json(error));
  }
  if (req.method === "POST") {
    const customerAppointment: CustomerAppointment = req.body;
    return createCustomerAppointmentService(customerAppointment)
      .then((customerAppointment) => res.status(200).json(customerAppointment))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "PUT") {
  }
  if (req.method === "DELETE") {
  }
}
