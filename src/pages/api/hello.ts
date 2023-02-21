// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { init } from "@/services/barberDaySchedules";
import { ampValidation } from "next/dist/build/output";

type Data = {
  dates: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let dateStrings = [];
  const availableAppointmentDates = init(4);
  for (let i = 0; i < availableAppointmentDates.length; i++) {
    dateStrings.push(availableAppointmentDates[i].toLocaleTimeString());
  }
  res.status(200).json({ dates: dateStrings });
}
