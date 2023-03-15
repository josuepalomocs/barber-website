import type { NextApiRequest, NextApiResponse } from "next";
import { BarberDaySchedule } from "@/types";
import {
  deleteBarberDayScheduleInDB,
  getBarberDayScheduleByDayFromDB,
  getBarberDaySchedulesInDB,
  updateBarberDayScheduleInDB,
} from "@/services/database";
import {
  createBarberDayScheduleService,
  updateBarberDayScheduleService,
} from "@/services/barberDaySchedules";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const weekdayNumber = req.query["weekday-number"];

    if (weekdayNumber) {
      return getBarberDayScheduleByDayFromDB(Number(weekdayNumber))
        .then((barberDaySchedule) => res.status(200).json(barberDaySchedule))
        .catch((error) => {
          console.log(error);
          return res.status(500).json(error);
        });
    }
    return getBarberDaySchedulesInDB()
      .then((barberDaySchedules) => res.status(200).json(barberDaySchedules))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "POST") {
    const barberDaySchedule: BarberDaySchedule = req.body;
    return createBarberDayScheduleService(barberDaySchedule)
      .then((barberDaySchedule) => res.status(200).json(barberDaySchedule))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "PUT") {
    const barberDaySchedule: BarberDaySchedule = req.body;
    return updateBarberDayScheduleService(barberDaySchedule)
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
