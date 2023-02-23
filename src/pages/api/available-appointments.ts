import type { NextApiRequest, NextApiResponse } from "next";
import { getBarberDaySchedulesInDB } from "@/services/database";
import { getAvailableAppointmentsByDate } from "@/services/availableAppointmentServices";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const date = req.query["date"];

    if (!date)
      res.status(400).json({
        error: new Error("Request error. Missing 'date' query parameter."),
      });

    return getAvailableAppointmentsByDate(date as string)
      .then((availableAppointments) =>
        res.status(200).json(availableAppointments)
      )
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}
