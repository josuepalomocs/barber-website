import type { NextApiRequest, NextApiResponse } from "next";
import { CustomerAppointment } from "@/types";
import { createCustomerAppointmentSlackMessage } from "@/services/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const customerAppointment: CustomerAppointment = req.body;
    return await createCustomerAppointmentSlackMessage(customerAppointment)
      .then(() => res.status(200).json({}))
      .catch((error) => res.status(500).json(error));
  }
}
