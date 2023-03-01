import type { NextApiRequest, NextApiResponse } from "next";
import { sendCustomerAppointmentConfirmationEmail } from "@/services/emailServices";
import { CustomerAppointment } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const customerAppointment: CustomerAppointment = req.body;
    return sendCustomerAppointmentConfirmationEmail(customerAppointment)
      .then(() => res.status(200).json({}))
      .catch(() => res.status(500).json({}));
  }
}
