import type { NextApiRequest, NextApiResponse } from "next";
import { BarberDaySchedule } from "@/types";
import {
  createBarberDayScheduleInDB,
  deleteBarberDayScheduleInDB,
  getBarberDaySchedulesInDB,
  updateBarberDaySchedulesInDB,
} from "@/services/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getBarberDaySchedulesInDB()
      .then((barberDaySchedules) => res.status(200).json(barberDaySchedules))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "POST") {
    const barberDaySchedule: BarberDaySchedule = req.body;
    return createBarberDayScheduleInDB(barberDaySchedule)
      .then((barberDaySchedule) => res.status(200).json(barberDaySchedule))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "PUT") {
    const barberDaySchedule: BarberDaySchedule = req.body;
    return updateBarberDaySchedulesInDB(barberDaySchedule)
      .then((barberDaySchedule) => res.status(200).json(barberDaySchedule))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "DELETE") {
    const weekdayNumber = req.query["weekday-number"] as string;
    return deleteBarberDayScheduleInDB(Number(weekdayNumber))
      .then(() => {
        return res.status(200).json({});
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
}
