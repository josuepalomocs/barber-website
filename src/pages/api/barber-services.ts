import type { NextApiRequest, NextApiResponse } from "next";
import dynamoClient from "@/lib/dynamo";
import { v4 as uuidv4 } from "uuid";
import { BarberService } from "@/types";
import {
  createBarberServiceInDB,
  getBarberServicesInDB,
} from "@/services/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getBarberServicesInDB()
      .then((barberServices) => res.status(200).json(barberServices))
      .catch((error) => res.status(500).json(error));
  }
  if (req.method === "POST") {
    const barberService: BarberService = req.body;
    return createBarberServiceInDB(barberService)
      .then((barberService) => res.status(200).json(barberService))
      .catch((error) => res.status(500).json(error));
  }
  if (req.method === "DELETE") {
    const barberServiceId = req.query["barber-service-id"];
    console.log(barberServiceId);
    if (barberServiceId) {
      const params = {
        TableName: "BarberService",
        Key: {
          barberServiceId: { S: barberServiceId.toString() },
        },
      };

      // Call DynamoDB to delete the item from the table
      return dynamoClient.deleteItem(params, function (err, data) {
        if (err) {
        } else {
          return res.status(200).json({ barberServiceId });
        }
      });
    }
  }
}
