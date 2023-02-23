import type { NextApiRequest, NextApiResponse } from "next";
import { BarberService } from "@/types";
import {
  createBarberServiceInDB,
  deleteBarberServiceInDB,
  getBarberServicesFromDB,
  updateBarberServiceInDB,
} from "@/services/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getBarberServicesFromDB()
      .then((barberServices) => res.status(200).json(barberServices))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "POST") {
    const barberService: BarberService = req.body;
    return createBarberServiceInDB(barberService)
      .then((barberService) => res.status(200).json(barberService))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "PUT") {
    const barberService: BarberService = req.body;
    return updateBarberServiceInDB(barberService)
      .then((barberService) => res.status(200).json(barberService))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
  if (req.method === "DELETE") {
    const id = req.query["id"] as string;
    return deleteBarberServiceInDB(id)
      .then(() => res.status(200).json({}))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  }
}
